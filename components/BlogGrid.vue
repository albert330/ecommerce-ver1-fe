<template>
	<div>
		<h2 class="fw-500 heading-center text-center mb-5">Berita Terkini</h2>
		<div class="row">
			<div class="col-md-4 pb-3 pb-md-0" v-for="i in 3" :key="i">
				<div class="blog">
					<div class="thumbnail">
						<n-link to="/blog/blog-details" class="image">
							<img src="/images/blog.png" alt="thumbnail" />
						</n-link>
					</div>
					<div class="info">
						<n-link to="/blog/blog-details" class="category">category</n-link>
						<p class="title">
							<n-link to="/blog/blog-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</n-link>
						</p>
						<n-link class="text-uppercase" to="/blog/blog-details"><u>Baca Sekarang</u></n-link>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: ['blog']
	};

</script>
