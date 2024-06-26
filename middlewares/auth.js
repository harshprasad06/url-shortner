const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const userUid = req.cookies?.uid;
   const userUid = req.headers['authorization'];
  //  console.log("userid",userUid)

  if (!userUid) return res.redirect("/login");
  const token=userUid.split('Bearer ')[1] // Bearer kjedfg54df34
  const user = getUser(token);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req,res,next) {
  // console.log("req",req)
  const userUid = req.headers['authorization'];
   console.log("userUid",userUid)

  const token=userUid.split('Bearer ')[1] // Bearer kjedfg54df34
  console.log("token",token)

  const user = getUser(token);
  req.user = user;
  next();
}

module.exports={restrictToLoggedinUserOnly,checkAuth};