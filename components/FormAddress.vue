<template>
    <form @submit.prevent="onSubmitAddress" autocomplete="off">
        <div class="row">
            <div class="col-lg-6">
                <div class="mb-3">
                    <label>First Name</label>
                    <input class="form-control" type="text" name="first_name" placeholder="First Name" v-model="payload.first_name" />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="mb-3">
                    <label>Last Name</label>
                    <input class="form-control" type="text" name="last_name" placeholder="Last Name" v-model="payload.last_name" />
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label>Phone Number</label>
                    <input class="form-control" type="text" name="phone_number" placeholder="Phone Number" v-model="payload.phone_number" />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="mb-3">
                    <label>Province</label>
                    <select class="form-control" v-model="payload.province" @change="getCity()">
                        <option value="">Choose Province</option>
                        <option :value="item.province_id" v-for="(item, index) in provinces" :key="index">
                            {{ item.province }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="mb-3">
                    <label>City</label>
                    <select class="form-control" v-model="payload.city" :disabled="payload.province == ''">
                        <option value="">Choose City</option>
                        <option :value="item.city_id" v-for="(item, index) in cities" :key="index">
                            {{ item.city_name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label>Post Code</label>
                    <input class="form-control" type="text" name="postal_code" placeholder="Post Code" v-model="payload.postal_code" />
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label>address label (Apartment, House, etc)</label>
                    <input class="form-control" type="text" name="label_place" placeholder="(Home, Apartment)" v-model="payload.label_place" />
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label>Address</label>
                    <textarea class="form-control" type="text" name="address" placeholder="Address" rows="5" v-model="payload.address" />
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label>Notes for courier</label>
                    <input class="form-control" type="text" name="courier_note" placeholder="Notes for courier" v-model="payload.courier_note" />
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" :disabled="isDisabled">
                {{ isDisabled ? "Processing..." : buttonTitle }}
            </button>
        </div>
    </form>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["method", "detailAddress"],
    computed: {
        ...mapState(["profile"]),
    },
    data() {
        return {
            payload: {
                first_name: "",
                last_name: "",
                phone_number: "",
                label_place: "",
                courier_note: "",
                address: "",
                city: "",
                province: "",
                fk_user_id: "",
                postal_code: "",
            },
            provinces: [],
            cities: [],
            isDisabled: false,
            buttonTitle: "Add Address",
        };
    },
    mounted() {
        this.getProvince();

        if (this.method === "PUT") {
            this.buttonTitle = "Change Address";
            this.payload = { ...this.detailAddress };
            this.payload.province = this.detailAddress.province.id;
            this.payload.city = this.detailAddress.city.id;

            this.getProvince();
            this.getCity();
        }
    },
    methods: {
        clearForm() {
            this.payload = {
                first_name: "",
                last_name: "",
                phone_number: "",
                label_place: "",
                courier_note: "",
                address: "",
                city: "",
                province: "",
                fk_user_id: "",
                postal_code: "",
            };

            this.$store.dispatch("showProfile");
        },
        onSubmitAddress() {
            this.payload.fk_user_id = this.profile?.id;

            const newPayload = { ...this.payload };
            delete newPayload.province;

            const { first_name, last_name, phone_number, label_place, address, city, postal_code } = newPayload;

            if (first_name && last_name && phone_number && label_place && address && city && postal_code) {
                this.isDisabled = true;
                if (this.method === "POST") {
                    this.$axios
                        .post("/api/v1/private/users/shipping-address/create", newPayload)
                        .then((res) => {
                            this.$bvToast.toast("Alamat berhasil ditambah", {
                                title: `Success`,
                                variant: "success",
                                solid: true,
                            });
                            this.isDisabled = false;
                            this.clearForm();
                            this.$bvModal.hide("modalCreateAddress");
                        })
                        .catch((err) => {
                            console.log(err);
                            this.isDisabled = false;
                            if (err?.response?.data?.data) {
                                err.response.data.data.forEach((el) => {
                                    this.$bvToast.toast(el.message, {
                                        title: `Error`,
                                        variant: "danger",
                                        solid: true,
                                        appendToast: true,
                                    });
                                });
                            }
                        });
                } else if (this.method === "PUT") {
                    this.$axios
                        .put("/api/v1/private/users/shipping-address/update", newPayload)
                        .then((res) => {
                            this.$bvToast.toast("Alamat berhasil ditambah", {
                                title: `Success`,
                                variant: "success",
                                solid: true,
                            });
                            this.isDisabled = false;
                            this.clearForm();
                            this.$bvModal.hide("modalEditAddress");
                        })
                        .catch((err) => {
                            console.log(err);
                            this.isDisabled = false;
                            if (err?.response?.data?.data) {
                                err.response.data.data.forEach((el) => {
                                    this.$bvToast.toast(el.message, {
                                        title: `Error`,
                                        variant: "danger",
                                        solid: true,
                                        appendToast: true,
                                    });
                                });
                            }
                        });
                }
            } else {
                this.$bvToast.toast("Semua field harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
        getProvince() {
            this.$axios
                .get("/api/v1/publics/shipping/province", { params: { id: "" } })
                .then((res) => {
                    this.provinces = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getCity() {
            this.$axios
                .get("/api/v1/publics/shipping/city", { params: { id: "", province_id: this.payload.province } })
                .then((res) => {
                    this.cities = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style></style>
