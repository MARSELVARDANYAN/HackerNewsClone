import jwt from 'jsonwebtoken';
import SECRET_KEY from '../.env';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: '1d',
    
  });
};

export default generateToken;