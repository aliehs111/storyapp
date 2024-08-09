const Queue = require('bull');
const ffmpeg = require('fluent-ffmpeg');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { Video } = require('../../models');
 // Adjust path as necessary

// Initialize Bull queue
const videoQueue = new Queue('video processing', process.env.REDIS_URL);

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

        // Upload converted video to Cloudinary
        cloudinary.uploader.upload(outputPath, {
          resource_type: 'video',
          public_id: path.basename(outputPath, path.extname(outputPath)),
          folder: 'storyapp',
          format: 'mp4'
        }, async (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            return done(new Error('Failed to upload video to Cloudinary'));
          }

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

          // Request Cloudinary to generate a thumbnail from the uploaded video
          const thumbnail_url = cloudinary.url(result.public_id, {
            transformation: [
              { width: 300, height: 200, crop: 'thumb', gravity: 'center' },
            ],
            format: 'jpg',
            resource_type: 'video',
            secure: true,
          });

          console.log('Thumbnail URL:', thumbnail_url);

          // Update video record with the generated thumbnail URL
          video.thumbnail_path = thumbnail_url;
          await video.save();

          // Clean up temporary files
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);

          done();
        });
      })
      .on('error', (err) => {
        console.error('Error during conversion:', err);
        done(new Error('Error during video conversion'));
        fs.unlinkSync(inputPath);
      })
      .run();
  } catch (err) {
    console.error('Error processing video:', err);
    done(err);
  }
});

module.exports = videoQueue;
