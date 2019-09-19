// if no error occurs and the token is verified it sends a decoded token to the user and moves next.
// If there is no token at all, an error message tells the user no token was provided.
function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'YOU SHALL NOT PASS! 🧙‍' });
      } else {
        req.decoded = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
}
