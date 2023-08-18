export default function ({ store, $axios, app }) {
    $axios.setBaseURL(process.env.BASE_URL);
    $axios.setHeader("Content-Type", "application/json");

    if (store.state.token) {
        $axios.setToken(app.$cookies.get("token"), "Bearer");
    }

    $axios.onError((responseError) => {
        if (responseError.response.status === 401) {
            store.dispatch("logout");
        }
    });
}
