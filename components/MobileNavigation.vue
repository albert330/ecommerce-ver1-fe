<template>
    <div class="mobile-navigation">
        <nav class="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li class="mb-3">
                    <form @submit.prevent="onSubmit">
                        <div class="input-group input-group-search">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="header-search"><i class="far fa-search"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Cari Produk..." aria-describedby="header-search" :value="keyword" @change="onChange" />
                        </div>
                    </form>
                </li>

                <li class="menu-item-has-children">
                    <n-link to=""><h5 class="text-dark font-weight-bold text-capitalize mb-0 roboto-condensed-font">SHOP</h5></n-link>
                    <ul class="sub-menu">
                        <li @click="closeMobileMenu()">
                            <n-link to="/product">
                                <span class="menu-text">Semua Produk</span>
                            </n-link>
                        </li>
                        <li v-for="item in categories" :key="item.id" @click="closeMobileMenu()">
                            <n-link :to="{ path: '/product', query: { category_id: item.id } }">
                                <span class="menu-text">{{ item.name }}</span>
                            </n-link>
                        </li>
                    </ul>
                </li>
           
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "MobileNavMenu",
    computed: {
        ...mapState(["keyword"]),
    },
    data() {
        return {
            keywords: "",
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
    mounted() {
        this.keywords = this.$route.query?.keyword ?? "";
        const offCanvasNav = document.querySelector("#offcanvas-navigation");
        const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(".sub-menu");
        const anchorLinks = offCanvasNav.querySelectorAll("a");

        for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
            offCanvasNavSubMenu[i].insertAdjacentHTML("beforebegin", "<span class='menu-expand'><i></i></span>");
        }

        const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
        const numMenuExpand = menuExpand.length;

        for (let i = 0; i < numMenuExpand; i++) {
            menuExpand[i].addEventListener("click", (e) => {
                sideMenuExpand(e);
            });
        }

        for (let i = 0; i < anchorLinks.length; i++) {
            anchorLinks[i].addEventListener("click", () => {
                this.closeMobileMenu();
            });
        }

        const sideMenuExpand = (e) => {
            e.currentTarget.parentElement.classList.toggle("active");
        };
    },
    methods: {
        onChange(event) {
            this.keywords = event.target.value;
        },
        onSubmit() {
            if (this.keywords && this.keywords !== this.$store.state.keyword) {
                let query = { keyword: this.keywords };

                this.$store.commit("setKeyword", this.keywords);
                this.$router.push({
                    path: "/product",
                    query,
                });
                this.closeMobileMenu();
            }
        },
        closeMobileMenu() {
            const offcanvasMobileMenu = document.querySelector("#offcanvas-menu");
            offcanvasMobileMenu?.classList.remove("show-mobile-menu");
        },
    },
};
</script>

<style lang="scss">
.offcanvas-navigation {
    ul {
        padding-left: 0;
        li {
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            &.menu-item-has-children {
                &.mega--title > {
                    a {
                        font-weight: 500;
                    }
                }
                .sub-menu {
                    height: 0;
                    opacity: 0;
                    transition: 0.3s;
                    visibility: hidden;
                }
                &.active > {
                    .sub-menu {
                        height: 100%;
                        opacity: 1;
                        visibility: visible;
                        padding-left: 0;
                    }
                }
            }
            a {
                color: $dark;
                font-size: 16px;
                font-weight: 500;
                padding: 10px 0;
                display: block;
                &:hover {
                    color: $primary;
                }
                .badge {
                    background-image: linear-gradient(45deg, #fe378c 0%, #fe5b34 100%);
                }
            }
        }
    }

    ul {
        &.sub-menu {
            margin-left: 15px;
            transition: 0.4s;
            li {
                list-style: none;
                border: none;
                a {
                    color: $dark;
                    font-weight: 400;
                    &:hover {
                        color: $primary;
                    }
                }
                .sub-menu {
                    li {
                        a {
                            font-size: 13px;
                            padding: 5px 0;
                        }
                    }
                }
            }
        }
        li {
            &.menu-item-has-children {
                position: relative;
                display: block;
                a {
                    display: block;
                }

                &.active > {
                    .menu-expand {
                        background-color: rgba($primary, 0.5);
                        i {
                            &:before {
                                transform: rotate(0);
                            }
                        }
                    }
                }

                .menu-expand {
                    top: 5px;
                    right: 0;
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                    line-height: 35px;
                    position: absolute;
                    text-align: center;
                    background-color: rgba($primary, 0.2);
                    &:hover {
                        background-color: rgba($primary, 0.5);
                    }

                    i {
                        display: block;
                        border-bottom: 1px solid $white;
                        position: relative;
                        width: 10px;
                        text-align: center;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        &:before {
                            width: 100%;
                            content: "";
                            border-bottom: 1px solid $white;
                            display: block;
                            position: absolute;
                            top: 0;
                            transform: rotate(90deg);
                            transition: 0.4s;
                        }
                    }
                }
            }
        }
    }
}
</style>
