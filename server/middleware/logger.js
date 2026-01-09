export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`); // showing request in console
  next(); // going to next route
};
