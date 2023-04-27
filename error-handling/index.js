module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
    return
  });

  app.use((err, req, res, _next) => {
    console.error("ERROR", req.method, req.path, err)

    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0]
      const value = err.keyValue[field]
      const errorMessage = `${field} ${value} already in use!`
      res.status(409).json({ err: [errorMessage] })
      return
    }

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(({ message }) => message)
      res.status(400).json({ err: errors })
      return
    }

    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error. Check the server console" })
      return
    }
  });
};
