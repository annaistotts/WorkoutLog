import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

export async function listWorkouts(req, res) {
  const db = getDB();
  const items = await db.collection("workouts")
    .find({})
    .sort({ date: -1 })
    .toArray();
  res.json(items);
}

export async function updateWorkout(req, res) {
  const db = getDB();
  const { id } = req.params;
  const body = req.body || {};

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID_ID",
      message: "The provided ID is not valid."
    });
  }

  if (!body.date || typeof body.durationMin !== "number" || !body.intensity) {
    return res.status(422).json({
      error: "VALIDATION_ERROR",
      message: "Required: date (string), durationMin (number), intensity (string)."
    });
  }

  const updateDoc = {
    date: body.date,
    durationMin: body.durationMin,
    intensity: body.intensity,     
    notes: body.notes || "",
    exercises: Array.isArray(body.exercises) ? body.exercises : [],
    updatedAt: new Date()
  };

  try {
    const result = await db.collection("workouts").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Workout not found"
      });
    }

    res.json(result.value);
  } catch (error) {
    res.status(500).json({
      error: "DATABASE_ERROR",
      message: "Error updating workout"
    });
  }
}

export async function deleteWorkout(req, res) {
  const db = getDB();
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID_ID",
      message: "The provided ID is not valid."
    });
  }

  try {
    const result = await db.collection("workouts").findOneAndDelete(
      { _id: new ObjectId(id) }
    );

    if (!result.value) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Workout not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "DATABASE_ERROR",
      message: "Error deleting workout"
    });
  }
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
