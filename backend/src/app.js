import express from 'express';
import multer from 'multer';
import uploadFile from './services/storage.service.js';
import Post from './models/post.model.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/create-post', upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          'No file uploaded. Please provide an image file with field name "image"',
      });
    }

    // Upload file to ImageKit
    const result = await uploadFile(req.file.buffer);
    console.log('Upload result:', result);

    const post = await Post.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: post,
    });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message,
    });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json({
      success: true,
      message: "Post's fetched successfully",
      data: post,
    });
  } catch (error) {
    console.error('Error fetching post: ', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error Fetching Posts',
      error: error.message,
    });
  }
});

export default app;
