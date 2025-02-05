import { useEffect, useState } from "react";
import { getFlightById } from "../../api/flights";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  generateSeatGrid,
  loadSeatGridFromLocalStorage,
  saveSeatGridToLocalStorage,
  Seat,
} from "../../helpers/generateSeatGrid";
import { addTicketToCart, removeTicketFromCart } from "../../redux/cartSlice";
import { IFlight } from "../../interfaces/Flight";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import dateFormatter from "../../helpers/dateFormatter";
import {
  PageContainer,
  Title,
  FlightInfo,
  SeatGridContainer,
  SeatRow,
  SeatButton,
  SelectedSeatsContainer,
  SelectedSeatsTitle,
  SelectedSeatItem,
} from "./FlightDetailsPage.styled.ts";
import CartModal from "../../components/CartModal/CartModal.tsx";
import { RootState } from "../../redux/store.ts";
import { getCart } from "../../redux/selectors.ts";

const FlightDetailsPage = () => {
  const [flightData, setFlightData] = useState<IFlight>();
  const [seatGrid, setSeatGrid] = useState<Seat[][]>([]);
  const { id } = useParams();

  const selectedSeats = useSelector((state: RootState) =>
    getCart(state).items.map((item) => {
      if (item.id === id) {
        return item.seatId;
      }
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (id) {
        const data = await getFlightById(id);
        setFlightData(data);
      }
    };
    const getSeatGrid = () => {
      if (id) {
        const savedGrid = loadSeatGridFromLocalStorage(id);
        if (savedGrid) {
          setSeatGrid(savedGrid);
        } else {
          const generatedGrid = generateSeatGrid(10, 6);
          setSeatGrid(generatedGrid);
          saveSeatGridToLocalStorage(id, generatedGrid);
        }
      }
    };
    fetchFlightDetails();
    getSeatGrid();
  }, [id]);

  const handleSeatSelect = (seatId: string) => {
    if (flightData) {
      const seatData: IFlight = {
        seatId,
        airline: flightData.airline || "",
        departureTime: flightData.departureTime || "",
        arrivalTime: flightData.arrivalTime || "",
        from: flightData.from || "",
        gate: flightData.gate || "",
        id: flightData.id || "",
        price: flightData.price || 0,
        terminal: flightData.terminal || "",
        tickets: flightData.tickets || {},
        to: flightData.to || "",
      };
      if (selectedSeats.includes(seatId)) {
        dispatch(removeTicketFromCart(seatId));
      } else {
        dispatch(addTicketToCart(seatData));
      }
    }
  };
  return (
    <PageContainer>
      {flightData && (
        <>
          <Title>
            {flightData.airline} - {flightData.from} to {flightData.to}
          </Title>
          <FlightInfo>
            Departure: {dateFormatter(flightData.departureTime)}
          </FlightInfo>
          <FlightInfo>
            Arrival: {dateFormatter(flightData.arrivalTime)}
          </FlightInfo>

          <SeatGridContainer>
            {seatGrid.map((row: Seat[], rowIndex: number) => (
              <SeatRow key={rowIndex}>
                {row.map((seat: Seat) => (
                  <SeatButton
                    key={seat.id}
                    onClick={() => handleSeatSelect(seat.id)}
                    disabled={seat.status === "occupied"}
                    selected={selectedSeats.includes(seat.id)}
                    occupied={seat.status === "occupied"}
                  >
                    {seat.status === "occupied" ? (
                      <StarIcon sx={{ fill: "black" }} />
                    ) : selectedSeats.includes(seat.id) ? (
                      <StarIcon sx={{ fill: "yellow" }} />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </SeatButton>
                ))}
              </SeatRow>
            ))}
          </SeatGridContainer>

          <SelectedSeatsContainer>
            <SelectedSeatsTitle>Selected Seats</SelectedSeatsTitle>
            {selectedSeats.map((seat) => (
              <SelectedSeatItem key={seat}>{seat}</SelectedSeatItem>
            ))}
          </SelectedSeatsContainer>
        </>
      )}
      <CartModal />
    </PageContainer>
  );
};

export default FlightDetailsPage;
