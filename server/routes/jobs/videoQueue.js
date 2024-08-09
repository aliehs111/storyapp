const Queue = require('bull');
const Redis = require('ioredis');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { Video } = require('../../models');

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Redis configuration
const redisConfig = process.env.NODE_ENV === 'production'
  ? {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      tls: { rejectUnauthorized: false } // Use TLS settings for secure connections
    }
  : {
      host: '127.0.0.1',
      port: 6379
    };

// Create a Bull queue with Redis configuration
const videoQueue = new Queue('video processing', {
  createClient: function (type) {
    switch (type) {
      case 'client':
        return new Redis({ ...redisConfig, maxRetriesPerRequest: null, enableReadyCheck: false });
      case 'subscriber':
        return new Redis({ ...redisConfig, maxRetriesPerRequest: null, enableReadyCheck: false });
      default:
        return new Redis({ ...redisConfig, maxRetriesPerRequest: null, enableReadyCheck: false });
    }
  }
});

// Process video job
videoQueue.process(async (job, done) => {
  const { inputPath, userId, title, description, outputPath } = job.data;

  try {
    // Convert video using FFmpeg
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libx264') // Convert to H.264
      .format('mp4')
      .on('end', async () => {
        console.log('Conversion finished');

        try {
          // Upload converted video to Cloudinary
          const result = await cloudinary.uploader.upload(outputPath, {
            resource_type: 'video',
            public_id: path.basename(outputPath, path.extname(outputPath)),
            folder: 'storyapp',
            format: 'mp4'
          });

          // Create video record in the database
          const video = await Video.create({
            user_id: userId,
            title,
            description,
            file_path: result.secure_url,
            thumbnail_path: '', // Set initially to empty string
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          // Generate thumbnail URL
          const thumbnail_url = cloudinary.url(result.public_id, {
            transformation: [
              { width: 300, height: 200, crop: 'thumb', gravity: 'center' },
            ],
            format: 'jpg',
            resource_type: 'video',
            secure: true,
          });

          console.log('Thumbnail URL:', thumbnail_url);

          // Update video record with the thumbnail URL
          video.thumbnail_path = thumbnail_url;
          await video.save();

          // Clean up temporary files
          cleanupFiles(inputPath, outputPath);

          done();
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
          cleanupFiles(inputPath, outputPath);
          done(new Error('Failed to upload video to Cloudinary'));
        }
      })
      .on('error', (err) => {
        console.error('Error during conversion:', err);
        cleanupFiles(inputPath, outputPath);
        done(new Error('Error during video conversion'));
      })
      .run();
  } catch (err) {
    console.error('Error processing video:', err);
    cleanupFiles(inputPath, outputPath);
    done(err);
  }
});

// Function to clean up files
function cleanupFiles(...filePaths) {
  filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
}

module.exports = videoQueue;

