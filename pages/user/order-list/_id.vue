<template>
    <div>
        <ul class="breadcrumb mb-0">
            <li>
                <n-link to="/user/order-list">Order List</n-link>
            </li>
            <li class="current">Order Detail</li>
        </ul>
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <h3 class="mb-md-0">Order Detail</h3>
            <div>
                <button class="btn btn-md btn-outline-primary" @click="downloadPDF" v-if="invoiceSrc">Download Invoice</button>
                <nuxt-link :to="'/cart/checkout/payment-detail/' + orderDetail.id" class="btn btn-md btn-primary ml-2">Payment</nuxt-link>
            </div>
        </div>
        <hr class="mb-4" />
        <div class="">
           
            <div >
                <h6 class="lead fw-700 mb-3">Order Info</h6>
                <div class="d-flex align-items-start mb-2">
                    <p class="mb-0" style="width: 115px">Invoice Number</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        {{ orderDetail.order_number ?? "-" }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Order Date</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        {{ orderDetail.created_at ? dateFormat(orderDetail.created_at) : "-" }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Payment Status</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        <span class="badge fs-14" :class="{ 'badge-success': orderDetail.payment_status == 'SUCCESS', 'badge-warning': orderDetail.payment_status == 'UNPAID' }" v-if="orderDetail.payment_status">{{ orderDetail.payment_status }}</span>
                        <span v-else>-</span>
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Order Status</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        <span class="badge badge-success fs-14" v-if="orderDetail.status">{{ orderDetail.status }}</span>
                        <span v-else>-</span>
                    </p>
                </div>
            </div>
        </div>
        <hr class="my-4" />
        <div>
            <h6 class="lead fw-700 mb-3">Order Detail</h6>
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
                                        <span class="text-dark">No Pelanggan:</span>
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
                            <tr class="pt-0" v-if="orderProduct.data_calculation.discount != 0">
                                <td colspan="4" class="border-0 pt-0"></td>
                                <th class="border-0 pt-0">Discount</th>
                                <td class="text-right border-0 pt-0">
                                    -{{ convertToRupiah(orderProduct.data_calculation.discount) }}
                                </td>
                            </tr>
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
        <hr class="my-4" />
        <div class="row" v-if="orderDetail">
             
            <div class="col-lg-6">
                 <p class="lead fw-700 mb-3">Bill To</p>
                     <p class="fw-700 mb-1 text-capitalize">
                                    {{ orderDetail.billing_first_name + " " + orderDetail.billing_last_name }}
                     </p>
                    <p class="mb-1">{{ `${orderDetail.billing_address}, ${orderDetail.billing_city}, ${orderDetail.billing_province}, ${orderDetail.billing_postal_code}, ${orderDetail.billing_country}` }}</p>
                    <p class="mb-1">{{ orderDetail.contact_billing_phone }}</p>
                               
                </div>

                  <div class="col-lg-6">
                 <p class="lead fw-700 mb-3">Shipping To</p>
                     <p class="fw-700 mb-1 text-capitalize">
                                    {{ orderDetail.shipping_first_name + " " + orderDetail.shipping_last_name }}
                     </p>
                    <p class="mb-1">{{ `${orderDetail.shipping_address}, ${orderDetail.shipping_city}, ${orderDetail.shipping_province}, ${orderDetail.shipping_postal_code}, ${orderDetail.shipping_country}` }}</p>
                    <p class="mb-1">{{ orderDetail.contact_phone }}</p>
                               
                </div>
           
        </div>
        <div class="row"  v-if="orderDetail">
            <div class="col-lg-12">
                <hr>
                 <h6 class="lead fw-700 mb-3">Shipping Information</h6>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 160px">Courier</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 75px)">
                        {{ `${orderDetail.courier_agent ?? ""} - ${orderDetail.courier_agent_service ?? ""}` }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 160px">No. Resi</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 75px)">
                        {{ orderDetail.courier_resi_number ?? "-" }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 160px">Delivery Estimation</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 75px)">{{ orderDetail.courier_estimate_delivered ? orderDetail.courier_estimate_delivered + "hari" : "-" }}</p>
                </div>
            </div>
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
            orderDetail: {},
            orderProduct: {},
            invoiceSrc: "",
        };
    },
    mounted() {
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
            });
    },
    methods: {
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
};
</script>

<style lang="scss">
.shipping-info,
.order-info {
    max-width: 360px;

    @media #{$large-mobile, $small-mobile, $extra-small-mobile} {
        max-width: 100%;
    }
}
</style>
