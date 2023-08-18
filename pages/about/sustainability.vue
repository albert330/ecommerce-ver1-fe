<template>
	<div>
		<div class="section">
			<img src="/about/sustainability.jpg" alt="">
		</div>
		<div class="section">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-6 "
						style="background-image:url('/about/sustainablity_image2.jpg');background-postion:center;background-size:cover;  display: flex;align-items: center;justify-content: center left;min-height:500px">
						<div class="col-lg-9 col-md-8 mx-auto text-center">
							<div style="margin: auto;">
								<h1 class="text-white display-1 fw-700" style="margin:0 auto; ">RESEARCH</h1>
							</div>
						</div>
					</div>
					<div class="col-lg-6 text-dark"
						style="display: flex;align-items: center;justify-content: center left;min-height:600px">
						<div class="col-lg-8 mx-lg-5" style="margin:auto;">
							<p class="lead text-primary fw-700 text-uppercase">Abstract</p>
							<p class="lead fw-300">
								The coffee industry produces a large amount of waste in the form of coffee grounds,
								which is about 45% of the processed coffee beans. This research aims to study the
								potential of waste produced by the coffee industry as an environmentally friendly
								alternative fuel (green energy) in the form of biomass briquettes. The results show that
								coffee waste briquettes have a fairly good performance as fuel, are easily burnt, and
								have an energy content that is almost the same as dry wood. By using the “hot pressing”
								method in the mechanical pressing machine, bio briquettes with a fairly good density and
								strength level can be obtained. The briquettes have a heating value of 5169 – 5500
								kcal/kg at water content of 12-12.5%, and a density of 0.35 – 0.86 g/cm3
							</p>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="section pb-5">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12 text-center pt-5">
						<h1 class="display-1 fw-700 text-primary">SHOP SUSTAINABILITY</h1>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-4 col-6 mx-auto text-center">
						   <n-link to="/product/donation?product_id=92">
						
						<div class="row">
							<div class="col-lg-8 text-center mx-auto">
								<img src="/about/icon_1.png" alt="">
							</div>
							<div class="col-lg-5 text-center mx-auto">
								<p class="lead fw-700 text-primary">DONATE TO INDONESIAN FARMERS</p>
							</div>
						</div>
						 </n-link>
					</div>
					<div class="col-lg-4 col-6 mx-auto text-center">
						<div class="row">
                            <nuxt-link to="/product?category_id=266">
							<div class="col-lg-8 text-center mx-auto">
								<img src="/about/icon_2.png" alt="">
							</div>
							<div class="col-lg-5 text-center mx-auto">
								<p class="lead fw-700 text-primary">SHOP COFFEE BRIQUETTES</p>
							</div>
                            </nuxt-link>
						</div>
					</div>
					<div class="col-lg-4 col-6 mx-auto text-center">
						<div class="row">
                            	
                          
							<div class="col-lg-8 text-center mx-auto">
								<img src="/about/icon_3.png" alt="">
							</div>
							<div class="col-lg-8 text-center mx-auto">
								<p class="lead fw-700 text-primary">PARTICIPATE IN COFFEE BRIQUETTE INITIATIVE</p>
							</div>
						</div>
					</div>
				</div>
                <div class="row mt-5">
                    <div class="col-lg-12 text-center">
                        	<nuxt-link to="/product">
                        <button class="btn btn-primary btn-lg">EXPLORE PRODUCTS</button>
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
