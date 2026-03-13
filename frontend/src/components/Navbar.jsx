import { Link } from "react-router";

const Navbar = () => {
    return <header>
        <div>
            <h2>Thinkboard</h2>
            <Link to={"/create"}>New note</Link>
        </div>
    </header>
};
export default Navbar;