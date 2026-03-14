import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            } catch (error) {
                console.log("error fetching notes")
                console.log(error);
                if(error.response?.status === 429){
                    setIsRateLimited(true)
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false)
            }
        }
        fetchNotes();
    },[])
  return (
    <>
    <Navbar />
    {isRateLimited && <RateLimitedUI />}
    <div>
        {loading && <div>Loading notes...</div>}
        {notes.length > 0 && !isRateLimited && (
            <div>
                {notes.map(note => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        )}
    </div>
    </>
  )
}
export default HomePage;