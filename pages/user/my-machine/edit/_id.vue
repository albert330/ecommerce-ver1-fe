<template>
    <div class="row">
        <div class="col-lg-12">
            <h3 class="text-uppercase mb-0">Update Machine</h3>
            <hr />
            <form @submit.prevent="gateAction" autocomplete="off" class="mb-5">
                <div class="mb-3">
                    <label for="product_id">Product</label>
                    <select class="form-control" v-model="payload.product_id">
                        <option disabled hidden value="">Select Product</option>
                        <option :value="item.product?.id" v-for="(item, index) in optionsProduct" :key="index">
                            {{ item.product?.name }}
                            <img :src="assetUrl + item.image[0]?.path" :alt="item.product?.name" width="100" height="100">
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="serial_number">Serial Number</label>
                    <input class="form-control" type="text" id="serial_number" name="serial_number" placeholder="Serial Number" v-model="payload.serial_number" />
                </div>
                <div class="mb-3">
                    <label for="purchase_date">Purchase Date</label>
                    <input class="form-control" type="datetime-local" id="purchase_date" name="purchase_date" placeholder="Purchase Date" v-model="payload.purchase_date"/>
                </div>
                <!-- <div class="mb-3">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="description" cols="30" rows="10" v-model="payload.description" placeholder="Description here ..."></textarea>
                </div> -->
                <div class="d-flex justify-content-end">
                    <div v-if="isDisabled">
                        <b-spinner small></b-spinner>
                        Mengirim...
                    </div>
                    <button class="btn btn-primary" :disabled="isDisabled">
                        {{ 'Update' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    layout: "dashboard",
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            optionsProduct: [],
            isDisabled: false,
            isCreateMachine: true,
            payload: {
                product_id: '',
                serial_number: '',
                purchase_date: '',
                id: '',
            },
            email: null,
        };
    },
    computed: {},
    mounted() {
        this.email = this.$cookies.get("email");
        this.getProduct();
        this.$axios
            .get("/api/v1/private/machine/show", {
            params: {
                by_email: this.email,
                by_id: this.$route.params.id,
            },
        })
        .then((res) => {
            this.payload = res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        getProduct() {
            this.$axios
                .get("/api/v1/publics/product/show", {
                    params: {
                        by_category_id: 259,
                    },
                })
                .then((res) => {
                    this.optionsProduct = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        gateAction() {
            return this.updateData();
        },
        async updateData() {
            if (this.payload) {
                this.isDisabled = true;
                this.$axios
                    .post("/api/v1/private/machine/update", this.payload, {
                        params: {
                            by_email: this.email, 
                        },
                    })
                    .then((res) => {
                        this.$bvToast.toast("Update berhasil", {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                        this.isDisabled = false;
                        setTimeout( () => 
                            this.$router.push({ path: '/user/my-machine'}), 
                        2000);
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
            } else {
                this.$bvToast.toast("Ada field yang harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
    },
};
</script>
