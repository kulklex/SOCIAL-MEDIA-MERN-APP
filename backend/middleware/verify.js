const jwt = require('jsonwebtoken')


const verify = async(req, res, next) => {
    try {
        // what is happening here is that we're fetching the token to check if it's valid
        // so the token is located in the headers, under authorization(u can use postman or console.log(token) to confirm)
        //right when we get the token, it'll be prefixed by string "Bearer  AUTHORIZED_TOKEN_STRING" so we have to split after white space which we specified below, then take the second value in index form i.e. 1
        const token = req.headers.Authorization.split(" ")[1]
        const isCustomAuth = token.length < 500          //to make sure the token length is ours, if > 500 it means it's google's auth

        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY) //this will give us the data sent, i.e in this case we're sending the email and id (check sign up in ../controllers/auth.js to confirm)
            req.userId = decodedData?.id //we're assigning the id gotten into variable req.userId

        } else {
            decodedData = jwt.decode(token) // this is specifically for the google login as we'll have to fetch the data sent, the email
            req.userId = decodedData?.sub //sub here is a google name for a specific user, it differentiates every single user
        }

        next() //the next allows you to pass whatever you wanted to pass initially before going through the authorization 
                // without it the app would stop at the authorization middleware and wouldn't know what to do, it'll cause a continuous loop in the app
                // you must add next so the app moves to the next thing
    } catch (error) {
        console.log(`Error coming from verify middleware.. ${error}`)
    }
}


module.exports = {verify}