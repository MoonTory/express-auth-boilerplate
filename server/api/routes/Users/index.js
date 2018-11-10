import { Router } from 'express';

const router = Router();

router.route('/')
  .get((req, res, next) => {
    res.status(200).json({
      message: `Handling GET request to ${req.baseUrl}`
    });
  });

export default router;