<template>
    <div class="popup-cart" :class="{ 'show-popup-cart': showPopupCart }">
        <div class="popup-overlay" @click="$parent.popupCartToggle()"></div>
        <div class="popup-cart-inner">
            <div class="cart-header">
                <div class="title">
                    <p class="mb-1 fw-5"><b>KERANJANG BELANJA</b></p>
                    <p class="fs-14 fw-700 mb-0">Total item ({{ cart?.calculation?.total_cart }} item)</p>
                </div>
                <button class="popup-close-btn" @click="$parent.popupCartToggle()"></button>
            </div>
            <div class="cart-content bg-grey">
                <template v-if="!isLoading">
                    <template v-if="cartSorted.length > 0 || outOfStockSorted.length > 0">
                        <div class="row mb-4">
                            <div class="col-12 ">
                                <div class="mb-4" v-if="cartSorted.length > 0">
                                    <div class="border rounded-lg p-3 mb-3 bg-white" v-for="(item, index) in cartSorted" :key="'mobileCartItem' + index">
                                        <div class="d-flex flex-column">
                                            <div class="d-flex mb-3">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="img-ratio1x1 w-78 border rounded-lg mr-3">
                                                    <img :src="assetUrl + item.product_image" @click="$parent.popupCartToggle()" />
                                                </nuxt-link>
                                                <div>
                                                    <p class="fw-700 mb-1" @click="$parent.popupCartToggle()">
                                                        <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`">{{ item.product_name }}</nuxt-link>
                                                    </p>
                                                    <p class="fw-700 mb-1" v-if="item.normal_price && item.normal_price != null">
                                                        <span class="text-old-price fs-14 fw-400 mr-1">{{ convertToRupiah(item.normal_price) }}</span>
                                                        {{ convertToRupiah(item.purchase_price) }}
                                                    </p>
                                                    <p class="fw-700 mb-1" v-else>{{ convertToRupiah(item.purchase_price) }}</p>
                                                    <p class="fs-14 mb-0">
                                                        <i>{{ item.variant_description }}</i>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <div class="mb-3">
                                                    <p class="text-primary fs-14 mb-1">No Pelanggan</p>
                                                    <textarea class="form-control" cols="25" rows="2" :value="item.note" disabled style="background-color: #e9ecef; cursor: not-allowed;"></textarea>
                                                </div>
                                                <div class="d-flex align-items-center ml-auto">
                                                    <div class="mr-4">
                                                        <button class="btn p-0" @click="removeCartItem(item.variant_id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <button class="btn btn-outline-primary btn-qty rounded-circle p-0" @click="minQty(item.variant_id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                            </svg>
                                                        </button>
                                                        <input type="text" class="form-control-qty mx-2" v-model="item.qty" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" @input="updateQty(item.variant_id, $event)"/>
                                                        <button class="btn btn-outline-primary btn-qty rounded-circle p-0" @click="plusQty(item.variant_id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="mt-3" v-if="item.more_information != null">
                                                    <span class="fs-14 fw-700 badge badge-success mb-2">{{ item.more_information.more_cheaper_info }}</span>
                                                    <p class="fs-14" v-html="item.more_information.upsale_info"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="outOfStockSorted.length > 0">
                                    <h4 class="mb-1">Produk Tidak Tersedia</h4>
                                    <p class="mb-4">Produk di keranjang belanja Anda tidak tersedia.</p>
                                    <div class="out-of-stock border rounded-lg p-3 mb-3" v-for="(item, index) in outOfStockSorted" :key="'mobileOutOfStockItem' + index">
                                        <div class="d-flex flex-column">
                                            <div class="d-flex mb-3">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="img-ratio1x1 w-78 border rounded-lg mr-3">
                                                    <img :src="assetUrl + item.product_image" @click="$parent.popupCartToggle()" />
                                                </nuxt-link>
                                                <div>
                                                    <p class="fw-700 mb-1" @click="$parent.popupCartToggle()">
                                                        <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`">{{ item.product_name }}</nuxt-link>
                                                    </p>
                                                    <p class="fw-700 mb-1" v-if="item.normal_price && item.normal_price != null">
                                                        <span class="text-old-price fs-14 fw-400 mr-1">{{ convertToRupiah(item.normal_price) }}</span>
                                                        {{ convertToRupiah(item.purchase_price) }}
                                                    </p>
                                                    <p class="fw-700 mb-1" v-else>{{ convertToRupiah(item.purchase_price) }}</p>
                                                    <p class="fs-14 mb-0">
                                                        <i>{{ item.variant_description }}</i>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <div class="mb-3">
                                                    <p class="text-primary fs-14 mb-1">Catatan</p>
                                                    <textarea class="form-control" cols="25" rows="2" v-model="item.note" @blur="onChangeNote($event, item.variant_id)"></textarea>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <div class="mr-4">
                                                        <button class="btn p-0" @click="removeCartItem(item.variant_id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <button class="btn btn-outline-primary btn-qty rounded-circle p-0" @click="minQty(item.variant_id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                            </svg>
                                                        </button>
                                                        <input type="text" class="form-control-qty mx-2" v-model="item.qty" readonly />
                                                        <button class="btn btn-outline-primary btn-qty rounded-circle p-0" disabled>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="mt-3" v-if="item.more_information != null">
                                                    <span class="fs-14 fw-700 badge badge-success mb-2">{{ item.more_information.more_cheaper_info }}</span>
                                                    <p class="fs-14" v-html="item.more_information.upsale_info"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="d-flex flex-column align-items-center justify-content-center text-center" style="height: 300px" v-else>
                        <h3>Keranjang Belanja Kosong</h3>

                        <nuxt-link to="/product"><button class="btn btn-md btn-primary" @click="$parent.popupCartToggle()">Mulai Belanja</button></nuxt-link>
                    </div>
                </template>
                <template v-else>
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="border rounded-lg p-3 mb-3" v-for="i in 3" :key="'mobileCartSkeleton' + i">
                                <div class="d-flex flex-column">
                                    <div class="d-flex mb-3">
                                        <div class="w-78 mr-3">
                                            <b-skeleton-img aspect="1:1" card-img="top rounded-lg"></b-skeleton-img>
                                        </div>
                                        <div>
                                            <b-skeleton width="150px" animation="wave mb-2"></b-skeleton>
                                            <b-skeleton width="120px" height="12px" animation="wave mb-2"></b-skeleton>
                                            <b-skeleton width="100px" height="12px" animation="wave mb-0"></b-skeleton>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <b-skeleton type="input" height="60px" animation="wave border-0 mb-3" style="min-width: 180px"></b-skeleton>
                                        <div class="d-flex align-items-center ml-auto">
                                            <div class="mr-4">
                                                <b-skeleton-img aspect="1:1" width="20px" height="24px" card-img="top rounded-lg"></b-skeleton-img>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <b-skeleton-img aspect="1:1" width="24px" height="24px" card-img="top rounded-circle"></b-skeleton-img>
                                                <b-skeleton type="input" width="40px" height="24px" animation="wave border-0 mb-0 mx-2"></b-skeleton>
                                                <b-skeleton-img aspect="1:1" width="24px" height="24px" card-img="top rounded-circle"></b-skeleton-img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                                <b-skeleton width="150px" animation="wave mb-3"></b-skeleton>
                                <div class="d-flex justify-content-between mb-4">
                                    <b-skeleton height="12px" width="60px" animation="wave mb-2"></b-skeleton>
                                    <b-skeleton height="12px" width="100px" animation="wave mb-2"></b-skeleton>
                                </div>

                                <b-skeleton type="button" width="100%" animation="wave border-0"></b-skeleton>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="cart-footer" v-if="cartSorted.length > 0">
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <p class="fs-14 fw-700 mb-0">Total :</p>
                    <h5 class="mb-0">{{ convertToRupiah(cart.calculation?.sub_total ?? 0) }}</h5>
                </div>
                <button class="btn btn-md btn-primary btn-block text-uppercase" @click="checkoutAndRefreshCart(); $parent.popupCartToggle();">Checkout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    head() {
        return {
            title: "Cart",
        };
    },
    computed: {
        ...mapState(["assetUrl", "cart", "showPopupCart"]),
        cartPayload: {
            get() {
                return { data: this.cart.data.map((item) => ({ ...item })) };
            },
            set(value) {},
        },
        cartSorted() {
            return this.cart.list.map((item) => ({ ...item })).sort((a, b) => a.variant_id - b.variant_id);
        },
        outOfStockSorted() {
            return this.cart.out_of_stock.map((item) => ({ ...item })).sort((a, b) => a.variant_id - b.variant_id);
        },
    },
    data() {
        return {
            isLoading: false,
            quantity: 1,
        };
    },
    methods: {
        getCart() {
            this.isLoading = true;
            this.$axios
                .post("/api/v1/publics/cart/create", this.cartPayload)
                .then((res) => {
                    localStorage.setItem("cart", JSON.stringify(this.cartPayload));
                    this.$store.commit("setCart", { data: [...this.cartPayload.data.map((item) => ({ ...item }))], list: [...res.data.data.cart.map((item) => ({ ...item }))], out_of_stock: [...res.data.data.out_of_stock.map((item) => ({ ...item }))], calculation: { ...res.data.data.calculation } });

                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        convertToRupiah(money) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(money);
        },
        onChangeNote(event, id) {
            const cartData = [...this.cartPayload.data];
            let sameItem = cartData.filter((el) => el.variant_id == id).map((item) => ({ ...item }));
            let diffItem = cartData.filter((el) => el.variant_id != id).map((item) => ({ ...item }));
            let tempData = [];

            // if (event.target.value != "") {
            sameItem[0].note = event.target.value;
            tempData = [...sameItem, ...diffItem];
            this.cartPayload.data = [...tempData];

            this.getCart();
            // }
        },
        async removeCartItem(id) {
            const cartData = [...this.cartPayload.data];
            let restItem = cartData.filter((el) => el.variant_id != id).map((item) => ({ ...item }));

            this.cartPayload.data = [...restItem];

            await this.getCart();

            this.$bvToast.toast("Produk berhasil dihapus", {
                title: `Success`,
                variant: "success",
                solid: true,
            });
        },
        plusQty(id) {
            const cartData = [...this.cartPayload.data];
            let sameItem = cartData.filter((el) => el.variant_id == id).map((item) => ({ ...item }));
            let diffItem = cartData.filter((el) => el.variant_id != id).map((item) => ({ ...item }));
            let tempData = [];

            sameItem[0].qty += 1;
            tempData = [...sameItem, ...diffItem];
            this.cartPayload.data = [...tempData];

            this.getCart();
        },
        minQty(id) {
            const cartData = [...this.cartPayload.data];
            let sameItem = cartData.filter((el) => el.variant_id == id).map((item) => ({ ...item }));
            let diffItem = cartData.filter((el) => el.variant_id != id).map((item) => ({ ...item }));
            let tempData = [];

            if (sameItem[0].qty > 1) {
                sameItem[0].qty -= 1;
                tempData = [...sameItem, ...diffItem];
                this.cartPayload.data = [...tempData];

                this.getCart();
            }
        },
        checkoutAndRefreshCart() {
            this.getCart();

            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$router.push('/cart');
            }, 1000);
        },
        isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        updateQty(id, event) {
            const newValue = parseInt(event.target.value);

            if(newValue > 0 && newValue !== NaN){
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.inputQty(id, newValue);
                }, 2000);
            }
        },
        inputQty(id, value) {
            if(value != "" && value != 0){
                const cartData = [...this.cartPayload.data];
                let sameItem = cartData.filter((el) => el.variant_id == id).map((item) => ({ ...item }));
                let diffItem = cartData.filter((el) => el.variant_id != id).map((item) => ({ ...item }));
                let tempData = [];
    
                sameItem[0].qty = value;
                tempData = [...sameItem, ...diffItem];
                this.cartPayload.data = [...tempData];
    
                this.getCart();
            }
        },
    },
};
</script>

