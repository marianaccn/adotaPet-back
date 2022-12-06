import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import env from 'dotenv';

class S3Service {
  private bucketName: string;
  private s3Client: S3Client;

  public constructor() {
    env.config();
    const bucketName = process.env.BUCKET_NAME || '';
    const region = process.env.BUCKET_REGION || '';
    const accessKeyId = process.env.S3_ACCESS_KEY || '';
    const secretAccessKey = process.env.S3_PRIVATE_KEY || '';
    this.bucketName = bucketName;
    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public uploadFile(fileBuffer: Buffer, fileName: string, mimetype: string) {
    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    };
    return this.s3Client.send(new PutObjectCommand(uploadParams));
  }

  public deleteFile(fileName: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    return this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }
}

export default new S3Service();
