<template>
    <div>
        <div class="otp-container" ref="otpForm">
            <input type="text" class="otp-input" v-for="(item, index) in digits" :key="index" v-model="otp[index]" :autofocus="index === 0" @input="handleKeyDown($event, index)" maxlength="1" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            digits: 6,
            otp: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
            },
        };
    },
    methods: {
        handleKeyDown(event, index) {
            if (event.target.value == "") {
                this.otp[index] = null;
                const otpVal = Object.keys(this.otp)
                    .map((key) => this.otp[key])
                    .join("");
                this.$store.commit("setOTP", otpVal);

                if (index != 0) {
                    this.$refs.otpForm.children[index - 1].focus();
                }

                return;
            }

            if (new RegExp("^([0-9])$").test(parseInt(event.target.value))) {
                this.otp[index] = event.target.value;
                const otpVal = Object.keys(this.otp)
                    .map((key) => this.otp[key])
                    .join("");
                this.$store.commit("setOTP", otpVal);

                if (index != this.digits - 1) {
                    this.$refs.otpForm.children[index + 1].focus();
                }
            } else {
                this.otp[index] = null;
            }
        },
    },
};
</script>

<style lang="scss">
.otp-container {
    display: flex;
    justify-content: center;
    gap: 5px;

    .otp-input {
        width: 2rem;
        border: none;
        border-bottom: 2px solid $primary;
        text-align: center;
        font-size: 1.5rem;
    }
}
</style>
