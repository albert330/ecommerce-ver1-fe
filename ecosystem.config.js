//module.exports = {
//    apps: [
//      {
  //      name: 'jagoanvoucher.com',
//        exec_mode: 'cluster',
//        instances: '1', // Or a number of instances
 //       script: './node_modules/nuxt/bin/nuxt.js',
  //      args: 'start'
  //    }
  //  ]
 // }

module.exports = {
	apps: [
		{
			name: 'jagoanvoucher.com',

			// PENTING
			exec_mode: 'fork',
			instances: 1,

			script: './node_modules/nuxt/bin/nuxt.js',
			args: 'start',

			// LIMIT RAM
			max_memory_restart: '220M',

			// LIMIT HEAP NODE
			node_args: '--max-old-space-size=200',

			// Optional tapi bagus
			autorestart: true,
			watch: false
		}
	]
}


