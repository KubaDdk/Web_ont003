import { MongoClient, Collection, ObjectId } from "mongodb";
import dotenv from 'dotenv'
import { Artist, RecordLabel } from "./interfaces/IArtist";
import artistData from "./data/artists"
import labelsData from "./data/recordLabels"

dotenv.config()

export const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");
export const artistsCollection : Collection<Artist> = client.db("exercises").collection<Artist>("artists");
export const labelsCollection : Collection<RecordLabel> = client.db("exercises").collection<RecordLabel>("labels");

const artists: Artist[] = artistData
const labels: RecordLabel[] = labelsData


async function seed() {
    if (await artistsCollection.countDocuments() === 0) {
        console.log("Feeding DB with artsts...")
        await artistsCollection.insertMany(artists);
    }
    if (await labelsCollection.countDocuments() === 0) {
        console.log("Feeding DB with labels...")
        await labelsCollection.insertMany(labels);
    }
}

export async function getArtists() {
    return await artistsCollection.find().toArray();
}

export async function getLabels() {
    return await labelsCollection.find().toArray();
}

export async function updateArtist(id: ObjectId, updatedArtist: any) {
    return await artistsCollection.updateOne({ _id: id }, { $set: updatedArtist });
}

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        await seed();
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}