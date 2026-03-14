import { Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({note, setNotes}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault(); // get rid of the nav behavior

        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in handleDelete", error)
            toast.error("Failed to delete note")
        }
    }
    return <Link to={`/note/${note._id}`}><p>{note.title} | <button onClick={(e) => handleDelete(e, note._id)}>Delete</button></p></Link>
};

export default NoteCard;