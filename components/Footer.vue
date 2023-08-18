<template>
    <div class="footer-section text-black" :class="addBackgroundColor">
        <div class="container ">
            <div class="row justify-content-between mb-5">
                <div class="col-lg-5 order-last order-lg-first">
                    <h4 class="roboto-condensed-font text-black mb-3">PT Javabica Aneka Resources</h4>
                    <p class="lead text-black fw-300">
                    Rukan Permata Senayan Jalan Tentara Pelajar No D22-26, North Grogol, Jakarta 12210
                    </p>
                </div>
                <div class="col-6 col-lg-3 pb-4 pb-lg-0">
                    <n-link to="/">
                        <img class="w-100" src="/images/logo.png" />
                    </n-link>
                </div>
            </div>
            <div class="row">
                <div class="col-auto pb-3">
                    <div class="d-flex align-items-center text-black">
                        <img class="mr-2" src="/images/phone.svg" alt="phone" />
                        <span class="lead mb-0 fw-300">+62 21 579 408 28</span>
                    </div>
                    <div class="d-flex align-items-center text-black">
                        <img class="mr-2" src="/images/mail.svg" alt="mail" />
                        <span class="lead mb-0 fw-300">info@javabica.com</span>
                    </div>
                </div>
                <div class="col-auto pb-3">
                    <p class="lead text-black mb-0 fw-700">for business inquiry</p>
                    <p class="lead text-black mb-0 fw-300">info@javabica.com</p>
                </div>
                <div class="col-auto pb-3">
                    <p class="lead text-black mb-0 fw-700">for feedback</p>
                    <p class="lead text-black mb-0 fw-300">consumer@javabica.com</p>
                </div>
            </div>
        </div>
        <div class="copyright bg-primary text-white py-4">
            <div class="container">
                <p class="fs-14 mb-0">Copyright &copy; {{ new Date().getFullYear() }} Javabica.</p>
            </div>
        </div>

        <!-- <client-only>
      <back-to-top class="scroll-top" bottom="30px">
        <i class="arrow-top fal fa-long-arrow-up"></i>
        <i class="arrow-bottom fal fa-long-arrow-up"></i>
      </back-to-top>
    </client-only> -->
    </div>
</template>

<script>
export default {
    props: ["addClassName", "addBackgroundColor"],
};
</script>
