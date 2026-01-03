import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
// import rateLimiter from './middleware/rateLimiter.js';
import expressRateLimiter from './middleware/expressRateLimiter.js'
import cors from 'cors';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware to parse JSON request bodies
if(process.env.NODE_ENV !== 'production'){
    app.use(cors(
        {
            origin: 'http://localhost:5173',
        }
    ))
}


app.use(express.json());

/* ------------- rate limiting -------------- */
// app.use(rateLimiter);

app.set("trust proxy", 1);

app.use("/api/notes", expressRateLimiter, notesRoutes);
/* ------------- rate limiting -------------- */




if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(
            path.join(__dirname, "../frontend", "dist", "index.html")
        );
    });
}


connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server started on PORT: ${PORT}`)
    })
});


