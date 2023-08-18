export default async function ({ store, redirect }) {
    if (store.state.profile?.verified_at) {
        redirect("/");
    } else {
        redirect();
    }
}
