import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // console.log("req");
    // console.log(req);
    // const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers);
    // const isCustomAuth = token.length < 500;

    // let decodedData;

    // if (token && isCustomAuth) {
    //   decodedData = jwt.verify(token, "dailydiet0404");
    //   req.userId = decodedData?.id;
    // } else {
    //   decodedData.jwt.decode(token);
    //   req.userId = decodedData?.sub;
    // }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
