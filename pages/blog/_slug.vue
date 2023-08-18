<template>
    <div>
        <div class="section-fluid">
            <div class="container">
                <div class="row mb-5 pb-4">
                    <div class="col-lg-8">
                        <div class="rounded-xl img-ratio-16x9 mb-4">
                            <img src="https://dummyimage.com/640x16:9/e2e2e2/e2e2e2" class="w-100" alt="blog-detail-image" />
                        </div>
                        <div class="d-flex align-content-center justify-content-between mb-4">
                            <p class="roboto-condensed-font fw-400 text-black mb-0">Lifestyle</p>
                            <p class="roboto-condensed-font fw-400 text-black mb-0">Mar 7, 2023</p>
                        </div>
                        <h2 class="roboto-condensed-font fw-700 text-black mb-4">Begin Now to Be What You Will Be Hereafter</h2>
                        <p class="roboto-condensed-font fw-400 text-black">
                            Lorem ipsum dolor sit amet consectetur. Duis sit nulla a velit luctus id. Nisl molestie sed vestibulum gravida natoque sed vulputate. In eget mattis a quis. Ut et sit at risus. Sed aliquam at sagittis duis sollicitudin ipsum proin elementum. Vulputate blandit mi eget vulputate urna sagittis lectus urna ac. Et iaculis nulla vitae duis sit scelerisque justo posuere. Eu aenean diam massa vel ac duis amet lectus. Tincidunt quis aenean morbi egestas est mauris. Id vestibulum magnis sit blandit sit non viverra ullamcorper. Congue risus posuere vel malesuada nisl. Porttitor vestibulum eget quisque auctor vel velit ullamcorper arcu aliquet. Maecenas nulla viverra sit semper nec aliquam ac velit eget. Facilisis sed ornare sit arcu et et. Vitae mauris cursus magnis purus consequat neque. Proin fusce suscipit quam egestas
                            <br />
                            <br />
                            Ac tristique ut semper at egestas adipiscing duis pellentesque. Orci integer vulputate ut blandit arcu hendrerit augue. Pharetra non curabitur nulla pellentesque morbi at. Tortor dignissim eu Feugiat convallis scelerisque sed nulla euismod. Morbi suspendisse auctor vestibulum nibh semper habitant. Sem ullamcorper venenatis tempus est penatibus scelerisque quis elit. Ultricies gravida commodo vulputate cursus tortor. Viverra faucibus amet dictum elementum mauris eu consequat et. Lectus eu odio pulvinar sed. At ipsum posuere cursus in at nec. Ac integer pharetra elit porttitor sed auctor feugiat mi. Purus ac tincidunt id in scelerisque quis. Netus aliquam in a et fermentum amet ut.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur. Duis sit nulla a velit luctus id. Nisl molestie sed vestibulum gravida natoque sed vulputate. In eget mattis a quis. Ut et sit at risus. Sed aliquam at sagittis duis sollicitudin ipsum proin elementum. Vulputate blandit mi eget vulputate urna sagittis lectus urna ac. Et iaculis nulla vitae duis sit scelerisque justo posuere. Eu aenean diam massa vel ac duis amet lectus. Tincidunt quis aenean morbi egestas est mauris. Id vestibulum magnis sit blandit sit non viverra ullamcorper. Congue risus posuere vel malesuada nisl. Porttitor vestibulum eget quisque auctor vel velit ullamcorper arcu aliquet. Maecenas nulla viverra sit semper nec aliquam ac velit eget. Facilisis sed ornare sit arcu et et. Vitae mauris cursus magnis purus consequat neque. Proin fusce suscipit quam egestas
                            <br />
                            <br />
                            Ac tristique ut semper at egestas adipiscing duis pellentesque. Orci integer vulputate ut blandit arcu hendrerit augue. Pharetra non curabitur nulla pellentesque morbi at. Tortor dignissim eu Feugiat convallis scelerisque sed nulla euismod. Morbi suspendisse auctor vestibulum nibh semper habitant. Sem ullamcorper venenatis tempus est penatibus scelerisque quis elit. Ultricies gravida commodo vulputate cursus tortor. Viverra faucibus amet dictum elementum mauris eu consequat et. Lectus eu odio pulvinar sed. At ipsum posuere cursus in at nec. Ac integer pharetra elit porttitor sed auctor feugiat mi. Purus ac tincidunt id in scelerisque quis. Netus aliquam in a et fermentum amet ut.
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <h3 class="text-black mb-4">Categories</h3>
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
                <h3 class="roboto-condensed-font text-black fw-700 mb-4">You may also like</h3>
                <div class="row">
                    <div class="col-md-4 mb-4" v-for="item in 3" :key="item">
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
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    head() {
        return {
            title: "Blog Detail",
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
