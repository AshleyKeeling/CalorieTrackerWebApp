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
            <div>
                {/* this is a like a normal nav bar, each one is a link to a page */}
                <Link to="/" className="text-decoration-none" style={{ color: 'black' }}>
                    <h1 className="display-4 mb-2">Calorie Tracker V2</h1>
                </Link>
                <nav>
                    {user && (<div>
                        <span>{user.email}</span>
                        <button onClick={handleLogoutClick}>Log Out</button>
                    </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar;