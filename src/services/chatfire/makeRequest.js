const fetch = require('../../lib/fetch')

module.exports = ({ access_token, project_id }) => path => body => {
    return fetch(`https://${project_id}.firebaseio.com` + path, {
        body: JSON.stringify(body),
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}
