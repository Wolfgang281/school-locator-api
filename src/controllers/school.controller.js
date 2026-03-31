import { getPool } from "../config/db.js";

import { getDistance } from "../utils/distance.js";

export const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const pool = getPool();

    await pool.execute(
      `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
      [name.trim(), address.trim(), latitude, longitude],
    );

    res.status(201).json({ message: "School added successfully." });
  } catch (err) {
    next(err);
  }
};

export const listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    const pool = getPool();

    const [schools] = await pool.execute(`SELECT * FROM schools`);

    if (schools.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No schools found.", data: [] });
    }

    const sorted = schools
      .map((school) => ({
        ...school,
        distance: getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      message: "Schools fetched successfully.",
      data: sorted,
    });
  } catch (err) {
    next(err);
  }
};
