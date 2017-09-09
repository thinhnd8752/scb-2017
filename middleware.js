const handleErrors = (err, req, res, next) => {
  res.status(500);
  res.send('ermagerd!');
  console.dir(err.stack);
  next();
};

module.exports = {
  errorMiddleware: handleErrors,
};
