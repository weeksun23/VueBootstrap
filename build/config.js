const path = require('path');
module.exports = {
	alias : {
		'vue-bootstrap' : path.resolve(process.cwd(), './'),
		'vue$': 'vue/dist/vue.esm-bundler.js'
	},
	vueExternals : {
		root: 'Vue',
	  commonjs: 'vue',
	  commonjs2: 'vue',
	  amd: 'vue'
	}
};