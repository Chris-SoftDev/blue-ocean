import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// comment out lines 7 through 22 and uncomment line 24 to bypass authentication
const verifyJWT = (req, res, next) => {
  // const authHeader = req.headers["authorization"];

  // if (!authHeader) {
  //   return res.status(401).end();
  // }

  // const token = authHeader.split(" ")[1];

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(403).end(); // invalid token
  //   }

  //   req.user = decoded.email;
  //   next();
  // });

  next();
};

export default verifyJWT;
