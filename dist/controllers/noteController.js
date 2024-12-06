"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.changeStatus = exports.updateNote = exports.addNote = exports.listNotesById = exports.listNotes = void 0;
const note_1 = __importDefault(require("../models/note"));
const mongoose_1 = __importDefault(require("mongoose"));
const listNotes = async (req, res) => {
    const { title, description, status, tags } = req.query;
    try {
        if (title || description || status || tags) {
            const notes = await note_1.default.find({
                title: title ? { $regex: new RegExp(title, 'i') } : { $exists: true },
                content: description ? { $regex: new RegExp(description, 'i') } : { $exists: true },
                status: status ? { $regex: new RegExp(status, 'i') } : { $exists: true },
                tags: tags ? { $in: tags } : { $exists: true }
            });
            res.json(notes);
            return;
        }
        const notes = await note_1.default.find();
        res.json(notes);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
};
exports.listNotes = listNotes;
const listNotesById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    try {
        const note = await note_1.default.findById(id);
        res.json(note);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
};
exports.listNotesById = listNotesById;
const addNote = async (req, res) => {
    const { title, content, initDate, endDate, tags, status } = req.body;
    if (!title || !content || !initDate || !endDate || !tags || !status) {
        res.status(400)
            .json({ message: 'Attributes are missing' });
        return;
    }
    try {
        const newNote = new note_1.default({
            title,
            content,
            initDate,
            endDate,
            tags,
            status
        });
        await newNote.save();
        res.json(newNote);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
};
exports.addNote = addNote;
const updateNote = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    const { title, content, initDate, endDate, tags, status } = req.body;
    if (!title || !content || !initDate || !endDate || !tags || !status) {
        res.status(400)
            .json({ message: 'Attributes are missing' });
        return;
    }
    try {
        const note = await note_1.default.findByIdAndUpdate(id, {
            title,
            content,
            initDate,
            endDate,
            tags,
            status
        }, { new: true });
        res.json(note);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
};
exports.updateNote = updateNote;
const changeStatus = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    const { status } = req.body;
    if (!status) {
        res.status(400)
            .json({ message: 'Status is missing' });
        return;
    }
    try {
        const note = await note_1.default.findByIdAndUpdate(id, { status }, { new: true });
        res.json(note);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
};
exports.changeStatus = changeStatus;
const deleteNote = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    try {
        await note_1.default.findByIdAndDelete(id);
        res.json({ message: 'Note deleted' });
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
};
exports.deleteNote = deleteNote;
//# sourceMappingURL=noteController.js.map