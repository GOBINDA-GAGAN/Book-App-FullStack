
import { v2 as cloudinary } from 'cloudinary';
import { _Config } from './config';


cloudinary.config({
  cloud_name:_Config.CLOUDINARY_CLOUD_NAME ,
  api_key:_Config.CLOUDINARY_API_KEY,
  api_secret: _Config.CLOUDINARY_API_SECRET,
});

export { cloudinary };