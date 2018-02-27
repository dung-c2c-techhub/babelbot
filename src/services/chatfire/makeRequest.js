const fetch = require('../../lib/fetch')

module.exports = token => url => body => {
	return fetch(url, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Bearer ${token}`,
	    'Content-Type': 'application/json',
	  },
	})
}
