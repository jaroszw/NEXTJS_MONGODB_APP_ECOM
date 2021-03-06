import nc from 'next-connect';
import Product from '../../models/product';
import User from '../../models/user';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'seeded succesfull' });
});

export default handler;
