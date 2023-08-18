<template>
    <div>
        <div class="section-fluid pt-0">
            <div class="banner-product" style="display: flex; align-items: center; height: 350px; background: url(/images/banner-store-location.png) no-repeat; background-size: cover; background-position: center">
                <div class="container">
                    <h1 class="text-uppercase text-primary mb-1">Store Location</h1>
                    <ul class="breadcrumb mb-0 pt-0">
                        <li>
                            <n-link to="/">Home</n-link>
                        </li>
                        <li class="current">Store Location</li>
                    </ul>
                </div>
            </div>
            <div class="container mt-4 mt-md-5">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-4" style="gap: 16px">
                    <div class="d-flex align-items-center">
                        <span class="fw-700">Filter:</span>
                        <select class="form-control ml-2" v-model="province_selected"   @change="changeProvince()" style="min-width: 120px" >
                             <option value="null" selected>Show All</option>
                            <option :value="item.id"  v-for="item in province" :key="item.id" >{{item.name}}</option>
                        </select>
                  
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="fw-700">Urutkan:</span>
                        <select class="form-control ml-2" v-model="params.sort_type" @change="onChangeSort" style="min-width: 120px" >
                            <option value="asc">Name A-Z</option>
                            <option value="desc">Name Z-A</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3" v-if="isLoading">
                    <div class="col-md-6 col-lg-4 mb-4" v-for="i in 12" :key="i">
                        <ProductSkeleton />
                    </div>
                </div>
                <div class="row mb-3" v-else>
                    <div class="col-md-6 col-lg-4 mb-4" v-for="item in stores" :key="item.id">
                        <div class="store box-shadow" @click="selectStoreMap(item)">
                            <div class="thumbnail">
                               <div class="image">
                                    <template v-if="item.image">
                                         
                                        <img :src="assetUrl + item.image" class="image-1 ratio1x1" :alt="item.name" />
                                        <img :src="assetUrl + item.image" class="image-2 ratio1x1" :alt="item.name" />

                                    </template>
                                    <template v-else> 
                                        
                                        <img src="/images/logo.png" class="image-1 ratio1x1 p-3" alt="store-image"  />
                                         <img src="/images/logo.png" class="image-2 ratio1x1 p-3" alt="store-image"  />
                                  
                                    </template>
                                   </div>
                            </div>
                            <div class="info px-3">
                                <h6 class="title">{{ item.name }}</h6>
                                <p class="address">{{ item.description }}</p>
                                <!-- <p class="phone">(021) 57940828</p>
                                <p class="email">email@email.com</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal id="modalDetailLocation" ref="modalDetailLocation" :title="selectedStore?.name ?? ''" size="lg" centered hide-footer>
                    <div class="pb-3">
                        <div class="maps-location">
                            <div class="google-maps" v-html="selectedStore?.embed_map ?? ''"></div>
                        </div>
                    </div>
                </b-modal>
                <div class="d-flex align-items-center justify-content-center mb-5">
                    <b-pagination v-model="params.page" :total-rows="page.total" :per-page="params.per_page" prev-text="Prev" next-text="Next" first-number last-number @change="onChangePagination"></b-pagination>
                </div>
                <!-- <div class="px-3 py-4" style="border: 1px dashed #838383">
                    <div class="row justify-content-between">
                        <div class="col-lg-6 pb-3 pb-lg-0">
                            <h6 class="lead text-black text-uppercase fw-700 mb-2">Subscribe Us</h6>
                            <p class="fs-14 roboto-condensed-font mb-0">Get more inspiration, tips and exclusive offers sent straight to your inbox</p>
                        </div>
                        <div class="col-lg-5 col-xl-4">
                            <div class="d-flex align-items-center h-100">
                                <input class="form-control form-control-lg roboto-condensed-font" type="text" id="email" name="email" placeholder="Your email address" style="min-height: 47px" />
                                <button class="btn btn-primary fs-14 roboto-condensed-font text-uppercase ml-2" style="min-height: 47px; letter-spacing: 0.75px">submit</button>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    head() {
        return {
            title: "Our Location",
        };
    },
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            province_selected:null,
            stores: [],
            province: [],
            params: {
                paginate: 1,
                per_page: 12,
                page: 1,
                keyword: "",
                by_province: "",
                by_category_id: "",
                sort_by: "name",
                sort_type: "asc",
            },
            page: {
                from: null,
                to: null,
                total: 0,
            },
            isLoading: true,
            selectedStore: "",
        };
    },
    watch: {
        params: {
            handler: function (value) {
                this.getStore();
            },
            deep: true,
        },
    },
    mounted() {
        if (Object.keys(this.$route.query).length <= 0) {
            this.getStore();
        } else {
            this.params.page = this.$route.query.page ?? 1;
            this.params.keyword = this.$route.query.keyword ?? "";
            this.params.sort_by = this.$route.query.sort_by ?? "name";
            this.params.sort_type = this.$route.query.sort_type ?? "asc";

            this.getStore();
        }
    },
    methods: {
        changeProvince() {
            
            let query = { ...this.$route.query };
            this.params.page = 1;
    
            this.params.by_province = this.province_selected;
                query = { ...query, by_province: this.province_selected };

            this.$router.push({
                path: "/store-location",
                query: { ...query },
            });
        },
        getStore() {
            this.isLoading = true;
            this.stores = [];
            this.$axios
                .get("/api/v1/publics/store/show", {
                    params: this.params,
                })
                .then((res) => {
                    this.stores = res.data.data.store_list.data;
                    this.province = res.data.data.list_province;
                    this.page = {
                        from: res.data.data.from,
                        to: res.data.data.to,
                        total: res.data.data.total,
                    };
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onChangePagination(value) {
            this.$router.push({
                path: "/store-location",
                query: { ...this.$route.query, page: value },
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        onChangeSort(event) {
            const sortType = event.target.value;
            let query = { ...this.$route.query };
            this.params.page = 1;
            this.params.sort_type = sortType;
            query = { ...query, sort_type: sortType };

            this.$router.push({
                path: "/store-location",
                query: { ...query },
            });
        },
        selectStoreMap(data) {
            this.selectedStore = data;

            this.$bvModal.show("modalDetailLocation");
        },
    },
};
</script>

<style lang="scss">
.google-maps {
    position: relative;
    padding-bottom: 60%; // This is the aspect ratio
    height: 0;
    overflow: hidden;
    border-radius: 4px;

    @media #{$tablet-device,$large-mobile} {
        padding-bottom: 80%;
    }
}
.google-maps iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
}

.maps-location {
    width: 100%;

    @media #{$large-mobile} {
        width: 100%;
        max-width: 100%;
    }
}

#modalDetailLocation___BV_modal_outer_ {
    .modal {
        .modal-dialog {
            .modal-content {
                .modal-header {
                    border: none;
                    padding-bottom: 0;
                }
            }
        }
    }
}
</style>
