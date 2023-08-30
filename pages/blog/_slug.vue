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
                            <p class="roboto-condensed-font fw-400 text-black mb-0">{{ formattedDate(blog.created_at) }}</p>
                        </div>
                        <h2 class="roboto-condensed-font fw-700 text-black mb-4">{{ blog.title }}</h2>
                        <p class="roboto-condensed-font fw-400 text-black">
                            {{ blog.long_desc }}
                        </p>
                    </div>
                    <div class="col-lg-4">
                        <h3 class="text-black mb-4">Categories</h3>
                        <div class="category-grid" >
                            <div class="category-item all-categories">
                                <li class="nav-link p-0 pb-1">
                                    <nuxt-link
                                    :to="removeCategoryIdFromUrl()"
                                    @change="onChangeCategory" 
                                    class="nav-link p-0 pb-1"
                                    >
                                    All Categories
                                    </nuxt-link>
                                </li>
                            </div>
                         
                            
                            <div v-for="item in categories" :key="item.id" class="category-item" >
                                <nuxt-link
                                    @change="onChangeCategory" 
                                    
                                    :to="{ path: '/blog', query: { ...$route.query, category_id: item.id } }"
                                    class="nav-link p-0 pb-3"
                                >
                                    {{ item.name }}
                                </nuxt-link>
                            </div>
                        </div>

                        <h3 class="text-black mb-3">Hot News</h3>
                        <div class="blog-card-inline mb-3" v-for="item in blog_hots" :key="item.id">
                            <nuxt-link class="image"  :to="'/blog/' + item.slug">
                                <img src="https://dummyimage.com/640x1:1/e2e2e2/e2e2e2" alt="blog-image" />
                            </nuxt-link>
                            <div class="content">
                                <nuxt-link  :to="'/blog/' + item.slug" class="title">{{ item.title }}</nuxt-link>
                                <p class="date">{{ formattedDate(item.created_at) }}</p>
                            </div>
                        </div>
                        <!-- <div class="text-center px-3 py-4 mt-5" style="border: 1px dashed #838383">
                            <h4 class="text-black text-uppercase fw-700 mb-2">Subscribe Us</h4>
                            <p class="roboto-condensed-font mb-3">Get more inspiration, tips and exclusive offers sent straight to your inbox</p>
                            <input class="form-control form-control-lg roboto-condensed-font mb-2" type="text" id="email" name="email" placeholder="Your email address" style="min-height: 47px" />
                            <button class="btn btn-primary btn-block fs-14 roboto-condensed-font text-uppercase" style="min-height: 47px; letter-spacing: 0.75px">submit</button>
                        </div> -->
                    </div>
                </div>
                
                    <h3 class="roboto-condensed-font text-black fw-700 mb-4"> You may also like</h3>
                  
                        <div class="row" v-if="recommended_blogs && recommended_blogs.length > 0">
                            <div class="col-md-4 mb-4" v-for="item in recommended_blogs" :key="item.id">
                                <div class="blog-card box-shadow">
                                    <div class="thumbnail">
                                        <n-link :to="'/blog/' + item.slug" class="image">
                                            <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-1 ratio1x1" alt="blog-image" />
                                            <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-2 ratio1x1" alt="blog-image" />
                                        </n-link>
                                    </div>
                                    <div class="info px-3">
                                        <p class="category">{{ item.category?.name }}</p>
                                        <h6 class="title">{{ item.title }} </h6>
                                        <p class="address">{{ item.short_desc }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <p>No recommended blogs available.</p>
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
            blog: {},
            categories: [],
            recommended_blogs: [],
            blog_hots: [],
            params: {
                paginate: 1,
                per_page: 12,
                page: 1,
                search: "",
                category_id: "",
                sort_type: "asc",
            },
        };
    },
    watch: {
        
    },
   
    mounted() {
        this.getDetailBlog();
        this.getCategory();
        this.getBlogHot();
    },
    methods: {
        getDetailBlog() {
            const path = this.$route.path;
            const segments = path.split('/');
            const slugIndex = segments.indexOf('blog') + 1;
         
            this.$axios
                .get("/api/v1/publics/blog/show", {
                    params: {
                        slug: segments[slugIndex],
                    },
                })
                .then((res) => {
                    this.blog = res.data.data.main_blog;
                    this.recommended_blogs = res.data.data.recommended_blogs;
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getCategory() {
            this.$axios
                .get("/api/v1/publics/category-blog/show", {
                    params: {},
                })
                .then((res) => {
                    this.categories = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        formattedDate(date) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formatted = new Date(date).toLocaleDateString('en-US', options);
            return formatted;
        },
        removeCategoryIdFromUrl() {

            let query = { ...this.$route.query };
            delete query["category_id"];

            return { path: '/blog', query };
        },
        onChangeCategory(event){
            this.category_id = event.target.value;
        },

        getBlogHot() {
            this.$axios
                .get("/api/v1/publics/blog/show", {
                    params: {
                        hot_news: true,
                    },
                })
                .then((res) => {
                    this.blog_hots = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
            });
        },

    },
};
</script>
<style scoped>
    .category-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }

    .category-item {
    width: calc(50% - 10px);
    margin-bottom: 1px;
    }

    .all-categories {
    margin: 0;
    }
</style>
<style lang="scss"></style>
