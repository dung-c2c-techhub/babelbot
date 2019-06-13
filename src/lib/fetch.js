const fetch = require('node-fetch')

const parse = res => {
    return res.text()
        .then(text => {
            console.log('parse', text)
            try {
                return JSON.parse(text)
            } catch (e) {
                return text
            }
        })
}

module.exports = (url, options) => {
    return fetch(url, options)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                return parse(res)
            } else {
                return parse(res)
                    .then(res => { throw res })
            }
        })
}
