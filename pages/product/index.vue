<template>
    <div style="background-color: #f8f8f8">
        <div class="section-fluid pt-4">
            <div class="container">
                <ul class="breadcrumb mb-4">
                    <li>
                        <n-link to="/shop">Shop</n-link>
                    </li>
                    <li class="current">List Produk</li>
                </ul>
                <div class="row">
                    <div class="col-lg-3">
                        <p class="lead fw-700 mb-3">Filter Produk</p>
                        <div class="rounded-lg mb-4" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1)">
                            <div class="accordion accordion-filter" role="tablist" v-if="!isLoadingCategory && categories.length > 0">
                                <b-card no-body>
                                    <b-card-header header-tag="header" role="tab">
                                        <button class="btn btn-block" v-b-toggle="'filter-accordion-1'">Kategori</button>
                                    </b-card-header>
                                    <b-collapse id="filter-accordion-1" role="tabpanel" :visible="true">
                                        <b-card-body>
                                            <div class="accordion accordion-filter sub-filter" role="tablist">
                                                <button class="btn btn-filter" :class="categoryId == '' && 'active'" @click="onChangeCategory('category', '')">Lihat Semua</button>

                                                <b-card no-body v-for="item in categories" :key="item.id">
                                                    <b-card-header header-tag="header" role="tab" @click="onChangeCategory('category', item.id)">
                                                        <button class="btn btn-block" v-b-toggle="'filter-category-' + item.id">
                                                            {{ item.name }}
                                                        </button>
                                                    </b-card-header>
                                                    <b-collapse :id="'filter-category-' + item.id" role="tabpanel" :visible="categoryId == item.id">
                                                        <b-card-body :class="item.sub_category?.length == 0 && 'p-0'">
                                                            <div class="accordion accordion-filter sub-filter subsub-filter" role="tablist" v-if="item.sub_category?.length > 1">
                                                                <b-card no-body v-for="item2 in item.sub_category" :key="item2.id">
                                                                    <b-card-header header-tag="header" role="tab" @click="onChangeCategory('subCategory', item2.id)">
                                                                        <button class="btn btn-block" v-b-toggle="'filter-subcategory-' + item2.id">
                                                                            {{ item2.name }}
                                                                        </button>
                                                                    </b-card-header>
                                                                    <b-collapse :id="'filter-subcategory-' + item2.id" role="tabpanel" v-if="item.sub_category?.length > 1" :visible="params.by_category_id == item2.id">
                                                                        <b-card-body class="p-0"></b-card-body>
                                                                    </b-collapse>
                                                                </b-card>
                                                            </div>
                                                        </b-card-body>
                                                    </b-collapse>
                                                </b-card>
                                            </div>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>
                            <template v-else>
                                <div class="px-3 pt-3">
                                    <b-skeleton width="120px" animation="wave mb-2"></b-skeleton>
                                    <b-skeleton width="80px" height="12px" animation="wave"></b-skeleton>
                                    <div class="pl-3">
                                        <b-skeleton width="100px" height="12px" animation="wave"></b-skeleton>
                                        <b-skeleton width="120px" height="12px" animation="wave"></b-skeleton>
                                        <b-skeleton width="140px" height="12px" animation="wave"></b-skeleton>
                                    </div>
                                </div>
                                <hr />
                                <div class="px-3 pb-3">
                                    <b-skeleton width="120px" animation="wave mb-2"></b-skeleton>
                                    <b-skeleton width="80px" height="12px" animation="wave"></b-skeleton>
                                    <div class="pl-3">
                                        <b-skeleton width="100px" height="12px" animation="wave"></b-skeleton>
                                        <b-skeleton width="120px" height="12px" animation="wave"></b-skeleton>
                                        <b-skeleton width="140px" height="12px" animation="wave"></b-skeleton>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <p v-if="isLoading" class="mb-4">Memuat, mohon tunggu...</p>
                        <div class="d-flex flex-wrap align-items-center justify-content-between mb-4" style="gap: 12px" v-else>
                            <p class="mb-0" v-if="products.length > 0">
                                Menampilkan
                                <span class="fw-700">{{ page.from }}-{{ page.to }} produk</span>
                                dari total
                                <span class="fw-700">{{ page.total }} produk</span>
                                <template v-if="params.keyword">
                                    untuk
                                    <span class="fw-700">"{{ params.keyword }}"</span>
                                    <button class="btn btn-sm btn-primary px-2 ml-2" @click="clearKeyword()">remove keyword</button>
                                </template>
                            </p>
                            <p class="mb-0" v-else>
                                <template v-if="params.keyword">
                                    Menampilkan produk untuk
                                    <span class="fw-700">"{{ params.keyword }}"</span>
                                    <button class="btn btn-sm btn-primary px-2 ml-2" @click="clearKeyword()">remove keyword</button>
                                </template>
                            </p>
                            <div class="d-flex align-items-center" v-if="products.length > 0">
                                <select class="form-control" v-model="sortType" @change="onChangeSort" style="min-width: 120px">
                                    <option value="name,asc">Nama A-Z</option>
                                    <option value="name,desc">Nama Z-A</option>
                                    <option value="product_price,asc">Harga $-$$</option>
                                    <option value="product_price,desc">Harga $$-$</option>
                                    <option value="product_discount,desc">Diskon $$-$</option>
                                    <option value="product_discount,asc">Diskon $-$$</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6 col-lg-4 col-xl-3 mb-4" v-for="(item, index) in products" :key="index">
                                <Product :slug="item.product.slug + '?product_id=' + item.product.id" :image="item.image" :name="item.product.name" :purchasePrice="item.variant_price[0]?.price.purchase_price ?? 0" :discountPrice="item.variant_price[0]?.price.normal_price ?? 0" :percentage="item.variant_price[0]?.price.discount_persentage ?? 0" />
                            </div>
                        </div>
                        <div class="row mb-3" v-if="isLoading">
                            <div class="col-6 col-lg-4 col-xl-3 mb-4" v-for="i in 12" :key="i">
                                <ProductSkeleton />
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center" v-else>
                            <p class="mb-0" v-if="products.length <= 0">Produk tidak ditemukan.</p>
                            <template v-else>
                                <b-pagination v-model="params.page" :total-rows="page.total" :per-page="params.per_page" prev-text="Prev" next-text="Next" first-number last-number @change="onChangePagination"></b-pagination>
                            </template>
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
    head() {
        return {
            title: "Product List",
        };
    },
    computed: {
        ...mapState(["keyword"]),
    },
    data() {
        return {
            products: [],
            categories: [],
            params: {
                paginate: 1,
                per_page: 24,
                page: 1,
                keyword: "",
                by_category_id: "",
                sort_by: "name",
                sort_type: "asc",
            },
            page: {
                from: null,
                to: null,
                total: 0,
            },
            categoryId: "",
            sortType: "name,asc",
            showMore: true,
            showMoreClicked: false,
            isLoading: true,
            isLoadingCategory: true,
        };
    },
    watch: {
        params: {
            handler: function (value) {
                this.getProduct();
            },
            deep: true,
        },
        keyword: {
            handler: function (value) {
                this.products = [];
                this.params.keyword = value;
                this.params.page = 1;
                this.params.by_category_id = "";
                this.categoryId = "";
                this.params.sort_by = "name";
                this.params.sort_type = "asc";
            },
        },
    },
    mounted() {
        if (Object.keys(this.$route.query).length <= 0) {
            this.getProduct();
            this.getCategory();
        } else {
            this.params.page = this.$route.query.page ?? 1;
            this.params.keyword = this.$route.query.keyword ?? "";
            this.params.sort_by = this.$route.query.sort_by ?? "name";
            this.params.sort_type = this.$route.query.sort_type ?? "asc";
            this.sortType = `${this.params.sort_by},${this.params.sort_type}`;
            this.categoryId = this.$route.query.category_id ?? "";

            if (this.$route.query.subcategory_id) {
                this.params.by_category_id = this.$route.query.subcategory_id ?? "";
            } else {
                this.params.by_category_id = this.$route.query.category_id ?? "";
            }

            this.getProduct();
            this.getCategory();
        }
    },
    methods: {
        getCategory() {
            this.$axios
                .get("/api/v1/publics/category/show", {
                    params: {
                        by_taxo_type_id: 2,
                        by_status: "ACTIVE",
                        sort_by: "taxonomy_sort",
                        sort_type: "asc",
                    },
                })
                .then((res) => {
                    this.categories = res.data.data;
                    this.isLoadingCategory = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getProduct() {
            this.isLoading = true;
            this.showMore = true;
            this.products = [];
            this.$axios
                .get("/api/v1/publics/product/show", {
                    params: this.params,
                })
                .then((res) => {
                    // let tempProducts = [...this.products];
                    // this.products = [...tempProducts, ...res.data.data.data];
                    this.products = res.data.data.data;
                    this.page = {
                        from: res.data.data.from,
                        to: res.data.data.to,
                        total: res.data.data.total,
                    };
                    this.isLoading = false;

                    if (res.data.data.data.length < this.params.per_page) {
                        this.showMore = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getMoreProduct() {
            this.params.page += 1;
            this.showMoreClicked = true;
        },
        clearKeyword() {
            this.params.keyword = "";
            this.$store.commit("setKeyword", "");
            this.params.page = 1;

            this.$router.push({
                path: "/product",
                query: "",
            });
        },
        onChangeCategory(type, value) {
            if (value == "" && value == this.params.by_category_id) {
                return;
            }
            this.products = [];
            this.params.page = 1;
            let query = { ...this.$route.query };

            if (type == "category") {
                if (value == "") {
                    this.params.by_category_id = "";
                    this.categoryId = "";
                    delete query["category_id"];
                    delete query["subcategory_id"];
                    query = { ...query };
                } else if (value != this.params.by_category_id) {
                    this.params.by_category_id = value;
                    this.categoryId = value;
                    query = { ...query, category_id: value };
                } else {
                    this.params.by_category_id = "";
                    this.categoryId = "";
                    delete query["category_id"];
                    delete query["subcategory_id"];
                    query = { ...query };
                }
            } else {
                if (value != this.params.by_category_id) {
                    this.params.by_category_id = value;
                    query = {
                        ...query,
                        category_id: this.categoryId,
                        subcategory_id: value,
                    };
                } else {
                    this.params.by_category_id = this.categoryId ?? "";
                    delete query["subcategory_id"];
                    query = { ...query };
                }
            }

            this.$router.push({
                path: "/product",
                query: { ...query },
            });
        },
        onChangeSort(event) {
            const value = event.target.value.split(",");
            const byVal = value[0];
            const typeVal = value[1];

            if (byVal == this.params.sort_by && typeVal == this.params.sort_type) {
                return;
            }

            this.products = [];
            this.params.page = 1;
            let query = { ...this.$route.query };

            if (byVal && typeVal) {
                this.params.sort_by = byVal;
                this.params.sort_type = typeVal;
                query = { ...query, sort_by: byVal, sort_type: typeVal };
            }

            this.$router.push({
                path: "/product",
                query: { ...query },
            });
        },
        onChangePagination(value) {
            this.$router.push({
                path: "/product",
                query: { ...this.$route.query, page: value },
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
};
</script>

<style lang="scss">
.btn-filter {
    padding: 0 0.5rem 0.5rem 1rem;
    color: $dark;
    border-color: transparent;
    display: block;
    text-align: left;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;

    &.active {
        font-weight: 700;
    }
}

.accordion-filter {
    .card {
        .card-header {
            padding: 1rem;
            border-bottom-color: transparent;
            background-color: #fff;

            .btn {
                padding: 0;
                color: $dark;
                display: block;
                text-align: left;
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 6px;
                    border-style: solid;
                    border-width: 2px 2px 0 0;
                    border-color: $dark;
                    height: 8px;
                    width: 8px;
                    transform: rotate(135deg);
                }

                &.not-collapsed {
                    &::after {
                        top: 8px;
                        transform: rotate(-45deg);
                    }
                }
            }
        }

        .collapse {
            &.show {
                height: auto !important;
            }

            .card-body {
                padding: 1rem;
                padding-bottom: 0.5rem;
                padding-top: 0;
            }
        }

        &.no-carret {
            .card-header {
                .btn {
                    &::after {
                        display: none;
                    }
                }
            }
        }
    }

    &.sub-filter {
        .card {
            border-color: transparent;

            .card-header {
                padding: 0.5rem;
                padding-left: 1rem;
                padding-top: 0;

                .btn {
                    font-size: 14px;
                    font-weight: 400;
                    text-transform: capitalize;

                    &::after {
                        left: -12px;
                        top: 6px;
                        height: 6px;
                        width: 6px;
                    }

                    &.not-collapsed {
                        font-weight: 700;

                        &::after {
                            top: 8px;
                            transform: rotate(-45deg);
                        }
                    }
                }
            }

            .collapse {
                .card-body {
                    padding: 0.5rem;
                    padding-top: 0;
                }
            }
        }

        &.subsub-filter {
            .card {
                .card-header {
                    .btn {
                        &::after {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}

.disabled.bv-d-xs-down-none {
    display: block !important;
}
</style>
