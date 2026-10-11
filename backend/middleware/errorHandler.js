export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Not found." });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  // Log full details server-side only
  console.error("[error]", err?.message || err);

  const isCorsBlock = err?.message === "Not allowed by CORS";
  res.status(isCorsBlock ? 403 : 500).json({
    success: false,
    message: isCorsBlock ? "Request not allowed." : "Something went wrong. Please try again.",
  });
}
