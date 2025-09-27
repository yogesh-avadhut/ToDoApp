
import { useState } from 'react';
import '../style/AddTask.css'
import { Link, useNavigate } from 'react-router-dom';

function Signup() {


    const [userData, SetUserData] = useState();

    const handlesubmit = ()=>{
        console.log(userData)
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

            <button onClick={()=> handlesubmit()} className="submit">Login </button>
            <Link className='link' to="/Signup">Signup</Link>
        </div>
    )
}

export default Signup;