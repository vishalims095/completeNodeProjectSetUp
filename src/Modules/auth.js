var connection = require( './connection');
var responses  = require('./responses');
const { UserModel} =  require('../Models/userModel');
exports.requiresLogin = async (req, res, next) => {
    console.log("auth calling")
    let {access_token} = req.headers;
    if(access_token) {
        let user = await UserModel.findOne({access_token})
        if(!user) {
            (responses.authenticationErrorResponse(res));
            return;
        }
        //console.log(user)
        req.userData = user;
        next();
    } else {
        (responses.parameterMissingResponse(res));
        return
    }
}