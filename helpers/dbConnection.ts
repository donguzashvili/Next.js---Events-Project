import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://nextShota:Donguzashvil1@cluster0.gfrrsyz.mongodb.net/events`

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
