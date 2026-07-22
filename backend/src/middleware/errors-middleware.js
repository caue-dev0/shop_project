export default function errorsHandling(err, req, res, next) {
  const status = err.status || err.statusCode || 500;

  const response = {
    error: {
      message: err.expose ? err.message : "Internal Error Server",
      type: err.type || "unknown",
      status,
    },
  };
  if (err.body) {
    response.error.body = err.body;
  }

  console.error(`[${new Date().toISOString()}] ${err.stack}`);

  res.status(status).json(response);
}
