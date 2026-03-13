import { Link } from "react-router";

const NoteCard = ({note}) => {
    return <Link to={`/note/${note._id}`}><p>{note.title}</p></Link>
};

export default NoteCard;