<style lang="scss">
.popup-cart {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 99999;

    &.show-popup-cart {
        visibility: visible;
        opacity: 1;

        .popup-cart-inner {
            transform: none;
        }
    }

    .popup-overlay {
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.7);
    }

    .popup-cart-inner {
        position: fixed;
        right: 0;
        width: 400px;
        max-width: 80%;
        height: 100%;
        text-align: left;
        transition: all 0.3s;
        transform: translateX(100%);
        cursor: default;
        background-color: $white;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: top center;
        background-size: cover;
        z-index: 1;

        .cart-header {
            display: flex;
            justify-content: space-between;
            height: 80px;
            align-items: center;
            background: $white;
            padding: 20px;
            border-bottom: 1px solid $border-color;

            .title {
                width: 170px;
            }

            .popup-close-btn {
                position: relative;
                cursor: pointer;
                height: 40px;
                width: 40px;
                flex-shrink: 0;
                background-color: transparent;
                border: none;

                &::before,
                &::after {
                    position: absolute;
                    top: 19px;
                    left: 8px;
                    content: "";
                    width: 24px;
                    height: 3px;
                    background: #222;
                    transform-origin: 50% 50%;
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }

                &::before {
                    transform: rotate(-45deg);
                }

                &::after {
                    transform: rotate(45deg);
                }

                &:hover {
                    &::before,
                    &::after {
                        transform: none;
                    }
                }
            }
        }

        .cart-content {
            height: calc(100vh - 80px - 140px);
            padding: 20px;
            overflow-y: auto;
            background: #fff;
        }

        .cart-footer {
            position: fixed;
            right: 0;
            bottom: 0;
            height: 140px;
            width: 400px;
            max-width: 80%;
            padding: 20px;
            border-top: 1px solid $border-color;
            background: #fff;
        }
    }
}
</style>
