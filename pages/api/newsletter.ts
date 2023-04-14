import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connectDatabase, dbInsertOne } from "@/helpers/dbConnection";


async function handler(req: NextApiRequest, res: NextApiResponse){
    let client: MongoClient;
    try{
        client = await connectDatabase();
    }catch(err){
        res.status(500).json({message: "Connection to the database failed!"})
        return
    }

    if(req.method === "POST"){
        const email = req.body.email

        if(!email || !email.includes("@")){
            res.status(422)
            return;
        }
        try{
            await dbInsertOne(client, "newsletters", {email})
            res.status(201).json({message: "We will get back to you soon!"})

        }catch(err){
            res.status(500).json({message: "inserting comment failed!"})
        }
    }
    client.close()
}

export default handler