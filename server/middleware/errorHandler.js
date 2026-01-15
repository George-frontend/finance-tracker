export const errorHandler = (err, req, res, next) => {
  console.error(" ERROR MESSAGE:", err.message);
  console.error(" ERROR STACK:", err.stack);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
};
