import e from "express";
import  { connection, collectionName } from "./dbconfig.js"
const app = e();


app.use(e.json());
app.post("/add-task",async (req,resp)=>{
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    resp.send("working ...")
})


app.get("/",(req,resp)=> {
    resp.send({
        message:"basic api done ...",
        success: true
    })
})

app.listen(3200)