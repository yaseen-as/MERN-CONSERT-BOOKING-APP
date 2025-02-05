import { Concert } from "../models/concert.model";
import {
  ConcertDocument,
  UpdateConcertInput,
  ConcertDto,
  CreateConcertInput,
} from "../types/concert.type";
import ApiError from "../utils/ApiError";
import { mapToConcertDto } from "../utils/concert.util";
import { UploadApiResponse } from "cloudinary";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary";
import mongoose from "mongoose";

const createConcert = async (
  concert: CreateConcertInput,
  file: Express.Multer.File | undefined,
  userId:mongoose.Types.ObjectId | string
): Promise<ConcertDocument> => {
  console.log("on bla");
  
  let uploadResponse: UploadApiResponse | null = null;
  try {
    if (file) {
      uploadResponse = await uploadOnCloudinary(file.path);
    }
    if (uploadResponse) {
      concert.image = uploadResponse.url;
    }
    const createdConcert = await Concert.create({...concert,createdBy:userId});
    return createdConcert;
  } catch (error) {
    console.log("error catch");
    if (uploadResponse) {
      await deleteOnCloudinary(uploadResponse.public_id);
    }
    console.error("error creating concert:", error);
    throw new ApiError(500, "failed to create concert");
  }
};

const updateConcertById = async (
  id: string,
  updateConcertInput: UpdateConcertInput
): Promise<ConcertDocument> => {
  try {
    console.log();
    
    const updatedConcert: ConcertDocument | null =
      await Concert.findByIdAndUpdate<ConcertDocument>(
        id,
        { $set: updateConcertInput },
        {
          new: true,
          runValidators: true,
        }
      );
    if (!updatedConcert) {
      throw new ApiError(404, "concert not found");
    }
    return updatedConcert;
  } catch (error) {
    console.error("error updating concert:", error);
    throw new ApiError(500, "failed to update concert");
  }
};

const getAllConcerts = async (
  page: number,
  limit: number
): Promise<{ concerts: ConcertDto[]; totalConcerts: number }> => {
  try {
    const skip = (page - 1) * limit;

    const [concerts, totalConcerts] = await Promise.all([
      Concert.find().skip(skip).limit(limit).exec(),
      Concert.countDocuments().exec(),
    ]);
    const concertDto: ConcertDto[] = concerts.map((concert) =>
      mapToConcertDto(concert)
    );

    return { concerts: concertDto, totalConcerts };
  } catch (error) {
    console.error("error fetching concerts:", error);
    throw new ApiError(500, "failed to fetch concerts");
  }
};

const getConcertById = async (id: string): Promise<ConcertDocument> => {
  try {
    const concert: ConcertDocument | null = await Concert.findById(id).exec();
    if (!concert) {
      throw new ApiError(404, "concert not found");
    }
    return concert;
  } catch (error) {
    console.error("Error fetching concert by ID:", error);
    throw new ApiError(500, "Failed to fetch concert");
  }
};

const searchConcertByName = async (
  name: string,
  page: number,
  limit: number
): Promise<{ concerts: ConcertDto[]; totalConcerts: number }> => {
  try {
    const skip = (page - 1) * limit;

    const regex = new RegExp(name, "i"); 
    const [concerts, totalConcerts] = await Promise.all([
      Concert.find({ concertName: regex }).skip(skip).limit(limit).exec(),
      Concert.countDocuments({ concertName: regex }).exec(),
    ]);
    const concertDto: ConcertDto[] = concerts.map((concert) =>
      mapToConcertDto(concert)
    );
    return { concerts: concertDto, totalConcerts };
  } catch (error) {
    console.error("error searching concerts by name:", error);
    throw new ApiError(500, "failed to search concert");
  }
};

const deleteConcertById = async (
  id: string
): Promise<ConcertDocument | null> => {
  try {
    const deletedConcert = await Concert.findByIdAndDelete(id).exec();
    if (!deletedConcert) {
      throw new ApiError(404, "Concert not found");
    }
    return deletedConcert;
  } catch (error) {
    console.error("error deleting concert:", error);
    throw new ApiError(500, "failed to delete concert");
  }
};

export {
  createConcert,
  updateConcertById,
  getAllConcerts,
  getConcertById,
  searchConcertByName,
  deleteConcertById,
};
