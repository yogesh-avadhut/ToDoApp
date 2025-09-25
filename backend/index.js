import e from "express";
import { connection, collectionName } from "./dbconfig.js"
const app = e();
import cors from "cors";
import { ObjectId } from "mongodb";

app.use(e.json());
app.use(cors());
app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (result) {
        resp.send({ message: "new task added ...", success: true, result })
    }
    else {
        resp.send({ message: "new task not added ...", success: false, result })
    }
})


//get all tasks 
app.get("/tasks", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();

    if (result) {
        resp.send({ message: 'task list featched', success: true, result })
    }
    else {
        resp.send({ message: 'task list not featched', success: false })
    }
})

//delete task by id 
app.delete("/delete/:id", async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const collection = await db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result) {
        resp.send({ message: 'task deleted', success: true, result })
    }
    else {
        resp.send({ message: 'deletion failed', success: false })
    }

})


//delete multiple 
app.delete("/delete-multiple", async (req, resp) => {
    const db = await connection();
    const ids = req.body
    const deleteTaskIds = ids.map((item) => new ObjectId(item))
    const collection = await db.collection(collectionName);
    
    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })

    if (result) {
        resp.send({ message: 'multiple task deleted', success: true , result})
    }
    else {
        resp.send({ message: 'multiple delete failed', success: false })
    }

})






//get task by id 
app.get("/task/:id", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const id = req.params.id
    const result = await collection.findOne({ _id: new ObjectId(id) })

    if (result) {
        resp.send({ message: 'task featched', success: true, result })
    }
    else {
        resp.send({ message: 'task not featched', success: false })
    }
})


// update task by id 
app.put("/update-task", async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
    const { _id, ...fields } = req.body

    const result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: fields }
    );
    
    if (result) {
        resp.send({ message: 'task list updated', success: true, result })
    }
    else {
        resp.send({ message: 'task list not updated', success: false })
    }
})








app.listen(3200)