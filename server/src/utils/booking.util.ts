import { BookingDocument, BookingDto } from "../types/booking.type";
import { ConcertDocument } from "../types/concert.type";
import { mapToConcertDto } from "./concert.util";


export const mapToBookingDto = (booking: BookingDocument): BookingDto => {
  return {
    _id:booking._id.toString(),
    concertId:mapToConcertDto(booking.concertId as ConcertDocument),
    // concertId:mapToConcertDto(booking.concertId as ConcertDocument),
    userId:booking.userId.toString(),
    createdAt:booking.createdAt,
    ticketsBooked:booking.ticketsBooked,
    updatedAt:booking.updatedAt,
  };
};
