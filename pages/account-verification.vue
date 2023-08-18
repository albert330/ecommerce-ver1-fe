<template>
    <div class="section-fluid section-padding bg-grey">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="login-form-wrapper bg-white text-center">
                        <h3 class="title roboto-condensed-font mb-2">Verif Your Account</h3>
                        <p class="mb-4">Masukkan kode OTP yang telah dikirim melalui Email anda.</p>
                        <div class="mb-4">
                            <OTP />
                        </div>
                        <p class="mb-30">
                            Tidak menerima OTP ?
                            <template v-if="isResend">
                                <span class="fw-700" v-if="!isResendDisabled" @click="resendOTP" style="cursor: pointer">Kirim Ulang</span>
                                <div class="spinner-border spinner-border-sm" role="status" v-else>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </template>
                            <span class="fw-700" v-else>Tunggu {{ timer }} detik</span>
                        </p>
                        <div class="single-input">
                            <button class="btn btn-primary btn-width-100" @click="onSubmit" :disabled="isDisabled">
                                {{ isDisabled ? "Processing..." : "Verifikasi" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    asyncData({ from }) {
        return { pathFrom: from };
    },
    head() {
        return {
            title: "Verif Your Account",
        };
    },
    computed: {
        ...mapState(["otp"]),
    },
    data() {
        return {
            timer: 60,
            isResend: true,
            isResendDisabled: false,
            isDisabled: false,
        };
    },
    mounted() {
        this.isResendDisabled = true;

        this.$store
            .dispatch("showProfile")
            .then((res) => {
                if (res.verified_at) {
                    return this.$router.push("/user/order-list");
                }

                this.$axios
                    .post("/api/v1/private/account-verification-email")
                    .then((res) => {
                        if (res.data.message === "email has been verify") {
                            return this.$router.push("/user/order-list");
                        }
                        this.isResendDisabled = false;
                        this.countDownTimer();
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isResendDisabled = false;
                        this.countDownTimer();
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
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        onSubmit() {
            if (this.otp && this.otp.length === 6) {
                this.isDisabled = true;
                this.$axios
                    .post("/api/v1/private/account-verification-validate", {
                        otp: this.otp,
                    })
                    .then((res) => {
                        this.$bvToast.toast(res.data.data.message, {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                        this.isDisabled = false;

                        setTimeout(() => {
                            if (this.pathFrom?.path != "") {
                                this.$router.push(this.pathFrom.path);
                            } else {
                                this.$router.push("/user/order-list");
                            }
                        }, 3000);
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
                this.$bvToast.toast("6 digit OTP harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
        resendOTP() {
            this.isResendDisabled = true;
            this.$axios
                .post("/api/v1/private/account-verification-email")
                .then((res) => {
                    this.isResendDisabled = false;
                    if (res.data.message === "email has been verify") {
                        this.$router.push("/");
                    }
                    this.$bvToast.toast(res.data.data.message, {
                        title: `Success`,
                        variant: "success",
                        solid: true,
                    });
                    this.countDownTimer();
                })
                .catch((err) => {
                    console.log(err);
                    this.isResendDisabled = false;
                    this.countDownTimer();
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
        },
        countDownTimer() {
            this.isResend = false;

            if (this.timer > 0) {
                setTimeout(() => {
                    this.timer--;
                    this.countDownTimer();
                }, 1000);
            } else {
                this.timer = 60;
                this.isResend = true;
            }
        },
    },
};
</script>

<style></style>
