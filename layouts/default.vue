<template>
    <div class="main-container">
        <HeaderModel1 />
        <OffCanvasMobileMenu />
      

        <Nuxt />

        <Footer />
    </div>
</template>

<script>
import HeaderModel1 from '../components/HeaderModel1.vue';

export default {
    watch: {
        "$route.path": {
            handler: function (value) {
                if (value != "/product") {
                    this.$store.commit("setKeyword", "");
                }
            },
        },
    },
};
</script>
