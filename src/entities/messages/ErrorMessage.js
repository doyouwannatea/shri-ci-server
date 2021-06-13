const Message = require('./Message')

class ErrorMessage extends Message {
    constructor(message) {
        super(message)
        this.status = 400
    }
}

module.exports = ErrorMessage