const fetch = require('node-fetch')

const parse = res => {
    return res.text()
        .then(text => {
            try {
                return JSON.parse(text)
            } catch (e) {
                return text
            }
        })
}


module.exports = async (url, options) => {
    const result = await fetch(url, options)
        .then(async (res) => {
            let parsed;
            if (res.status === 200 || res.status === 201) {
                parsed = await parse(res);
            } else {
                parsed = await parse(res)
                    .then(res => { throw res })
            }
            return parsed;
        })
    return result;    
}