import { Router } from 'express';
import {getAllJobs, createJob, updateJob, getSingleJob, deleteJob} from '../controllers/jobController.js';

const router = Router();

// router.get('/', getAllJobs());
// router.post('/', createJob());

router.route('/')
    .get(getAllJobs)
    .post(createJob);

router.route('/:id')
    .get(getSingleJob)
    .patch(updateJob)
    .delete(deleteJob);

export default router;

