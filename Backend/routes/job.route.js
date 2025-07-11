const express = require("express");
const { isRecruiter, isLoggedIn } = require("../middleware/auth");
const { createJob, getAllJobs, getJobById, applyJob, saveJob } = require("../controllers/job.controller");

const router = express.Router();

router.post("/",isRecruiter,createJob);
router.get("/allJobs",isLoggedIn,getAllJobs)
router.get("/job-Details/:id",isLoggedIn,getJobById)
router.put("/apply-Job/:id",isLoggedIn,applyJob)
router.put("/save-Job/:id",isLoggedIn,saveJob)

module.exports = router;