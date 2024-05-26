export type RecordLabel = {
    id: string;
    name: string;
    labelLogoUrl: string;
    foundedYear: number;
    founder: string;
    headquarters: string;
  };
  
export type Artist = {
    id: string;
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