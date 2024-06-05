import { Router } from 'express';
import {getAllJobs, createJob, updateJob, getSingleJob, deleteJob} from '../controllers/jobController.js';
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";
import {checkForTestUser} from "../middleware/authMiddleware.js";

const router = Router();

// router.get('/', getAllJobs());
// router.post('/', createJob());

checkForTestUser;
router.route('/')
    .get(getAllJobs)
    .post(checkForTestUser, validateJobInput, createJob);

router.route('/:id')
    .get(validateIdParam, getSingleJob)
    .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
    .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;

