import express from 'express';
const router = express.Router();
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from '../controllers/notesController.js';

router.post('/', createNote);
router.get('/', getAllNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/:id', getNoteById);

export default router;
