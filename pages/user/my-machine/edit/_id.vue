<style>
    li:hover {
        background-color: #dedede;
    }
</style>
<template>
    <div class="row">
        <div class="col-lg-12">
            <h3 class="text-uppercase mb-0">Edit Machine</h3>
            <hr />
            <form @submit.prevent="gateAction" autocomplete="off" class="mb-5">
                <div class="mb-3">
                    <label for="product_id">Product</label>
                    <div class="dropdown">
                        <div class="dropdown-toggle border rounded p-1" v-on:click="toggleDropdown">
                            <img src="https://ipsf.net/wp-content/uploads/2021/12/dummy-image-square.webp" class="dropdown-option-image" v-if="selectedOption == null" width="100" height="100">
                            <img :src="assetUrl + selectedOption?.image[0]?.path" class="dropdown-option-image" width="100" v-else height="100">
                            <span class="dropdown-option-label" v-if="selectedOption == null">Choose your machine</span>
                            <span class="dropdown-option-label" v-else>{{ selectedOption?.product?.name }}</span>
                            <span class="dropdown-caret right"></span>
                        </div>
                        <ul class="bg-white border" v-show="isDropdownOpen" style="max-height: 225px; overflow-y: auto; position: relative; margin: 0; padding: 0;">
                            <li v-for="(item, index) in optionsProduct" :key="index" v-on:click="selectOption(item)" class="p-1 border" style="list-style-type: none; li">
                                <img :src="assetUrl + item.image[0]?.path" class="dropdown-option-image" width="100" height="100">
                                <span class="dropdown-option-label">{{ item.product?.name }}</span>
                            </li>
                        </ul>
                    </div>
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
            isDropdownOpen: false,
            selectedOption: null,
        };
    },
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
            this.selectedOption = res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectOption(option) {                                                                                                                                                                                                                                                                                                                                                                                                                  
            this.selectedOption = option;
            this.isDropdownOpen = false;
            this.payload.product_id = option.product.id;
        },
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
