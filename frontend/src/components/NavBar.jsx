
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css';
import { useState, useEffect } from 'react';
function NavBar() {

    const navigate = useNavigate();
    const [login, setLogin] = useState(localStorage.getItem('login'))

    useEffect(() => {
        window.addEventListener("storage", () => {
            setLogin(localStorage.getItem("login"));
        });
    }, []);

    const logout = () => {
        localStorage.removeItem('login')

        setLogin(null)
        setTimeout(() => {
            navigate('/login')
        }, 0)
    }

    return (
        <nav className='navbar'>
            <div className='logo'>To Do App</div>
            <ul className='nav-links'>
                {
                    login ?
                        <>
                            <li><Link to="/">List</Link></li>
                            <li><Link to="/add">Add Task</Link></li>
                            <li><Link onClick={()=> logout()} >Logout</Link></li>
                        </> : <li> 😇 Welcome to ToDo App 🙏🏻</li>
                }
            </ul>
        </nav>
    )
}

export default NavBar;