<template>
    <div>
        <h3 class="roboto-condensed-font text-uppercase mb-4">Order List</h3>
        <div class="d-flex">
            <div class="ml-auto">
                <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input v-model="keyword" type="search" class="form-control form-control-sm ml-2"></b-form-input>
                </label>
            </div>
        </div>
        <div class="table-responsive mb-0">
            <b-table :items="orderList" :fields="fields" responsive="md" :per-page="0" :current-page="params.page" show-empty :busy="isLoading">
                <template v-slot:cell(created_at)="data">
                    {{ data.item.created_at ? dateFormat(data.item.created_at) : "-" }}
                </template>
                <template v-slot:cell(payment_status)="data">
                    <span class="badge d-inline-flex fs-14" :class="{ 'badge-success': data.item.payment_status == 'SUCCESS', 'badge-info': data.item.payment_status == 'PENDING', 'badge-warning': data.item.payment_status == 'UNPAID', 'badge-danger': data.item.payment_status == 'EXPIRED' }">{{ data.item.payment_status }}</span>
                </template>
                <template v-slot:cell(action)="data">
                    <nuxt-link class="btn btn-md btn-primary px-3 py-2" :to="'/user/order-list/' + data.item.id">Detail</nuxt-link>
                </template>
                <template #table-busy>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </template>
                <template #table-caption>
                    <div class="text-muted">Total {{ total }} data.</div>
                </template>
            </b-table>
        </div>
        <div class="d-flex">
            <div class="ml-auto">
                <b-pagination v-model="params.page" :total-rows="total" :per-page="params.per_page" prev-text="Prev" next-text="Next" first-number last-number @change="onChangePagination()"></b-pagination>
            </div>
        </div>
        <!-- <div class="table-responsive-md">
            <table class="table text-nowrap">
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Invoice Number</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="orderList.length <= 0">
                        <tr>
                            <td colspan="5" class="text-center">Data tidak ditemukan.</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="(item, index) in orderList" :key="index">
                            <td>{{ dateFormat(item.created_at) }}</td>
                            <td>{{ item.order_number }}</td>
                            <td>
                                <span class="badge badge-success text-uppercase fs-14">{{ item.status }}</span>
                            </td>
                            <td>
                                <span class="badge badge-warning text-uppercase fs-14">{{ item.payment_status }}</span>
                            </td>
                            <td>
                                <nuxt-link class="btn btn-md btn-info px-3 py-2" :to="'/user/order-list/' + item.id">Detail</nuxt-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
export default {
    layout: "dashboard",
    data() {
        return {
            orderList: [],
            isLoading: true,
            fields: [
                {
                    key: "created_at",
                    label: "Order Date",
                    sortable: true,
                },
                {
                    key: "order_number",
                    label: "Invoice Number",
                    sortable: true,
                },
                {
                    key: "status",
                    label: "Order Status",
                    sortable: true,
                },
                {
                    key: "payment_status",
                    label: "Payment Status",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Action",
                },
            ],
            params: {
                paginate: 1,
                per_page: 10,
                page: 1,
            },
            total: 0,
            keyword: "",
        };
    },
    watch: {
        params: {
            handler: function (value) {
                this.getOrder();
            },
            deep: true,
        },
        keyword: {
            handler: function (value) {
                if (this.params.page === 1) {
                    this.getOrder();
                } else {
                    this.params.page = 1;
                }
            },
        },
    },
    mounted() {
        this.getOrder();
    },
    methods: {
        getOrder() {
            const email = this.$cookies.get("email");
            this.isLoading = true;

            this.$axios
                .get("/api/v1/private/order/show", {
                    params: {
                        by_email: email,
                        keyword: this.keyword,
                        ...this.params,
                    },
                })
                .then((res) => {
                    this.orderList = res.data.data.data;
                    this.total = res.data.data.total;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onChangePagination(value) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        dateFormat(date) {
            var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            var t = new Date(date);
            return t.getDate() + " " + monthNames[t.getMonth()] + " " + t.getFullYear() + " " + t.getHours() + ":" + t.getMinutes();
        },
    },
};
</script>

<style></style>
