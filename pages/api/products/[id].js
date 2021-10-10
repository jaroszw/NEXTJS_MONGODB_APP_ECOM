import nc from 'next-connect';
import Product from '../../../models/product';
import db from '../../../utils/db';

const handler = nc();

export default handler.get(async (req, res) => {
  await db.connect();
  const id = req.query.id;
  const product = await Product.findById(id);
  await db.disconnect();
  res.send(product);
});
