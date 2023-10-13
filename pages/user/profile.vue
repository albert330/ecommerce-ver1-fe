<template>
    <div class="row">
        <div class="col-lg-7">
            <h3 class="text-uppercase mb-0">My Profile</h3>
            <hr />
            <form @submit.prevent="onUpdateProfile" autocomplete="off" class="mb-5">
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input class="form-control" type="text" id="email" name="email" placeholder="Email" v-model="payload.email" disabled />
                </div>
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" id="name" name="name" placeholder="Name" v-model="payload.name" />
                </div>
                <div class="mb-3">
                    <label for="last_name">Last Name</label>
                    <input class="form-control" type="text" id="last_name" name="last_name" placeholder="Last Name" v-model="payload.last_name" />
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
                    <input class="form-control" type="text" id="phone" name="phone" placeholder="Phone" v-model="payload.phone" />
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" :disabled="isDisabled">
                        {{ isDisabled ? "Processing..." : "Update Profile" }}
                    </button>
                </div>
            </form>
        </div>
        <div class="col-lg-5">
            <h3 class="text-uppercase mb-0">Change Password</h3>
            <hr />
            <form @submit.prevent="onChangePassword" autocomplete="off" class="mb-5">
                <div class="mb-3">
                    <label for="current_password">Current Password</label>
                    <input class="form-control" type="password" id="current_password" name="current_password" placeholder="Current Password" v-model="payload2.current_password" />
                </div>
                <div class="mb-3">
                    <label for="password">New Password</label>
                    <input class="form-control" type="password" id="password" name="password" placeholder="New Password" v-model="payload2.password" />
                </div>
                <div class="mb-3">
                    <label for="password_confirmation">Confirm New Password</label>
                    <input class="form-control" type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm New Password" v-model="payload2.password_confirmation" />
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" :disabled="isDisabled2">
                        {{ isDisabled2 ? "Processing..." : "Change Password" }}
                    </button>
                </div>
            </form>
        </div>
        <div class="col-12">
            <div class="d-flex align-items-center justify-content-between">
                <h3 class="text-uppercase mb-0">Address List</h3>
                <button class="btn btn-md btn-primary d-none d-md-block" v-b-modal.modalCreateAddress>Add new address</button>
            </div>
            <hr />
            <ListAddress col="col-lg-6" type="shipping" />
            <button class="btn btn-md btn-primary d-block d-md-none" v-b-modal.modalCreateAddress>add new  address</button>
            <b-modal id="modalCreateAddress" title="add new address" size="lg" hide-footer>
                <div class="card-body">
                    <FormAddress method="POST" detailAddress="" />
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    layout: "dashboard",
    computed: {
        ...mapState(["profile"]),
        payload() {
            return { ...this.profile };
        },
    },
    data() {
        return {
            payload2: {
                current_password: "",
                password: "",
                password_confirmation: "",
            },
            listAddress: [],
            isDisabled: false,
            isDisabled2: false,
        };
    },
    mounted() {
        this.$store.dispatch("showProfile");
    },
    methods: {
        onUpdateProfile() {
            const { name, last_name, email, dob, gender, phone } = this.payload;

            if (name && last_name && email && dob && gender && phone) {
                this.isDisabled = true;
                this.$axios
                    .put("/api/v1/private/my-profile/update-profile", this.payload)
                    .then((res) => {
                        this.$bvToast.toast("Profile berhasil diperbaharui", {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                        this.isDisabled = false;
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
                this.$bvToast.toast("Semua field harus diisi", {
                    title: `Error`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
        onChangePassword() {
            const { current_password, password_confirmation, password } = this.payload2;

            if (current_password && password_confirmation && password) {
                this.isDisabled2 = true;
                this.$axios
                    .put("/api/v1/private/my-profile/change-password", this.payload2)
                    .then((res) => {
                        this.$bvToast.toast("Berhasil mengubah password", {
                            title: `Success`,
                            variant: "success",
                            solid: true,
                        });
                        this.isDisabled2 = false;
                        this.payload2.current_password = "";
                        this.payload2.password = "";
                        this.payload2.password_confirmation = "";
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isDisabled2 = false;
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
    },
};
</script>

<style></style>
