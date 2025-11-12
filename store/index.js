export const state = () => ({
    assetUrl: process.env.ASSET_URL,
    logoHeader: process.env.LOGO_HEADER,
    brandName: process.env.BRAND_NAME,
    brandAddress: process.env.BRAND_ADDRESS,
    brandCorporateName: process.env.BRAND_CORPORATENAME,
    rekeningBank: process.env.REKENING_BANK,
    rekeningNo: process.env.REKENING_NO,
    rekeningAccount: process.env.REKENING_ACCOUNT,
    sliderOne: process.env.SLIDER_HOME_1,
    isLogin: false,
    token: null,
    otp: null,
    profile: {
        id: "",
        avatar: "",
        name: "",
        last_name: "",
        email: "",
        dob: "",
        gender: "",
        phone: "",
        country_phone: "ID",
        verified_at: "",
    },
    listAddress: [],
    selectedAddressId: "",
    selectedAddress: "",
    selectedBillingId: "",
    selectedBilling: "",
    keyword: "",
    cart: {
        data: [],
        list: [],
        out_of_stock: [],
        calculation: {
            sub_total: 0,
            total_cart: 0,
            total_weight: 0,
        },
    },
    isVerified: false,
    showPopupCart: false,
});

export const mutations = {
    setIsLogin(state, payload) {
        state.isLogin = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    },
    setOTP(state, payload) {
        state.otp = payload;
    },
    setProfile(state, payload) {
        state.profile = payload;
    },
    setKeyword(state, payload) {
        state.keyword = payload;
    },
    setCart(state, payload) {
        state.cart = { ...state.cart, ...payload };
    },
    setListAddress(state, payload) {
        state.listAddress = payload;
    },
    setSelectedAddressId(state, payload) {
        state.selectedAddressId = payload;
    },
    setSelectedAddress(state, payload) {
        state.selectedAddress = payload;
    },
    setSelectedBillingId(state, payload) {
        state.selectedBillingId = payload;
    },
    setSelectedBilling(state, payload) {
        state.selectedBilling = payload;
    },
    setIsVerified(state, payload) {
        state.isVerified = payload;
    },
    setShowPopupCart(state, payload) {
        state.showPopupCart = payload;
    },
};

export const actions = {
    nuxtServerInit({ commit }) {
        if (this.$cookies.get("token")) {
            commit("setToken", this.$cookies.get("token"));
            commit("setIsLogin", true);
        }
    },
    getAddress({ commit, state }) {
        let params = {
            by_user: state.profile.id,
        };
        return this.$axios
            .get("/api/v1/private/users/shipping-address/show", {
                params,
            })
            .then((res) => {
                commit("setListAddress", res.data.data);
                if (res.data.data.length > 0 && state.selectedAddressId == "") {
                    commit("setSelectedAddressId", res.data.data[0].id);
                    commit("setSelectedAddress", res.data.data[0]);
                    // commit("setSelectedBillingId", res.data.data[0].id);
                    // commit("setSelectedBilling", res.data.data[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    showProfile({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            this.$axios
                .post("/api/v1/private/my-profile/show-profile")
                .then((res) => {
                    let data = res.data.data;
                    data.country_phone = "ID";
                    if (data.verified_at) {
                        commit("setIsVerified", true);
                    } else {
                        commit("setIsVerified", false);
                    }
                    commit("setProfile", data);
                    dispatch("getAddress");
                    resolve(res.data.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    logout({ commit }) {
        this.$axios
            .post("/api/v1/publics/auth/logout")
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });

        this.$axios.setToken(false);
        this.$cookies.remove("token");
        this.$cookies.remove("email");
        commit("setIsLogin", false);
        commit("setToken", "");
        commit("setSelectedAddressId", "");
        commit("setSelectedAddress", "");
        commit("setSelectedBillingId", "");
        commit("setSelectedBilling", "");
        this.$router.push("/?logout=true");
     
    },
};
