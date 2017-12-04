const test = require('tap').test
const nock = require('nock')
const getAttachmentUrl = require('../getAttachmentUrl')

const telegramNock = nock('https://api.telegram.org')
const credentials = {
	token: 'token123',
}

test('makes request', assert => {
  telegramNock.get('/bottoken123/getFile?file_id=file123')
	  .reply(200, {
	    file_path: 'filepath456'
	  })

	var expected = 'https://api.telegram.org/file/bottoken123/filepath456'
  return getAttachmentUrl(credentials)('file123')
    .then(res => assert.deepEquals(res, expected, 'gets url from file_id'))
})
