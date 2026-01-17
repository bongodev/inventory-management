import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { userService } from '@/modules/user';
import { User } from '@/types';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userService.findUserByEmail(username);
      if (!user || user.deleted) {
        return done(null, false);
      }

      const isPasswordValid = await userService.verifyPassword(user, password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  process.nextTick(() => done(null, user));
});

passport.deserializeUser(
  (user: Pick<User, '_id' | 'name' | 'email' | 'role'>, done) => {
    process.nextTick(() => done(null, user));
  },
);

export default passport;
