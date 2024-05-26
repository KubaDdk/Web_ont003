import { ObjectId } from "mongodb";

export type RecordLabel = {
  _id?: ObjectId;
    name: string;
    labelLogoUrl: string;
    foundedYear: number;
    founder: string;
    headquarters: string;
  };
  
export type Artist = {
  _id?: ObjectId;
  name: string;
    description: string;
    age: number;
    isActive: boolean;
    birthDate: string;
    imageUrl: string;
    genre: string;
    instruments: string[];
    recordLabel: RecordLabel;
  };