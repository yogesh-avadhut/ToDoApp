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


app.delete("/delete/:id", async(req,resp)=>{
    const db = await connection();
   const id =  req.params.id
    const collection = await db.collection(collectionName);
    const result = await collection.deleteOne({_id:new ObjectId(id)})

    if (result){
        resp.send({message: 'task deleted', success: true, result})
    }
    else {
        resp.send({message:'deletion failed', success:false})
    }

})





app.listen(3200)