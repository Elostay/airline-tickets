export interface ITickets {
  total: number;
  remaining: number;
}

export interface IFlight {
  airline: string;
  arrivalTime: string;
  departureTime: string;
  from: string;
  gate: string;
  id: string;
  price: number;
  terminal: string;
  tickets: ITickets;
  to: string;
  seatId?: string;
}
