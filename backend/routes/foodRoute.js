import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
} from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/remove/:id', removeFood);

export { foodRouter };
