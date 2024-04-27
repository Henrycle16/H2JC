import User from '../models/User';

export default async function auth(req, res, next) {

  console.log("IN AUTH!")
  console.log("REQ: ", req)
  // **manualId is used for route testing
  if (req.header('manualId')){
    const user = await User.findById(req.header('manualId'));
    req.body.user = user;
    console.log(req.body.user);
    next();
  } else if (req.body.user?.token){
    const token = req.body.user.token;

    console.log("Token there ", token);
    next();
  } else {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
}