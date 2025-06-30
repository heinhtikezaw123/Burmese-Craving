const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3");
require("dotenv").config();

const deleteFileFromS3 = async (url) => {
  try {
    // ✅ Correctly extract the S3 key from the full URL
    const parts = url.split(".com/");
    if (parts.length !== 2) {
      throw new Error("Invalid S3 file URL format");
    }

    const key = parts[1]; // This is the full S3 object key

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    });

    await s3.send(command);
    console.log(`✅ Deleted file from S3: ${url}`);
  } catch (error) {
    console.error("❌ Error deleting file from S3:", error.message);
  }
};

module.exports = deleteFileFromS3;
