const fetch = require('node-fetch')

const parse = res => res.json().catch(e => res.text())

module.exports = (url, options) => {
	return fetch(url, options)
		.then(res => {
	  	if (res.status == 200 || res.status == 201) {
	  		return parse(res)
	  	} else {
	  		return parse(res)
	  			.then(res => { throw res })
	  	}
	  })
}