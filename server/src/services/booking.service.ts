import { Booking } from "../models/booking.model";
import { Concert } from "../models/concert.model";
import {
  BookingDocument,
  BookingDto,
  CreateBookingInput,
} from "../types/booking.type";
import { ConcertDocument } from "../types/concert.type";
import ApiError from "../utils/ApiError";
import { mapToBookingDto } from "../utils/booking.util";

const createBooking = async (
  userId: string,
  bookingData: CreateBookingInput
): Promise<BookingDocument> => {
  const { concertId, ticketsBooked } = bookingData;

  const concert = (await Concert.findById(concertId)) as ConcertDocument | null;
  if (!concert) {
    throw new ApiError(404, "Concert not found");
  }

  if (concert.availableTickets < ticketsBooked) {
    throw new ApiError(400, "No tickets available");
  }

  const existingBooking = (await Booking.findOne({
    userId,
    concertId,
  })) as BookingDocument | null;
  let booking: BookingDocument | null;
  if (existingBooking && existingBooking.ticketsBooked + ticketsBooked > 3) {
    throw new ApiError(400, "You can only book 3 tickets per concert");
  }
  if (existingBooking) {
    const id = existingBooking._id;
    booking = await Booking.findByIdAndUpdate(
      id,
      {
        $inc: { ticketsBooked: ticketsBooked },
      },
      { new: true }
    );
    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }
  } else {
    booking = await Booking.create({
      userId,
      concertId,
      ticketsBooked,
    });
  }
  concert.availableTickets -= ticketsBooked;
  await concert.save();
  return booking;
};

const getUserBookings = async (
  userId: string,
  page: number,
  limit: number
): Promise<{ bookings: BookingDto[]; totalBookings: number }> => {
  let skip = (page - 1) * limit;
  const bookings = await Booking.find({ userId })
    .populate("concertId")
    .limit(limit)
    .skip(skip)
    .exec();
  if (!bookings) {
    throw new ApiError(404, "user not found");
  }
  const totalBookings =await Booking.countDocuments({userId});
  const bookingDtos = bookings.map((booking) =>  mapToBookingDto(booking));
  return { bookings: bookingDtos, totalBookings };
};

export { createBooking, getUserBookings };
