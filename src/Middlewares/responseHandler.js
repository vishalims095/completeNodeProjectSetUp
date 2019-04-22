module.exports = (req, res, next) => {
    res.vishalSuccess = function(result, message = '') {
        if(message == '') {
            this.send({response : result});
        } else {
            this.send({ message, response : result});
        }
    }

    res.vishalError = function(error) {
        this.send({ message : error});
    }
    
    next();
}