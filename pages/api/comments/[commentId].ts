import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, dbGetAll, dbInsertOne } from "@/helpers/dbConnection";
import { MongoClient } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
        const eventId = req.query.commentId
        let client: MongoClient;
        
        try{
            client = await connectDatabase();
        }catch(err){
            res.status(500).json({message: "Connecting to the database failed!"})
            return
        }
    
        if(req.method === "POST"){
            const newComment = {email: req.body.email, name: req.body.name, text: req.body.text, eventId}

            try{
                await dbInsertOne(client, "comments", newComment)
                res.status(201).send({comments: "Comment added"})
            }catch(err){
                res.status(500).json({comments: "Inserting comment failed!"})
                return
            }
    
    
        }else{
            let document;
            try{
                document = await dbGetAll(client, "comments", {eventId: eventId})
                res.status(200).json({comments: document})
            }catch(err){
                res.status(500).json({comments: "No Data!"})
            }
    
        }
        client.close();



}

export default handler