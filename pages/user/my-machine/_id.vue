<template>
    <div>
        <ul class="breadcrumb mb-0">
            <li>
                <n-link to="/user/my-machine">Machine List</n-link>
            </li>
            <li class="current">Machine Detail</li>
        </ul>
        <hr class="mb-4" />
        <div class="">
            <div >
                <h6 class="lead fw-700 mb-3">Machine Info</h6>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Product</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        {{ machineDetail.product?.name }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Purchase Date</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        {{ machineDetail.purchase_date ? dateFormat(machineDetail.purchase_date) : "-" }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Serial Number</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        {{ machineDetail.serial_number }}
                    </p>
                </div>
                <div class="d-flex align-items-start mb-1">
                    <p class="mb-0" style="width: 115px">Description</p>
                    <span class="mr-2">:</span>
                    <p class="mb-0" style="width: calc(100% - 135px)">
                        {{ machineDetail.description }}
                    </p>
                </div>
            </div>
        </div>
        <hr class="my-4" />
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    layout: "dashboard",
    computed: {
        ...mapState(["assetUrl"]),
    },
    data() {
        return {
            machineDetail: {},
            machineProduct: {},
            invoiceSrc: "",
        };
    },
    mounted() {
        const email = this.$cookies.get("email");

        this.$axios
            .get("/api/v1/private/machine/show", {
                params: {
                    by_email: email,
                    by_id: this.$route.params.id,
                },
            })
            .then((res) => {
                this.machineDetail = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        dateFormat(date) {
            var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            var t = new Date(date);
            return t.getDate() + " " + monthNames[t.getMonth()] + " " + t.getFullYear();
        },
    },
};
</script>

<style lang="scss">
.shipping-info,
.machine-info {
    max-width: 360px;

    @media #{$large-mobile, $small-mobile, $extra-small-mobile} {
        max-width: 100%;
    }
}
</style>
