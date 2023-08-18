<template>
    <div>
        <div class="section-fluid">
            <div class="container">
                <h2 class="text-center text-primary mb-5">Frequently Asked Questions</h2>
                <div class="row">
                    <div class="col-lg-10 mx-auto">
                        <div class="accordion accordion-faq" role="tablist">
                            <b-card no-body v-for="i in 5" :key="i">
                                <b-card-header header-tag="header" role="tab">
                                    <button class="btn btn-block" v-b-toggle="`faq-${i}`">FAQ {{ i }}</button>
                                </b-card-header>
                                <b-collapse :id="`faq-${i}`" accordion="faq-accordion" role="tabpanel" :visible="i == 1">
                                    <b-card-body>
                                        <p class="mb-0">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, excepturi amet aliquam quas ipsam voluptatem, at doloribus reprehenderit pariatur, asperiores voluptas? Temporibus, saepe voluptatum! Enim exercitationem quia corporis ratione dignissimos.
                                            <br />
                                            <br />
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga exercitationem est quas itaque error quaerat, illum adipisci! Accusantium cumque minima, velit perferendis doloremque sapiente cum pariatur eveniet ratione, quidem numquam!
                                        </p>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "FAQ",
        };
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.accordion-faq {
    .card {
        .card-header {
            border-bottom-color: transparent;
            background-color: #fff;
            border-bottom: 1px solid $border-color;
            // margin-bottom: 0.5rem;

            .btn {
                padding: 0;
                color: $dark;
                display: block;
                text-align: left;
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 6px;
                    border-style: solid;
                    border-width: 2px 2px 0 0;
                    border-color: $dark;
                    height: 8px;
                    width: 8px;
                    transform: rotate(135deg);
                }

                &.not-collapsed {
                    &::after {
                        top: 8px;
                        transform: rotate(-45deg);
                    }
                }
            }
        }

        .collapse {
            &.show {
                height: auto !important;
            }
        }
    }
}
</style>
