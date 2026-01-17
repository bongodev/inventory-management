import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login/password', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

export default router;
