const SERVICE_NAME = 'oxygen8'

module.exports = ({ MSISDN, Shortcode, Content, DateReceived }) => {
	if (!Content) return Promise.resolve([])

  var msg = {
    service_name: SERVICE_NAME,
    service_user_id: MSISDN + ':' + Shortcode,
    text: Content,
    timestamp: DateReceived 
    	? parseInt(DateReceived) * 1000 
    	: Date.now(),
  }

  return Promise.resolve([ msg ])
}
