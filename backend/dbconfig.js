import { MongoClient } from "mongodb";

const url ="mongodb://localhost:27017";
const dbName="node-project";
export const collectionName="todo";
export const collectionName2 = "users"
const client = new MongoClient(url)

export const connection = async () =>{

    const connect = await client.connect();
    return  connect.db(dbName)
}

