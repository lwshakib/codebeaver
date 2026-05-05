import { S3Client, ListObjectsV2Command, DeleteObjectsCommand, DeleteBucketCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const {
  AWS_REGION,
  AWS_ENDPOINT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
  console.error("Missing AWS environment variables.");
  process.exit(1);
}

const s3Client = new S3Client({
  region: AWS_REGION || "auto",
  endpoint: AWS_ENDPOINT,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

async function teardownBucket() {
  try {
    console.log(`Cleaning up bucket: ${AWS_S3_BUCKET_NAME}...`);

    // List all objects
    const listObjects = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: AWS_S3_BUCKET_NAME,
      })
    );

    if (listObjects.Contents && listObjects.Contents.length > 0) {
      console.log(`Deleting ${listObjects.Contents.length} objects...`);
      const deleteParams = {
        Bucket: AWS_S3_BUCKET_NAME,
        Delete: {
          Objects: listObjects.Contents.map((obj) => ({ Key: obj.Key })),
        },
      };
      await s3Client.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects deleted.");
    } else {
      console.log("Bucket is already empty.");
    }

    console.log("Deleting bucket...");
    await s3Client.send(
      new DeleteBucketCommand({
        Bucket: AWS_S3_BUCKET_NAME,
      })
    );
    console.log("Bucket deleted successfully.");
  } catch (error: any) {
    if (error.name === "NoSuchBucket") {
      console.log("Bucket does not exist.");
    } else {
      console.error("Error tearing down bucket:", error);
      process.exit(1);
    }
  }
}

teardownBucket();
