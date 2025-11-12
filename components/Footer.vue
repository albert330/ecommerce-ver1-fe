<template>
    <div class="footer-section text-black" :class="addBackgroundColor">
        <div class="container ">
            <div class="row mx-0 mb-5 text-center justify-content-center">
                <div class="col-lg-5 text-center">
                    <h5 class="roboto-condensed-font text-white mb-2 fs-14"> {{ brandCorporateName }} </h5    >
                    <p class="lead text-white fw-300 fs-14">
                   {{ brandAddress }}
                    </p>
                </div>

            </div>
           
        </div>
        <div class="copyright  text-white py-4">
            <div class="container">
                <p class="fs-14 mb-0">Copyright &copy; {{ new Date().getFullYear() }} {{ brandCorporateName }}.</p>
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
import { mapState } from "vuex";
export default {

     
     computed: {
        ...mapState(["isLogin", "token", "cart", "showPopupCart","logoHeader","brandName","brandAddress","brandCorporateName"]),
    },
    props: ["addClassName", "addBackgroundColor"],
};
</script>
