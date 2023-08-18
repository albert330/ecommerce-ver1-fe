<template>
    <div style="background-color: #f8f8f8" class="pb-5">
        <div class="section-fluid pb-0 pt-5">
            <div class="container">
                <div class="banner-slider mb-5" id="bannerSlider">
                    <swiper :options="bannerShopOption">
                        <div class="swiper-slide" v-for="(item, index) in slider" :key="index">
                            <a target="_blank" href="https://shopee.co.id/javabicaofficialshop" class="w-100">
                                <img :src="item.image" alt="banner" class="w-100" />
                            </a>
                        </div>
                    </swiper>
                    <div class="banner-slider-prev swiper-button-prev banner-slider-nav">
                        <i class="fal fa-angle-left"></i>
                    </div>
                    <div class="banner-slider-next swiper-button-next banner-slider-nav">
                        <i class="fal fa-angle-right"></i>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <h3 class="mb-0">Explore Coffee</h3>
                    <nuxt-link :to="{ path: '/product' }" class="btn btn-md btn-primary px-3 py-2">See All Product</nuxt-link>
                </div>
                <div class="product-slider pb-3" id="categorySlider" v-if="categories.length > 0 && !isLoadingCategory">
                    <swiper :options="categoryOption">
                        <div class="swiper-slide text-center" v-for="(item, index) in categories" :key="index">
                            <div class="text-center">
                                <nuxt-link :to="{ path: '/product', query: { category_id: item.id } }">
                                    <img :src="assetUrl + item.image" class="w-100 mb-2" :alt="item.name" v-if="item.image" />
                                    <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="w-100 mb-2" :alt="item.name" v-else />
                                </nuxt-link>
                                <p class="small text-primary font-weight-bold text-capitalize mb-0">
                                    {{ item.name }}
                                </p>
                            </div>
                        </div>
                    </swiper>
                    <div class="banner-slider-prev swiper-button-prev banner-slider-nav">
                        <i class="fal fa-angle-left"></i>
                    </div>
                    <div class="banner-slider-next swiper-button-next banner-slider-nav">
                        <i class="fal fa-angle-right"></i>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-4 col-lg-3 col-xl-2" :class="i === 5 || i === 6 ? 'd-none d-xl-block' : i === 4 ? 'd-none d-lg-block' : ''" v-for="i in 6" :key="i">
                        <div class="mb-2">
                            <b-skeleton-img aspect="1:1" card-img="top rounded-lg"></b-skeleton-img>
                        </div>
                        <div class="w-100">
                            <b-skeleton></b-skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template v-if="collectionsCategories.length > 0 && !isLoadingCategory">
            <div class="section-fluid pb-0 pt-4" v-for="(item, index) in collectionsCategories" :key="index">
                <div class="container">
                    <h3 class="roboto-condensed-font mb-4">
                        {{ item.name }}
                    </h3>
                    <div class="row">
                        <div class="col-3 d-none d-lg-block">
                            <img :src="assetUrl + item.image" class="w-100 rounded-lg" style="object-fit: cover; aspect-ratio: 1/1.55" v-if="item.image" />
                            <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="w-100 rounded-lg" style="object-fit: cover; aspect-ratio: 1/1.55" v-else />
                        </div>
                        <div class="col-lg-9">
                            <div class="product-slider" :id="`productSlider${index + 1}`" v-if="!isLoadingProduct">
                                <swiper :options="index === 0 ? productOption1 : index === 1 ? productOption2 : index === 2 ? productOption3 : productOption4">
                                    <div class="swiper-slide" v-for="(item2, index2) in products[index].products" :key="index2">
                                        <Product :slug="item2.product.slug + '?product_id=' + item2.product.id" :image="item2.image" :name="item2.product.name" :purchasePrice="item2.variant_price[0]?.price.purchase_price ?? 0" :discountPrice="item2.variant_price[0]?.price.normal_price ?? 0" :percentage="item2.variant_price[0]?.price.discount_persentage ?? 0" />
                                    </div>
                                </swiper>
                                <div class="banner-slider-prev swiper-button-prev banner-slider-nav">
                                    <i class="fal fa-angle-left"></i>
                                </div>
                                <div class="banner-slider-next swiper-button-next banner-slider-nav">
                                    <i class="fal fa-angle-right"></i>
                                </div>
                            </div>
                            <div class="row" v-else>
                                <div class="col-6 col-lg-4" :class="i === 3 ? 'd-none d-lg-block' : ''" v-for="i in 3" :key="i">
                                    <ProductSkeleton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="section-fluid pb-0 pt-4" v-for="(item, index) in loadingCategory" :key="index">
                <div class="container">
                    <h3 class="roboto-condensed-font mb-4">
                        {{ item }}
                    </h3>
                    <div class="row">
                        <div class="col-3 d-none d-lg-block">
                            <b-skeleton-img aspect="1:1.55" card-img="top rounded-lg"></b-skeleton-img>
                        </div>
                        <div class="col-lg-9">
                            <div class="row">
                                <div class="col-6 col-lg-4" :class="i === 3 ? 'd-none d-lg-block' : ''" v-for="i in 3" :key="i">
                                    <ProductSkeleton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    head() {
        return {
            title: "Shop",
        };
    },
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            slider: [
                {
                    link: "https://shopee.co.id/javabicaofficialshop",
                    image: "/images/banner_shop.jpg",
                },
            ],
            products: [],
            categories: [],
            collections: [],
            collectionsCategories: [],
            loadingCategory: ["Featured Product"],
            isLoadingCategory: true,
            isLoadingProduct: true,
            bannerShopOption: {
                loop: false,
                speed: 1000,
                autoplay: true,
                delay: 5000,
                navigation: {
                    nextEl: "#bannerSlider .banner-slider-next",
                    prevEl: "#bannerSlider .banner-slider-prev",
                },
            },
            categoryOption: {
                speed: 500,
                spaceBetween: 20,

                breakpoints: {
                    1200: {
                        slidesPerView: 6,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    300: {
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: "#categorySlider .banner-slider-next",
                    prevEl: "#categorySlider .banner-slider-prev",
                },
            },
            productOption1: {
                speed: 500,
                slidesPerView: 2,
                spaceBetween: 20,
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: "#productSlider1 .banner-slider-next",
                    prevEl: "#productSlider1 .banner-slider-prev",
                },
            },
            productOption2: {
                speed: 500,
                slidesPerView: 2,
                spaceBetween: 20,
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: "#productSlider2 .banner-slider-next",
                    prevEl: "#productSlider2 .banner-slider-prev",
                },
            },
            productOption3: {
                speed: 500,
                slidesPerView: 2,
                spaceBetween: 20,
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: "#productSlider3 .banner-slider-next",
                    prevEl: "#productSlider3 .banner-slider-prev",
                },
            },
            productOption4: {
                speed: 500,
                slidesPerView: 2,
                spaceBetween: 20,
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: "#productSlider4 .banner-slider-next",
                    prevEl: "#productSlider4 .banner-slider-prev",
                },
            },
        };
    },
    async mounted() {
        let tempCollectionsCategories = [];
        let tempProducts = [];

        let params = {
            by_taxo_type_id: 1,
            sort_by: "taxonomy_sort",
            sort_type: "asc",
        };
        await this.$axios
            .get("/api/v1/publics/collection/show", { params })
            .then((res) => {
                this.collections = res.data.data.filter((el) => el.id === 273 || el.id === 18 || el.id === 274 || el.id === 1); // define collection id
            })
            .catch((err) => {
                console.log(err);
            });

        await this.$axios
            .get("/api/v1/publics/category/show", {
                params: {
                    by_taxo_type_id: 2,
                    by_status: "ACTIVE",
                    sort_by: "taxonomy_sort",
                    sort_type: "asc",
                },
            })
            .then(async (res) => {
                this.categories = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            });

        if (this.collections.length > 0 && this.categories.length > 0) {
            // tempCollectionsCategories = [
            //   ...this.categories,
            //   ...this.collections,
            // ].sort((a, b) => b.id - a.id);

            // for (let i = 0; i < 4; i++) {
            //     tempCollectionsCategories.push(...this.collections);
            // }
            this.collectionsCategories = this.collections;
            this.isLoadingCategory = false;

            for await (const el of this.collectionsCategories) {
                await this.$axios
                    .get("/api/v1/publics/product/show", {
                        params: {
                            // by_category_id: el.id !== 15 ? el.id : "",
                            by_collection_id: el.id,
                            paginate: 1,
                            per_page: 20,
                            page: 1,
                        },
                    })
                    .then((res2) => {
                        // if (res2.data.data.length) {
                        let obj = {};
                        obj["id"] = el.id;
                        obj["category_name"] = el.name;
                        obj["products"] = res2.data.data.data;
                        tempProducts.push(obj);
                        // }
                    })
                    .catch((err2) => {
                        console.log(err2);
                    });
            }

            this.products = tempProducts;
            this.isLoadingProduct = false;
        }
    },
};
</script>

<style lang="scss">
@media #{$extraBig-device,$laptop-device} {
    #categorySlider {
        .swiper-wrapper {
            justify-content: center;
        }
    }
}
</style>
