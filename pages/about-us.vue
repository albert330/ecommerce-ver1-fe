<template>
    <div>
        <div class="pt-0">
            <img class="w-100" src="/images/banner_about.jpg" alt="about-us" />
        </div>
        <div class="section" style="background-color: #f8f8f8">
            <div class="container-fluid py-5">
                <div class="row pt-2 pb-4">
                    <div class="col-lg-11 mx-auto">
                        <div class="gradation-process-section">
                            <div class="row">
                                <div class="col-lg-6 mx-auto">
                                    <div class="gradation-title-wrapper mb-50">

                                        <div class="section-title text-left mb-0 text-center" data-aos="fade-up">
                                            <h3 class="title text-primary fz-48 mb-4">Javabica</h3>
                                            <p class="roboto-condensed-font text-black fw-300 lh-15 mb-0 about-fs-20">Javabica Coffee is Indonesia’s premier B2B coffee chain. We currently supply coffee to over 200 hotels and restaurants, including Intercontinental Hotel Bali, Ritz Carlton Jakarta and Bali, St. Regis Bali, Westin Surabaya and more.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="ht-gradation style-01">
                                        <div class="item item-1" data-aos="fade-up" v-for="gradation in gradationData.slice(0, 5)" :key="gradation.id">
                                            <div class="line"></div>
                                            <div class="circle-wrap">
                                                <div class="mask">
                                                    <div class="wave-pulse wave-pulse-1"></div>
                                                    <div class="wave-pulse wave-pulse-2"></div>
                                                    <div class="wave-pulse wave-pulse-3"></div>
                                                </div>
                                                <h6 class="circle">{{ gradation.circle }}</h6>
                                            </div>

                                            <div class="content-wrap">
                                                <div class="text fs-12">{{ gradation.text }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-padding">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 mx-auto" :class="this.$route.query.type == 1 ?  '': 'd-none'">
                        <h2 class="title text-primary fz-48 mb-4">OUR COFFEE</h2>
                        <p class="text-black fw-300 lh-15 mb-0 about-fs-20">
                            Our coffee beans are sourced from the best farms across the world. From our local Indonesian specialty coffee farms, to Brazilian Ciwidey and more. Together with our farmers, we practice fair trade, keeping them up to date with latest global prices, latest crop harvesting techniques and more. We also provide financing to our farmers for them to expand their coffee production, withstand poor harvests, and ensure the sustainability of our precious coffee supply.
                            <br />
                            <br />
                            Our coffee is then roasted at our roastery in our Sidoarjo factory, using the latest Probat machines, ensuring the highest roasting quality. Together with our partners, we are committed to delivering the highest quality roasted beans to our customers.
                            <br />
                            <br />
                            Finally, we are Indonesia’s first zero waste coffee ecosystem. Our patented technology allows us to collect your coffee waste and turn it into a biofuel, to serve consumer and industrial needs, instead of being stored in landfill sites. Only at Javabica do you lower your carbon footprint with each cup of coffee!
                        </p>
                    </div>

                    <div class="col-lg-8 mx-auto" :class="this.$route.query.type == 2 ?  '': 'd-none'">
                       
                        <h2 class="title text-primary fz-48 mb-4">PERFECTLY BREW FOR YOU</h2>
                        <p class="text-black fw-300 lh-15 mb-0 about-fs-20">
                            Today, enjoying coffee is a lifestyle all around the world. From sitting in a cafe to brewing your own cup of coffee, or even opening a coffee shop, Javabica is here for you.
                            <br />
                            <br />
                            For us, coffee is much more than just beans and machines, but rather enjoying a delicious, classic, and timeless taste. Every bean we use has been quality tested, and every hand used to brew our coffee has been trained by our expert team of baristas.
                        </p>
                    </div>

                    <div class="col-lg-8 mx-auto" :class="this.$route.query.type == 3 ?  '': 'd-none'">
                       
                        <h2 class="title text-primary fz-48 mb-4">CLASSIC & TIMELESS TASTE</h2>
                        <p class="text-black fw-300 lh-15 mb-0 about-fs-20">
                            At Javabica we understand there is no single solution to your coffee needs. As Indonesia’s largest roastery, we have the largest selection of beans that the country has to offer. From your Aceh Gayo to a Sumatra Mandailing, from honey washed beans to wet hulled ones, Javabica’s coffee draws from the most diverse array of beans across Indonesia. Whatever your taste in coffee--be it dark and nutty to light and fruity--Javabica has the bean for you.
                            <br />
                            <br />
                            Find your own unique taste and blend at Javabica!
                        </p>
                    </div>

                    <div class="col-lg-8 mx-auto" :class="this.$route.query.type == 4 ?  '': 'd-none'">
                       
                        <h2 class="title text-primary fz-48 mb-4">STYLISH & FUNCTIONAL MACHINES</h2>
                        <p class="text-black fw-300 lh-15 mb-0 about-fs-20">
                            Javabica is the official distributor of Delonghi, Franke, and Gaggia. We combine our luxury Indonesian beans with Swiss and Italian cutting edge technology.
                            <br />
                            <br />
                            Be it a fully automatic machine--think hotel self serve counters, convenience store coffee machines--to traditional ones used in cafes, Javabica has the solution for you.
                            <br />
                            <br />
                            Find out more about the latest coffee machines out there with Javabica!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gradationData: [
                {
                    id: 1,
                    circle: "1974",
                    text: "We began roasting coffee in Surabaya, Indonesia, growing to become Indonesia’s largest coffee exporter",
                },
                {
                    id: 2,
                    circle: "2008",
                    text: "Javabica, our premium coffee retail brand was launched",
                },
                {
                    id: 3,
                    circle: "2018",
                    text: "We became the official distributor of high end coffee machines, including Delonghi, Franke, and Gaggia Milano",
                },
                {
                    id: 4,
                    circle: "2019",
                    text: "We launched Javabica Signatures, our luxury Indonesian Coffee beans",
                },
                {
                    id: 5,
                    circle: "2021",
                    text: "We patented our research to use coffee waste as a biofuel, and the first batch was used in our factory",
                },
            ],
        };
    },
    head() {
        return {
            title: "About Us",
        };
    },
};
</script>
<style scoped>
.about-fs-20 {
    font-size:1.25rem
}
</style>
