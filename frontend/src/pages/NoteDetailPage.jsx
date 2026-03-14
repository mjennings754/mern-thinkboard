import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const {id} = useParams()

  console.log({ id });

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false)
      }
    };

    fetchNote();
  }, [id]);

  console.log({note})

  const handleDelete = () => {};

  if(loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <>
    <div>
      <Link to="/">Back to notes</Link>
      <button onClick={handleDelete}>Delete note</button>
    </div>
    </>
  );
};
export default NoteDetailPage;