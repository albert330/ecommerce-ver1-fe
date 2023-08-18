<template>
    <div>
        <div class="row" v-if="listAddress.length > 0">
            <div :class="col" v-for="item in listAddress" :key="item.id">
                <div class="border rounded-lg position-relative p-3 mb-3" :class="{ 'border-primary bg-transparent-primary': item.id == (type == 'shipping' ? selectedAddressId : selectedBillingId) }">
                    <button class="btn position-absolute p-0" @click="removeAddress(item.id)" style="right: 1rem; top: 1rem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                    <p class="fw-700 mb-1">{{ item.first_name + " " + item.last_name }}</p>
                    <p class="mb-0">{{ item.phone_number }}</p>
                    <p class="mb-0">{{ item.address + " - " + item.postal_code }}</p>
                    <p class="mb-0">{{ item.city.label + ", " + item.province.label }}</p>
                    <p>{{ "(Catatan untuk kurir : " + item.courier_note + ")" }}</p>
                    <div class="d-flex">
                        <button class="btn btn-sm btn-outline-primary mr-2" @click="editAddress(item)">Change Address</button>
                        <button class="btn btn-sm btn-primary" @click="chooseAddress(item.id)">Select address</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center">you dont hanve any registered address</p>
        </div>
        <b-modal id="modalEditAddress" title="change address" size="lg" hide-footer>
            <div class="card-body">
                <FormAddress method="PUT" :detailAddress="detailAddress" />
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["col", "type"],
    computed: {
        ...mapState(["listAddress", "selectedAddressId", "selectedBillingId"]),
    },
    data() {
        return {
            detailAddress: {},
        };
    },
    methods: {
        editAddress(data) {
            this.detailAddress = { ...data };
            this.$bvModal.show("modalEditAddress");
        },
        chooseAddress(id) {
            const tempAddress = [...this.listAddress];
            const tempSelectedAddress = tempAddress.filter((el) => el.id == id);

            console.log(this.type);

            if (this.type == "shipping") {
                this.$store.commit("setSelectedAddressId", id);
                this.$store.commit("setSelectedAddress", tempSelectedAddress[0]);
                this.$bvModal.hide("modalListAddress");
            } else {
                this.$store.commit("setSelectedBillingId", id);
                this.$store.commit("setSelectedBilling", tempSelectedAddress[0]);
                this.$bvModal.hide("modalListBilling");
            }
        },
        removeAddress(id) {
            let payload = { by_id: id };

            return this.$axios
                .post("/api/v1/private/users/shipping-address/destroy", payload)
                .then((res) => {
                    this.$bvToast.toast("Alamat berhasil dihapus", {
                        title: `Success`,
                        variant: "success",
                        solid: true,
                    });
                    this.$store.dispatch("showProfile");
                })
                .catch((err) => {
                    console.log(err);
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
        },
    },
};
</script>

<style></style>
