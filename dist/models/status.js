"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StatusSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
});
//# sourceMappingURL=status.js.map