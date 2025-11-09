export function validateWorkout(req, res, next) {
  const body = req.body || {};
  const errors = [];

  // Required fields
  if (!body.date) {
    errors.push("date is required");
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    errors.push("date must be in YYYY-MM-DD format");
  }

  if (typeof body.durationMin !== "number") {
    errors.push("durationMin must be a number");
  } else if (body.durationMin <= 0) {
    errors.push("durationMin must be positive");
  }

  if (!body.intensity) {
    errors.push("intensity is required");
  } else if (!["low", "medium", "high"].includes(body.intensity.toLowerCase())) {
    errors.push("intensity must be one of: low, medium, high");
  }

  // Optional fields validation
  if (body.exercises !== undefined && !Array.isArray(body.exercises)) {
    errors.push("exercises must be an array");
  }

  if (body.notes !== undefined && typeof body.notes !== "string") {
    errors.push("notes must be a string");
  }

  if (errors.length > 0) {
    return res.status(422).json({
      error: "VALIDATION_ERROR",
      message: errors.join(", ")
    });
  }

  next();
}