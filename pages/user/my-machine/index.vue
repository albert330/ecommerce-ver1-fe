<template>
    <div>
        <div class="d-flex justify-content-between">
            <h3 class="roboto-condensed-font text-uppercase mb-4">My Machine</h3>
            <n-link class="btn btn-success waves-effect waves-light mb-4" to="/user/my-machine/form">
                <i class="mdi mdi-plus me-1"></i> Add Machine
            </n-link>
        </div>
        <div class="d-flex">
            <div class="ml-auto">
                <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input v-model="keyword" type="search" class="form-control form-control-sm ml-2"></b-form-input>
                </label>
            </div>
        </div>
        <div class="table-responsive mb-0">
            <b-table :items="machineList" :fields="fields" responsive="md" :per-page="0" :current-page="params.page" show-empty :busy="isLoading">
                <template #cell(product_id)="data">
                    {{ data.item?.product?.name }}
                </template>
                <template v-slot:cell(purchase_date)="data">
                    {{ data.item.purchase_date ? dateFormat(data.item.purchase_date) : "-" }}
                </template>
                <template v-slot:cell(action)="data">
                    <nuxt-link class="btn btn-md btn-info px-3 py-2" :to="'/user/my-machine/edit/' + data.item.id">Edit</nuxt-link>
                    <!-- <nuxt-link class="btn btn-md btn-primary px-3 py-2" :to="'/user/my-machine/' + data.item.id">Detail</nuxt-link> -->
                    <button class="btn btn-md btn-danger px-3 py-2" @click="destroy(data.item.id)">
                        Delete
                    </button>
                </template>
                <template #table-busy>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-bmachine" role="status">
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
    </div>
</template>

<script>

export default {
    layout: "dashboard",
    data() {
        return {
            machineList: [],
            isLoading: true,
            fields: [
                {
                    key: "product_id",
                    label: "Product",
                    sortable: true,
                },
                {
                    key: "serial_number",
                    label: "Serial Number",
                    sortable: true,
                },
                {
                    key: "purchase_date",
                    label: "Purchase Date",
                    sortable: true,
                },
                // {
                //     key: "description",
                //     label: "Description",
                //     sortable: true,
                // },
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
                this.getMachine();
            },
            deep: true,
        },
        keyword: {
            handler: function (value) {
                if (this.params.page === 1) {
                    this.getMachine();
                } else {
                    this.params.page = 1;
                }
            },
        },
    },
    mounted() {
        this.getMachine();
    },
    methods: {
        getMachine() {
            const email = this.$cookies.get("email");
            this.isLoading = true;
            this.$axios
                .get("/api/v1/private/machine/show", {
                    params: {
                        by_email: email,
                        keyword: this.keyword,
                        ...this.params,
                    },
                })
                .then((res) => {
                    this.machineList = res.data.data.data;
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
            return t.getDate() + " " + monthNames[t.getMonth()] + " " + t.getFullYear();
        },
        destroy(by_id) {
            let params = {
                by_email: this.email,
                by_id: by_id,
            }
            this.$axios.delete("/api/v1/private/machine/destroy", {
                params
            })
            .then(res => {
                this.$bvToast.toast("Delete berhasil", {
                    title: `Success`,
                    variant: "success",
                    solid: true,
                });
                this.getMachine();
            })
            .catch(err => {
                console.log(err);
            });
        },
    },
};
</script>

<style></style>
