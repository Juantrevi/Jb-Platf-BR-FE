import { Router } from 'express';
import {getAllJobs, createJob, updateJob, getSingleJob, deleteJob} from '../controllers/jobController.js';
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";

const router = Router();

// router.get('/', getAllJobs());
// router.post('/', createJob());

router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, createJob);

router.route('/:id')
    .get(validateIdParam, getSingleJob)
    .patch(validateJobInput, updateJob)
    .delete(deleteJob);

export default router;

