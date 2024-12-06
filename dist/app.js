"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const noteRouter_1 = __importDefault(require("./routes/noteRouter"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Conectar a MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}
mongoose_1.default.connect(mongoUri)
    .then(() => console.log('Connected to MongoAtlas'))
    .catch(err => console.error('Could not connect to MongoDB', err));
const PORT = process.env.PORT || 3000;
// Configurar y usar cors
app.use((0, cors_1.default)({
    origin: '*' // Reemplaza con el dominio permitido
}));
// Middlewares
app.use(express_1.default.json());
app.use('/', indexRouter_1.default);
app.use('/notes', noteRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map