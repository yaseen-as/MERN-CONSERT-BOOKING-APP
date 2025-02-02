import mongoose, {  Document, Model } from "mongoose";

export enum Genre {
  ROCK = "Rock",
  POP = "Pop",
  JAZZ = "Jazz",
  CLASSICAL = "Classical",
  HIPHOP = "Hip-hop",
  ELECTRONIC = "Electronic",
  COUNTRY = "Country",
  OTHER = "Other",
}

export interface IPerformer {
  name: string;
  role?: "Lead Singer" | "Band" | "DJ" | "Guest" | "Other";
}

export interface IVenue {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface IOrganizer {
  name: string;
  contactEmail: string;
  contactPhone: string;
}


export interface IConcert {
  concertName: string;
  description?: string;
  genre: Genre;
  dateTime: Date;
  venue: IVenue;
  ticketPrice: number;
  availableTickets: number;
  totalTickets: number;
  organizer: IOrganizer;
  performers: IPerformer[];
  image?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConcertDocument extends IConcert, Document<mongoose.Types.ObjectId> {}
export interface ConcertModel extends Model<ConcertDocument> {}
export interface ConcertDto extends Omit <IConcert, "createdBy"> {
  _id:string;  
  createdBy: string;
}
export interface ConcertListDto {
  concerts:ConcertDto[];
  currentPage: number;
  totalPages:number;
  totalConcerts:number;
}
export interface CreateConcertInput extends Omit<IConcert , "createdAt" | "updatedAt" | "createdBy">{}
export interface UpdateConcertInput extends Partial<CreateConcertInput>{}
