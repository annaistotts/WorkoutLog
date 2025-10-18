import { getDB } from "../db.js";

export async function listWorkouts(req, res) {
  const db = getDB();
  const items = await db.collection("workouts")
    .find({})
    .sort({ date: -1 })
    .toArray();
  res.json(items);
}

export async function createWorkout(req, res) {
  const db = getDB();
  const body = req.body || {};

  if (!body.date || typeof body.durationMin !== "number" || !body.intensity) {
    return res.status(422).json({
      error: "VALIDATION_ERROR",
      message: "Required: date (string), durationMin (number), intensity (string)."
    });
  }

  const doc = {
    date: body.date,
    durationMin: body.durationMin,
    intensity: body.intensity,     
    notes: body.notes || "",
    exercises: Array.isArray(body.exercises) ? body.exercises : [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection("workouts").insertOne(doc);
  res.status(201).json({ _id: result.insertedId, ...doc });
}
