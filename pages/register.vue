<template>
    <div class="section-fluid pt-3 bg-grey" >
        <div class="container">
            <ul class="breadcrumb mb-4">
                <li>
                    <n-link to="/">Home</n-link>
                </li>
                <li class="current">Register</li>
            </ul>
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="login-form-wrapper">
                        <h3 class="title roboto-condensed-font">Register</h3>
                        <form class="login-form" @submit.prevent="onSubmit">
                            <div class="mb-3">
                                <label for="name">Name</label>
                                <input class="form-control" type="text" id="name" name="name" placeholder="Name" v-model="payload.name" />
                            </div>
                            <div class="mb-3">
                                <label for="last_name">Last Name</label>
                                <input class="form-control" type="text" id="last_name" name="last_name" placeholder="Last Name" v-model="payload.last_name" />
                            </div>
                            <div class="mb-3">
                                <label for="email">Email</label>
                                <input class="form-control" type="text" id="email" name="email" placeholder="Email" v-model="payload.email" />
                            </div>
                            <div class="mb-3">
                                <label for="dob">Date of Birth</label>
                                <input class="form-control" type="date" id="dob" name="dob" placeholder="Date of Birth" v-model="payload.dob" />
                            </div>
                            <div class="mb-3">
                                <label for="email">Gender</label>
                                <select class="form-control" v-model="payload.gender">
                                    <option value="">Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="phone">Phone</label>
                                <input class="form-control" type="number" min="0" id="phone" name="phone" placeholder="Phone" v-model="payload.phone" />
                            </div>
                           

                            <div class="mb-3">
                                <label  for="password">Password</label>
                             <b-input-group class="mt-0 mb-2">
                                <template #append>
                                <b-input-group-text class="pb-1"><strong class="text-danger"><i class="fa fa-eye text-dark" v-if="viewPass == false" @click="viewPassOption(true)"></i> <i class="fa fa-eye-slash text-dark" v-else @click="viewPassOption(false)"></i> </strong></b-input-group-text>
                                </template>
                                <b-form-input label="password"  :type="viewPass == true ? 'text' : 'password'" id="password" name="password" placeholder="Password Confirmation" v-model="payload.password"></b-form-input>
                                
                            </b-input-group>
                               <p class="small mb-0">Password must contain all of the following and indicate 'Strong': Have at least 8 characters. Contain a number.</p>
                         
                            </div>


                             <div class="mb-5">
                              <label  for="password_confirmation">Password Confirmation</label>
                             <b-input-group class="mt-0 mb-2">
                                <template #append>
                                <b-input-group-text class="pb-1"><strong class="text-danger"><i class="fa fa-eye text-dark" v-if="viewPassConf == false" @click="viewPassConfOption(true)"></i> <i class="fa fa-eye-slash text-dark" v-else @click="viewPassConfOption(false)"></i> </strong></b-input-group-text>
                                </template>
                                <b-form-input label="confirmation password"  :type="viewPassConf == true ? 'text' : 'password'" id="password_confirmation" name="password_confirmation" placeholder="Password Confirmation" v-model="payload.password_confirmation"></b-form-input>
                                
                            </b-input-group>
                               <p class="small mb-0">Password must contain all of the following and indicate 'Strong': Have at least 8 characters. Contain a number.</p>
                            </div>
                            <div class="mb-4">
                                <p class="fs-14">
                                    i have an account
                                    <nuxt-link to="/login" class="fw-700">login now</nuxt-link>
                                    .
                                </p>
                            </div>
                            <div class="single-input">
                                <button class="btn btn-primary btn-width-100" :disabled="isDisabled">
                                    {{ isDisabled ? "Processing..." : "Register" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <b-modal id="modalSuccess" title="Register Berhasil" size="md" centered no-close-on-esc no-close-on-backdrop hide-header-close>
                <template #default>
                    <p class="mb-0">Akun berhasil dibuat, silakan cek email untuk verifikasi akun.</p>
                </template>
                <template #modal-footer>
                    <button class="btn btn-md btn-primary" @click="handleRedirect()">Mengerti</button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { load } from 'recaptcha-v3'

export default {
    head() {
        return {
            title: "Register",
        };
    },
    data() {
        return {
            viewPass:false,
            viewPassConf:false,
            payload: {
                name: "",
                last_name: "",
                email: "",
                dob: "",
                gender: "",
                phone: "",
                country_phone: "ID",
                password: "",
                password_confirmation:""
            },
            isDisabled: false,
        };
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
    methods: {
      async verifyCaptcha() {
      try {
        const token = await this.$recaptcha.execute();
        const response = await this.$axios.$post(
          `/captcha-api/siteverify?secret=6LdEF1EkAAAAANngvE_tjjmpPBf5v5RNgY81ZqiB&response=${token}`
        );

        return response;
      } catch (error) {
        this.loading = false;
        return error;
      }
    },
        viewPassOption(status) {
                this.viewPass = status;
        },
          viewPassConfOption(status) {
                this.viewPassConf = status;
        },
       async onSubmit() {

        //  const response = await this.verifyCaptcha();

        // // Display error message if verification was not successful
        // if (!response.success) {
          
        //   this.$recaptcha.reset();
        //   this.loading = false;
        //   this.errorStatus = true;
        //   this.notificationMessage =
        //     "There was an error with your reCaptcha verification. Please try again.";

        //     console.log(this.notificationMessage);
        //     return;
        // }


            const { name, last_name, email, dob, gender, phone, password,password_confirmation } = this.payload;

            if (name && last_name && email && dob && gender && phone && password, password_confirmation) {
                this.isDisabled = true;
               await this.$axios
                    .post("/api/v1/publics/auth/register", this.payload)
                    .then((res) => {
                        this.$bvToast.toast("Akun berhasil dibuat", {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });

                        this.$axios.setToken(res.data.data.login_detail.token, "Bearer");
                        this.$cookies.set("token", res.data.data.login_detail.token, {
                            path: "/",
                        });
                        this.$cookies.set("email", email, { path: "/" });
                        this.$store.commit("setIsLogin", true);
                        this.$store.commit("setToken", res.data.data.login_detail.token);
                        this.isDisabled = false;

                        this.$bvModal.show("modalSuccess");

                        // if (res.data.data.user.verified_at) {
                        //     setTimeout(() => {
                        //         this.$router.push("/user/order-list");
                        //     }, 3000);
                        // } else {
                        //     setTimeout(() => {
                        //         this.$router.push("/account-verification");
                        //     }, 3000);
                        // }
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
                this.$bvToast.toast("Semua field harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
        handleRedirect() {
            this.$bvModal.hide("modalSuccess");
            this.$router.push("/account-verification");
        },
    },
    middleware: "login",
};
</script>

<style></style>
