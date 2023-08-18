<template>
    <div class="main-container">
        <Header />
        <OffCanvasMobileMenu />
        <a class="btn btn-whatsapp-float p-0" href="https://wa.me/628818182121" target="_blank">
            <img src="/images/whatsapp.png" alt="whatsapp" />
        </a>

        <Nuxt />

        <Footer />
    </div>
</template>

<script>
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
