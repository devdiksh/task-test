import boom from 'boom'

function Responder () { }

function sendResponse (reply, code, body) {
  if (body) {
    return reply.code(code).send(body)
  }
  return reply.code(code).send()
}

Responder.sendJSONResponse = (reply, obj) => sendResponse(reply, 200, obj)

Responder.success = (reply, result) => {
  const response = {
    data: result?.data || null,
    message: result?.message || ''
  }
  return sendResponse(reply, 200, response)
}

Responder.failed = (reply, errorObj) => {
  if (errorObj) {
    const errorKeys = Object.keys(errorObj)
    const errorName = errorKeys && errorKeys.length && errorKeys[0]
    const boomError = boom[errorName]()

    reply
      .code(boomError.output.statusCode || 500)
      .send({
        httpStatusCode: boomError.output.statusCode || 500,
        httpStatusMessage: boomError.output.payload.message || 'Internal Error',
        error: errorObj[errorName] || {}
      })
  }
}

export default Responder
