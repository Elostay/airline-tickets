import { FC } from "react";

import { FlightsListContainer } from "./FlightsList.styled";

import { IFlight } from "../../interfaces/Flight";
import FlightItem from "../FlightItem/FlightItem";

interface IFlightList {
  flights: IFlight[];
}

const FlightsList: FC<IFlightList> = ({ flights }) => {
  return (
    <FlightsListContainer>
      {flights.map((flight: IFlight) => (
        <FlightItem key={flight.id} flight={flight} />
      ))}
    </FlightsListContainer>
  );
};

export default FlightsList;
