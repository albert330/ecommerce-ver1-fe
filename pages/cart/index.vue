<template>
    <div>
        <div class="section-fluid bg-grey">
            <div class="container">
                <template v-if="!isLoading">
                    <template v-if="cartSorted.length > 0 || outOfStockSorted.length > 0">
                        <h2 class="text-center mb-5">Keranjang Belanja</h2>
                        <div class="row mb-4">
                            <div class="col-lg-8">
                                <div class="mb-4" v-if="cartSorted.length > 0">
                                    <div class="border rounded-lg d-none d-md-block bg-white p-3 mb-3" v-for="(item, index) in cartSorted" :key="'desktopCartItem' + index">
                                        <div class="d-flex align-items-center mb-3">
                                            <div class="pr-3" style="width: 13%">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="img-ratio1x1 w-100 border rounded-lg">
                                                    <img :src="assetUrl + item.product_image" />
                                                </nuxt-link>
                                            </div>
                                            <div class="pr-3" style="width: 35%">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="fw-700 mb-1">{{ item.product_name }}</nuxt-link>
                                                <p class="fs-14 mb-0">
                                                    <i>{{ item.variant_description }}</i>
                                                </p>
                                            </div>
                                            <div class="pr-3" style="width: 15%">
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
                                            <div class="d-flex justify-content-end text-right pr-3" style="width: 27%">
                                                <p class="fw-700 mb-0" v-if="item.normal_price && item.normal_price != null">
                                                    <span class="text-old-price fs-14 fw-400 mr-1">{{ convertToRupiah(item.normal_price) }}</span>
                                                    {{ convertToRupiah(item.purchase_price) }}
                                                </p>
                                                <p class="fw-700 mb-0" v-else>{{ convertToRupiah(item.purchase_price) }}</p>
                                            </div>
                                            <div class="d-flex justify-content-end text-right" style="width: 10%">
                                                <button class="btn p-0" @click="removeCartItem(item.variant_id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="fs-14 mb-1">No Pelanggan</p>
                                                <textarea class="form-control" cols="25" rows="2" v-model="item.note" @blur="onChangeNote($event, item.variant_id)"></textarea>
                                            </div>
                                            <div class="text-right ml-md-auto" v-if="item.more_information != null">
                                                <span class="fs-14 fw-700 badge badge-success mb-2">{{ item.more_information.more_cheaper_info }}</span>
                                                <p class="fs-14" v-html="item.more_information.upsale_info"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="border rounded-lg d-block d-md-none bg-white p-3 mb-3" v-for="(item, index) in cartSorted" :key="'mobileCartItem' + index">
                                        <div class="d-flex flex-column flex-md-row">
                                            <div class="d-flex mb-3 mb-md-0">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="img-ratio1x1 w-78 border rounded-lg mr-3">
                                                    <img :src="assetUrl + item.product_image" />
                                                </nuxt-link>
                                                <div>
                                                    <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="fw-700 mb-1">{{ item.product_name }}</nuxt-link>
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
                                            <div class="d-flex flex-column ml-md-auto">
                                                <div class="mb-3">
                                                    <p class="text-primary fs-14 mb-1">No Pelanggan</p>
                                                    <textarea class="form-control" cols="25" rows="2" v-model="item.note" @blur="onChangeNote($event, item.variant_id)"></textarea>
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
                                    <div class="out-of-stock border rounded-lg d-none d-md-block bg-white p-3 mb-3" v-for="(item, index) in outOfStockSorted" :key="'desktopOutOfStockItem' + index">
                                        <div class="d-flex align-items-center mb-3">
                                            <div class="pr-3" style="width: 13%">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="img-ratio1x1 w-100 border rounded-lg">
                                                    <img :src="assetUrl + item.product_image" />
                                                </nuxt-link>
                                            </div>
                                            <div class="pr-3" style="width: 35%">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="fw-700 mb-1">{{ item.product_name }}</nuxt-link>
                                                <p class="fs-14 mb-0">
                                                    <i>{{ item.variant_description }}</i>
                                                </p>
                                            </div>
                                            <div class="pr-3" style="width: 15%">
                                                <div class="d-flex align-items-center">
                                                    <button class="btn btn-outline-primary btn-qty rounded-circle p-0" @click="minQty(item.variant_id)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                        </svg>
                                                    </button>
                                                    <input type="text" class="form-control-qty mx-2" v-model="item.qty" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" @input="updateQty(item.variant_id, $event)"/>
                                                    <button class="btn btn-outline-primary btn-qty rounded-circle p-0" disabled>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-end text-right pr-3" style="width: 27%">
                                                <p class="fw-700 mb-0" v-if="item.normal_price && item.normal_price != null">
                                                    <span class="text-old-price fs-14 fw-400 mr-1">{{ convertToRupiah(item.normal_price) }}</span>
                                                    {{ convertToRupiah(item.purchase_price) }}
                                                </p>
                                                <p class="fw-700 mb-0" v-else>{{ convertToRupiah(item.purchase_price) }}</p>
                                            </div>
                                            <div class="d-flex justify-content-end text-right" style="width: 10%">
                                                <button class="btn p-0" @click="removeCartItem(item.variant_id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="fs-14 mb-1">No Pelanggan</p>
                                                <textarea class="form-control" cols="25" rows="2" v-model="item.note" @blur="onChangeNote($event, item.variant_id)"></textarea>
                                            </div>
                                            <div class="text-left ml-md-auto w-50">
                                                <p class="fs-14" v-if="item.stock > 0">Maksimal pembelian {{ item.stock }} item. Kurangi jumlah pembelian agar dapat diproses.</p>
                                                <p class="fs-14" v-else>Stok tidak tersedia</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="out-of-stock border rounded-lg d-block d-md-none bg-white p-3 mb-3" v-for="(item, index) in outOfStockSorted" :key="'mobileOutOfStockItem' + index">
                                        <div class="d-flex flex-column flex-md-row">
                                            <div class="d-flex mb-3 mb-md-0">
                                                <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="img-ratio1x1 w-78 border rounded-lg mr-3">
                                                    <img :src="assetUrl + item.product_image" />
                                                </nuxt-link>
                                                <div>
                                                    <nuxt-link :to="`/product/${item.product_slug}?product_id=${item.product_id}`" class="fw-700 mb-1">{{ item.product_name }}</nuxt-link>
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
                                            <div class="d-flex flex-column ml-md-auto">
                                                <div class="mb-3">
                                                    <p class="text-primary fs-14 mb-1">No Pelanggan</p>
                                                    <textarea class="form-control" cols="25" rows="2" v-model="item.note" @blur="onChangeNote($event, item.variant_id)"></textarea>
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
                            <div class="col-lg-4" v-if="cartSorted.length > 0">
                                <div class="bg-white p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
                                    <p class="fw-700">Total Item ({{ cart?.calculation?.total_cart }} item)</p>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <span>Total :</span>
                                        <h5 class="mb-0">{{ convertToRupiah(carts.calculation?.sub_total ?? 0) }}</h5>
                                    </div>
                                    <nuxt-link to="/cart/checkout" class="btn btn-md btn-primary btn-block text-uppercase">Lanjut ke Checkout</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="d-flex flex-column align-items-center justify-content-center text-center" style="height: 300px" v-else>
                        <h3>Keranjang Belanja Kosong</h3>

                        <nuxt-link to="/product" class="btn btn-md btn-primary">Mulai Belanja</nuxt-link>
                    </div>
                </template>
                <template v-else>
                    <h2 class="roboto-condensed-font text-center mb-5">Keranjang Belanja</h2>
                    <div class="row mb-4">
                        <div class="col-lg-8">
                            <div class="border rounded-lg d-none d-md-block bg-white p-3 mb-3" v-for="i in 3" :key="'desktopCartSkeleton' + i">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="p-2" style="width: 13%">
                                        <b-skeleton-img aspect="1:1" card-img="top rounded-lg"></b-skeleton-img>
                                    </div>
                                    <div class="p-2" style="width: 35%">
                                        <b-skeleton width="80%" animation="wave mb-2"></b-skeleton>
                                        <b-skeleton width="70%" height="12px" animation="wave mb-0"></b-skeleton>
                                    </div>
                                    <div class="p-2" style="width: 15%">
                                        <div class="d-flex align-items-center">
                                            <b-skeleton-img aspect="1:1" width="24px" height="24px" card-img="top rounded-circle"></b-skeleton-img>
                                            <b-skeleton type="input" width="40px" height="24px" animation="wave border-0 mb-0 mx-2"></b-skeleton>
                                            <b-skeleton-img aspect="1:1" width="24px" height="24px" card-img="top rounded-circle"></b-skeleton-img>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-end p-2" style="width: 27%">
                                        <b-skeleton width="60%" height="12px" animation="wave mb-0"></b-skeleton>
                                    </div>
                                    <div class="d-flex justify-content-end p-2" style="width: 10%">
                                        <b-skeleton-img aspect="1:1" width="20px" height="24px" card-img="top rounded-lg mb-0"></b-skeleton-img>
                                    </div>
                                </div>
                                <b-skeleton type="input" height="60px" animation="wave border-0 mb-3"></b-skeleton>
                            </div>
                            <div class="border rounded-lg d-block d-md-none bg-white p-3 mb-3" v-for="i in 3" :key="'mobileCartSkeleton' + i">
                                <div class="d-flex flex-column flex-md-row">
                                    <div class="d-flex mb-3 mb-md-0">
                                        <div class="w-78 mr-3">
                                            <b-skeleton-img aspect="1:1" card-img="top rounded-lg"></b-skeleton-img>
                                        </div>
                                        <div>
                                            <b-skeleton width="150px" animation="wave mb-2"></b-skeleton>
                                            <b-skeleton width="120px" height="12px" animation="wave mb-2"></b-skeleton>
                                            <b-skeleton width="100px" height="12px" animation="wave mb-0"></b-skeleton>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column ml-md-auto">
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
                        <div class="col-lg-4">
                            <div class="bg-white p-4" style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)">
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
        ...mapState(["assetUrl", "cart"]),
        cartSorted() {
            return this.carts.cart.sort((a, b) => a.variant_id - b.variant_id);
        },
        outOfStockSorted() {
            return this.carts.out_of_stock.sort((a, b) => a.variant_id - b.variant_id);
        },
    },
    data() {
        return {
            carts: {
                cart: [],
                calculation: {},
                out_of_stock: [],
            },
            cartPayload: {
                data: [],
            },
            isLoading: true,
            quantity: 1,
        };
    },
    mounted() {
        const cartTemp = [...this.cart.data];
        this.cartPayload = { data: cartTemp.map((item) => ({ ...item })) };
        this.getCart();
    },
    methods: {
        getCart() {
            this.isLoading = true;
            this.$axios
                .post("/api/v1/publics/cart/create", this.cartPayload)
                .then((res) => {
                    localStorage.setItem("cart", JSON.stringify(this.cartPayload));
                    this.$store.commit("setCart", { data: [...this.cartPayload.data.map((item) => ({ ...item }))], list: [...res.data.data.cart.map((item) => ({ ...item }))], out_of_stock: [...res.data.data.out_of_stock.map((item) => ({ ...item }))], calculation: { ...res.data.data.calculation } });

                    this.carts = res.data.data;
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
    },
};
</script>
