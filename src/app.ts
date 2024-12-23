import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import noteRouter from './routes/noteRouter';
import indexRouter from './routes/indexRouter';

const app = express();

dotenv.config();

// Conectar a MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoAtlas'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 3000;

// Configurar y usar cors
app.use(cors({
    origin: '*' // Reemplaza con el dominio permitido
}));


// Middlewares
app.use(express.json());
app.use('/', indexRouter);
app.use('/notes', noteRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
