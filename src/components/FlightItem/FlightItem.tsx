import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dateFormatter from "../../helpers/dateFormatter";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { IFlight } from "../../interfaces/Flight";
import { FavouriteContainer } from "./FlightItem.styled";
interface FlightItemProps {
  flight: IFlight;
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
  const [isFavoutire, setIsFavourite] = useState(false);

  const navigate = useNavigate();

  const handleLearnMoreClick = (id: string) => {
    navigate(`/flights/${id}`);
  };

  const handleSelectFavourite = (id: string) => {
    setIsFavourite((prev) => !prev);

    const favouriteArray = JSON.parse(
      localStorage.getItem("favourite") || "[]"
    );

    if (!Array.isArray(favouriteArray)) {
      console.error("localStorage favourite is not array");
      return;
    }

    const isAlreadyFavourite = favouriteArray.some(
      (flight: IFlight) => flight.id === id
    );

    let updatedFavourites;

    if (isAlreadyFavourite) {
      updatedFavourites = favouriteArray.filter(
        (flight: IFlight) => flight.id !== id
      );
    } else {
      updatedFavourites = [...favouriteArray, flight];
    }
    localStorage.setItem("favourite", JSON.stringify(updatedFavourites));
  };
  useEffect(() => {
    const selectFavourite = () => {
      const favouriteArray = JSON.parse(
        localStorage.getItem("favourite") || "[]"
      );
      const isFav = favouriteArray.some((el: IFlight) => el.id === flight.id);
      if (isFav) setIsFavourite(true);
    };
    selectFavourite();
  }, [flight.id]);
  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined" key={flight.id}>
        <CardContent>
          <FavouriteContainer>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {flight.airline}
            </Typography>
            <Button onClick={() => handleSelectFavourite(flight.id)}>
              {isFavoutire ? (
                <StarIcon sx={{ fill: "#f3e64a" }} />
              ) : (
                <StarBorderIcon />
              )}
            </Button>
          </FavouriteContainer>
          <Typography variant="h5" component="div"></Typography>
          <Typography variant="h5" component="div">
            From: {flight.from} To: {flight.to}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Departure Time: {dateFormatter(flight.departureTime)}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Arrival time: {dateFormatter(flight.arrivalTime)}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Gate: {flight.gate}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Id : {flight.id}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Terminal: {flight.terminal}
          </Typography>
          <Typography variant="body2">
            Remaining tickets: {flight.tickets.remaining} /
            {flight.tickets.total}
          </Typography>
          <Typography variant="h5" component="div">
            Price: {flight.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleLearnMoreClick(flight.id)} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FlightItem;
