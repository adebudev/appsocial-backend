import { config } from 'dotenv';
config(); // initialize env variables
import AWS from 'aws-sdk';

const bucketRegion = 'us-east-1';
const IdentityPoolId = 'us-east-1:dcb3ce30-db5c-4d60-832f-c8b45bf36994';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

export const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
