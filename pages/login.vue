<template>
    <div class="section-fluid pt-3 bg-grey" >
        <div class="container">
            <ul class="breadcrumb mb-4">
                <li>
                    <n-link to="/">Home</n-link>
                </li>
                <li class="current">Login</li>
            </ul>
            <div class="row justify-content-center my-4">
                <div class="col-lg-5 col-md-7">
                    <div class="card shadow-lg border-0 rounded-lg">
                        <div class="card-body p-4 p-md-5">
                            <div class="text-center mb-4">
                                <h2 class="fw-700 mb-2">Selamat Datang</h2>
                                <p class="text-muted">Masuk ke akun Anda</p>
                            </div>

                            <form @submit.prevent="onSubmit">
                                <div class="mb-4">
                                    <label for="username" class="form-label fw-600">Email atau Nomor Telepon</label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-white border-end-0">
                                            <i class="far fa-user text-muted"></i>
                                        </span>
                                        <input
                                            class="form-control border-start-0 ps-0"
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Masukkan email atau nomor telepon"
                                            v-model="payload.username"
                                        />
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="password" class="form-label fw-600">Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-white border-end-0">
                                            <i class="far fa-lock text-muted"></i>
                                        </span>
                                        <input
                                            class="form-control border-start-0 border-end-0 ps-0"
                                            :type="viewPass ? 'text' : 'password'"
                                            id="password"
                                            name="password"
                                            placeholder="Masukkan password"
                                            v-model="payload.password"
                                        />
                                        <span class="input-group-text bg-white border-start-0 cursor-pointer" @click="viewPassOption(!viewPass)">
                                            <i class="far" :class="viewPass ? 'fa-eye-slash' : 'fa-eye'" style="color: #6c757d;"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-end mb-4">
                                    <nuxt-link to="/forgot-password" class="text-primary text-decoration-none fs-14">Lupa password?</nuxt-link>
                                </div>

                                <button class="btn btn-primary btn-lg w-100 mb-3" :disabled="isDisabled">
                                    <span v-if="isDisabled">
                                        <i class="fas fa-spinner fa-spin me-2"></i>Memproses...
                                    </span>
                                    <span v-else>Masuk</span>
                                </button>

                                <div class="text-center">
                                    <p class="fs-14 mb-0">
                                        Belum punya akun?
                                        <nuxt-link to="/register" class="fw-700 text-primary text-decoration-none">Daftar sekarang</nuxt-link>
                                    </p>
                                </div>
                            </form>
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
            title: "Login",
        };
    },
    computed: {
        ...mapState(["profile"]),
    },
     async mounted() {
    // Initialize recaptcha instance
    try {
     
      let data = await this.$recaptcha.init();
      console.log(data);
    } catch (e) {
       
      console.log(e);
    }
  },
    data() {
        return {
            payload: {
                username: "",
                password: "",

                country_phone: "ID",
            },
            isDisabled: false,
            viewPass:false,
        };
    },
    methods: {
         viewPassOption(status) {
          
                this.viewPass = status;
        },
        onSubmit() {
            const { username, password } = this.payload;

            if (username && password) {
                this.isDisabled = true;
                this.$axios
                    .post("/api/v1/publics/auth/login", this.payload)
                    .then((res) => {
                        this.$bvToast.toast("Login berhasil", {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });

                        this.$axios.setToken(res.data.data.token, "Bearer");
                        this.$cookies.set("token", res.data.data.token, { path: "/" });
                        this.$cookies.set("email", res.data.params.email, { path: "/" });
                        this.$store.commit("setIsLogin", true);
                        this.$store.commit("setToken", res.data.data.token);

                        this.isDisabled = false;

                        if (this.pathFrom?.path == "/cart") {
                            this.$router.push("/cart/checkout");
                        } else {
                            if (res.data.data.verified_at) {
                                this.$router.push("/user/order-list");
                            } else {
                                this.$router.push("/account-verification");
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$store.commit("setIsLogin", false);
                        this.$store.commit("setToken", null);
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
                this.$bvToast.toast("Email/phone number dan password harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
    },
    middleware: "login",
};
</script>

<style></style>
