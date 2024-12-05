import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  //creates token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // sends back the created token as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",

    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;

// so i removed, sameSite: strict, from res.cookie("jwt"), bcos we still in development
