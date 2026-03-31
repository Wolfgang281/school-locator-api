import app from "./app.js";

import { initDB } from "./src/config/db.js";

import { PORT } from "./src/config/index.js";

initDB()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(`Error while starting the server`);
        process.exit(1);
      }
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB init failed:", err);
    process.exit(1);
  });
