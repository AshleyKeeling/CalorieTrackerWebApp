import { Link } from "react-router-dom"
import { useLogout } from "../Hooks/useLogout"
import { useAuthContext } from "../Hooks/useAuthContext";

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogoutClick = () => {
        logout();
    }

    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="text-decoration-none" style={{ color: 'black' }}>
                        <h1 className="display-6 mb-2">Calorie Tracker V2</h1>
                    </Link>
                    <div className="d-flex ms-auto">
                        {user ? (
                            <div className="d-flex align-items-center">
                                <span className="me-2">{user.email}</span>
                                <button className="btn btn-outline-secondary" onClick={handleLogoutClick}>Log Out</button>
                            </div>
                        ) : (
                            <div className="d-flex">
                                <Link to="/login" className="nav-link px-2"><h2 className="h5">Login</h2></Link>
                                <Link to="/signup" className="nav-link px-2"><h2 className="h5">Signup</h2></Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;