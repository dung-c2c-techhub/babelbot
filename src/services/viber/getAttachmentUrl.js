const fetch = require('../../lib/fetch')

module.exports = ({ token }) => file_id => {
	return fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`)
		.then(({ result }) => `https://api.telegram.org/file/bot${token}/${result.file_path}`)
}