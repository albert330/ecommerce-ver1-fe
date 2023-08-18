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
                <div class="col-lg-5">
                    <div class="login-form-wrapper">
                        <h3 class="title roboto-condensed-font">Login</h3>
                        <form class="login-form" @submit.prevent="onSubmit">
                            <div class="mb-3">
                                <label for="username">Email or phone number</label>
                                <input class="form-control" type="text" id="username" name="username" placeholder="Email or phone number" v-model="payload.username" />
                            </div>

                            <div class="mb-4">
                                   <label  for="password">Password</label>
                             <b-input-group class="mt-0 mb-2">
                                <template #append>
                                <b-input-group-text class="pb-1"><strong class="text-danger"><i class="fa fa-eye text-dark" v-if="viewPass == false" @click="viewPassOption(true)"></i> <i class="fa fa-eye-slash text-dark" v-else @click="viewPassOption(false)"></i> </strong></b-input-group-text>
                                </template>
                                <b-form-input label="password"  :type="viewPass == true ? 'text' : 'password'" id="password" name="password" placeholder="Password Confirmation" v-model="payload.password"></b-form-input>
                                
                            </b-input-group>
                            </div>  
                         
                            <div class="mb-4">
                                <div class="d-flex justify-content-end mb-5">
                                    <nuxt-link to="/forgot-password">Forgot your password?</nuxt-link>
                                </div>
                                <p class="fs-14">
                                    dont have an account?
                                    <nuxt-link to="/register" class="fw-700">Register now</nuxt-link>
                                    .
                                </p>
                            </div>
                            <div class="single-input">
                                <button class="btn btn-primary btn-width-100" :disabled="isDisabled">
                                    {{ isDisabled ? "Processing..." : "Log In" }}
                                </button>
                            </div>
                        </form>
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
