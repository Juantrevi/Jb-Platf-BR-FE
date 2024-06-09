import { Router } from 'express';
import {register, login, logout} from '../controllers/authController.js';
import {validateLoginInput, validateRegisterInput} from "../middleware/validationMiddleware.js";
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
    msg: 'Too many accounts created from this IP, please try again after 15 minutes'
});

const router = Router();

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;