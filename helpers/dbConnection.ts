import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gfrrsyz.mongodb.net/${process.env.mongodb_database}`

export async function connectDatabase(){
        const client = await MongoClient.connect(connectionString)
        return client

}


export async function dbInsertOne(client: MongoClient, collection: string, insertedDoc: any){
    const db = client.db()
    return await db.collection(collection).insertOne(insertedDoc);
}

export async function dbGetAll(client: MongoClient, collection: string, findQuery?: any){
    const db = client.db()
    if(findQuery) return await db.collection(collection).find(findQuery).sort({_id: -1}).toArray();
    return await db.collection(collection).find().sort({_id: -1}).toArray();
}
