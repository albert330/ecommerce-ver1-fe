<template>
    <div>
        <header class="header-section header-shadow" :class="{ 'is-sticky': isSticky }">
            <div class="header-inner">
                <div class="container position-relative">
                    <div class="row justify-content-between align-items-center">
                        <!-- Header Logo Start -->
                        <div class="col-auto">
                            <div class="header-logo">
                                <n-link to="/">
                                       <img class="light-logo" :src="logoHeader" />
                                    <img class="dark-logo" :src="logoHeader" />
                                
                                </n-link>
                            </div>
                        </div>
                        <!-- Header Logo End -->

                        <!-- Header Main Menu Start -->
                        <div class="col d-none d-xl-block" >
                            <form @submit.prevent="onSubmit">
                                <div class="input-group input-group-search rounded-pill overflow-hidden">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text border-0" id="header-search"><i class="far fa-search"></i></span>
                                    </div>
                                    <input type="text" class="form-control border-0" placeholder="Cari produk.." aria-describedby="header-search" v-model="keyword" @change="onChange" />
                                </div>
                            </form>
                        </div>
                        <!-- Header Main Menu End -->

                        <!-- Header Right Start -->
                        <div class="col-auto position-static">
                            <div class="header-right">
                                <div class="inner">
                                    <div class="d-none d-xl-block mr-3">
                                        <Navigation />
                                    </div>
                                    <div class="mx-2">
                                        <div class="cursor-pointer position-relative" @click="popupCartToggle()">
                                            <i class="far fa-shopping-cart"></i>
                                            <div class="cart-badge" v-if="cart?.calculation?.total_cart > 0">{{ cart?.calculation?.total_cart }}</div>
                                        </div>
                                    </div>

                                    <div class="mx-2">
                                        <b-dropdown variant="link" toggle-class="text-decoration-none px-0" no-caret right>
                                            <template #button-content>
                                                <i class="far fa-user"></i>
                                            </template>
                                            <template v-if="isLogin && token">
                                                <b-dropdown-item to="/user/order-list">Profile</b-dropdown-item>
                                                <b-dropdown-item href="#" @click="onLogout">Logout</b-dropdown-item>
                                            </template>
                                            <template v-else>
                                                <b-dropdown-item to="/login">Login</b-dropdown-item>
                                            </template>
                                        </b-dropdown>
                                    </div>

                                    <!-- Header Mobile Menu Toggle Start -->
                                    <div class="header-mobile-menu-toggle d-xl-none ml-sm-2">
                                        <button class="toggle" @click="mobiletoggleClass('addClass', 'show-mobile-menu')">
                                            <i class="icon-top"></i>
                                            <i class="icon-middle"></i>
                                            <i class="icon-bottom"></i>
                                        </button>
                                    </div>
                                    <!-- Header Mobile Menu Toggle End -->
                                </div>
                            </div>
                        </div>
                        <!-- Header Right End -->
                    </div>
                </div>
            </div>
        </header>
        <Cart />

        <b-modal id="logoutmessage" ref="logoutmessage" title="Pesan" size="md" centered hide-footer>
					<div class="pb-3">
					<p class="text-center mt-4 mb-2 fw-700 text-capitalize"><strong>Anda telah berhasil logout</strong></p>
					</div>
				</b-modal>
    </div>

    
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "../plugins/eventBus";
export default {
    data() {
        return {
            isSticky: false,
            isHidden: true,
            keywords: "",
            keyword: "",
        };
    },
    computed: {
        ...mapState(["isLogin", "token", "cart", "showPopupCart","logoHeader"]),
    },
    mounted() {
        const cartLocal = localStorage.getItem("cart");

        if (cartLocal != null && this.isJsonString(cartLocal)) {
            const cartList = JSON.parse(cartLocal);
            this.$store.commit("setCart", { data: [...cartList.data] });

            this.$axios
                .post("/api/v1/publics/cart/create", cartList)
                .then((res) => {
                    this.$store.commit("setCart", { list: [...res.data.data.cart], out_of_stock: [...res.data.data.out_of_stock], calculation: { ...res.data.data.calculation } });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        this.keywords = this.$route.query?.keyword ?? "";
        this.keyword = this.$route.query?.keyword ?? "";

        window.addEventListener("scroll", () => {
            let scrollPos = window.scrollY;
            if (scrollPos >= 200) {
                this.isSticky = true;
            } else {
                this.isSticky = false;
            }
        });
          
        if(this.$route.query.logout == 'true')
        {
            this.$refs["logoutmessage"].show();
            this.$router.replace('/')
        }
    },

    methods: {
        clearKeyword() {
            this.keyword = null;
            this.keywords = null;
        },
        onChange(event) {
            this.keyword = event.target.value;
            this.keywords = event.target.value;
        },
        onSubmit() {
            if (this.keywords && this.keywords !== this.$store.state.keyword) {
                let query = { 
                    keyword: this.keyword,
                    category_id: this.$route.query?.category_id ?? "",
                    subcategory_id: this.$route.query?.subcategory_id ?? "",
                };
                

                this.$store.commit("setKeyword", this.keywords);
                this.$router.push({
                    path: "/product",
                    query,
                });
            }
        },
        onLogout() {
           
             localStorage.removeItem('cart');
             this.$store.commit("setCart", { data:[],list: [], out_of_stock: [], calculation: { } });
             this.$store.dispatch("logout");
               
        },
        isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        // offcanvas mobilemenu
        mobiletoggleClass(addRemoveClass, className) {
            const el = document.querySelector("#offcanvas-menu");
            if (addRemoveClass === "addClass") {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        },
        popupCartToggle() {
            this.$store.commit("setShowPopupCart", !this.showPopupCart);
            if (this.showPopupCart) {
                document.body.classList.add("overflow-hidden");
            } else {
                document.body.classList.remove("overflow-hidden");
            }
        },
    },
    created() {
        eventBus.$on("clear-header-keyword", () => {
            this.clearKeyword();
        });
    },
};
</script>
