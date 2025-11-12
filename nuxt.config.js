require("dotenv").config();

export default {
    generate: {
        fallback: true,
    },
    server: {
        port: 8001, // default: 3000
    },
    ssr: true,
    head: {
        title: "ecommerce",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
        ],
        link: [{ rel: "icon", type: "image/png", href: "/favicon-96x96.png" }],
    },
    css: ["assets/scss/style.scss"],
    plugins: [
        "~/plugins/vue-awesome-swiper.js",
        "~/plugins/silentbox.js",
        "~/plugins/vue2-google-maps.js",
        "~/plugins/vuejs-paginate.js",
        "~/plugins/vue-select.js",
        "~/plugins/vue-inline-svg.js",
        "~/plugins/axios.js",
        {
            src: "~/plugins/aos",
            ssr: false,
        },
        {
            src: "~/plugins/typed.js",
            ssr: true,
        },
        {
            src: "~plugins/vue-backtotop.js",
            ssr: false,
        },
    ],
   
    components: true,
    buildModules: [
        "@nuxtjs/dotenv",
        ['@nuxtjs/google-tag-manager', { id: 'G-CLYNYG152T' }],
       
    ],
    modules: [
        "bootstrap-vue/nuxt",
         "@nuxtjs/style-resources",
          "@nuxtjs/axios",
           "cookie-universal-nuxt",
           "@nuxtjs/recaptcha",
       
        ],
    recaptcha: { 
        hideBadge: false,
        siteKey: "6LdEF1EkAAAAAGLFymfUvHzi9I1SQhjoD-sofXMB", // for example
        size: "normal",
        version: 3,
        mode:"base",
        language:"",
        hideBadge:0

    },
    styleResources: {
        scss: ["~/assets/scss/_variables.scss"],
    },
    build: {
        extend(config, ctx) {},

        transpile: [/^vue2-google-maps($|\/)/],
    },
    env: {
        BASE_URL: process.env.BASE_URL,
        ASSET_URL: process.env.ASSET_URL,
    },
};
