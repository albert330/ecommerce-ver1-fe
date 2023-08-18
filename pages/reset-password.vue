<template>
    <div class="section-fluid pt-3" style="background-color: #e4e4e4">
        <div class="container">
            <ul class="breadcrumb mb-4">
                <li>
                    <n-link to="/">Home</n-link>
                </li>
                <li class="current">Reset Password</li>
            </ul>
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="login-form-wrapper">
                        <h3 class="title mb-4">Reset Password</h3>
                        <form class="login-form" @submit.prevent="onSubmit">
                            <div class="mb-3">
                                <label for="password">New Password</label>
                              
                                 <b-input-group class="mt-0 mb-2">
                                <template #append>
                                <b-input-group-text class="pb-1"><strong class="text-danger"><i class="fa fa-eye text-dark" v-if="viewPass == false" @click="viewPassOption(true)"></i> <i class="fa fa-eye-slash text-dark" v-else @click="viewPassOption(false)"></i> </strong></b-input-group-text>
                                </template>
                                <b-form-input label="password"  :type="viewPass == true ? 'text' : 'password'" id="password" name="password" placeholder="Password Confirmation" v-model="payload.password"></b-form-input>
                                
                            </b-input-group>

                            </div>
                            <div class="mb-3">
                                <label for="password_confirmation">Confirm New Password</label>
                             
                                 <b-input-group class="mt-0 mb-2">
                                <template #append>
                                <b-input-group-text class="pb-1"><strong class="text-danger"><i class="fa fa-eye text-dark" v-if="viewPassConf == false" @click="viewPassConfOption(true)"></i> <i class="fa fa-eye-slash text-dark" v-else @click="viewPassConfOption(false)"></i> </strong></b-input-group-text>
                                </template>
                                <b-form-input label="password"  :type="viewPassConf == true ? 'text' : 'password'" id="password" name="password" placeholder="Password Confirmation" v-model="payload.password_confirmation"></b-form-input>
                                
                            </b-input-group>

                            </div>
                            <p class="small mb-4">Password must contain all of the following and indicate 'Strong': Have at least 8 characters. Contain a number. </p>
                            <div class="single-input">
                                <button class="btn btn-primary btn-width-100" :disabled="isDisabled">
                                    {{ isDisabled ? "Processing..." : "Change Password" }}
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
export default {
    head() {
        return {
            title: "Reset Password",
        };
    },
    data() {
        return {
            viewPass:false,
             viewPassConf:false,
            payload: {
                token: this.$route.query.token,
                email: this.$route.query.email,
                password: "",
                password_confirmation: "",
            },
            isDisabled: false,
        };
    },
    methods: {
           viewPassOption(status) {
                this.viewPass = status;
        },
         viewPassConfOption(status) {
                this.viewPassConf = status;
        },
        onSubmit() {
            const { password, password_confirmation } = this.payload;

            if (password && password_confirmation) {
                this.isDisabled = true;
                this.$axios
                    .post("/api/v1/publics/auth/reset-new-password", this.payload)
                    .then((res) => {
                        this.$bvToast.toast(res.data.data.message, {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                        this.isDisabled = false;
                        setTimeout(() => {
                            this.$router.push("/");
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
                this.$bvToast.toast("Password baru harus diisi", {
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
