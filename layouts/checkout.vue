<template>
    <div>
        <div class="bg-primary header-shadow py-3">
            <div class="container ">
                <n-link to="/">
                    <img class="light-logo mx-auto" :src=" logoHeader" width="160px" />
                </n-link>
            </div>
        </div>
        <Nuxt />
        <b-modal id="modalVerification" title="Verification Required" size="md" centered no-close-on-esc no-close-on-backdrop hide-header-close>
            <template #default>
                <p class="mb-0">Akun anda belum terverifikasi, silakan cek email untuk verifikasi akun untuk bisa mengakses halaman ini.</p>
            </template>
            <template #modal-footer>
                <button class="btn btn-md btn-primary" @click="handleRedirect()">Mengerti</button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["isVerified","logoHeader"]),
    },
    mounted() {
        // this.$store.dispatch("showProfile").then((res) => {
        //     if (!res.verified_at) {
        //         this.$bvModal.show("modalVerification");
        //     } else {
        //         this.$bvModal.hide("modalVerification");
        //     }
        // });
    },
    methods: {
        handleRedirect() {
            this.$bvModal.hide("modalVerification");
            this.$router.push("/account-verification");
        },
    },
};
</script>

<style></style>
