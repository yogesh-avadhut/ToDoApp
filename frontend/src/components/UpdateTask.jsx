
import { useEffect, useState } from 'react';
import '../style/AddTask.css'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {

    const [taskData, setTaskData] = useState({});

    const navigate = useNavigate();

    const { id } = useParams()

    useEffect(() => {
        getTask(id)
    }, [])

    const getTask = async (id) => {
        let task = await fetch("http://localhost:3200/task/" + id)
        task = await task.json()
        if (task.result) {
            setTaskData(task.result)
        }
    }

    const updateTask = async () => {
        console.log("function called ", taskData);

        let task = await fetch("http://localhost:3200/update-task/", {
            method: 'put',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        task = await task.json()
        if (task) {
            navigate('/')
        }
    }





    return (
        <div className="container">
            <h1>Update Task </h1>
            <label className='label' htmlFor="title">Title</label>
            <input value={taskData.title} onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} type="text" name="Title" placeholder="enter task title" id='title' />
            <label className='label' htmlFor="description">Description</label>
            <textarea value={taskData.description} onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} name="description" placeholder="enter task description" id='description' />
            <button onClick={() => updateTask()} className="submit">Update </button>
        </div>
    )
}

export default UpdateTask;