import { Router } from "express";

import { addSchool, listSchools } from "../controllers/school.controller.js";

import validateBody from "../middlewares/validateBody.middleware.js";

import validateQuery from "../middlewares/validateQuery.middleware.js";

import {
  addSchoolSchema,
  listSchoolsSchema,
} from "../validators/school.validator.js";

const router = Router();

router.post("/addSchool", validateBody(addSchoolSchema), addSchool);

router.get("/listSchools", validateQuery(listSchoolsSchema), listSchools);

export default router;
