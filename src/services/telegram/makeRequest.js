const fetch = require('node-fetch')
const baseUrl = 'https://api.telegram.org/bot'

module.exports = ({ token }) => path => body => {
	
	return fetch(baseUrl + token + path, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	})
	.then(handleRes)
}

const handleRes = res => {
	if (res.status == 200 || res.status == 201) {
		return res.json()
	} else {
		return res.text()
			.then(res => {
				throw new Error(res)
			})
	}
}