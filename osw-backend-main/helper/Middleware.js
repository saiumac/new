const jwt = require('jsonwebtoken');


const authenticationToken = async (req, res , next) => {
    if(req.headers.authorization!=undefined){
        const Token = req.headers.authorization.replace("Bearer ","");
        if(typeof Token !=='undefined'){
            jwt.verify(Token, "Fdi-OSW@2k24" ,(err, user) => {
                console.log(user)
                if(!err){
                    if(user){
                        req.user = user;
                        next();
                    }else{
                        res.status(401).send({ message:"Unauthorized" , err});
                    }
                }else{
                    res.status(401).send({ message:"Unauthorized" , err});
                }
            });
        }else{
            res.status(401).send({message:"Unauthorized"});
        }
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
}

const verifyToken = async (req, res , next) => {
    if(req.headers.authorization!=undefined){
        const Token = req.headers.authorization.replace("Bearer ","");
        if(Token){
            jwt.verify(Token, "Fdi-OSW@2k24" ,(err, user) => {
                if(user){
                    req.user = user;
                    next();
                }
            });
        }
    }else{
        next()
    }
}

module.exports = {authenticationToken, verifyToken};
