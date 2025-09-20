import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../lib/cloudinary';

export const getCloudinarySignature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'photospots/dev'; // Możesz dynamicznie używać `spots/${userId}`

    const paramsToSign = {
      timestamp,
      folder,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET!,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return res.json({
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY!,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    });
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    next(error);
  }
};
