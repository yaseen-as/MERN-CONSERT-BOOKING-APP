import mongoose, { Schema } from "mongoose";
import { ConcertDocument, ConcertModel, Genre } from "../types/concert.type";

const concertSchema = new Schema<ConcertDocument>(
  {
    concertName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: true,
      default: Genre.OTHER,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    venue: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    availableTickets: {
      type: Number,
      required: true,
      min: 0,
    },
    totalTickets: {
      type: Number,
      required: true,
      min: 1,
    },
    organizer: {
      name: { type: String, required: true, trim: true },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
    },
    performers: [
      {
        name: { type: String, required: true, trim: true },
        role: {
          type: String,
          enum: ["Lead Singer", "Band", "DJ", "Guest", "Other"],
          default: "Other",
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image:{
      type:String,
    },
  },
  { timestamps: true }
);

export const Concert = mongoose.model<ConcertDocument,ConcertModel>(
  "Concert",
  concertSchema
);
