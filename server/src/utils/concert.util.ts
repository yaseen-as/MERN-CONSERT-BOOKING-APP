import { ConcertDocument, ConcertDto } from "../types/concert.type";


export const mapToConcertDto = (concert: ConcertDocument): ConcertDto => {
  return {
    _id: concert._id.toString(),
    concertName: concert.concertName,
    description: concert.description,
    genre: concert.genre,
    dateTime: concert.dateTime,
    venue: concert.venue,
    ticketPrice: concert.ticketPrice,
    availableTickets: concert.availableTickets,
    totalTickets: concert.totalTickets,
    organizer: concert.organizer,
    performers: concert.performers,
    image: concert.image,
    createdBy: concert.createdBy.toString(),
    createdAt: concert.createdAt,
    updatedAt: concert.updatedAt,
  };
};
