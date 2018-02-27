
const SERVICE_NAME = 'chatfire'

module.exports = ({ userId, body, at }) => {
  return Promise.resolve([{
    service_name: SERVICE_NAME,
    service_user_id: userId,
    text: body,
    timestamp: at
  }])
}