<template>
    <div>
        <div class="section-fluid bg-grey">
            <div class="container">
                <h2 class="roboto-condensed-font text-center mb-5">Checkout</h2>
                <div class="row justify-content-center mb-4">
                    <div class="col-lg-8">
                        <div class="row">
                            
                            
                            <div class="col-12">
                                <div class="mb-4">
                                    <div class="bg-primary rounded-top p-3">
                                        <h6 class="lead fw-700 text-white mb-0">Shipping Address</h6>
                                    </div>
                                    <div class="bg-white rounded-bottom p-3">
                                        <div class="mb-3" v-if="selectedAddressId != ''">
                                            <p class="fw-700 mb-1">{{ selectedAddress?.first_name + " " + selectedAddress?.last_name }}</p>
                                            <p class="mb-0">{{ selectedAddress?.address + ", " + selectedAddress?.city?.label + ", " + selectedAddress?.province?.label+ ", "+selectedAddress?.postal_code}}</p>
                                            <p class="mb-2">
                                                <span class="fw-700">T:</span>
                                                {{ selectedAddress?.phone_number }}
                                            </p>
                                              <p class=" mb-0" style="font-size:0.8rem"><span class="fw-700">courier note: </span>{{ selectedAddress?.courier_note }}</p>
                                            <p class="mb-0"  style="font-size:0.8rem"><span class="fw-700">address label: </span>{{ selectedAddress?.label_place }}</p>
                                        </div>
                                        <button class="btn btn-md btn-outline-primary" v-b-modal.modalListAddress v-if="listAddress.length > 0">Select Shipping Address</button>
                                        <button class="btn btn-md btn-outline-primary" v-b-modal.modalCreateAddress v-else>New Shipping Address</button>
                                        <b-modal id="modalListAddress" title="Shipping Address" size="lg" hide-footer>
                                            <div class="card-body">
                                                <div class="d-flex justify-content-end">
                                                    <button class="btn btn-sm btn-primary mb-4" v-b-modal.modalCreateAddress>New Shipping Address</button>
                                                </div>
                                                <ListAddress col="col-12" type="shipping" />
                                            </div>
                                        </b-modal>
                                        <b-modal id="modalCreateAddress" title="New Shipping&billing Address" size="lg" hide-footer>
                                            <div class="card-body">
                                                <FormAddress method="POST" detailAddress="" />
                                            </div>
                                        </b-modal>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-4">
                                    <div class="bg-primary rounded-top p-3">
                                        <h6 class="lead fw-700 text-white mb-0">Shipping Courier</h6>
                                    </div>
                                    <div class="bg-white rounded-bottom p-3">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="mb-3">
                                                    <label>Select Courier</label>
                                                    <select class="form-control" v-model="shippingCourier" @change="getShippingServices" :disabled="listAddress.length <= 0">
                                                        <option value="">--Choose Courier--</option>
                                                        <option value="jne">JNE</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6" v-if="shippingCourier">
                                                <div class="mb-3">
                                                    <label>Selected Courier</label>
                                                    <p class="fw-700 text-uppercase mb-0">{{ shippingCourier }}</p>
                                                </div>
                                            </div>
                                            <div class="col-12" v-if="shippingCourier">
                                                <label>Service</label>
                                                <template v-if="!isLoadingShipping">
                                                    <div class="row" v-if="shippingServices.length > 0">
                                                        <div class="col-12" v-for="(item, index) in shippingServices" :key="'service' + item.service">
                                                            <div class="border rounded-lg position-relative cursor-pointer p-3 mb-3" :class="{ 'border-primary bg-transparent-primary': index == shippingServiceId }" @click="selectShippingService(item, index)">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div>
                                                                        <p class="fw-700 mb-1">{{ item.service + " - " + item.description }}</p>
                                                                        <p class="fs-14 mb-0">Estimasi : {{ item.cost[0].etd }} hari</p>
                                                                    </div>
                                                                    <div>
                                                                        <p class="fw-700 text-secondary">{{ convertToRupiah(item.cost[0].value) }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="text-center" v-else>Service not available. Please contact out administration for more information.</p>
                                                </template>
                                                <template v-else>
                                                    <div class="row">
                                                        <div class="col-12" v-for="i in 3" :key="i">
                                                            <div class="border rounded-lg position-relative cursor-pointer p-3 mb-3">
                                                                <div class="d-flex align-items-center justify-content-between">
                                                                    <div>
                                                                        <b-skeleton width="150px" animation="wave mb-2"></b-skeleton>
                                                                        <b-skeleton width="130px" height="12px" animation="wave mb-0"></b-skeleton>
                                                                    </div>
                                                                    <div>
                                                                        <b-skeleton width="100px" animation="wave mb-0"></b-skeleton>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-4">
                                    <div class="bg-primary rounded-top p-3">
                                        <h6 class="lead fw-700 text-white mb-0">Billing Address</h6>
                                    </div>
                                    <div class="bg-white rounded-bottom p-3">
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="checkBillingAddress" v-model="same_as_shipping" @change="onChangeBillingAddress" />
                                            <label class="form-check-label" for="checkBillingAddress">Make billing address same as shipping address</label>
                                        </div>
                                        
                                        <div class="mb-3" v-if="!same_as_shipping && selectedBillingId != ''">
                                            <hr />
                                            <p class="fw-700 mb-1">{{ selectedBilling?.first_name + " " + selectedBilling?.last_name }}</p>
                                            <p class="mb-0">{{ selectedBilling?.address + ", " + selectedBilling?.city?.label + ", " + selectedBilling?.province?.label+", "+ selectedBilling?.postal_code }}</p>
                                            <p class="mb-2">
                                                <span class="fw-700">T:</span>
                                                {{ selectedBilling?.phone_number }}
                                            </p>
                                            <p class=" mb-0" style="font-size:0.8rem"><span class="fw-700">courier note: </span>{{ selectedBilling?.courier_note }}</p>
                                            <p class="mb-0"  style="font-size:0.8rem"><span class="fw-700">address label: </span>{{ selectedBilling?.label_place }}</p>
                                        </div>
                                        <template v-if="!same_as_shipping">
                                            <button class="btn btn-md btn-outline-primary" v-b-modal.modalListBilling v-if="listAddress.length > 0">Select Billing Address</button>
                                            <button class="btn btn-md btn-outline-primary" v-b-modal.modalCreateAddress v-else>New Billing Address</button>
                                        </template>
                                        <b-modal id="modalListBilling" title="Billing Address" size="lg" hide-footer>
                                            <div class="card-body">
                                                <div class="d-flex justify-content-end">
                                                    <button class="btn btn-sm btn-primary mb-4" v-b-modal.modalCreateAddress>New Billing Address</button>
                                                </div>
                                                <ListAddress col="col-12" type="billing" />
                                            </div>
                                        </b-modal>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-12">
                                
                            </div> -->
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="bg-white mb-4 p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                            <h5 class="fw-700 text-uppercase mb-4">Order Summary</h5>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <span>Sub Total :</span>
                                <p class="mb-0">{{ convertToRupiah(cart?.calculation.sub_total) }}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between" v-if="shippingServices[shippingServiceId]?.cost[0]?.value > 0">
                                <span>Shipping Cost :</span>
                                <p class="mb-0">{{ convertToRupiah(shippingServices[shippingServiceId]?.cost[0]?.value ?? 0) }}</p>
                            </div>
                            <hr class="my-2" />
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <span>Total :</span>
                                <h6 class="lead fw-700 mb-0">{{ convertToRupiah(cart?.calculation.sub_total + (shippingServices[shippingServiceId]?.cost[0]?.value ?? 0)) }}</h6>
                            </div>
                            <button class="btn btn-md btn-primary btn-block text-uppercase" @click="handleConfirm" :disabled="isLoadingCheckout">{{ isLoadingCheckout ? "processing..." : "place order" }}</button>
                            <nuxt-link to="/cart" class="btn btn-md btn-outline-primary btn-block text-uppercase" v-if="!isLoadingCheckout">modify cart</nuxt-link>
                        </div>
                        <div>
                            <div class="bg-primary rounded-top p-3">
                                <h6 class="lead fw-700 text-white mb-0">Shopping Cart</h6>
                            </div>
                            <div class="bg-white rounded-bottom p-3">
                                <div class="border rounded-lg bg-grey p-3 mb-2" v-for="(item, index) in cart.list" :key="'itemCheckout' + index">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="d-flex">
                                            <div class="img-ratio1x1 w-78 border rounded-lg mr-3">
                                                <img :src="assetUrl + item.product_image" />
                                            </div>
                                            <div>
                                                <p class="fs-14 mb-1">{{ item.product_name }}</p>
                                                <p class="fs-14 fw-700 mb-1" v-if="item.normal_price && item.normal_price != null">
                                                    <span class="text-old-price fs-14 fw-400 mr-1">{{ convertToRupiah(item.normal_price) }}</span>
                                                    {{ convertToRupiah(item.purchase_price) }}
                                                </p>
                                                <p class="fs-14 fw-700 mb-1" v-else>{{ convertToRupiah(item.purchase_price) }}</p>
                                                <p class="fs-14 mb-1">
                                                    <i>{{ item.variant_description }}</i>
                                                </p>
                                                <p class="fs-14 mb-0">{{ item.qty }} item</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3 mt-md-0" v-if="item.note">
                                        <div class="col-12">
                                            <p class="fs-14 mb-1">Notes : {{ item.note }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal id="modalCartEmpty" title="Cart Empty" size="md" centered no-close-on-esc no-close-on-backdrop hide-header-close>
                    <template #default>
                        <p class="mb-0">Your Cart is empty</p>
                    </template>
                    <template #modal-footer>
                        <button class="btn btn-md btn-primary" @click="handleRedirect()">Start Shopping</button>
                    </template>
                </b-modal>
                <b-modal id="modalConfirm" title="Confirmation" size="md" centered>
                    <template #default>
                        <p class="mb-0">Ready to place your order?</p>
                    </template>
                    <template #modal-footer>
                        <div class="d-flex align-items-center">
                            <nuxt-link to="/cart" class="btn btn-md btn-outline-primary mr-3">Modify Cart</nuxt-link>
                            <button class="btn btn-md btn-primary" @click="createCheckout()" :disabled="isLoadingCheckout">{{ isLoadingCheckout ? "Processing..." : "Place Order" }}</button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    layout: "checkout",
    head() {
        return {
            title: "Checkout",
        };
    },
    computed: {
        ...mapState(["assetUrl", "cart", "listAddress", "selectedAddress", "selectedAddressId", "selectedBilling", "selectedBillingId"]),
    },
    data() {
        return {
            quantity: 1,
            shippingServices: [],
            shippingCourier: "",
            shippingServiceId: 0,
            selectedCourier: {
                agent: "",
                service: "",
                price: 0,
                etd: "",
            },
            same_as_shipping: 1,
            isLoadingCheckout: false,
            isLoadingShipping: true,
        };
    },
    watch: {
        selectedAddressId: {
            handler: function (value) {
                if (this.shippingCourier) {
                    this.getShippingServices();
                }
            },
        },
    },
    mounted() {
        const cartLocal = localStorage.getItem("cart");

        if (cartLocal != null && this.isJsonString(cartLocal)) {
            const cartList = JSON.parse(cartLocal);
            this.$store.commit("setCart", { data: [...cartList.data] });

            if (cartList.data.length < 1) {
                this.$bvModal.show("modalCartEmpty");
            }

            this.$store.dispatch("showProfile");
            this.$axios
                .post("/api/v1/publics/cart/create", cartList)
                .then((res) => {
                    this.$store.commit("setCart", { list: [...res.data.data.cart], out_of_stock: [...res.data.data.out_of_stock], calculation: { ...res.data.data.calculation } });
                    if (res.data.data.cart.length < 1) {
                        this.$bvModal.show("modalCartEmpty");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.$bvModal.show("modalCartEmpty");
        }
    },
    methods: {
        createCheckout() {
            const availableProduct = this.cart.list.map((item) => ({ variant_id: item.variant_id, qty: item.qty, note: item.note }));
            const restProduct = this.cart.data.filter((item) => !availableProduct.find(({ variant_id }) => item.variant_id === variant_id));
            const restCart = { data: [...restProduct] };

            if (!this.selectedAddressId) {
                return this.$bvToast.toast("Alamat pengiriman harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.selectedBillingId && !this.same_as_shipping) {
                return this.$bvToast.toast("Alamat billing harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.shippingCourier) {
                return this.$bvToast.toast("Kurir pengiriman harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (availableProduct.length <= 0) {
                return this.$bvToast.toast("Tidak ada produk di dalam keranjang", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            const payload = {
                data: {
                    shipping: {
                        address_id: this.selectedAddressId,
                    },
                    billing: {
                        address_id: this.same_as_shipping ? null : this.selectedBillingId,
                        same_as_shipping: this.same_as_shipping ? 1 : 0,
                    },
                    courier: this.selectedCourier,
                    product: availableProduct,
                },
            };

            this.isLoadingCheckout = true;

            this.$axios
                .post("/api/v1/private/checkout/create", payload)
                .then((res) => {
                    localStorage.setItem("cart", JSON.stringify(restCart));
                    this.$store.commit("setCart", { data: [...restProduct] });

                    this.$axios
                        .post("/api/v1/publics/cart/create", restCart)
                        .then((res2) => {
                            this.$store.commit("setCart", { list: [...res2.data.data.cart.map((item) => ({ ...item }))], out_of_stock: [...res2.data.data.out_of_stock.map((item) => ({ ...item }))], calculation: { ...res2.data.data.calculation } });
                        })
                        .catch((err2) => {
                            console.log(err2);
                        });
                    this.$router.push(`/cart/checkout/payment-detail/${res.data.data.id}`);
                    this.isLoadingCheckout = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoadingCheckout = false;
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
        getShippingServices() {
            this.isLoadingShipping = true;
            this.shippingServiceId = 0;
            this.shippingServices = [];

            if (this.shippingCourier != "") {
                this.$axios
                    .get("/api/v1/publics/shipping/cost", {
                        params: {
                            origin: 17,
                            destination: this.selectedAddress?.city?.id,
                            weight: this.cart?.calculation?.total_weight,
                            courier: this.shippingCourier,
                        },
                    })
                    .then((res) => {
                        this.shippingServices = res.data.data[0].costs;

                        this.selectedCourier = {
                            agent: this.shippingCourier,
                            service: res.data.data[0].costs[0].service,
                            price: res.data.data[0].costs[0].cost[0].value,
                            etd: res.data.data[0].costs[0].cost[0].etd,
                        };

                        this.isLoadingShipping = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isLoadingShipping = false;
                        this.shippingCourier = "";
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
        },
        selectShippingService(item, index) {
            this.shippingServiceId = index;
            this.selectedCourier = {
                agent: this.shippingCourier,
                service: item.service,
                price: item.cost[0].value,
                etd: item.cost[0].etd,
            };
        },
        onChangeBillingAddress() {
            if (!this.same_as_shipping) {
                this.$bvModal.show("modalListBilling");
            }
        },
        handleRedirect() {
            this.$bvModal.hide("modalVerification");
            this.$router.push("/product");
        },
        handleConfirm() {
            const availableProduct = this.cart.list.map((item) => ({ variant_id: item.variant_id, qty: item.qty, note: item.note }));

            if (!this.selectedAddressId) {
                return this.$bvToast.toast("Alamat pengiriman harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.selectedBillingId && !this.same_as_shipping) {
                return this.$bvToast.toast("Alamat billing harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.shippingCourier) {
                return this.$bvToast.toast("Kurir pengiriman harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (availableProduct.length <= 0) {
                return this.$bvToast.toast("Tidak ada produk di dalam keranjang", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            this.$bvModal.show("modalConfirm");
        },
        plusQty() {
            this.quantity += 1;
        },
        minQty() {
            if (this.quantity > 1) {
                this.quantity -= 1;
            }
        },
        isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        convertToRupiah(money) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(money);
        },
    },
    middleware: "auth",
};
</script>
