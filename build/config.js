const path = require('path');
module.exports = {
	alias : {
		'vue-bootstrap' : path.resolve(process.cwd(), './')
	},
	vueExternals : {
		root: 'Vue',
	  commonjs: 'vue',
	  commonjs2: 'vue',
	  amd: 'vue'
	}
};