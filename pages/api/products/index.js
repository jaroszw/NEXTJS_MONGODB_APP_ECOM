import nc from 'next-connect';
import Product from '../../../models/product';
import db from '../../../utils/db';

const handler = nc();

export default handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});
