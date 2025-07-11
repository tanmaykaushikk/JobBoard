const jwt = require("jsonwebtoken")

exports.isRecruiter = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer " )) {
        return res.status(401).json({ message: 'Unauthorized: No Token Found' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(decode.role !== "recruiter"){
            return res.status(401).json({ message: "Not Authorized : Access recuriter actions." });
        }
        
        req.user = decode;

        next();
    }
    catch (error) {
        console.error('Auth Error: ', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
}


exports.isLoggedIn = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer " )) {
        return res.status(401).json({ message: 'Unauthorized: No Token Found' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({ message: "Not Authourize to get job listing" });
        }
        
        req.user = decode;

        next();
    }
    catch (error) {
        console.error('Auth Error: ', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
}





