import { Request, Response } from 'express';
import Note from '../models/note';
import mongoose from "mongoose";


export const listNotes = async (req: Request, res: Response): Promise<void> => {
    const {title, description, status, tags} = req.query;
    try {
        if (title || description || status || tags) {
            const notes = await Note.find({
                title: title ? { $regex: new RegExp(title as string, 'i') } : { $exists: true },
                content: description ? { $regex: new RegExp(description as string, 'i') } : { $exists: true },
                status: status ? { $regex: new RegExp(status as string, 'i') } : { $exists: true },
                tags: tags ? { $in: tags as string[] } : { $exists: true }
            });
            res.json(notes);
            return;
        }
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const listNotesById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({message: 'Invalid ID'});
        return;
    }

    try {
        const note = await Note.findById(id);
        res.json(note);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const addNote = async (req: Request, res: Response): Promise<void> => {
    const {
        title,
        content,
        initDate,
        endDate,
        tags,
        status
    } = req.body;

    if (!title || !content || !initDate || !endDate || !tags || !status) {
        res.status(400)
            .json({message: 'Attributes are missing'});
        return;
    }

    try {
        const newNote = new Note({
            title,
            content,
            initDate,
            endDate,
            tags,
            status
        });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({message: 'Invalid ID'});
        return;
    }

    const {
        title,
        content,
        initDate,
        endDate,
        tags,
        status
    } = req.body;

    if (!title || !content || !initDate || !endDate || !tags || !status) {
        res.status(400)
            .json({message: 'Attributes are missing'});
        return;
    }

    try {
        const note = await Note.findByIdAndUpdate(id, {
            title,
            content,
            initDate,
            endDate,
            tags,
            status
        }, {new: true});
        res.json(note);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({message: 'Invalid ID'});
        return;
    }

    const {status} = req.body;

    if (!status) {
        res.status(400)
            .json({message: 'Status is missing'});
        return;
    }

    try {
        const note = await Note.findByIdAndUpdate(id, {status}, {new: true});
        res.json(note);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({message: 'Invalid ID'});
        return;
    }

    try {
        await Note.findByIdAndDelete(id);
        res.json({message: 'Note deleted'});
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

