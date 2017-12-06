const fetch = require('node-fetch')

module.exports = (url, options) => {
	return fetch(url, options)
		.then(res => {
	  	if (res.status == 200 || res.status == 201) {
	  		return res.json()
	  	} else {
	  		return res.text()
	  			.then(res => {
	  				throw new Error(res)
	  			})
	  	}
	  })
}