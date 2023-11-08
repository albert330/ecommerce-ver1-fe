<template>
    <div style="background-color: #f8f8f8">
        <div class="section-fluid pt-0">
            <div class="banner-product" style="display: flex; align-items: center; height: 350px; background: url(/images/banner-product.png) no-repeat; background-size: cover; background-position: 30%">
                <div class="container" v-if="!isLoadingCategory">
                    <h1 class="text-black mb-1 text-uppercase text-primary">{{ categories.length ? "All Product" : categories?.name }}</h1>
                    <ul class="breadcrumb mb-0 pt-0">
                        <li>
                            <n-link to="/">Home</n-link>
                        </li>
                        <li>
                            <n-link to="/shop">Shop</n-link>
                        </li>
                        <li>
                            <n-link to="/product">Product</n-link>
                        </li>
                        <template v-if="subCategoryId">
                            <li>
                                <n-link :to="{ path: '/product', query: { category_id: categoryId } }" v-if="categoryId">{{ categories?.name }}</n-link>
                            </li>
                            <li class="current">{{ subcategories?.filter((el) => el.id == subCategoryId)[0].name }}</li>
                        </template>
                        <template v-else>
                            <li class="current">{{ categories.length ? "All Product" : categories?.name }}</li>
                        </template>
                    </ul>
                </div>
                <div class="container" v-else>
                    <b-skeleton width="50px" animation="wave mb-1"></b-skeleton>
                    <div class="breadcrumb d-flex align-items-center pt-0 mb-0">
                        <div class="d-flex align-items-center" v-for="i in 3" :key="i">
                            <b-skeleton width="50px" height="12px" animation="wave mb-0"></b-skeleton>
                            <span class="small mx-2 mb-0" v-if="i < 3">/</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="category-slider bg-white border-top border-bottom py-3" id="categorySlider" v-if="!isLoadingCategory">
                <div class="container">
                    <swiper :options="categoryOption" ref="categorySlider">
                        <div class="swiper-slide text-center" v-if="!categories.length" style="width: 100px !important;">
                            <div class="roboto-condensed-font fs-14 fw-700 text-uppercase cursor-pointer py-1" @click="removeQueryCatAndSubCat()">
                                <span :class="{ 'border-bottom border-dark': keyword == '' && categoryId == '' && subCategoryId == '' }">All Categories</span>
                            </div>
                        </div>
                        <div class="swiper-slide text-center" style="width: 100px;">
                            <div class="roboto-condensed-font fs-14 fw-700 text-uppercase cursor-pointer py-1" @click="removeQuerySubCat()">
                                <span :class="{ 'border-bottom border-dark': subCategoryId == '' }">{{ categories.length ? "All Categories" : "All " + categories?.name }}</span>
                            </div>
                        </div>
                        <template v-if="!categoryId && categories.length">
                            <div class="swiper-slide text-center" v-for="item in categories" :key="item.id" style="width: 100px;">
                                <div class="roboto-condensed-font fs-14 fw-700 text-uppercase py-1" v-if="$route.query.keyword">
                                    <nuxt-link :to="{ path: '/product', query: { keyword, category_id: item.id } }" :class="{ 'border-bottom border-dark': item.id == subCategoryId }">{{ item.name }}</nuxt-link>
                                </div>
                                <div class="roboto-condensed-font fs-14 fw-700 text-uppercase py-1" v-else>
                                    <nuxt-link :to="{ path: '/product', query: { ...$route.query, keyword, category_id: item.id } }" :class="{ 'border-bottom border-dark': item.id == subCategoryId }">{{ item.name }}</nuxt-link>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="swiper-slide text-center" v-for="item in subcategories" :key="item.id" style="width: 100px;">
                                <div class="roboto-condensed-font fs-14 fw-700 text-uppercase py-1" v-if="$route.query.keyword">
                                    <nuxt-link :to="{ path: '/product', query: { keyword, category_id:categoryId, subcategory_id: item.id } }" :class="{ 'border-bottom border-dark': item.id == subCategoryId }">{{ item.name }}</nuxt-link>
                                </div>
                                <div class="roboto-condensed-font fs-14 fw-700 text-uppercase py-1" v-else>
                                    <nuxt-link :to="{ path: '/product', query: { ...$route.query, keyword, category_id:categoryId, subcategory_id: item.id } }" :class="{ 'border-bottom border-dark': item.id == subCategoryId }">{{ item.name }}</nuxt-link>
                                </div>
                            </div>
                        </template>
                    </swiper>
                    <div class="banner-slider-prev swiper-button-prev banner-slider-nav">
                        <i class="fal fa-angle-left"></i>
                    </div>
                    <div class="banner-slider-next swiper-button-next banner-slider-nav">
                        <i class="fal fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <!-- <div class="bg-white border-top border-bottom py-4">
                <div class="container">
                    <div class="d-flex align-items-center justify-content-center" style="gap: 2rem">
                        <div class="roboto-condensed-font fs-14 fw-700 text-uppercase cursor-pointer py-1" :class="{ 'border-bottom border-dark': subCategoryId == '' }" @click="removeQuerySubCat()">
                            <span>{{ categories.length ? "All Categories" : "All " + categories?.name }}</span>
                        </div>
                        <template v-if="!categoryId && categories.length">
                            <div class="roboto-condensed-font fs-14 fw-700 text-uppercase py-1" :class="{ 'border-bottom border-dark': item.id == subCategoryId }" v-for="item in categories" :key="item.id">
                                <nuxt-link :to="{ path: '/product', query: { ...$route.query, category_id: item.id } }">{{ item.name }}</nuxt-link>
                            </div>
                        </template>
                        <template v-else>
                            <div class="roboto-condensed-font fs-14 fw-700 text-uppercase py-1" :class="{ 'border-bottom border-dark': item.id == subCategoryId }" v-for="item in subcategories" :key="item.id">
                                <nuxt-link :to="{ path: '/product', query: { ...$route.query, subcategory_id: item.id } }">{{ item.name }}</nuxt-link>
                            </div>
                        </template>
                    </div>
                </div>
            </div> -->
            <div class="container mt-5">
                <div class="row">
                    <div class="col-12">
                        <p v-if="isLoading" class="mb-4">Loading, Please wait...</p>
                        <div class="d-flex flex-wrap align-items-center justify-content-between mb-4" style="gap: 12px" v-else>
                            <div class="d-flex flex-wrap align-items-center mb-3 mb-lg-0" style="gap: 12px">
                                <h3 class="text-black mb-0">{{ categories.length ? (keyword ? `Search Result "${keyword}"` : "All Product") : keyword ? `Search Result "${keyword}"` : subCategoryId ? subcategories?.filter((el) => el.id == subCategoryId)[0].name : categories?.name }}</h3>
                                <button class="btn btn-sm btn-primary px-2" v-if="keyword" @click="clearKeyword()">Remove Keyword</button>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="fw-700">Filter&nbsp;</span>
                                <select class="form-control" v-model="sortType" @change="onChangeSort" style="min-width: 120px">
                                    <option value="">Set Default</option>
                                    <option value="name,asc">Name A-Z</option>
                                    <option value="name,desc">Name Z-A</option>
                                    <option value="product_price,asc">Price $-$$</option>
                                    <option value="product_price,desc">Price $$-$</option>
                                    <option value="product_discount,desc">Discount $$-$</option>
                                    <option value="product_discount,asc">Discount $-$$</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6 col-lg-4 col-xl-3 mb-4" v-for="(item, index) in products" :key="index">
                                <Product :slug="item.product.slug + '?product_id=' + item.product.id" :image="item.image" :name="item.product.name" :purchasePrice="item.variant_price[0]?.price.purchase_price ?? 0" :discountPrice="item.variant_price[0]?.price.normal_price ?? 0" :percentage="item.variant_price[0]?.price.discount_persentage ?? 0" :isSoldOut="isItemSoldOut(item)" />
                            </div>
                        </div>
                        <div class="row mb-3" v-if="isLoading">
                            <div class="col-6 col-lg-4 col-xl-3 mb-4" v-for="i in 12" :key="i">
                                <ProductSkeleton />
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center" v-else>
                            <div class="text-center" v-if="products.length <= 0">
                                <p class="mb-3">Products not found..</p>
                                <nuxt-link to="/product" class="btn btn-md btn-primary">Change Filter</nuxt-link>
                            </div>
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
import { eventBus } from "../../plugins/eventBus";
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
            subcategories: [],
            params: {
                paginate: 1,
                per_page: 24,
                page: 1,
                keyword: "",
                by_category_id: "",
                sort_by: "",
                sort_type: "",
            },
            page: {
                from: null,
                to: null,
                total: 0,
            },
            categoryId: "",
            subCategoryId: "",
            sortType: "",
            isLoading: true,
            isLoadingCategory: true,
            categoryOption: {
                speed: 500,
                spaceBetween: 20,
                slidesPerView: 2,
                freeMode: true,

                breakpoints: {
                    1200: {
                        slidesPerView: 6,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    576: {
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: "#categorySlider .banner-slider-next",
                    prevEl: "#categorySlider .banner-slider-prev",
                },
            },
        };
    },
    watch: {
        params: {
            handler: function (value) {
                this.getProduct();
                this.getCategory();
            },
            deep: true,
        },
        keyword: {
            handler: function (value) {
                // this.products = [];
                if (value !== "") {
                    this.params.keyword = value;
                    this.$store.commit("setKeyword", value);
                    this.params.page = 1;
                    this.params.by_category_id = "253";
                    this.categoryId = "";
                    this.subCategoryId = "";
                    this.params.sort_by = "";
                    this.params.sort_type = "";
                    this.sortType = "";
                }
            },
        },
        "$route.query": {
            handler: function (value) {
                if (value.category_id || value.subcategory_id) {
                    this.categoryId = value?.category_id ?? "";
                    this.subCategoryId = value?.subcategory_id ?? "";

                    if (value?.subcategory_id) {
                        this.params.by_category_id = value?.subcategory_id;
                    } else {
                        this.params.by_category_id = value?.category_id;
                    }

                    this.params.page = 1;

                    // this.params.keyword = this.$route.query.keyword ?? "";
                    // this.$store.commit("setKeyword", "");
                }

                if (Object.keys(value).length < 1) {
                    this.params.keyword = "";
                    this.$store.commit("setKeyword", "");
                    this.params.page = 1;
                    this.params.by_category_id = "";
                    this.categoryId = "";
                    this.subCategoryId = "";
                    this.params.sort_by = "";
                    this.params.sort_type = "";
                    this.sortType = "";
                }
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
            this.params.sort_by = this.$route.query.sort_by ?? "";
            this.params.sort_type = this.$route.query.sort_type ?? "";
            this.sortType = `${this.params.sort_by},${this.params.sort_type}`;
            this.categoryId = this.$route.query.category_id ?? "";
            this.subCategoryId = this.$route.query.subcategory_id ?? "";

            if (this.$route.query.subcategory_id) {
                this.params.by_category_id = this.$route.query.subcategory_id ?? "";
                this.params.keyword = this.$route.query.keyword ?? "";
            } else {
                this.params.by_category_id = this.$route.query.category_id ?? "";
                this.params.keyword = this.$route.query.keyword ?? "";
            }

            this.getProduct();
            this.getCategory();
        }
    },
    methods: {
        isItemSoldOut(item) {
            if(item.variant_list === null){
                return false;
            }
            else if(item?.variant_list?.list?.[0]?.child?.[0]?.stock === 0)
            {
                return true;
            }
            else {
                return false;
            }
        },
        getCategory() {
            this.isLoadingCategory = true;
            this.$axios
                .get("/api/v1/publics/category/show", {
                    params: {
                        by_taxo_type_id: 2,
                        by_status: "ACTIVE",
                        sort_by: "taxonomy_sort",
                        sort_type: "asc",
                        by_id: this.categoryId,
                    },
                })
                .then((res) => {
                    this.categories = res.data.data;
                    if (this.categoryId) {
                        this.subcategories = res.data.data.sub_category;
                    } else {
                        this.subcategories = [];
                    }
                    this.isLoadingCategory = false;

                    let indexCategory = this.subcategories.map((el) => parseInt(el.id)).indexOf(parseInt(this.subCategoryId));
                    this.$nextTick(() => {
                        this.$refs.categorySlider.$swiper.slideTo(indexCategory ?? 0);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getProduct() {
            this.isLoading = true;
            this.products = [];
            this.$axios
                .get("/api/v1/publics/product/show", {
                    params: this.params,
                })
                .then((res) => {
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
        clearKeyword() {
            this.params.keyword = "";
            this.$store.commit("setKeyword", "");
            this.params.page = 1;
            let query = { ...this.$route.query };
            delete query["keyword"];
            delete query["category_id"];
            delete query["subcategory_id"];

            eventBus.$emit("clear-header-keyword");
            this.$router.push({
                path: "/product",
                query: "",
            });
        },
        onChangeCategory(type, value) {
            if (value == "" && value == this.params.by_category_id) {
                return;
            }
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
            let query = { ...this.$route.query };

            if (event.target.value) {
                const value = event.target.value.split(",");
                const byVal = value[0];
                const typeVal = value[1];

                if (byVal == this.params.sort_by && typeVal == this.params.sort_type) {
                    return;
                }

                this.params.page = 1;

                if (byVal && typeVal) {
                    this.params.sort_by = byVal;
                    this.params.sort_type = typeVal;
                    query = { ...query, sort_by: byVal, sort_type: typeVal };
                }
            } else {
                this.params.page = 1;
                this.params.sort_by = "";
                this.params.sort_type = "";
                delete query["sort_by"];
                delete query["sort_type"];
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
        removeQueryCatAndSubCat() {
            let query = { ...this.$route.query };
            delete query["keyword"];
            delete query["category_id"];
            delete query["subcategory_id"];

            this.$router.push({
                path: "/product",
                query: { ...query },
            });
        },
        removeQuerySubCat() {
            let query = { ...this.$route.query };
            delete query["subcategory_id"];

            this.$router.push({
                path: "/product",
                query: { ...query },
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
.swiper-slide{
    width: 150px !important;
    margin-right: 10px !important;
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
