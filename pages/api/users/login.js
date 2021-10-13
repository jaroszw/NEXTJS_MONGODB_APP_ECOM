import nc from 'next-connect';
import User from '../../../models/user';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = nc();

export default handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.statusCode(401).send({ message: 'Invalid user or password' });
  }
});
