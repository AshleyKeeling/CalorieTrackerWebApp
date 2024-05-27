import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <header>
            <div>
                <Link to="/">
                    <h1>Calorie Tracker V1</h1>
                </Link>
            </div>
        </header>
    )
}

export default NavBar;