
import { useEffect, useState } from 'react';
import '../style/AddTask.css'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [userData, SetUserData] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate('/')
        }
    })


    const handleLogin = async () => {
        let result = await fetch('http://localhost:3200/login', {
            method: "Post",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        if (result.success) {
            console.log(result);
            document.cookie = "token=" + result.token;
            localStorage.setItem('login', userData.email)
            window.dispatchEvent(new Event("storage"));
            navigate('/')
        }
        else {
            alert("please insert valid inputs")
        }

    }

    return (
        <div className="container">
            <h1> 🔐 Login </h1>

            <label className='label' htmlFor="Email">Email</label>
            <input
                onChange={(event) => SetUserData({ ...userData, email: event.target.value })}
                type="text" name="Email" placeholder="enter task Email" id='Email' />

            <label className='label' htmlFor="Password">Password</label>
            <input
                onChange={(event) => SetUserData({ ...userData, password: event.target.value })}
                type="text" name="Password" placeholder="enter task password" id='Password' />

            <button onClick={() => handleLogin()} className="submit">Login </button>
            <Link className='link' to="/Signup"> Don't have an account?  👆 Click Here to Signup</Link>
        </div>
    )
}

export default Login;