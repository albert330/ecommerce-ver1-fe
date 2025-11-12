<template>
    <div>
        <div class="section-fluid bg-grey min-vh-100">
            <div class="container">
                <h2 class="roboto-condensed-font text-center mb-5">Checkout</h2>
                <div class="row justify-content-center mb-4">
                    <div class="col-lg-8">
                        <div class="row">
                            
                            
                            <div class="col-12 cart-section">

                                <div class="mb-4">
                                    <div class="bg-primary rounded-top p-3">
                                        <h6 class="lead fw-700 text-white mb-0">Data Diri Pelanggan</h6>
                                    </div>
                                    <div class="bg-white rounded-bottom p-3">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label fw-600">Nama Pelanggan <span class="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Masukkan nama lengkap"
                                                    v-model="customerData.name"
                                                />
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label fw-600">Email <span class="text-danger">*</span></label>
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    placeholder="contoh@email.com"
                                                    v-model="customerData.email"
                                                />
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label fw-600">No. Telepon <span class="text-danger">*</span></label>
                                                <input
                                                    type="tel"
                                                    class="form-control"
                                                    placeholder="08xxxxxxxxxx"
                                                    v-model="customerData.phone"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                            <div class="bg-primary rounded-top p-3">
                                <h6 class="lead fw-700 text-white mb-0">Keranjang Belanja</h6>
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
                                            <p class="fs-14 mb-1">No Pelanggan : {{ item.note }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-primary rounded-top p-3">
                                <h6 class="lead fw-700 text-white mb-0">Metode Pembayaran</h6>
                            </div>
                            <div class="bg-white rounded-bottom p-3">
                                <div class="form-group mb-3">
                                    <label class="fw-600 mb-2">Pilih Bank Transfer</label>
                                    <select class="form-control" v-model="selectedPaymentMethod">
                                        <option value="">-- Pilih Metode Pembayaran --</option>
                                        <option v-for="(method, index) in paymentMethods" :key="'payment-' + index" :value="method.value">
                                            {{ method.label }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="selectedPaymentMethod" class="border rounded-lg bg-grey p-3">
                                    <p class="fs-14 fw-700 mb-2">Detail Rekening Transfer:</p>
                                    <p class="fs-14 mb-1"><span class="fw-600">Bank:</span> {{ paymentMethods.find(m => m.value === selectedPaymentMethod)?.label }}</p>
                                    <p class="fs-14 mb-1"><span class="fw-600">No. Rekening:</span> {{ paymentMethods.find(m => m.value === selectedPaymentMethod)?.account }}</p>
                                    <p class="fs-14 mb-0"><span class="fw-600">Atas Nama:</span> {{ paymentMethods.find(m => m.value === selectedPaymentMethod)?.accountName }}</p>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                      
                        <div class="bg-white mb-4 p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                            <h5 class="fw-700 text-uppercase mb-4">Ringkasan Belanja</h5>
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <span>Sub Total :</span>
                                <p class="mb-0">{{ convertToRupiah(cart?.calculation.sub_total) }}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-1" v-if="shippingServices[shippingServiceId]?.cost[0]?.value > 0">
                                <span>Shipping Cost :</span>
                                <p class="mb-0">{{ convertToRupiah(shippingServices[shippingServiceId]?.cost[0]?.value ?? 0) }}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-1" v-if="isVoucherServices">
                                <span>Discount :</span>
                                <div v-if="voucherServices.type == 1">
                                    <p class="mb-0">- {{ convertToRupiah(voucherServices.amount ?? 0) }}</p>
                                </div>
                                <div v-if="voucherServices.type == 2">
                                    <p class="mb-0">- {{ convertToRupiah(cart?.calculation.sub_total * (voucherServices.amount ?? 0 ) / 100 ) }}</p>
                                </div>
                            </div>
                            <hr class="my-2" />
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <span>Total :</span>
                                <h6 class="lead fw-700 mb-0" v-if="voucherServices.type == 1">
                                    {{ convertToRupiah(cart?.calculation.sub_total + (shippingServices[shippingServiceId]?.cost[0]?.value ?? 0) - (voucherServices.amount ?? 0)) }}
                                </h6>
                                <h6 class="lead fw-700 mb-0" v-else-if="voucherServices.type == 2">
                                    {{ convertToRupiah(cart?.calculation.sub_total + (shippingServices[shippingServiceId]?.cost[0]?.value ?? 0) - (cart?.calculation.sub_total * ((voucherServices.amount ?? 0 ) / 100 ))) }}
                                </h6>
                                <h6 class="lead fw-700 mb-0" v-else>
                                    {{ convertToRupiah(cart?.calculation.sub_total + (shippingServices[shippingServiceId]?.cost[0]?.value ?? 0)) }}
                                </h6>
                            </div>
                            <button class="btn btn-md btn-primary btn-block text-uppercase" @click="handleConfirm" :disabled="isLoadingCheckout">{{ isLoadingCheckout ? "processing..." : "lakukan Pembayaran" }}</button>
                            <nuxt-link to="/cart" class="btn btn-md btn-outline-primary btn-block text-uppercase" v-if="!isLoadingCheckout">Ubah Keranjang Belanja</nuxt-link>
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
                <b-modal id="modalConfirm" title="Konfirmasi" size="md" centered>
                    <template #default>
                        <p class="mb-0">Apakah anda yakin melakukan Peesanan?</p>
                    </template>
                    <template #modal-footer>
                        <div class="d-flex align-items-center">
                            <nuxt-link to="/cart" class="btn btn-md btn-outline-primary mr-3">Modifikasi keranjang belanja</nuxt-link>
                            <button class="btn btn-md btn-primary" @click="createCheckout()" :disabled="isLoadingCheckout">{{ isLoadingCheckout ? "Processing..." : "Bayar Sekarang" }}</button>
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
        ...mapState(["assetUrl",
        "cart",
        "listAddress",
        "selectedAddress",
        "selectedAddressId",
        "selectedBilling",
        "selectedBillingId",
        "rekeningBank",
        "rekeningNo",
        "rekeningAccount",
    ]),
        paymentMethods() {
            return [
                {
                    value: this.rekeningBank || 'bank',
                    label: this.rekeningBank || 'Bank Transfer',
                    account: this.rekeningNo || '-',
                    accountName: this.rekeningAccount || '-'
                }
            ];
        },
    },
    data() {
        return {
            quantity: 1,
            customerData: {
                name: '',
                email: '',
                phone: '',
            },
            shippingServices: [],
            voucherServices: {
                code:'',
                type:'',
                amount:'',
                id:'',
            },
            code : null,
            shippingCourier: "",
            shippingServiceId: 0,
            selectedCourier: {
                agent: "",
                service: "",
                price: 0,
                etd: "",
            },
            paymentMethod:"",
            same_as_shipping: 1,
            isLoadingCheckout: false,
            isLoadingShipping: true,
            isLoadingVoucher: false,
            isVoucherServices: false,
            totalPayment:0,
            selectedPaymentMethod: '',
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

          //  this.$store.dispatch("showProfile");
            this.$axios
                .post("/api/v1/publics/cart/create", cartList)
                .then((res) => {
                    this.$store.commit("setCart", { list: [...res.data.data.cart], out_of_stock: [...res.data.data.out_of_stock], calculation: { ...res.data.data.calculation } });
                    if (res.data.data.cart.length < 1) {
                        this.$bvModal.show("modalCartEmpty");
                    }
                    else{
                        this.totalPayment = res.data.data.calculation.sub_total;
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

            // Validasi data pelanggan
            if (!this.customerData.name) {
                return this.$bvToast.toast("Nama pelanggan wajib diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.customerData.email) {
                return this.$bvToast.toast("Email wajib diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            // Validasi format email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.customerData.email)) {
                return this.$bvToast.toast("Format email tidak valid", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.customerData.phone) {
                return this.$bvToast.toast("No. Telepon wajib diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            if (!this.selectedPaymentMethod) {
                return this.$bvToast.toast("Metode Pembayaran wajib diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                    appendToast: true,
                });
            }

            // if (!this.selectedAddressId) {
            //     return this.$bvToast.toast("Alamat pengiriman harus diisi", {
            //         title: `Error`,
            //         variant: "danger",
            //         solid: true,
            //         appendToast: true,
            //     });
            // }

            // if (!this.selectedBillingId && !this.same_as_shipping) {
            //     return this.$bvToast.toast("Alamat billing harus diisi", {
            //         title: `Error`,
            //         variant: "danger",
            //         solid: true,
            //         appendToast: true,
            //     });
            // }

            // if (!this.shippingCourier) {
            //     return this.$bvToast.toast("Kurir pengiriman harus diisi", {
            //         title: `Error`,
            //         variant: "danger",
            //         solid: true,
            //         appendToast: true,
            //     });
            // }

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
                    customerEmail:this.customerData.email,
                    customerPhone:this.customerData.phone,
                   customerName:this.customerData.name,
                   paymentMethod : this.selectedPaymentMethod,
                    courier: this.selectedCourier,
                    product: availableProduct,
                    voucher: this.voucherServices.id,
                },
            };

            this.isLoadingCheckout = true;

            this.$axios
                .post("/api/v1/publics/checkout/create", payload)
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
        handleRemoveVoucher() {
            this.isLoadingVoucher = true;
            this.$bvToast.toast('Voucher has been successfully deleted', {
                title: `Success`,
                variant: "success",
                solid: true,
            });
            this.isVoucherServices = false;
            this.isLoadingVoucher = false;
            this.voucherServices.amount = 0;
            this.voucherServices.code = '';
            this.voucherServices.amount = '';
            this.voucherServices.type = '';
            this.voucherServices.id = '';
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
        
        getVoucher() {
            this.isLoadingVoucher = true;
            this.$axios
                .get("/api/v1/private/voucher/use", {
                    params: {
                        keyword: this.code,
                        total: this.totalPayment,
                    },
                })
                .then((res) => {
                    this.$bvToast.toast(res.data.message, {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                    this.voucherServices = {
                        code: res.data.data.code,
                        type: res.data.data.type,
                        amount: res.data.data.amount,
                        id: res.data.data.id,
                    };
                    this.isLoadingVoucher = false;
                    this.code = null;
                    this.isVoucherServices = true;
                })
                .catch((err) => {
                    this.isLoadingVoucher = false;
                    this.$bvToast.toast(err.response.data.message, {
                        title: `Failed Use Voucher`,
                        variant: "danger",
                        solid: true,
                        appendToast: true,
                    });
                });
        },
    },
  //  middleware: "auth",
};
</script>
