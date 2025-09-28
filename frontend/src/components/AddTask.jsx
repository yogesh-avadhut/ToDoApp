
import { useState } from 'react';
import '../style/AddTask.css'
import { useNavigate } from 'react-router-dom';

function AddTask() {

const [taskData,setTaskData] = useState({});

const navigate = useNavigate();

async function handlesubmit(){
console.log(taskData);

let  result = await fetch('http://localhost:3200/add-task',{
    method: "Post",
    credentials:'include',
    body: JSON.stringify(taskData),
    headers:{
         'Content-Type':'application/json'
    }
})
result = await result.json()
if(result){
    navigate('/')
    console.log('new task added');
}

}

    return (
        <div className="container">
            <h1>📝 Add New Task </h1>
                <label className='label' htmlFor="Title">Title</label>
                <input onChange={(event)=> setTaskData({...taskData, title:event.target.value})} type="text" name="Title" placeholder="enter task title" id='Title'/>
                <label className='label' htmlFor="Description">Description</label>
                <textarea onChange={(event)=> setTaskData({...taskData, description:event.target.value})} name="description" placeholder="enter task description" id='Description'/>
                <button onClick={handlesubmit} className="submit">Add New Task </button>
        </div>
    )
}

export default AddTask;