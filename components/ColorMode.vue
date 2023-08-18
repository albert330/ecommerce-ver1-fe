<template>
    <!-- theme toggler start -->
    <button class="button theme-color-toggler" @click="toggleTheme()">
        <ColorScheme placeholder="..." tag="span">
        <span v-if="$colorMode.value === 'dark'">
            <inline-svg src="/images/icons/light.svg" alt="light icon" />
        </span>
        <span v-else>
            <inline-svg src="/images/icons/dark.svg" alt="dark icon" />
        </span>
        </ColorScheme>
    </button>
    <!-- theme toggler end -->
</template>

<script>
    export default {
        methods: {
            toggleTheme() {
                if (this.$colorMode.preference !== 'dark') {
                    this.$colorMode.preference = 'dark'
                } else {
                    this.$colorMode.preference = 'light'
                }
            }
        },
    };
</script>
