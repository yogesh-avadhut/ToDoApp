
import { useState } from 'react';
import '../style/AddTask.css'
import { useNavigate,Link } from 'react-router-dom';

function Signup() {


    const [userData, SetUserData] = useState();

    const handlesubmit = ()=>{
        console.log(userData)
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

            <button onClick={()=> handlesubmit()} className="submit">Sign up </button>
            <Link className='link' to="/Login">Login</Link>
        </div>
    )
}

export default Signup;