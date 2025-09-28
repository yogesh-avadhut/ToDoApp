
import { useState, useEffect } from 'react';
import '../style/AddTask.css'
import { useNavigate, Link } from 'react-router-dom';

function Signup() {


    const [userData, SetUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate('/')
        }
    })

    const handleSignup = async () => {
        let result = await fetch('http://localhost:3200/signup', {
            method: "Post",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()

        if (result.success) {
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
            <h1>👨🏻‍💻 Signup </h1>
            <label className='label' htmlFor="Name">Name</label>
            <input
                onChange={(event) => SetUserData({ ...userData, name: event.target.value })}
                type="text" name="Name" placeholder="enter Name" id='Name' />

            <label className='label' htmlFor="Email">Email</label>
            <input
                onChange={(event) => SetUserData({ ...userData, email: event.target.value })}
                type="text" name="Email" placeholder="enter task Email" id='Email' />

            <label className='label' htmlFor="Password">Password</label>
            <input
                onChange={(event) => SetUserData({ ...userData, password: event.target.value })}
                type="text" name="Password" placeholder="enter task password" id='Password' />

            <button onClick={() => handleSignup()} className="submit">Sign up </button>
            <Link className='link' to="/Login"> Already have an account?  👆 Click Here to Login</Link>
        </div>
    )
}

export default Signup;