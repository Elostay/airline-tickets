import { useEffect, useState } from "react";
import FlightsList from "../../components/FlightsList/FlightsList";
import SortFlights from "../../components/SortFlights/SortFlights";
import { getAllFlights } from "../../api/flights";
import { Box, CircularProgress } from "@mui/material";
import { IFlight } from "../../interfaces/Flight";
import { FlightsPageContainer } from "./FlightsPage.styled";

const FlightsPage = () => {
  const [flights, setFlights] = useState<IFlight[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAllFlights();

        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <FlightsPageContainer>
      <SortFlights flights={flights} setFlights={setFlights} />
      <FlightsList flights={flights} />
    </FlightsPageContainer>
  );
};

export default FlightsPage;
