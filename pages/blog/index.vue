<template>
    <div>
        <div class="section-fluid pt-0">
            <div class="banner-product" style="display: flex; align-items: center; height: 350px; background: url(/images/banner-blog.png) no-repeat; background-size: cover; background-position: center">
                <div class="container">
                    <h1 class="text-uppercase text-primary mb-1">Blog</h1>
                    <ul class="breadcrumb mb-0 pt-0">
                        <li>
                            <n-link to="/">Home</n-link>
                        </li>
                        <li class="current">Blog</li>
                    </ul>
                </div>
            </div>
            <div class="container mt-4 mt-md-5">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="d-flex flex-wrap align-items-center justify-content-between mb-3" style="gap: 16px">
                            <h3 class="text-black">Latest News</h3>
                            <div class="d-flex align-items-center">
                                <span class="fw-700">Urutkan:</span>
                                <select class="form-control ml-2" v-model="params.sort_type" style="min-width: 120px">
                                    <option value="asc">Name A-Z</option>
                                    <option value="desc">Name Z-A</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-6 mb-4" v-for="item in 6" :key="item">
                                <div class="blog-card box-shadow">
                                    <div class="thumbnail">
                                        <n-link :to="'/blog/detail'" class="image">
                                            <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-1 ratio1x1" alt="blog-image" />
                                            <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-2 ratio1x1" alt="blog-image" />
                                        </n-link>
                                    </div>
                                    <div class="info px-3">
                                        <p class="category">Lifestyle</p>
                                        <h6 class="title">Begin Now to Be What You Will Be Hereafter</h6>
                                        <p class="address">Met to launch on the manufacturer’s new A330neo aircraft in 2017</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-5">
                            <b-pagination v-model="params.page" :total-rows="page.total" :per-page="params.per_page" prev-text="Prev" next-text="Next" first-number last-number></b-pagination>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h3 class="text-black mb-4">Search</h3>
                        <div class="input-group input-group-search mb-4">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="header-search"><i class="far fa-search"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Cari Artikel" aria-describedby="header-search" />
                        </div>
                        <h3 class="text-black mb-3">Categories</h3>
                        <div class="row mb-4">
                            <div class="col-sm-6">
                                <ul class="nav flex-column">
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">All Categories</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">News</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Partnership</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Product and Offer</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Human Resources</nuxt-link></li>
                                </ul>
                            </div>
                            <div class="col-sm-6">
                                <ul class="nav flex-column">
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Lifestyle</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Updates</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Marketing</nuxt-link></li>
                                    <li class="nav-link p-0 pb-3"><nuxt-link :to="'/blog'">Limited Promotion and instore</nuxt-link></li>
                                </ul>
                            </div>
                        </div>
                        <h3 class="text-black mb-3">Hot News</h3>
                        <div class="blog-card-inline mb-3" v-for="i in 4" :key="i">
                            <nuxt-link class="image" :to="'/blog/detail'">
                                <img src="https://dummyimage.com/640x1:1/e2e2e2/e2e2e2" alt="blog-image" />
                            </nuxt-link>
                            <div class="content">
                                <nuxt-link :to="'/blog/detail'" class="title">If You Don’t Stand for Something You Will Fall for Anything Anyone and Everything</nuxt-link>
                                <p class="date">MAR 7, 2021</p>
                            </div>
                        </div>
                        <div class="text-center px-3 py-4 mt-5" style="border: 1px dashed #838383">
                            <h4 class="text-black text-uppercase fw-700 mb-2">Subscribe Us</h4>
                            <p class="roboto-condensed-font mb-3">Get more inspiration, tips and exclusive offers sent straight to your inbox</p>
                            <input class="form-control form-control-lg roboto-condensed-font mb-2" type="text" id="email" name="email" placeholder="Your email address" style="min-height: 47px" />
                            <button class="btn btn-primary btn-block fs-14 roboto-condensed-font text-uppercase" style="min-height: 47px; letter-spacing: 0.75px">submit</button>
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
            title: "Blog",
        };
    },
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            blogs: [],
            params: {
                paginate: 1,
                per_page: 12,
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
        };
    },
    watch: {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss"></style>
