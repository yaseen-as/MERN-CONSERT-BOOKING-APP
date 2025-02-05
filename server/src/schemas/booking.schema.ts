import { z } from "zod";

const bookingInput=z.object({
  concertId:z.string().min(1,"concertId is required"),
  ticketsBooked:z.coerce.number().min(1,"Tickets Booked is required")
})

export const createBookingSchema = z.object({
  body: bookingInput,
});

