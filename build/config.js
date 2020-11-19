const path = require('path');
module.exports = {
	alias : {
		'vue-bootstrap' : path.resolve(process.cwd(), './'),
		'vue$': 'vue/dist/vue.esm.js'
	}
};