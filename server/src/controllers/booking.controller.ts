import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { createBooking, getUserBookings } from "../services/booking.service";
import {
  BookingDto,
  BookingListDto,
  CreateBookingInput,
} from "../types/booking.type";
import { UserDocument } from "../types/user.type";
import { mapToBookingDto } from "../utils/booking.util";

const createBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    const bookingInput = req.body as CreateBookingInput;
    const userId = (req.user as UserDocument)._id.toString();

    if (!userId) throw new ApiError(401, "Unauthorized user");

    const bookingDocument = await createBooking(userId, bookingInput);
    const bookingDto = mapToBookingDto(bookingDocument);
    return res
      .status(201)
      .json(
        new ApiResponse<BookingDto>(
          201,
          bookingDto,
          "Tickets booked successfully"
        )
      );
  }
);

const getUserBookingsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as UserDocument).id;
    const { page = "1", limit = "10" } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      throw new ApiError(400, "Page and limit must be positive integers");
    }

    if (!userId) throw new ApiError(401, "Unauthorized user");

    const { bookings, totalBookings } = await getUserBookings(
      userId,
      pageNumber,
      limitNumber
    );
    const totalPages = Math.ceil(totalBookings / limitNumber);
    const bookingListDto = {
      bookings,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalBookings,
    };
    return res
      .status(200)
      .json(
        new ApiResponse<BookingListDto>(
          200,
          bookingListDto,
          "User bookings fetched successfully"
        )
      );
  }
);
const getUserBookingsByUserIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page = "1", limit = "10" } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      throw new ApiError(400, "Page and limit must be positive integers");
    }

    const { bookings, totalBookings } = await getUserBookings(
      id,
      pageNumber,
      limitNumber
    );
    const totalPages = Math.ceil(totalBookings / limitNumber);
    const bookingListDto = {
      bookings,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalBookings,
    };
    return res
      .status(200)
      .json(
        new ApiResponse<BookingListDto>(
          200,
          bookingListDto,
          "User bookings fetched successfully"
        )
      );
  }
);

export {
  createBookingController,
  getUserBookingsController,
  getUserBookingsByUserIdController,
};
