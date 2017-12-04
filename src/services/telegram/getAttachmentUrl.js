const fetch = require('node-fetch')

module.exports = ({ token }) => file_id => {
	return fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`)
		.then(handleRes)
		.then(({ result }) => `https://api.telegram.org/file/bot${token}/${result.file_path}`)
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