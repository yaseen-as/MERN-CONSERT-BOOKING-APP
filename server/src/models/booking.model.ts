import mongoose, {  Schema } from "mongoose";
import { BookingDocument, BookingModel, IBooking } from "../types/booking.type";

const bookingSchema: Schema = new Schema<IBooking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  concertId: { type: Schema.Types.ObjectId, ref: "Concert", required: true },
  ticketsBooked: { type: Number, required: true, max: 3 },
},{timestamps:true});

export const Booking = mongoose.model<BookingDocument,BookingModel>("Booking", bookingSchema);