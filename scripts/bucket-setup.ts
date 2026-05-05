import { S3Client, CreateBucketCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";
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

async function setupBucket() {
  try {
    console.log(`Creating bucket: ${AWS_S3_BUCKET_NAME}...`);
    await s3Client.send(
      new CreateBucketCommand({
        Bucket: AWS_S3_BUCKET_NAME,
      })
    );
    console.log("Bucket created successfully.");

    console.log("Setting CORS policy...");
    await s3Client.send(
      new PutBucketCorsCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedHeaders: ["*"],
              AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
              AllowedOrigins: ["*"],
              ExposeHeaders: [],
              MaxAgeSeconds: 3000,
            },
          ],
        },
      })
    );
    console.log("CORS policy set to allow all origins (*).");
  } catch (error: any) {
    if (error.name === "BucketAlreadyOwnedByYou" || error.name === "BucketAlreadyExists") {
      console.log("Bucket already exists.");
      // Still try to set CORS in case it's not set
      try {
        await s3Client.send(
          new PutBucketCorsCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            CORSConfiguration: {
              CORSRules: [
                {
                  AllowedHeaders: ["*"],
                  AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                  AllowedOrigins: ["*"],
                  ExposeHeaders: [],
                  MaxAgeSeconds: 3000,
                },
              ],
            },
          })
        );
        console.log("CORS policy updated.");
      } catch (corsError) {
        console.error("Error setting CORS:", corsError);
      }
    } else {
      console.error("Error setting up bucket:", error);
      process.exit(1);
    }
  }
}

setupBucket();
