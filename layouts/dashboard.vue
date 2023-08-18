<template>
    <div class="main-container bg-grey">
        <Header />
        <OffCanvasMobileMenu />

        <a class="btn btn-whatsapp-float p-0" href="https://wa.me/628818182121" target="_blank">
            <img src="/images/whatsapp.png" alt="whatsapp" />
        </a>

        <div class="section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 pb-4 pb-lg-0">
                        <div class="bg-white border rounded-lg shadow-sm p-3">
                            <ul class="nav nav-dashboard">
                                <li class="nav-item">
                                    <nuxt-link class="nav-link" to="/user/order-list">Order List</nuxt-link>
                                </li>
                                <li class="nav-item">
                                    <nuxt-link class="nav-link" to="/user/profile">My Profile</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-9 pl-lg-3">
                        <div class="bg-white border rounded-lg shadow-sm p-4">
                            <Nuxt />
                        </div>
                    </div>
                </div>
                <b-modal id="modalVerification" title="Verification Required" size="md" centered no-close-on-esc no-close-on-backdrop hide-header-close>
                    <template #default>
                        <p class="mb-0">Akun anda belum terverifikasi, silakan cek email untuk verifikasi akun untuk bisa mengakses halaman ini.</p>
                    </template>
                    <template #modal-footer>
                        <button class="btn btn-md btn-primary" @click="handleRedirect()">Mengerti</button>
                    </template>
                </b-modal>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store
            .dispatch("showProfile")
            .then((res) => {
                if (!res.verified_at) {
                    this.$bvModal.show("modalVerification");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        handleRedirect() {
            this.$bvModal.hide("modalVerification");
            this.$router.push("/account-verification");
        },
    },
    middleware: "auth",
};
</script>

<style lang="scss">
.nav-dashboard {
    flex-direction: column;

    .nav-item {
        .nav-link {
            font-size: 1.125rem;
            font-size: 400;

            &.nuxt-link-active {
                color: $primary;
                font-weight: 700 !important;
            }
        }
    }
}
</style>
