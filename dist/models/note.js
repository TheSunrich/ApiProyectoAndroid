"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const status_1 = require("./status");
const NoteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    initDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tags: { type: [String], required: false, default: [] },
    status: status_1.StatusSchema
});
const Note = (0, mongoose_1.model)('Note', NoteSchema);
exports.default = Note;
//# sourceMappingURL=note.js.map