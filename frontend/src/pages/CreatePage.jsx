import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error creating note", error)
      if(error.response.status === 429){
      toast.error("Slow down! you're creating notes too fast", {duration:4000});
      } else {
        toast.error("Failed to create note!")
      }
    } finally {
      setLoading(false)
    }
  } 


  return (
    <>
    <p>CreatePage</p>
    <Link to={"/"}> Back to Notes</Link>

    <div>
      <h2>Create new note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><span>Title</span></label>
          <input type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label><span>Title</span></label>
          <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create note" }</button>
      </form>
    </div>
    </>
  )
}
export default CreatePage;