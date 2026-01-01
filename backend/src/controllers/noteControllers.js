import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNotesbyId(req, res) {
  try {
    const noteById = await Note.findById(req.params.id);
    if (!noteById) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(noteById);
  } catch (error) {
    console.error("error in getNotesById controller");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function newNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("error in newNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNotes = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNotes)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json(updatedNotes);
  } catch (error) {
    console.error("error in newNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
