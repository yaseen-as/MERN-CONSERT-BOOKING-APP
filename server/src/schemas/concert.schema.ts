import { z } from "zod";
import { Genre } from "../types/concert.type";

const PerformerSchema = z.object({
  name: z.string().min(1, "Performer name is required"),
  role: z.enum(["Lead Singer", "Band", "DJ", "Guest", "Other"]).optional(),
});

const VenueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

const OrganizerSchema = z.object({
  name: z.string().min(1, "Organizer name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Contact phone is required"),
});

const CreateConcertBodySchema = z.object({
  concertName: z
    .string()
    .min(1, "Concert name is required")
    .max(150, "Concert name must be less than 150 characters"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  genre: z.nativeEnum(Genre),
  dateTime: z.coerce.date(),
  venue: VenueSchema,
  ticketPrice: z.coerce.number().min(0, "Ticket price must be a positive number"),
  availableTickets: z.coerce
    .number()
    .min(0, "Available tickets must be a positive number"),
  totalTickets: z.coerce.number().min(1, "Total tickets must be at least 1"),
  organizer: OrganizerSchema,
  performers: z
    .array(PerformerSchema)
    .min(1, "At least one performer is required"),
});

const UpdateConcertBodySchema = CreateConcertBodySchema.partial();

const createConcertSchema = z.object({
  body: CreateConcertBodySchema,
});
const updateConcertSchema = z.object({
  body: UpdateConcertBodySchema,
  params:z.object({
    id:z.string()
  })
});

export { createConcertSchema, updateConcertSchema };
