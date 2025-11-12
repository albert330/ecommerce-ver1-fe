<template>
    <div>
        <div class="section pt-4" v-if="!isLoadingDetail && Object.keys(detailProduct).length > 0">
            <div class="container">
                <ul class="breadcrumb mb-4">
                    <li>
                        <n-link to="/shop">Toko</n-link>
                    </li>
                    <li>
                        <n-link to="/product">Dafar Produk</n-link>
                    </li>
                    <li class="current">
                        {{ detailProduct.product?.name ?? "" }}
                    </li>
                </ul>
                <h2 class="text-center mb-5">
                    {{ detailProduct.product?.name ?? "" }}
                </h2>
                <div class="row justify-content-center mb-5">
                    <div class="col-lg-7 pb-4 pb-lg-0">
                        <div class="d-flex align-items-center justify-content-between w-100" v-if="detailProduct?.image && detailProduct?.image?.length > 0">
                            <div style="width: 60px">
                                <div class="thumbnail-gallery">
                                    <div class="thumbnail-item" :class="{ 'thumbnail-active': activeImage == index }" v-for="(item, index) in detailProduct?.image" :key="index" @click="checkActive(index)">
                                        <img :src="assetUrl + item.path" />
                                    </div>
                                </div>
                            </div>
                            <div style="width: calc(100% - 60px - 10px)">
                                <div class="image-gallery">
                                    <div class="image-item" :class="{ 'image-active': activeImage == index }" v-for="(item, index) in detailProduct?.image" :key="index">
                                        <img :src="assetUrl + item.path" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center text-center" style="min-height: 200px" v-else>
                            <p class="mb-0">Image not available</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <template v-if="variant != null">
                            <div class="mb-3 p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)" v-if="variant?.variant_criteria !== 'NO_VARIANT'">
                                <div class="mb-4" v-if="variant?.type_parent">
                                    <p class="lead fw-700">Pilih {{ variant.type_parent }}</p>
                                    <div class="d-flex flex-wrap align-items-center" style="gap: 10px">
                                        <span class="fs-14 border rounded-lg cursor-pointer px-2 py-1" :class="index == variantParentId && 'border-primary text-primary'" v-for="(item, index) in variant.list" :key="index" @click="onChangeVariantParent(index)">
                                            {{ item.parent }}
                                        </span>
                                    </div>
                                </div>
                                <div v-if="variant?.type_child">
                                    <p class="lead fw-700">Pilih {{ variant?.type_child }}</p>
                                    <div class="d-flex flex-wrap align-items-center" style="gap: 10px">
                                        <span class="fs-14 border rounded-lg cursor-pointer px-2 py-1" :class="index == variantChildId && 'border-primary text-primary'" v-for="(item, index) in variant.list[variantParentId]?.child" :key="index" @click="onChangeVariantChild(index)">
                                            {{ item.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                                <div>
                                    <template v-if="variant.variant_criteria == 'VARIANT_LEVEL_1'">
                                        <h4 class="font-body text-text-color roboto-condensed-font mb-0">
                                            {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId].price?.purchase_price ?? variant.list[0]?.child[variantChildId].price?.purchase_price ?? 0) }}
                                        </h4>
                                        <div class="d-flex align-items-center mt-2" v-if="variant.list[variantParentId]?.child[variantChildId].price?.discount_persentage ?? variant.list[0]?.child[variantChildId].price?.discount_persentage > 0">
                                            <span class="text-discount fs-14 fw-700 rounded-lg p-1 px-2">{{ variant.list[variantParentId]?.child[variantChildId].price?.discount_persentage ?? variant.list[0]?.child[variantChildId].price?.discount_persentage }}%</span>
                                            <span class="text-old-price fs-14 fw-700 ml-2">
                                                {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId].price?.normal_price ?? variant.list[0]?.child[variantChildId].price?.normal_price ?? 0) }}
                                            </span>
                                        </div>
                                    </template>
                                    <template v-else-if="variant.variant_criteria == 'VARIANT_LEVEL_2'">
                                        <h4 class="font-body text-text-color roboto-condensed-font mb-0">
                                            {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId]?.price?.purchase_price ?? variant.list[0]?.child[variantChildId].price?.purchase_price ?? 0) }}
                                        </h4>
                                        <div class="d-flex align-items-center mt-2" v-if="variant.list[variantParentId]?.child[variantChildId]?.price?.discount_persentage ?? variant.list[0]?.child[variantChildId].price?.discount_persentage > 0">
                                            <span class="text-discount fs-14 fw-700 rounded-lg p-1 px-2">{{ variant.list[variantParentId]?.child[variantChildId]?.price?.discount_persentage ?? variant.list[0]?.child[variantChildId].price?.discount_persentage }}%</span>
                                            <span class="text-old-price fs-14 fw-700 ml-2">
                                                {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId]?.price?.normal_price ?? variant.list[0]?.child[variantChildId].price?.normal_price ?? 0) }}
                                            </span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <h4 class="text-text-color roboto-condensed-font mb-0">
                                            {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId].price?.purchase_price ?? variant.list[0]?.child[variantChildId].price?.purchase_price ?? 0) }}
                                        </h4>
                                        <div class="d-flex align-items-center mt-2" v-if="variant.list[variantParentId]?.child[variantChildId].price?.discount_persentage ?? variant.list[0]?.child[variantChildId].price?.discount_persentage > 0">
                                            <span class="text-discount fs-14 fw-700 rounded-lg p-1 px-2">{{ variant.list[variantParentId]?.child[variantChildId].price?.discount_persentage ?? variant.list[0]?.child[variantChildId].price?.discount_persentage }}%</span>
                                            <span class="text-old-price fs-14 fw-700 ml-2">
                                                {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId].price?.normal_price ?? variant.list[0]?.child[variantChildId].price?.normal_price ?? 0) }}
                                            </span>
                                        </div>
                                    </template>
                                </div>
                                <hr />
                                <div class="d-flex align-items-center mb-3">
                                    <p class="fw-700 mb-0">Jumlah</p>
                                    <div class="d-flex align-items-center ml-4">
                                        <button class="btn btn-outline-primary btn-qty rounded-circle p-0" @click="minQty">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                        <input type="text" class="form-control-qty mx-2" v-model="quantity" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"/>
                                        <button class="btn btn-outline-primary btn-qty rounded-circle p-0" @click="plusQty">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <template v-if="variant.list[variantParentId]?.child[variantChildId].stock > 0 || variant.list[variantParentId]?.child[variantChildId].is_ignore_stock === 'ACTIVE'">
                                   <p class="text-primary fs-14 mb-1">masukan no Pelanggan</p>
                                  <input class="form-control" cols="25" rows="2" v-model="note" placeholder="0812xxxxxx" > 
                                      <!-- <textarea class="form-control" cols="25" rows="2" v-model="item.note" @blur="onChangeNote($event, item.variant_id)"></textarea> -->
                                    <button class="btn btn-md btn-primary btn-block text-uppercase mt-2" @click="addToCart" v-if="!isLoadingCart">Tambahkan Ke Keranjang</button>
                                    <button class="btn btn-md btn-primary btn-block text-uppercase" disabled v-else>Harap Tunggu...</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-md btn-primary btn-block text-uppercase" disabled>Out of Stock</button>
                                </template>
                                <b-modal id="modalStock" :title="variant.list[variantParentId]?.child[variantChildId].stock > 0 ? 'Jumlah Item Melebihi Stok' : 'Stock Habis'" size="md" centered>
                                    <template #default>
                                        <p class="mb-0">{{ variant.list[variantParentId]?.child[variantChildId].stock > 0 ? `Stok yang tersedia saat ini adalah ${variant.list[variantParentId]?.child[variantChildId].stock} barang.  Jumlah item yang kamu inginkan pada produk ini melebihi stok yang tersedia. Silakan kurangi jumlah item.` : "Stok produk habis. Silakan cari produk yang lainnya." }}</p>
                                    </template>
                                    <template #modal-footer="{ cancel }">
                                        <button class="btn btn-md btn-primary" @click="cancel()">Understand</button>
                                    </template>
                                </b-modal>
                            </div>
                            <div class="mt-3 p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)" v-if="wholesale.length > 0">
                                <div class="d-flex align-items-center justify-content-between">
                                    <p class="fs-14 d-flex mb-0">See wholesale price specifications</p>
                                    <button class="btn btn-primary btn-wholesale rounded-circle" v-b-modal.modalWholesale>?</button>
                                </div>
                                <b-modal id="modalWholesale" title="Harga Grosir" centered>
                                    <template #default>
                                        <div class="d-flex align-items-center mb-4">
                                            <div class="img-wholesale mr-3">
                                                <img :src="assetUrl + detailProduct?.image[0]?.path" />
                                            </div>
                                            <p class="fw-700 mb-0">
                                                {{ detailProduct?.product?.name }}
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between pb-2">
                                            <div class="fs-14">
                                                <span class="fw-700">1</span>
                                                pcs
                                            </div>
                                            <div class="fs-14">
                                                <span class="fw-700">
                                                    {{ convertToRupiah(variant.list[variantParentId]?.child[variantChildId]?.price?.purchase_price ?? variant.list[0]?.child[variantChildId]?.price?.purchase_price ?? 0) }}
                                                </span>
                                                <span>/pcs</span>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between pb-2" v-for="(item, index) in wholesale" :key="index">
                                            <div class="fs-14">
                                                ≥
                                                <span class="fw-700">{{ item.start_qty }}</span>
                                                pcs
                                            </div>
                                            <div class="fs-14">
                                                <span class="fw-700">{{ convertToRupiah(item.price) }}</span>
                                                <span>/pcs</span>
                                            </div>
                                        </div>
                                    </template>
                                    <template #modal-footer="{ hide }">
                                        <button class="btn btn-md btn-primary" @click="hide()">Understand</button>
                                    </template>
                                </b-modal>
                            </div>
                            <!--bagian ini di keluarin lagi kalo udah meeting sama tari dan VY-->
                            <div class="mt-3 p-4 product_desc-ecommerce" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)" v-if="detailProduct.product?.information">
                                <h3>Information</h3>
                                <hr />

                                <div v-html="detailProduct.product?.information ?? ''"></div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                                <p class="small">Contact us to inquire about this product</p>
                                <a href="https://wa.me/628818182121" target="_blank">
                                    <button class="btn btn-block btn-primary btn-block text-uppercase">Contact us</button>
                                </a>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="row justify-content-center pb-5">
                    <div class="col-lg-7 product_desc-ecommerce">
                        <h3>Detail</h3>
                        <hr />
                        <div v-html="detailProduct.product?.desc ?? ''"></div>
                    </div>
                    <div class="col-lg-4"></div>
                </div>
            </div>
        </div>
        <div class="section pt-4" v-else>
            <div class="container">
                <div class="breadcrumb d-flex align-items-center mb-5">
                    <div class="d-flex align-items-center" v-for="i in 3" :key="i">
                        <b-skeleton width="50px" height="12px" animation="wave mb-0"></b-skeleton>
                        <span class="small mx-2 mb-0" v-if="i < 3">/</span>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-5">
                    <b-skeleton width="250px" animation="wave mb-0"></b-skeleton>
                </div>
                <div class="row justify-content-center mb-5">
                    <div class="col-lg-7 pb-4 pb-lg-0">
                        <div class="d-flex align-items-center justify-content-between w-100">
                            <div class="d-flex flex-column" style="width: 60px; gap: 10px">
                                <b-skeleton-img aspect="1:1" width="58px" card-img="top rounded-lg" v-for="i in 5" :key="i"></b-skeleton-img>
                            </div>
                            <div style="width: calc(100% - 60px - 10px)">
                                <b-skeleton-img aspect="1:1" card-img="top rounded-lg"></b-skeleton-img>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                            <b-skeleton width="150px" animation="wave mb-3"></b-skeleton>
                            <b-skeleton height="12px" animation="wave mb-0"></b-skeleton>
                            <hr />
                            <b-skeleton height="12px" width="50px" animation="wave mb-2"></b-skeleton>
                            <b-skeleton type="input" height="20px" animation="wave border-0 mb-4"></b-skeleton>
                            <b-skeleton type="button" width="100%" animation="wave border-0 mb-2"></b-skeleton>
                            <b-skeleton height="12px" animation="wave mb-0"></b-skeleton>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center pb-5">
                    <div class="col-lg-7">
                        <b-skeleton width="100px" animation="wave mb-3"></b-skeleton>
                        <b-skeleton height="12px" animation="wave mb-2" v-for="i in 8" :key="i"></b-skeleton>
                    </div>
                    <div class="col-lg-4"></div>
                </div>
            </div>
        </div>
        <section class="section py-5 mt-3" style="background-color: #f8f8f8" v-if="!isLoadingRelated && relatedProducts.length > 0">
            <div class="container">
                <div class="row text-center">
                    <div class="col-lg-12">
                        <h2 class="roboto-condensed-font text-center mb-5">Produk Lainnya</h2>
                    </div>
                </div>
                <div class="row" v-if="!isLoadingRelated && relatedProducts.length > 0">
                    <div class="col-6 col-lg-3" v-for="(item, index) in relatedProducts" :key="index">
                        <div class="mb-4">
                            <Product :slug="item.product.slug + '?product_id=' + item.product.id" :image="item.image" :name="item.product.name" :purchasePrice="item.variant_price[0]?.price.purchase_price ?? 0" :discountPrice="item.variant_price[0]?.price.normal_price ?? 0" :percentage="item.variant_price[0]?.price.discount_persentage ?? 0" />
                        </div>
                    </div>
                </div>
                <div class="text-center" v-if="!isLoadingRelated && relatedProducts.length === 0">
                    <p>Other products not found</p>
                </div>
                <div class="row" v-if="isLoadingRelated">
                    <div class="col-6 col-lg-3" v-for="i in 4" :key="i">
                        <ProductSkeleton />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    async asyncData({ query, $axios }) {
        const { product_id } = query;

        return await $axios
            .get("/api/v1/publics/product/show", {
                params: {
                    by_id: product_id,
                    is_detail: 1,
                },
            })
            .then((res) => {
                return { productDetailSEO: res.data.data };
            })
            .catch((err) => {
                console.log(err);
            });
    },
    head() {
        return {
            title: this.productDetailSEO?.seo?.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.productDetailSEO?.seo?.meta_description,
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.productDetailSEO?.seo?.meta_keyword,
                },
            ],
        };
    },
    computed: {
        ...mapState(["assetUrl", "cart", "showPopupCart"]),
        variant() {
            return this.detailProduct?.variant;
        },
        wholesale() {
            return this.detailProduct?.wholesale;
        },
        variantId() {
            return this.variant?.list[this.variantParentId]?.child[this.variantChildId]?.id ?? 0;
        },
    },
    data() {
        return {
            cartPayload: {
                data: [],
            },
            activeImage: 0,
            detailProduct: {},
            relatedProducts: [],
            variantParentId: 0,
            variantChildId: 0,
            quantity: 1,
            note: "",
            isLoadingDetail: true,
            isLoadingRelated: true,
            isLoadingCart: false,
            imageOption: {
                loop: true,
                loopedSlides: 5,
                effect: "fade",
            },
            thumbnailOption: {
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: true,
            },
        };
    },
    mounted() {
        const cartTemp = [...this.cart.data];
        this.cartPayload = { data: cartTemp.map((item) => ({ ...item })) };

        this.getDetailProduct();
    },
    methods: {
        getDetailProduct() {
            this.$axios
                .get("/api/v1/publics/product/show", {
                    params: {
                        by_id: this.$route.query?.product_id ?? 1,
                        is_detail: 1,
                    },
                })
                .then((res) => {
                    this.detailProduct = res.data.data;
                    this.isLoadingDetail = false;
                    this.getRelatedProduct(res.data.data.category[0].id);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRelatedProduct(category_id) {
            this.$axios
                .get("/api/v1/publics/product/show", {
                    params: {
                        paginate: 1,
                        per_page: 4,
                        page: 1,
                        except_product_id: this.$route.query?.product_id ?? 1,
                        by_category_id: category_id,
                        get_random: 1,
                    },
                })
                .then((res) => {
                    this.relatedProducts = res.data.data.data;
                    this.isLoadingRelated = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        addToCart() {
            const cartData = [...this.cart.data];
            const sameItem = cartData.map((item) => ({ ...item })).filter((el) => el.variant_id == this.variantId);
            const diffItem = cartData.map((item) => ({ ...item })).filter((el) => el.variant_id != this.variantId);
            let tempData = [];

            if(this.note == "") {
                this.$bvToast.toast("no pelanggan wajib diisi", {
                title: `Warning`,
                variant: "Warning",
                solid: true,
            });
            return;
            }

            if(this.note.length <= 5) {
                this.$bvToast.toast("no pelanggan harus lebih dari 5 karakter", {
                title: `Warning`,
                variant: "Warning",
                solid: true,
            });
            return;
            }

            if(parseInt(this.quantity) <= 0){
                this.quantity = 1;
            }

            if (sameItem.length > 0) {
                sameItem[0].qty = parseInt(sameItem[0].qty) + parseInt(this.quantity);
                if (sameItem[0].qty > this.variant?.list[this.variantParentId]?.child[this.variantChildId].stock && this.variant?.list[this.variantParentId]?.child[this.variantChildId].is_ignore_stock === "INACTIVE") {
                    return this.$bvModal.show("modalStock");
                }
                tempData = [...sameItem, ...diffItem];
            } else {
                if (this.quantity > this.variant?.list[this.variantParentId]?.child[this.variantChildId].stock && this.variant?.list[this.variantParentId]?.child[this.variantChildId].is_ignore_stock === "INACTIVE") {
                    return this.$bvModal.show("modalStock");
                }
                tempData = [
                    ...diffItem,
                    {
                        variant_id: this.variantId,
                        qty: parseInt(this.quantity),
                        note: this.note,
                    },
                ];
            }

            const cartList = {
                data: [...tempData],
            };
            localStorage.setItem("cart", JSON.stringify(cartList));

            this.isLoadingCart = true;
            this.$axios
                .post("/api/v1/publics/cart/create", cartList)
                .then((res) => {
                    this.$store.commit("setCart", { data: [...tempData], list: [...res.data.data.cart], out_of_stock: [...res.data.data.out_of_stock], calculation: { ...res.data.data.calculation } });
                    this.isLoadingCart = false;
                    this.$bvToast.toast("Produk berhasil ditambahkan ke keranjang", {
                        title: `Success`,
                        variant: "success",
                        solid: true,
                    });
                    this.$store.commit("setShowPopupCart", true);
                    if (this.showPopupCart) {
                        document.body.classList.add("overflow-hidden");
                    } else {
                        document.body.classList.remove("overflow-hidden");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoadingCart = false;
                    this.$bvToast.toast("Produk gagal ditambahkan ke keranjang", {
                        title: `Error`,
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        onChangeVariantParent(index) {
            this.variantParentId = index;
        },
        onChangeVariantChild(index) {
            this.variantChildId = index;
        },
        checkActive(index) {
            this.activeImage = index;
        },
        convertToRupiah(money) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(money);
        },
        plusQty() {
            this.quantity += 1;
        },
        minQty() {
            if (this.quantity > 1) {
                this.quantity -= 1;
            } else{
                this.quantity = 1;
            }
        },
    },
};
</script>

<style lang="scss">
.thumbnail-gallery {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .thumbnail-item {
        border-radius: 4px;
        border: 1px solid $border-color;
        cursor: pointer;
        height: 58px !important;
        width: 58px !important;

        img {
            border-radius: inherit;
            aspect-ratio: 1/1;
            object-fit: contain;
        }

        &.thumbnail-active {
            border-color: $secondary;
        }
    }
}

.image-gallery {
    display: flex;
    position: relative;

    .image-item {
        width: 100%;
        background: #fff;
        opacity: 0;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 4px;
        transition: opacity 0.3s ease;

        img {
            border-radius: inherit;
            aspect-ratio: 1/1;
            object-fit: contain;
        }

        &.image-active {
            opacity: 1;
            position: unset;
        }
    }
}

.img-wholesale {
    border-radius: 4px;
    border: 1px solid $border-color;
    cursor: pointer;
    height: 78px !important;
    width: 78px !important;

    img {
        border-radius: 4px;
        aspect-ratio: 1/1;
        object-fit: contain;
    }
}

#modalWholesale___BV_modal_outer_ {
    z-index: 99999 !important;
}

.taste-section {
    margin-bottom: 1.15rem;

    .taste-type {
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.25px;
        margin-bottom: 0.5rem;
    }

    .taste-level {
        display: flex;
        align-items: center;

        .item-level {
            background: $grey-ecommerce;
            border-right: 3px solid #fff;
            min-width: 20%;
            max-width: 20%;
            height: 5px;

            &:last-child {
                border-right: 0;
            }

            &.active {
                background: $primary;
            }
        }
    }
}
.product_desc-ecommerce p {
    margin: 0;
    font-weight: 300;
}
.product_desc-ecommerce table {
    border:none !important;
}
.product_desc-ecommerce table  tr td{
    padding:15px;
    
   
}
.product_desc-ecommerce table  tr{

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
   
}
.product_desc-ecommerce p strong {
    margin: 0;
    font-weight: 400;
}
.product_desc-ecommerce img {
    width: 100% !important;
}
</style>
