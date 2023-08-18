<template>
    <div class="section-fluid pt-3 bg-grey" >
        <div class="container">
            <ul class="breadcrumb mb-4">
                <li>
                    <n-link to="/">Home</n-link>
                </li>
                <li class="current">Forgot Password</li>
            </ul>
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="login-form-wrapper">
                        <h3 class="title roboto-condensed-font">Forgot Password</h3>
                        <form class="login-form" @submit.prevent="onSubmit">
                            <div class="mb-3">
                                <label for="email">Input your email address</label>
                                <input class="form-control" type="text" id="email" name="email" placeholder="" v-model="payload.email" />
                            </div>
                            <div class="single-input">
                                <button class="btn btn-primary btn-width-100" :disabled="isDisabled">
                                    {{ isDisabled ? "Processing..." : "Submit" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <b-modal id="modalSuccess" title="Forgot Password Berhasil" size="md" centered no-close-on-esc no-close-on-backdrop hide-header-close>
                <template #default>
                    <div class="py-3">
                        <p class="mb-0">Silakan cek email anda untuk memperbaharui password.</p>
                    </div>
                </template>
                <template #modal-footer>
                    <button class="btn btn-md btn-primary" @click="handleRedirect()">Mengerti</button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "Forgot Password",
        };
    },
    data() {
        return {
            payload: {
                email: "",
            },
            isDisabled: false,
        };
    },
    methods: {
        onSubmit() {
            const { email } = this.payload;

            if (email) {
                this.isDisabled = true;
                this.$axios
                    .post("/api/v1/publics/auth/reset-password", this.payload)
                    .then((res) => {
                        this.$bvToast.toast(res.data.data.message, {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                        this.isDisabled = false;

                        this.$bvModal.show("modalSuccess");
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isDisabled = false;
                        if (err?.response?.data?.data) {
                            err.response.data.data.forEach((el) => {
                                this.$bvToast.toast(el.message, {
                                    title: `Error`,
                                    variant: "danger",
                                    solid: true,
                                    appendToast: true,
                                });
                            });
                        }
                    });
            } else {
                this.$bvToast.toast("Email harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
        handleRedirect() {
            this.$bvModal.hide("modalSuccess");
            this.$router.push("/");
        },
    },
    middleware: "login",
};
</script>

<style></style>
