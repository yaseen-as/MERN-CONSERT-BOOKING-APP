import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import {
  ConcertDocument,
  ConcertDto,
  ConcertListDto,
  CreateConcertInput,
  UpdateConcertInput,
} from "../types/concert.type";
import {
  createConcert,
  updateConcertById,
  getAllConcerts,
  getConcertById,
  searchConcertByName,
  deleteConcertById
} from "../services/concert.service";
import ApiError from "../utils/ApiError";
import { mapToConcertDto } from "../utils/concert.util";
import { UserDocument } from "../types/user.type";

const createConcertController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const concertInput = req.body as CreateConcertInput;
  const file = req.file;
  if(!req.user){
    throw new ApiError(404,"user not found")
  }
  const userID=(req.user as UserDocument)._id;
  
  const createdConcert: ConcertDocument = await createConcert(concertInput,file,userID);
  const concertDto: ConcertDto = mapToConcertDto(createdConcert);

  return res
    .status(201)
    .json(
      new ApiResponse<ConcertDto>(201, concertDto, "Concert created successfully")
    );
});

const updateConcertByIdController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const concertUpdates = req.body as UpdateConcertInput;
  console.log(concertUpdates);
  

  const updatedConcert: ConcertDocument | null = await updateConcertById(id, concertUpdates);
  if (!updatedConcert) {
    throw new ApiError(404, "Concert not found");
  }
  const concertDto: ConcertDto = mapToConcertDto(updatedConcert);
  return res
    .status(200)
    .json(
      new ApiResponse<ConcertDto>(200, concertDto, "Concert updated successfully")
    );
});


const getAllConcertsController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { page = "1", limit = "10"} = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (pageNumber <= 0 || limitNumber <= 0) {
    throw new ApiError(400, "Page and limit must be positive integers");
  }

  const { concerts, totalConcerts } = await getAllConcerts(pageNumber, limitNumber);
  const totalPages = Math.ceil(totalConcerts / limitNumber);

  if (pageNumber > totalPages) {
    throw new ApiError(404, "Page not found");
  }
  const concertListDto: ConcertListDto = {
    concerts,
    currentPage: pageNumber,
    totalPages,
    totalConcerts,
  };

  return res
    .status(200)
    .json(
      new ApiResponse<ConcertListDto>(200, concertListDto, "Concerts retrieved successfully")
    );
});

const getConcertByIdController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const concert: ConcertDocument | null = await getConcertById(id);
  if (!concert) {
    throw new ApiError(404, "Concert not found");
  }

  const concertDto: ConcertDto = mapToConcertDto(concert);

  return res
    .status(200)
    .json(
      new ApiResponse<ConcertDto>(200, concertDto, "Concert retrieved successfully")
    );
});

const searchConcertController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
// TODO: filter
    const { page = "1", limit = "10",name="" } = req.query;
    if (!name) {
    throw new ApiError(400, "Concert name is required");
  }
  const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
  
      if (pageNumber <= 0 || limitNumber <= 0) {
        throw new ApiError(400, "Page and limit must be positive integers");
      }
const {concerts,totalConcerts} = await searchConcertByName(name as string,pageNumber,limitNumber);
const totalPages = Math.ceil(totalConcerts / limitNumber);

  if (pageNumber > totalPages) {
    throw new ApiError(404, "Page not found");
  }
  const concertListDto: ConcertListDto = {
    concerts,
    currentPage: pageNumber,
    totalPages,
    totalConcerts,
  };

  return res
    .status(200)
    .json(
      new ApiResponse<ConcertListDto>(200, concertListDto, "Concerts retrieved successfully")
    );
});

const deleteConcertByIdController = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const deletedConcert = await deleteConcertById(id);
  if (!deletedConcert) {
    throw new ApiError(404, "Concert not found");
  }

  const concertDto: ConcertDto = mapToConcertDto(deletedConcert);

  return res
    .status(200)
    .json(
      new ApiResponse<ConcertDto>(200, concertDto, "Concert deleted successfully")
    );
});

export {
  createConcertController,
  updateConcertByIdController,
  getAllConcertsController,
  getConcertByIdController,
  searchConcertController,
  deleteConcertByIdController,
};
