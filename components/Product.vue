<template>
    <div class="product box-shadow">
        <div class="thumbnail">
            <n-link :to="'/product/' + slug" class="image">
                <template v-if="image && image.length > 1">
                    <img :src="assetUrl + image[0].path" class="image-1 ratio1x1" :alt="name" />
                    <img :src="assetUrl + image[1].path" class="image-2 ratio1x1" :alt="name" />
                </template>
                <template v-else-if="image && image.length == 1">
                    <img :src="assetUrl + image[0].path" class="image-1 ratio1x1" :alt="name" />
                    <img :src="assetUrl + image[0].path" class="image-2 ratio1x1" :alt="name" />
                </template>
                <template v-else>
                    <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-1 ratio1x1" :alt="name" />
                    <img src="https://dummyimage.com/640x1:1/e4e4e4/e4e4e4" class="image-2 ratio1x1" :alt="name" />
                </template>
            </n-link>
        </div>
        <div class="info px-3">
            <p class="title" style="min-height:34px;">
                <n-link :to="'/product/' + slug">{{ name }}</n-link>
            </p>
            <p class="price" v-if="purchasePrice != 0">
                {{ convertToRupiah(purchasePrice) }}
            </p>
            <a  v-else href="https://wa.me/628818182121"  target="_blank" >
                <p class="price price-null" >Hubungi Kami</p>
            </a>
            <div class="discount">
                <span class="percentage" v-if="percentage">{{ percentage }}%</span>
                <span class="old-price" v-if="percentage">{{ convertToRupiah(discountPrice) }}</span>
            </div>
            <n-link :to="'/product/' + slug" class="image w-100">
                <button class="btn btn-sm btn-primary btn-block text-uppercase">View Product</button>
            </n-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["assetUrl"]),
    },
    props: ["slug", "image", "name", "purchasePrice", "discountPrice", "percentage"],
    methods: {
        convertToRupiah(money) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(money);
        },
    },
};
</script>
