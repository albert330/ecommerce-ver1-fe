<template>
    <div>
        <div class="banner-slider">
            <swiper :options="bannerOption">
                <div class="swiper-slide" v-for="(item, index) in slider" :key="index">
                    <nuxt-link :to="{ path: '' + item.link + '' }" class="w-100">
                        <img :src="item.image" alt="banner" class="w-100" />
                    </nuxt-link>
                </div>
            </swiper>
            <div class="banner-slider-prev swiper-button-prev banner-slider-nav">
                <i class="fal fa-angle-left"></i>
            </div>
            <div class="banner-slider-next swiper-button-next banner-slider-nav">
                <i class="fal fa-angle-right"></i>
            </div>
        </div>

        <div class="section-fluid" style="background: #f8f8f8">
            <div class="container">
                <h2 class="text-center mb-4">Explore Coffee</h2>
                <div class="product-slider pb-3" id="categorySliderHome" v-if="categories.length > 0">
                    <swiper :options="categoryOption">
                        <div class="swiper-slide text-center" v-for="(item, index) in categories" :key="index">
                            <div class="bg-white shadow text-center p-2 p-sm-4">
                                <nuxt-link :to="{ path: '/product', query: { category_id: item.id } }">
                                    <img :src="assetUrl + item.image" class="w-100 mb-2" :alt="item.name" v-if="item.image" />
                                    <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="w-100 mb-2" :alt="item.name" v-else />
                                </nuxt-link>
                                <h5 class="text-primary font-weight-bold text-capitalize mb-0">
                                    {{ item.name }}
                                </h5>
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
                <div class="d-flex justify-content-center">
                    <nuxt-link to="/shop" class="btn btn-primary px-5">Shop Now</nuxt-link>
                </div>
                <!-- <div class="row justify-content-center">
          <div class="col-12 col-lg-4">
            <div class="product">
              <div class="thumbnail">
                <n-link to="/product/product-detail" class="image">
                  <img
                    src="/images/signature.jpg"
                    class="ratio4x3"
                    alt="signature"
                  />
                </n-link>
              </div>
              <div class="info pt-3">
                <h4 class="roboto-condensed-font text-black text-center fw-400">
                  <n-link to="/product/product-detail">Signatures</n-link>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="product">
              <div class="thumbnail">
                <n-link to="/product/product-detail" class="image">
                  <img
                    src="/images/supreme.jpg"
                    class="ratio4x3"
                    alt="supreme"
                  />
                </n-link>
              </div>
              <div class="info pt-3">
                <h4 class="roboto-condensed-font text-black text-center fw-400">
                  <n-link to="/product/product-detail">Supreme</n-link>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="product">
              <div class="thumbnail">
                <n-link to="/product/product-detail" class="image">
                  <img
                    src="/images/javaspresso.jpg"
                    class="ratio4x3"
                    alt="javaspresso"
                  />
                </n-link>
              </div>
              <div class="info pt-3">
                <h4 class="roboto-condensed-font text-black text-center fw-400">
                  <n-link to="/product/product-detail">Javaspresso</n-link>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="product">
              <div class="thumbnail">
                <n-link to="/product/product-detail" class="image">
                  <img
                    src="/images/kopi-tubruk.jpg"
                    class="ratio2x1"
                    alt="kopi-tubruk"
                  />
                </n-link>
              </div>
              <div class="info pt-3">
                <h4 class="roboto-condensed-font text-black text-center fw-400">
                  <n-link to="/product/product-detail">Kopi Tubruk</n-link>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="product">
              <div class="thumbnail">
                <n-link to="/product/product-detail" class="image">
                  <img
                    src="/images/cafelicious.jpg"
                    class="ratio2x1"
                    alt="cafelicious"
                  />
                </n-link>
              </div>
              <div class="info pt-3">
                <h4 class="roboto-condensed-font text-black text-center fw-400">
                  <n-link to="/product/product-detail">Cafelicious</n-link>
                </h4>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-12">
            <hr class="mb-0" />
          </div>
        </div> -->
            </div>
        </div>

        <!-- <div class="section-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 pb-4">
                        <div class="img-ratio-4x3">
                            <img src="/images/video-javabicahome-1.png" class="mb-3" style="cursor: pointer" alt="video-cafelicious" @click="$bvModal.show('modalCafelicious')" />
                        </div>
                        <h4 class="roboto-condensed-font text-black text-center fw-400">Play Video Javabica Cafelicious</h4>
                        <b-modal id="modalCafelicious" size="lg" centered hide-footer style="z-index: 999999">
                            <template #default>
                                <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/jJVoeJKHK_w" allowfullscreen></b-embed>
                            </template>
                            <template #modal-footer></template>
                        </b-modal>
                    </div>

                    <div class="col-lg-6 pb-4">
                        <div class="img-ratio-4x3">
                            <img src="/images/video-javabicahome-2.png" class="mb-3" style="cursor: pointer" alt="video-delonghi" @click="$bvModal.show('modalDelonghi')" />
                        </div>
                        <h4 class="roboto-condensed-font text-black text-center fw-400">Play Video Delonghi Commersil Video</h4>
                        <b-modal id="modalDelonghi" size="lg" centered hide-footer>
                            <template #default>
                                <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/wj1iof_oTtg" allowfullscreen></b-embed>
                            </template>
                            <template #modal-footer>
                                <button class="btn btn-md btn-primary text-uppercase">Add to cart</button>
                            </template>
                        </b-modal>
                    </div>
                </div>
                <hr class="mb-0" />
            </div>
        </div> -->

        <div class="section-fluid ">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 pb-3">
                        <div class="product">
                            <div class="thumbnail" style="aspect-ratio: 0">
                                <n-link to="/about-us" class="image">
                                    <img src="/images/about.png" alt="about-us" />
                                </n-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 text-center">
                        <h3 class="text-black fw-400">About Us</h3>
                        <h5 class="roboto-font text-black fw-300 mb-4"> Javabica is Indonesia's leading coffee producer. bringing premium coffee whereever you are. We are also Indonesia's official distributor of De'Longhi, Franke, Gaggia coffee machines.</h5>
                        <h5 class="roboto-font text-primary fw-300">
                            <nuxt-link to="/about/history"><u>Learn More</u></nuxt-link>
                        </h5>
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
            title: "Javabica",
        };
    },
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            slider: [
                {
                    link: "/product",
                    image: "/images/banner_home_01.jpg",
                },
                {
                    link: "/product",
                    image: "/images/banner_home_2.jpg",
                },
            ],
            categories: [],
            isLoadingCategories: true,
            bannerOption: {
                loop: true,
                speed: 1000,
                autoplay: true,
                delay: 5000,
                navigation: {
                    nextEl: ".banner-slider-next",
                    prevEl: ".banner-slider-prev",
                },
            },
            categoryOption: {
                speed: 500,
                spaceBetween: 20,

                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    300: {
                        slidesPerView: 2,
                    },
                },
                navigation: {
                    nextEl: "#categorySliderHome .banner-slider-next",
                    prevEl: "#categorySliderHome .banner-slider-prev",
                },
            },
        };
    },
    mounted() {
        this.$axios
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
                this.isLoadingCategories = false;
            })
            .catch((err) => {
                console.log(err);
                this.isLoadingCategories = false;
            });
    },
};
</script>

<style lang="scss">
#modalCafelicious___BV_modal_outer_,
#modalTubruk___BV_modal_outer_,
#modalDelonghi___BV_modal_outer_ {
    z-index: 99999 !important;

    .modal {
        .modal-dialog {
            .modal-content {
                background: transparent;
                border: none;

                .modal-header {
                    border: none;

                    .close {
                        color: #fff;
                        text-shadow: none;
                        opacity: 1;

                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
