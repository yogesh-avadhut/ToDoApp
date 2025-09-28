import e from "express";
const app = e();





import { connection, collectionName, collectionName2 } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt, { decode } from 'jsonwebtoken';
import cookieParser from "cookie-parser";






app.use(e.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser())









// add task 

app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (result) {
        resp.send({ message: "new task added ...", success: true, result })
    }
    else {
        resp.send({ message: "new task not added ...", success: false, result })
    }
})


//get all tasks 
app.get("/tasks",verifyJwtToken, async (req, resp) => {
    const db = await connection();

    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();

    if (result) {
        resp.send({ message: 'task list featched', success: true, result })
    }
    else {
        resp.send({ message: 'task list not featched', success: false })
    }
})

function verifyJwtToken(req,resp,next){
  console.log("verifyJwtToken test", req.cookies['token'])
  const token = req.cookies['token'];
  jwt.verify(token,'Google',(error,decoded)=>{
    if(error){
        resp.send({
            message:'invalid token',
            success:false
        })
    }
    console.log(decoded);
  })
  next()
}







//delete task by id 
app.delete("/delete/:id", async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const collection = db.collection(collectionName);
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
    const collection = db.collection(collectionName);

    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })

    if (result) {
        resp.send({ message: 'multiple task deleted', success: true, result })
    }
    else {
        resp.send({ message: 'multiple delete failed', success: false })
    }

})






//get task by id 
app.get("/task/:id", async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);
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



// signup api 

app.post("/signup", async (req, resp) => {
    const userData = req.body;

    if (userData.email && userData.password) {

        const db = await connection()
        const collection = db.collection(collectionName2)
        const result = await collection.insertOne(userData)
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {

                if (error) {
                    return resp.send({
                        success: false,
                        message: "Token generation failed"
                    });
                }
                resp.send({
                    success: true,
                    message: "signup done",
                    token
                });
            });
        }

        else {
            resp.send({
                success: false,
                message: "signup Failed",

            })
        }
    }

})


// login api 

app.post("/login", async (req, resp) => {
    const userData = req.body;

    if (userData.email && userData.password) {

        const db = await connection()
        const collection = db.collection(collectionName2)
        const result = await collection.findOne({ email: userData.email, password: userData.password })
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {

                if (error) {
                    return resp.send({
                        success: false,
                        message: "Token generation failed"
                    });
                }
                resp.send({
                    success: true,
                    message: "Login done",
                    token
                });
            });
        }

        else {
            resp.send({
                success: false,
                message: "Login Failed",

            })
        }
    }

})








app.listen(3200)