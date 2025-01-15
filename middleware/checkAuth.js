const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");
    next();
  } catch (error) {
    res.status(401).send("Error: Invalid or expired token");
  }
};

export default checkAuth;
