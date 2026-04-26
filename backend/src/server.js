import { connectDB } from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();


//middleware
app.use(express.json()); //this middleware will parse json bodies: req.body
// Our simple custom middleware
app.use ((req,res,next) => {
    console.log(`Req method is ${req.method} & Req url is ${req.url}`);
    next();
})
app.use(cors({
    origin:"http://localhost:5173"
}));

app.use('/api/notes', notesRoutes);




// app.get('/api/notes', (req,res) =>{
//     res.status(200).send("hello, you are seeing an api response on api notes");
// });
// app.put('/api/notes/:id', (req,res) =>{
//     res.status(200).json({message:"hello, you are seeing an updated api response on api notes"});
// });
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('server is running on port: 5001', PORT);
    });
});