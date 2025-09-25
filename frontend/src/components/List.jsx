import { Fragment, useEffect, useState } from "react";
import '../style/list.css'
import { Link } from "react-router-dom";

function List() {

    const [taskData, setTaskData] = useState();

    useEffect(() => {
        getListData();
    }, [])

    const getListData = async () => {
        let list = await fetch('http://localhost:3200/tasks');
        list = await list.json()

        if (list.success) {
            setTaskData(list.result)
        }
    }


    const deleteTask = async (id) => {
        let list = await fetch('http://localhost:3200/delete/' + id, { method: 'delete' });
        list = await list.json()

        if (list.success) {
            console.log('item deleted ...')
            getListData();
        }
    }


    const [selectedTask, setSelectedTask] = useState([])

    const selectall = (event) => {

        if (event.target.checked) {
            let items = taskData.map((item) => item._id)
            setSelectedTask(items)
            console.log(selectedTask)
        }
        else {
            setSelectedTask([])
            console.log(selectedTask)
        }
    }

    const selectSingleItem=(id)=>{

        if (selectedTask.includes(id)){
            let items = selectedTask.filter((item)=>item !== id)
            setSelectedTask(items)
        }
        else{
            setSelectedTask([id,...selectedTask])
        }
    }


const deleteMultiple= async ()=>{
    console.log(selectedTask)

      let list = await fetch('http://localhost:3200/delete-multiple/' , { 
        method: 'delete', 
     body:JSON.stringify(selectedTask),
     headers:{
        'Content-Type':'Application/Json'
     }
    });
        list = await list.json()

        if (list.success) {
            console.log('item deleted ...')
            getListData();
        }
}



    return (
        <div className="list-container">
            <h1>list todo</h1>
            <button  onClick={deleteMultiple}  className="delete-item delete-multiple">delete</button>
            <ul className="task-list">
                <li className="list-header" ><input onChange={selectall} type="checkbox" /></li>
                <li className="list-header" >S.No</li>
                <li className="list-header" >Title</li>
                <li className="list-header" >Discription</li>
                <li className="list-header" >Action</li>


                {
                    taskData && taskData.map((item, index) => (
                        < Fragment key={item._id}>
                            <li className="list-item" ><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /> </li>
                            <li className="list-item" >{index + 1}</li>
                            <li className="list-item" >{item.title}</li>
                            <li className="list-item" >{item.description}</li>
                            <li className="list-item" >
                                <button className="delete-item" onClick={() => deleteTask(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id} className="update-item" >Update</Link>
                            </li>
                        </Fragment>
                    ))
                }

            </ul>
        </div>
    )
}

export default List;