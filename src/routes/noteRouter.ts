import express from "express";
import {
    listNotes,
    listNotesById,
    addNote,
    updateNote,
    changeStatus,
    deleteNote
} from "../controllers/noteController";

const router = express.Router();

router.get('', listNotes);
router.get('/:id', listNotesById);
router.post('', addNote);
router.put('/:id', updateNote);
router.patch('/:id', changeStatus);
router.delete('/:id', deleteNote);

export default router;