import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: 'Access denied. No token provided.' });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: 'Invalid token.' });
  }
};

export { authMiddleware };
