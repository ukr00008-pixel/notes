import Note from "../models/Note.js";

// export async function getAllNotes(req,res){
//     try {
//         const notes = await Note.find();
//         res.status(200).json(notes);
//     } catch (error) {
//         console.error("error in getAllNotes controller",error);

//         res.status(500).json({message: "Internal server error"});
//     }
// }
export async function getNoteById(req,res){
    try {
        const particularNote= await Note.findById(req.params.id);

        if(!particularNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(particularNote);
    } catch (error) {
        console.error("Error in fetching note");
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getNotes (req,res){
   try{
    const notes= await Note.find().sort({createdAt:-1}); //newest note first
    res.status(200).json(notes);

   }catch(error){
    console.error("Error in gettin notes controller",error);
    res.status(500).json({message:"Internal server error"});

   }
}

export async function createNote (req,res){
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});

        const savedNote= await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in creating notescontroller",error);
    res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote (req,res){
    try {
        const {title, content}=req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content},{
            new: true
        });

        if(!updatedNote){ return res.status(404).json({message:"Notes not found"})};


        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updating notescontroller",error);
    res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote (req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote){
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json(deletedNote);
    } catch (error) {
        console.error("Error in deleting note");
        res.status(500).json({message: "Internal server error"});
    }
}