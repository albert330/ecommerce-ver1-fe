<template>
    <nav class="site-main-menu">
        <ul>
        
           
            <li >
                <n-link to="/product">
                    <span class="menu-text">Lihat Produk</span>
                </n-link>
                <!-- <span class="menu-toggle">
                    <i class="far fa-angle-down"></i>
                </span> -->
                <!-- <ul class="sub-menu">
                    <li>
                        <n-link to="/product">
                            <span class="menu-text">Semua Produk</span>
                        </n-link>
                    </li>
                    <li v-for="item in categories" :key="item.id">
                        <n-link :to="{ path: '/product', query: { category_id: item.id } }">
                            <span class="menu-text">{{ item.name }}</span>
                        </n-link>
                    </li>
                </ul> -->
            </li>
        
           
           
           
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
