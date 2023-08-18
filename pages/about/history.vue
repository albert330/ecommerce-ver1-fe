<template>
	<div>
		<div class="section"
			style="background-image:url('/about/about-history-bg.jpg');background-size:cover;background-repeat:no-repeat;background-position:center">
			<div class="container-fluid py-5">
				<div class="row pt-2 pb-4">
					<div class="col-lg-11 mx-auto">
						<div style=" background-color: rgba(189,195,207,0.9); padding:60px 60px 80px 60px">
							<div class="gradation-process-section">
								<div class="row">
									<div class="col-lg-12 mx-auto">
										<div class="gradation-title-wrapper mb-50">

											<div class="section-title text-left mb-0 text-center" data-aos="fade-up">
												<h3 class="title text-primary fz-48 mb-4">OUR HISTORY</h3>
												<p
													class="roboto-condensed-font text-black fw-300 lh-15 mb-0 about-fs-20">
													Javabica is Indonesia's leading B2B coffee supplier. We supply to
													over 200 hotels across all major brands--Marriott, Intercontinental
													Hotel Group, Accor, and more. We're also the leading supplier for
													cafe chains. What makes Javabica unique is not simply the quality of
													our beans and their affordability, but that we work across our
													entire ecosystem to ensure sustainable practices. From practicing
													fair trade and sharing best practices with our farmers, to our
													recently patented coffee briquettes, which utilizes coffee waste as
													a biofuel, Javabica is leading the Indonesian coffee industry in
													adopting sustainable practices. Begin your sustainable coffee
													journey with Javabica today</p>
											</div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-12">
										<div class="ht-gradation style-01">
											<div class="item item-1 text-center" data-aos="fade-up"
												v-for="gradation in gradationData.slice(0, 5)" :key="gradation.id">
												<div class="line"></div>
												<div class="circle-wrap text-center">
													<div class="mask">
														<div class="wave-pulse wave-pulse-1"></div>
														<div class="wave-pulse wave-pulse-2"></div>
														<div class="wave-pulse wave-pulse-3"></div>
													</div>
													<h6 class="circle">{{ gradation.circle }}</h6>
												</div>

												<div class="content-wrap" style="text-align:center;">
													<div class="text fs-12 fw-300">{{ gradation.text }}</div>
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
		</div>
		<div class="section">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-6 "
						style="background-image:url('/about/history_1.jpg');background-postion:center;background-size:cover;  display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-9 col-md-8 mx-auto text-center">
							<div style="margin: auto;">
								<h1 class="text-white display-1 fw-700" style="margin:0 auto; "> PERFECTLY BREWED FOR YOU</h1>
							</div>
						</div>
					</div>
					<div class="col-lg-6 bg-primary text-white" style="display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-8 mx-lg-5" style="margin:auto;" >
							<p class="lead fw-300">
								Today, enjoying coffee is a lifestyle all around the world. From sitting in a cafe to
								brewing your own cup of coffee, or even opening a coffee shop, Javabica is here for
								you.<br /><br />
								For us, coffee is much more than just beans and machines, but rather enjoying a
								delicious,
								classic, and timeless taste. Every bean we use has been quality tested, and every hand
								used
								to brew our coffee has been trained by our expert team of baristas.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="container-fluid">
				<div class="row">

					<div class="col-lg-6 text-white" style="background-color:#c02434;display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-8 col-md-5 mx-lg-5"  style="margin:auto;">
							<p class="lead fw-300">
								At Javabica we understand there is no single solution to your coffee needs. As
								Indonesia’s largest roastery, we have the largest selection of beans that the country
								has to offer. From your Aceh Gayo to a Sumatra Mandailing, from honey washed beans to
								wet hulled ones, Javabica’s coffee draws from the most diverse array of beans across
								Indonesia. Whatever your taste in coffee--be it dark and nutty to light and
								fruity--Javabica has the bean for you.
								<br />
								<br />
								<span class="fw-700">Find your own unique taste and blend at Javabica!</span>
							</p>
						</div>
					</div>
					<div class="col-lg-6 " style="background-image:url('/about/history_2.jpg');background-postion:center;background-size:cover;  display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-12 mx-auto text-center">
							<div style="margin: auto;">
								<h1 class="text-white display-1 fw-700" style="margin:0 auto; "> DISCOVER BEANS</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-6 "
						style="background-image:url('/about/history_1.jpg');background-postion:center;background-size:cover;  display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-9 col-md-8 mx-auto text-center">
							<div style="margin: auto;">
								<h1 class="text-white display-1 fw-700 text-uppercase" style="margin:0 auto; ">COFFEE Machines</h1>
							</div>
						</div>
					</div>
					<div class="col-lg-6 bg-primary text-white" style="display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-8 mx-lg-5" style="margin:auto;" >
							<p class="lead fw-300">
							Javabica is the official distributor of De'Longhi, Franke and Gaggia Coffee machines. De'Longhi is the world's largest and leading coffee machine for households and cafes. De'Longhi provides household coffee machines to brew quality coffee at affordable prices. Gaggia is your premium traditional coffee machine supplier from Milan. The Gaggia espresso is unique: the patented mechanism extracts the natural coffee oils and makes a delicious creamy layer on the top of the drink. Last but not least, discover our Franke coffee machines, your Swiss-made fully automatic machines for excellent coffee and convenience.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section" style="background-color:#f9f6f2">
			<div class="row">
				<div class="container-fluid">
					<div class="col-lg-10 mx-auto text-center" style="padding-top:80px;padding-bottom:80px;">
						<nuxt-link to="/product">
							<h1 class=" text-primary">EXPLORE PRODUCTS</h1>
						</nuxt-link>
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
				gradationData: [{
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
		font-size: 1.25rem
	}

	#overlay {}

</style>
