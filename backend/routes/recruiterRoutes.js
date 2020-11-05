const express = require('express');
const router = express.Router();

const recruiterController = require('../controller/recruiterController');

router.get('/', recruiterController.getList);
router.get('/:id', recruiterController.get);
router.post('/register', recruiterController.register);
router.put('/', recruiterController.update);
router.delete('/:id', recruiterController.remove);
router.post('/login', recruiterController.login);

module.exports = router;