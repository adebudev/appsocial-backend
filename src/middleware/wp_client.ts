import { getUserById } from '../adapter/user.adapter.js';
import { WpClient } from '../config/wpClient.js';

export const wpMiddleware = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    const client = new WpClient(user.cellular);
    req.wp_client = await client.getClient();
    next();
  } catch (error) {
    res.status(400).json({ app_error: 'problemas al obtener el cliente' });
  }
};
