<template>
    <div>
        <div class="section-fluid" style="background-color: #e4e4e4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-11 col-lg-10 col-xl-9 bg-white rounded-lg shadow p-3 p-md-4 p-lg-5 mb-4" v-if="orderDetail && orderDetail.payment_status && (orderDetail.payment_status == 'SUCCESS' || orderDetail.payment_status == 'UNPAID' || orderDetail.payment_status == 'PENDING' || orderDetail.payment_status == 'CANCEL')">
                        <div class="row" v-if="orderDetail.payment_status == 'UNPAID'">
                            <div class="col-lg-6 pb-4 pb-lg-0" v-if="orderProduct && orderProduct.data_calculation">
                                <h3 class="mb-1">Amount to Pay</h3>
                                <h3 class="fw-300 mb-0">
                                    {{ convertToRupiah(orderProduct?.data_calculation?.grand_total) }}
                                </h3>
                                <div class="border rounded px-3 py-2 fw-700 d-inline-block h4 mt-3" :class="{ 'border-success text-success': orderDetail.payment_status == 'SUCCESS', 'border-warning text-warning': orderDetail.payment_status == 'UNPAID', 'border-dark text-dark': orderDetail.payment_status == 'PENDING', 'border-danger text-danger': orderDetail.payment_status == 'CANCEL' }">{{ orderDetail.payment_status }}</div>
                            </div>
                            <div class="col-lg-6">
                                <h3 class="mb-2">Payment</h3>
                                <h5 class="fw-300 mb-3">Please click <b>Pay now</b> to process your order</h5>
                                <div class="d-flex flex-column flex-sm-row align-items-md-center">
                                    <button class="btn btn-md btn-primary mr-sm-2 mb-2 mb-sm-0" @click="handlePayment()">Pay Now</button>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">View My Order</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if=" orderDetail.payment_status == 'PENDING'">
                            <div class="col-lg-6 pb-4 pb-lg-0" v-if="orderProduct && orderProduct.data_calculation">
                                <h3 class="mb-1">Amount to Pay</h3>
                                <h3 class="fw-300 mb-0">
                                    {{ convertToRupiah(orderProduct?.data_calculation?.grand_total) }}
                                </h3>
                                <div class="border rounded px-3 py-2 fw-700 d-inline-block h4 mt-3" :class="{ 'border-success text-success': orderDetail.payment_status == 'SUCCESS', 'border-warning text-warning': orderDetail.payment_status == 'UNPAID', 'border-dark text-dark': orderDetail.payment_status == 'PENDING', 'border-danger text-danger': orderDetail.payment_status == 'CANCEL' }">{{ orderDetail.payment_status }}</div>
                            </div>
                            <div class="col-lg-6">
                                <h3 class="mb-2">Your Payment is Pending</h3>
                                <h5 class="fw-300 mb-3" style="width:330px">Please click instruction button below or check your inbox or spam in your email to know how to pay </h5>
                                <div class="d-flex flex-column flex-sm-row align-items-md-center">
                                    <button class="btn btn-md btn-primary mr-sm-2 mb-2 mb-sm-0" @click="handlePayment()">View Instruction</button>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">View My Order</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center" v-if="orderDetail.payment_status == 'SUCCESS'">
                            <div class="col-lg-10 text-center">
                                <h3 class="text-success mb-3">Your payment is completed</h3>
                                <h5 class="text-primary mb-3">{{ orderDetail.order_number ?? "-" }}</h5>
                                <h6 class="fw-300 mb-3">Thank you for choosing us! We’re dedicated to giving you the best products possible. If you have any questions, feel free to get in touch. <br/><br/>please check your email or inbox to get latest payment status</h6>
                                <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                    <nuxt-link to="/product" class="btn btn-md btn-primary mr-md-2 mb-2 mb-md-0">Back To Shop</nuxt-link>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">View My Order</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center" v-if="orderDetail.payment_status == 'CANCEL'">
                            <div class="col-lg-10 text-center">
                                <h3 class="mb-3">Your order is canceled</h3>
                                <h5 class="text-primary mb-3">{{ orderDetail.order_number ?? "-" }}</h5>
                                <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                    <nuxt-link to="/product" class="btn btn-md btn-primary mr-md-2 mb-2 mb-md-0">Back To Shop</nuxt-link>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">View My Order</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-11 col-lg-10 col-xl-9 bg-white rounded-lg shadow p-3 p-md-4 p-lg-5">
                        <div class="d-flex flex-column flex-md-row align-items-start justify-content-between">
                            <div class="order-info mr-2 mb-4 mb-md-0">
                                <img class="mb-3" src="/images/logo.png" width="160px" />
                                <div class="d-flex align-items-start mb-1">
                                    <p class="mb-0" style="width: 85px">Invoice</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 105px)">
                                        {{ orderDetail.order_number ?? "-" }}
                                    </p>
                                </div>
                                <div class="d-flex align-items-start mb-1">
                                    <p class="mb-0" style="width: 85px">Status</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 105px)">
                                        <span class="fw-700 badge border" :class="{ 'border-success text-success': orderDetail.payment_status == 'SUCCESS', 'border-warning text-warning': orderDetail.payment_status == 'UNPAID', 'border-dark text-dark': orderDetail.payment_status == 'PENDING', 'border-danger text-danger': orderDetail.payment_status == 'CANCEL' }" v-if="orderDetail.payment_status">{{ orderDetail.payment_status }}</span>
                                        <span v-else>-</span>
                                    </p>
                                </div>
                                <div class="d-flex align-items-start mb-1">
                                    <p class="mb-0" style="width: 85px">Order Date</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 105px)">
                                        {{ orderDetail.created_at ? dateFormat(orderDetail.created_at) : "-" }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row justify-content-between mb-4">
                            <div class="col-md-5 pb-4 pb-md-0">
                                <p class="lead fw-700 mb-3">Bill From</p>
                                <p class="fw-700 mb-1">PT Javabica Aneka Resources</p>
                                <p class="mb-1">Rukan Permata Senayan Jalan Tentara Pelajar No D22-26, North Grogol Jakarta 12210</p>
                                <p class="mb-1">+6221 57940828</p>
                                <p class="mb-1">info@javabica.com</p>
                            </div>
                            <div class="col-md-5" v-if="orderDetail.billing_address">
                                <p class="lead fw-700 mb-3">Bill To</p>
                                <p class="fw-700 mb-1 text-capitalize">
                                    {{ orderDetail.billing_first_name + " " + orderDetail.billing_last_name }}
                                </p>
                                <p class="mb-1">{{ `${orderDetail.billing_address}, ${orderDetail.billing_city}, ${orderDetail.billing_province}, ${orderDetail.billing_postal_code}, ${orderDetail.billing_country}` }}</p>
                                <p class="mb-1">{{ orderDetail.contact_billing_phone }}</p>
                               
                            </div>
                        </div>
                        <hr />
                        <h4 class="mb-4">Order Detail</h4>
                        <div class="mb-4">
                            <div class="table-responsive">
                                <table class="table text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th></th>
                                            <th>Qty</th>
                                            <th></th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="orderProduct && orderProduct.data_product <= 0">
                                            <tr>
                                                <td colspan="4"></td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr v-for="(item, index) in orderProduct.data_product" :key="index">
                                                <td>
                                                    <div class="img-ratio1x1 w-78 border rounded-lg">
                                                        <img :src="assetUrl + item.image" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <p class="fw-700 mb-0">{{ item.product_name }}</p>
                                                    <p class="fs-14 text-secondary-light mb-2" v-if="item.variant_description">{{ item.variant_description }}</p>
                                                    <p class="fs-14 text-secondary-light mb-0" v-if="item.note">
                                                        <span class="text-dark">Notes:</span>
                                                        <br />
                                                        {{ item.note }}
                                                    </p>
                                                </td>
                                                <td></td>
                                                <td>{{ item.qty }}</td>
                                                <td></td>
                                                <td class="text-right">{{ convertToRupiah(item.purchase_price) }}</td>
                                            </tr>
                                        </template>
                                        <template v-if="orderProduct && orderProduct.data_calculation">
                                            <tr>
                                                <td colspan="2" class="border-0"></td>
                                                <th>Total Item</th>
                                                <td>
                                                    {{ orderProduct.data_calculation.total_item }}
                                                </td>
                                                <th>Sub Total</th>
                                                <td class="text-right">
                                                    {{ convertToRupiah(orderProduct.data_calculation.sub_total) }}
                                                </td>
                                            </tr>
                                            <tr class="pt-0">
                                                <td colspan="4" class="border-0 pt-0"></td>
                                                <th class="border-0 pt-0">Shipping Total</th>
                                                <td class="text-right border-0 pt-0">
                                                    {{ convertToRupiah(orderProduct.data_calculation.shipping_total) }}
                                                </td>
                                            </tr>
                                            <!-- <tr class="pt-0" v-if="orderProduct.data_calculation.discount != 0">
                                                <td colspan="4" class="border-0 pt-0"></td>
                                                <th class="border-0 pt-0">Discount</th>
                                                <td class="text-right border-0 pt-0">
                                                    -{{ convertToRupiah(orderProduct.data_calculation.discount) }}
                                                </td>
                                            </tr> -->
                                            <tr>
                                                <td colspan="4" class="border-0 pt-0"></td>
                                                <th class="border-0 pt-0">Grand Total</th>
                                                <td class="text-right border-0 pt-0">
                                                    {{ convertToRupiah(orderProduct.data_calculation.grand_total) }}
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                            <hr>
                        <div class="row mb-4">

                            <div class="col-lg-6">
                                <p class="mb-0 fw-700 text-uppercase mb-3">Shipping address</p>
                                   
                                  <p class="fw-700 mb-1 text-capitalize">
                                    {{ orderDetail.shipping_first_name + " " + orderDetail.shipping_last_name }}
                                </p>
                                <p class="mb-1">{{ `${orderDetail.shipping_address}, ${orderDetail.shipping_city}, ${orderDetail.shipping_province}, ${orderDetail.shipping_postal_code}, ${orderDetail.shipping_country}` }}</p>
                                <p class="mb-1">{{ orderDetail.contact_phone }}</p>
                               
                        </div>
                        <div class="col-lg-6">
                            
                        </div>
                       
                        </div>
                         <hr>
                        <div class="d-flex flex-column flex-md-row justify-content-between">
                            <div>
                                <h6 class="leadfw-700 text-uppercase mb-3">Courier Detail</h6>
                                <div class="d-flex align-items-start mb-1">
                                    <p class="mb-0" style="width: 210px">Kurir</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 75px)">
                                        {{ `${orderDetail.courier_agent ?? ""} - ${orderDetail.courier_agent_service ?? ""}` }}
                                    </p>
                                </div>
                                <div class="d-flex align-items-start mb-1">
                                    <p class="mb-0" style="width: 210px">No. Resi</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 75px)">
                                        {{ orderDetail.courier_resi_number == ""  ? "-" : orderDetail.courier_resi_number   }}
                                    </p>
                                </div>
                                <div class="d-flex align-items-start mb-1">
                                    <p class="mb-0" style="width:210px">delivery estimation</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 75px)">{{ orderDetail.courier_estimate_delivered ? orderDetail.courier_estimate_delivered + " day" : "-" }}</p>
                                </div>
                               
                            </div>
                            <div class="d-flex flex-column mt-3">
                                <a :href="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary mb-2" target="_blank">Detail Invoice</a>
                                <button class="btn btn-md btn-outline-primary" @click="downloadPDF">Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    layout: "checkout",
    head: {
        script: [
            {
                src: "https://app.midtrans.com/snap/snap.js",
                "data-client-key": "Mid-client-sCjSAYzKeD2JfNfF",
            },
        ],
    },
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            orderDetail: {},
            orderProduct: {},
            invoiceSrc: "",
        };
    },
    mounted() {
        this.getOrderDetail();
    },
    beforeDestroy() {
        snap.hide();
    },
    methods: {
        getOrderDetail() {
            const email = this.$cookies.get("email");

            this.$axios
                .get("/api/v1/private/order/show", {
                    params: {
                        by_email: email,
                        by_id: this.$route.params.id,
                    },
                })
                .then((res) => {
                    this.orderDetail = res.data.data;

                    this.$axios
                        .get("/api/v1/private/order/product/show", {
                            params: {
                                by_order_id: this.$route.params.id,
                            },
                        })
                        .then((res) => {
                            this.orderProduct = res.data.data;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$nuxt.error({ statusCode: 404, message: "Order not found" });
                        });
                })
                .catch((err) => {
                    console.log(err);
                });

            this.$axios
                .get("/api/v1/private/order/invoice/show", {
                    params: { by_id: this.$route.params.id },
                    responseType: "blob",
                })
                .then((res) => {
                    const file = new Blob([res.data], { type: "application/pdf" });
                    const fileUrl = window.URL.createObjectURL(file);
                    this.invoiceSrc = fileUrl;
                })
                .catch((err) => {
                    console.log(err);
                    this.$nuxt.error({ statusCode: 404, message: "Order not found" });
                });
        },
        handlePayment() {
            snap.pay(this.orderDetail.payment_snap_token, {
                onSuccess: function (result) {
                    window.location.reload();
                },
                onPending: function (result) {
                    window.location.reload();
                },
            });
        },
        downloadPDF() {
            window.open(this.invoiceSrc);
        },
        dateFormat(date) {
            var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            var t = new Date(date);
            return t.getDate() + " " + monthNames[t.getMonth()] + " " + t.getFullYear() + " " + t.getHours() + ":" + t.getMinutes();
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

<style lang="scss" scoped>
.order-info {
    max-width: 100% !important;
    width: 100% !important;

    @media #{$tablet-device, $large-mobile, $small-mobile, $extra-small-mobile} {
        width: 100%;
        max-width: 100%;
    }
}
</style>
