import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header>
            <div>
                {/* this is a like a normal nav bar, each one is a link to a page */}
                <Link to="/" className="text-decoration-none" style={{ color: 'black' }}>
                    <h1 className="display-4 mb-2">Calorie Tracker V1</h1>
                </Link>
            </div>
        </header>
    )
}

export default NavBar;