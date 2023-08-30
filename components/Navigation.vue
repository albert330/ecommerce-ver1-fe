<template>
    <nav class="site-main-menu">
        <ul>
        
           
            <li class="has-children">
                <n-link to="/shop">
                    <span class="menu-text">Shop</span>
                </n-link>
                <span class="menu-toggle">
                    <i class="far fa-angle-down"></i>
                </span>
                <ul class="sub-menu">
                    <li>
                        <n-link to="/product">
                            <span class="menu-text">All Product</span>
                        </n-link>
                    </li>
                    <li v-for="item in categories" :key="item.id">
                        <n-link :to="{ path: '/product', query: { category_id: item.id } }">
                            <span class="menu-text">{{ item.name }}</span>
                        </n-link>
                    </li>
                </ul>
            </li>
            <li class="has-children">
                <nuxt-link to="">
                    <span class="menu-text" style="font-family:'Roboto Condensed', sans-serif' !important ">About Us</span>
                </nuxt-link>
                  <span class="menu-toggle">
                    <i class="far fa-angle-down"></i>
                </span>
                 <ul class="sub-menu" style="width:260px">
                    <li>
                        <n-link to="/about/history">
                            <span class="menu-text">History</span>
                        </n-link>
                    </li>
                    <li>
                        <n-link to="/about/sustainability">
                            <span class="menu-text">Sustainability</span>
                        </n-link>
                    </li>
                     <li>
                        <n-link to="/store-location">
                            <span class="menu-text">Store Location</span>
                        </n-link>
                    </li>
                   
                </ul>
            </li>
            <li class="children">
                <n-link to="/blog">
                   Blogs
                </n-link>
            </li>
             <!-- <li class="has-children">
                <nuxt-link to="">
                    <span class="menu-text" style="font-family:'Roboto Condensed', sans-serif' !important ">About Us</span>
                </nuxt-link>
                  <span class="menu-toggle">
                    <i class="far fa-angle-down"></i>
                </span>
                 <ul class="sub-menu" style="width:260px">
                    <li>
                        <n-link to="/about-us?type=1">
                            <span class="menu-text">Our Coffee</span>
                        </n-link>
                    </li>
                    <li>
                        <n-link to="/about-us?type=2">
                            <span class="menu-text">Perfectly Brew For You</span>
                        </n-link>
                    </li>
                    <li>
                        <n-link to="/about-us?type=3">
                            <span class="menu-text">Classic & Timeless Taste</span>
                        </n-link>
                    </li>
                     <li>
                        <n-link to="/about-us?type=4">
                            <span class="menu-text">Stylish & Functional Machines </span>
                        </n-link>
                    </li>
                </ul>
            </li> -->
            <!-- <li class="has-children">
                <n-link to="">
                    <span class="menu-text">Help / Find Us</span>
                </n-link>
                <span class="menu-toggle">
                    <i class="far fa-angle-down"></i>
                </span>
                <ul class="sub-menu">
                    <li>
                        <n-link to="/faq">
                            <span class="menu-text">FAQ</span>
                        </n-link>
                    </li>
                    <li>
                        <n-link to="/our-location">
                            <span class="menu-text">Our Location</span>
                        </n-link>
                    </li>
                </ul>
            </li> -->
            <!-- <li>
                <nuxt-link to="/blog">
                    <span class="menu-text">Blog</span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/business">
                    <span class="menu-text">Business</span>
                </nuxt-link>
            </li> -->
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
        };
    },
    created() {
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
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>
