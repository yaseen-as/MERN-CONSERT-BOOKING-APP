import mongoose, { Document, Model } from "mongoose";
import { ConcertDocument, ConcertDto } from './concert.type';

export interface IBooking  {
  userId: mongoose.Types.ObjectId;
  concertId: mongoose.Types.ObjectId | ConcertDocument;
  ticketsBooked: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingInput {
  concertId:string;
  ticketsBooked:number;
}

export interface BookingDocument extends IBooking, Document<mongoose.Types.ObjectId>{}
export interface BookingModel extends Model<BookingDocument>{}
export interface BookingDto extends Omit<IBooking, "userId" | "concertId"> {
  _id:string;
  concertId:ConcertDto;
  userId:string;
}
export interface BookingListDto {
  bookings:BookingDto[];
  currentPage: number;
  totalPages:number;
  totalBookings:number;
}