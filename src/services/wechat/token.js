'use strict'

module.exports = function (stage) {
    const secrets = require(`../../secrets.${stage}.json`)

    return {
        appId: secrets.wechat.app_id,
        appSecret: secrets.wechat.app_secret,
        verifyToken: secrets.wechat.verify_token,
    }
}
