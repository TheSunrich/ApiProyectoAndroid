import { Schema, Model, model } from 'mongoose';
import { IStatus, StatusSchema } from "./status";

interface INote {
    title: string;
    content: string;
    initDate: Date;
    endDate: Date;
    tags: string[];
    status: IStatus;
}

type NoteModel = Model<INote>

const NoteSchema: Schema = new Schema<INote, NoteModel>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    initDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tags: { type: [String], required: false, default: [] },
    status: StatusSchema
});

const Note: NoteModel = model<INote, NoteModel>('Note', NoteSchema);

export default Note;