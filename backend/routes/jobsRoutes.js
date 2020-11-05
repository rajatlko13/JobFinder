const express = require('express');
const router = express.Router();

const jobsController = require('../controller/jobsController');

router.get('/', jobsController.getJobList);
router.get('/:recruiterId', jobsController.getJob);
router.get('/:recruiterId/:jobId', jobsController.getSingleJob);
router.post('/add/:recruiterId', jobsController.addJob);
router.put('/:recruiterId/:jobId', jobsController.updateJob);
router.delete('/:recruiterId/:jobId', jobsController.removeJob);

module.exports = router;