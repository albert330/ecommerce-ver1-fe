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
                            <h3 class="text-black">Latest Blogs</h3>
                            <div class="d-flex align-items-center">
                                <span class="fw-700">Urutkan:</span>
                                <select class="form-control" v-model="sortType" @change="onChangeSort" style="min-width: 120px">
                                    <option value="">Set Default</option>
                                    <option value="asc">Name A-Z</option>
                                    <option value="desc">Name Z-A</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="mb-5">
                                <p v-if="isLoadingBlog" class="mb-4 mt-4 align-items-center ml-3">Loading, Please wait...</p>
                            </div>
                            <div class="col-sm-6 mb-4" v-if="!isLoadingBlog && blogs.length > 0" v-for="item in blogs" :key="item.id">
                                <div class="blog-card box-shadow">
                                    <div class="thumbnail">
                                        <n-link :to="'/blog/' + item.slug" class="image">
                                            <img :src="assetUrl + item.cover" :alt="item.title" class="image-1 ratio1x1">
                                            <img :src="assetUrl + item.cover" :alt="item.title" class="image-2 ratio1x1">
                                            <!-- <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-1 ratio1x1" alt="blog-image" /> -->
                                            <!-- <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-2 ratio1x1" alt="blog-image" /> -->
                                        </n-link>
                                    </div>
                                    <div class="info px-3">
                                        <p class="category">{{ item.category?.name }}</p>
                                        <h6 class="title">{{ item.title }} </h6>
                                        <p class="address">{{ item.short_desc }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!isLoadingBlog && blogs.length === 0">
                                <p class="ml-5">Oops, no articles in this category.</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-5" v-if="!isLoadingBlog && blogs.length > 0">
                            <b-pagination v-model="params.page" :total-rows="page.total" :per-page="params.per_page" prev-text="Prev" next-text="Next" first-number last-number></b-pagination>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h3 class="text-black mb-4">Search</h3>
                        <form @submit.prevent="onSubmit">
                            <div class="input-group input-group-search mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="header-search"><i class="far fa-search"></i></span>
                                </div>
                                <input type="text" class="form-control" :value="keyword" @change="onChange" placeholder="Cari Artikel" aria-describedby="header-search" />
                            </div>
                        </form>
                        <h3 class="text-black mb-3">Categories</h3>
                     
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
                                <img :src="assetUrl + item.cover" :alt="item.title" >
                                <!-- <img src="https://dummyimage.com/640x1:1/e2e2e2/e2e2e2" alt="blog-image" /> -->
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
            categories: [],
            blog_hots: [],
            params: {
                paginate: 1,
                per_page: 12,
                page: 1,
                keyword: "",
                category_id: "",
                sort_type: "asc",
                status:"PUBLISH",
            },
            page: {
                from: null,
                to: null,
                total: 0,
            },
            isLoadingBlog:true,
            showMore:false,
            sortType: "",
            categoryId: "",
            keyword:""
        };
    },
    watch: {
        params: {
            handler: function (value) {
                this.getBlogs();
                this.getCategory();
                this.getBlogHot();
            },
            deep: true,
        },
        keyword: {
            handler: function (value) {
                if (value !== "") {
                    this.params.keyword = value;
                    this.$store.commit("setKeyword", value);
                    this.params.page = 1;
                    this.params.category_id = "";
                    this.params.sort_type = "";
                    this.categoryId = "";
                    this.sortType = "";
                }
                
                
            },
        },
        "$route.query": {
            handler: function (value) {
                if (value.category_id) {
                    this.categoryId = value?.category_id ?? "";
                    this.sortType = value?.sort_type ?? "";
                    this.params.category_id = value?.category_id ?? "";
                    this.params.page = 1;
                    this.params.keyword = "";
                    this.$store.commit("setKeyword", "");
                }

                if (Object.keys(value).length < 1) {
                    this.params.keyword = "";
                    this.$store.commit("setKeyword", "");
                    this.params.page = 1;
                    this.params.category_id = "";
                    this.params.sort_type = "";
                    this.categoryId = "";
                    this.sortType = "";
                    this.keyword="";
                }
            },
        },
    },
    mounted() {
        if (Object.keys(this.$route.query).length <= 0) {
            this.getBlogs();
            this.getCategory();
            this.getBlogHot();
        } else {
            this.params.page = this.$route.query.page ?? 1;
            this.params.keyword = this.$route.query.keyword ?? "";
            this.params.sort_type = this.$route.query.sort_type ?? "";
            this.sortType = this.params.sort_type ?? "";
            this.categoryId = this.$route.query.category_id ?? "";
           
            this.getBlogs();
            this.getCategory();
            this.getBlogHot();
        }
    },
    methods: {
        getCategory() {
            this.$axios
                .get("/api/v1/publics/category-blog/show", {
                    params: {
                        status: 1,
                    },
                })
                .then((res) => {
                    this.categories = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getBlogs() {
            this.isLoadingBlog = true;
            this.$axios
                .get("/api/v1/publics/blog/show", {
                    params: this.params,
                })
                .then((res) => {
                    this.blogs = res.data.data.data;
                    this.page = {
                        from: res.data.data.from,
                        to: res.data.data.to,
                        total: res.data.data.total,
                    };
                    this.isLoadingBlog = false;

                })
                .catch((err) => {
                    console.log(err);
            });
        },
        getBlogHot() {
            this.$axios
                .get("/api/v1/publics/blog/show", {
                    params: {
                        hot_news: true,
                    },
                })
                .then((res) => {
                    this.blog_hots = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
                })
                .catch((err) => {
                    console.log(err);
            });
        },
        onChangeSort(event) {
            let query = { ...this.$route.query };

            if (event.target.value) {
                const value = event.target.value.split(",");
                const typeVal = value[0];

                if (typeVal == this.params.sort_type) {
                    return;
                }

                this.params.page = 1;

                if (typeVal) {
                    this.params.sort_type = typeVal;
                    query = { ...query, sort_type: typeVal };
                }
            } else {
                this.params.page = 1;
                this.params.sort_type = "";
                delete query["sort_type"];
            }

            this.$router.push({
                path: "/blog",
                query: { ...query },
            });
        },
        onChange(event) {
            this.keyword = event.target.value;
        },
        onChangeCategory(event){
            this.category_id = event.target.value;
        },
        formattedDate(date) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formatted = new Date(date).toLocaleDateString('en-US', options);
            return formatted;
        },

        onSubmit() {

            let query = { ...this.$route.query };

            if (this.keyword) {
                const keywordVal = this.keyword
                this.params.page = 1;
                this.params.keyword = keywordVal;
                query = { ...query, keyword: keywordVal };
            } else {
                this.params.page = 1;
                this.params.keyword = "";
                delete query["keyword"];
            }

            this.$router.push({
                path: "/blog",
                query: { ...query },
            });
        },

        removeCategoryIdFromUrl() {

            let query = { ...this.$route.query };
            delete query["category_id"];
        
            return { path: '/blog', query };
        }
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
