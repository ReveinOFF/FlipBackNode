import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");

  if (!token)
    return res.status(403).json({
      message: "Not access!",
    });

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);

    req.userId = decode._id;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Not access!",
    });
  }
};
