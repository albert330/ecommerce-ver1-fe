<template>
    <div>
        <div class="section-fluid" style="background-color: #e4e4e4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-11 col-lg-10 col-xl-9 bg-white rounded-lg shadow p-3 p-md-4 p-lg-5 mb-4" v-if="orderDetail && orderDetail.payment_method == 'Midtrans' && orderDetail.payment_status && (orderDetail.payment_status == 'SUCCESS' || orderDetail.payment_status == 'UNPAID' || orderDetail.payment_status == 'PENDING' || orderDetail.payment_status == 'CANCEL')">
                        <div class="row" v-if="orderDetail.payment_status == 'UNPAID'">
                            <div class="col-lg-6 pb-4 pb-lg-0" v-if="orderProduct && orderProduct.data_calculation">
                                <h3 class="mb-1">Total </h3>
                                <h3 class="fw-300 mb-0">
                                    {{ convertToRupiah(orderProduct?.data_calculation?.grand_total) }}
                                </h3>
                                <div class="border rounded px-3 py-2 fw-700 d-inline-block h4 mt-3" :class="{ 'border-success text-success': orderDetail.payment_status == 'SUCCESS', 'border-warning text-warning': orderDetail.payment_status == 'UNPAID', 'border-dark text-dark': orderDetail.payment_status == 'PENDING', 'border-danger text-danger': orderDetail.payment_status == 'CANCEL' }">{{ orderDetail.payment_status }}</div>
                            </div>
                            <div class="col-lg-6">
                                <h3 class="mb-2">Pembayaran</h3>
                                <h5 class="fw-300 mb-3">Klik<b>Bayar Sekarang</b> untuk proses pesanan anda</h5>
                                <div class="d-flex flex-column flex-sm-row align-items-md-center">
                                    <button class="btn btn-md btn-primary mr-sm-2 mb-2 mb-sm-0" @click="handlePayment()">Bayar Sekarang</button>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">Lihat Pesanan Saya</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if=" orderDetail.payment_status == 'PENDING'">
                            <div class="col-lg-6 pb-4 pb-lg-0" v-if="orderProduct && orderProduct.data_calculation">
                                <h3 class="mb-1">Total yang Harus Dibayar</h3>
                                <h3 class="fw-300 mb-0">
                                    {{ convertToRupiah(orderProduct?.data_calculation?.grand_total) }}
                                </h3>
                                <div class="border rounded px-3 py-2 fw-700 d-inline-block h4 mt-3" :class="{ 'border-success text-success': orderDetail.payment_status == 'SUCCESS', 'border-warning text-warning': orderDetail.payment_status == 'UNPAID', 'border-dark text-dark': orderDetail.payment_status == 'PENDING', 'border-danger text-danger': orderDetail.payment_status == 'CANCEL' }">{{ orderDetail.payment_status }}</div>
                            </div>
                            <div class="col-lg-6">
                                <h3 class="mb-2">Pembayaran Anda Pending</h3>
                                <h5 class="fw-300 mb-3" style="width:330px">Silakan klik tombol instruksi di bawah atau periksa kotak masuk atau spam di email Anda untuk mengetahui cara pembayaran</h5>
                                <div class="d-flex flex-column flex-sm-row align-items-md-center">
                                    <button class="btn btn-md btn-primary mr-sm-2 mb-2 mb-sm-0" @click="handlePayment()">Lihat Instruksi</button>
                                    <!-- <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">View My Order</nuxt-link> -->
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center" v-if="orderDetail.payment_status == 'SUCCESS'">
                            <div class="col-lg-10 text-center">
                                <h3 class="text-success mb-3">Pembayaran Anda Berhasil</h3>
                                <h5 class="text-primary mb-3">{{ orderDetail.order_number ?? "-" }}</h5>
                                <h6 class="fw-300 mb-3">Terima kasih telah memilih kami! Kami berkomitmen memberikan produk terbaik untuk Anda. Jika ada pertanyaan, jangan ragu untuk menghubungi kami. <br/><br/>Silakan periksa email atau kotak masuk Anda untuk mendapatkan status pembayaran terbaru</h6>
                                <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                    <nuxt-link to="/product" class="btn btn-md btn-primary mr-md-2 mb-2 mb-md-0">Kembali ke Toko</nuxt-link>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">Lihat Pesanan Saya</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center" v-if="orderDetail.payment_status == 'CANCEL'">
                            <div class="col-lg-10 text-center">
                                <h3 class="mb-3">Pesanan Anda Dibatalkan</h3>
                                <h5 class="text-primary mb-3">{{ orderDetail.order_number ?? "-" }}</h5>
                                <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                    <nuxt-link to="/product" class="btn btn-md btn-primary mr-md-2 mb-2 mb-md-0">Kembali ke Toko</nuxt-link>
                                    <nuxt-link :to="'/user/order-list/' + $route.params.id" class="btn btn-md btn-outline-primary">Lihat Pesanan Saya</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-11 col-lg-10 col-xl-9 bg-white rounded-lg shadow p-3 p-md-4 p-lg-5">
                        <div class="d-flex flex-column flex-md-row align-items-start justify-content-between">
                            <div class="order-info mr-2 mb-4 mb-md-0">
                                <img class="mb-5 d-block mx-auto" :src="logoHeader" width="160px" />
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
                                    <p class="mb-0" style="width: 170px">Tanggal Pemesanan</p>
                                    <span class="mr-2">:</span>
                                    <p class="mb-0" style="width: calc(100% - 105px)">
                                        {{ orderDetail.created_at ? dateFormat(orderDetail.created_at) : "-" }}
                                    </p>
                                </div>
                            </div>
                        </div>
                      
                        <!-- <div class="row justify-content-between mb-4">
                            <div class="col-md-5 pb-4 pb-md-0">
                                <p class="lead fw-700 mb-3">Bill From</p>
                                <p class="fw-700 mb-1">PT xxxx</p>
                                <p class="mb-1">xxxx</p>
                                <p class="mb-1">xxxx</p>
                                <p class="mb-1">xxxx</p>
                            </div>
                            <div class="col-md-5" v-if="orderDetail.billing_address">
                                <p class="lead fw-700 mb-3">Bill To</p>
                                <p class="fw-700 mb-1 text-capitalize">
                                    {{ orderDetail.billing_first_name + " " + orderDetail.billing_last_name }}
                                </p>
                                <p class="mb-1">{{ `${orderDetail.billing_address}, ${orderDetail.billing_city}, ${orderDetail.billing_province}, ${orderDetail.billing_postal_code}, ${orderDetail.billing_country}` }}</p>
                                <p class="mb-1">{{ orderDetail.contact_billing_phone }}</p>
                               
                            </div>
                        </div> -->
                        <hr />
                        <h4 class="mb-3">Informasi Pelanggan</h4>
                        <div class="row mb-4">
                            <div class="col-lg-6 mb-3 mb-lg-0">
                                <div class="border rounded-lg p-3" style="background-color: #f8f9fa;">
                                    <p class="fs-14 mb-1"><span class="fw-600">Nama:</span> {{ orderDetail.shipping_first_name || '-' }}</p>
                                    <p class="fs-14 mb-1"><span class="fw-600">Email:</span> {{ orderDetail.contact_email || '-' }}</p>
                                    <p class="fs-14 mb-0"><span class="fw-600">No. Telepon:</span> {{ orderDetail.contact_phone || '-' }}</p>
                                </div>
                            </div>
                           
                        </div>

                        <hr />
                        <h4 class="mb-3">Ditel Pemesanan</h4>
                        <div class="mb-4">
                            <div class="table-responsive">
                                <table class="table text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Gambar</th>
                                            <th>Deskripsi</th>
                                            <th></th>
                                            <th>Kuantitas</th>
                                            <th></th>
                                            <th>Harga</th>
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
                                                <th>Total Barang</th>
                                                <td>
                                                    {{ orderProduct.data_calculation.total_item }}
                                                </td>
                                                <th>Sub Total</th>
                                                <td class="text-right">
                                                    {{ convertToRupiah(orderProduct.data_calculation.sub_total) }}
                                                </td>
                                            </tr>
                                            <!-- <tr class="pt-0">
                                                <td colspan="4" class="border-0 pt-0"></td>
                                                <th class="border-0 pt-0">Shipping Total</th>
                                                <td class="text-right border-0 pt-0">
                                                    {{ convertToRupiah(orderProduct.data_calculation.shipping_total) }}
                                                </td>
                                            </tr> -->
                                            <tr class="pt-0" v-if="orderProduct.data_calculation.discount != 0">
                                                <td colspan="4" class="border-0 pt-0"></td>
                                                <th class="border-0 pt-0">Diskon</th>
                                                <td class="text-right border-0 pt-0">
                                                    -{{ convertToRupiah(orderProduct.data_calculation.discount) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="border-0 pt-0"></td>
                                                <th class="border-0 pt-0">Total</th>
                                                <td class="text-right border-0 pt-0">
                                                    {{ convertToRupiah(orderProduct.data_calculation.grand_total) }}
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr />
                        <h4 class="mb-3">Detail Pembayaran</h4>
                        <div class="row mb-4">
                            <div class="col-lg-6">
                                <p class="mb-0 fw-700 text-uppercase mb-3">Metode Pembayaran</p>
                                <div class="border rounded-lg p-3" style="background-color: #f8f9fa;">
                                    <p class="fs-14 fw-700 mb-2">Transfer Bank</p>
                                    <p class="fs-14 mb-1"><span class="fw-600">Bank:</span> {{ paymentMethods[0]?.label || 'Bank Transfer' }}</p>
                                    <p class="fs-14 mb-1"><span class="fw-600">No. Rekening:</span> {{ paymentMethods[0]?.account || '-' }}</p>
                                    <p class="fs-14 mb-0"><span class="fw-600">Atas Nama:</span> {{ paymentMethods[0]?.accountName || '-' }}</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <p class="mb-0 fw-700 text-uppercase mb-3">Instruksi Pembayaran</p>
                                <div class="border rounded-lg p-3" style="background-color: #fff3cd;">
                                    <ol class="fs-14 mb-0 pl-3">
                                        <li class="mb-2">Transfer sesuai jumlah total pembayaran ke rekening yang tertera</li>
                                        <li class="mb-2">Simpan bukti transfer Anda</li>
                                        <li class="mb-2">Pembayaran akan diverifikasi dalam 1x24 jam</li>
                                        <li>Pesanan akan diproses setelah pembayaran terkonfirmasi</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                           <!-- <div class="row mb-4">

                            <div class="col-lg-6">
                                <p class="mb-0 fw-700 text-uppercase mb-3">Shipping address</p>
                                   
                                  <p class="fw-700 mb-1 text-capitalize">
                                    {{ orderDetail.shipping_first_name + " " + orderDetail.shipping_last_name }}
                                </p>
                                <p class="mb-1">{{ `${orderDetail.shipping_address}, ${orderDetail.shipping_city}, ${orderDetail.shipping_province}, ${orderDetail.shipping_postal_code}, ${orderDetail.shipping_country}` }}</p>
                                <p class="mb-1">{{ orderDetail.contact_phone }}</p>
                               
                        </div> -->
                        <!-- <div class="row mb-4">

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
                       
                        </div> -->
                         
                        <!-- <div class="d-flex flex-column flex-md-row justify-content-between">
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
                        </div> -->
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
                // src: "https://app.sandbox.midtrans.com/snap/snap.js", // untuk test local
                "data-client-key": "Mid-client-sCjSAYzKeD2JfNfF",
            },
        ],
    },
    computed: {
        ...mapState(["assetUrl","logoHeader", "rekeningBank",
        "rekeningNo",
        "rekeningAccount"]),
        
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
                .get("/api/v1/publics/order/show", {
                    params: {
                        by_email: email,
                        by_id: this.$route.params.id,
                    },
                })
                .then((res) => {
                    this.orderDetail = res.data.data;

                    this.$axios
                        .get("/api/v1/publics/order/product/show", {
                            params: {
                                by_order_id: this.$route.params.id,
                            },
                        })
                        .then((res) => {
                            console.log(res)
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
                .get("/api/v1/publics/order/invoice/show", {
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
   // middleware: "auth",
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
