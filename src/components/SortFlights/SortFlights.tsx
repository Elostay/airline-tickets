import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IFlight } from "../../interfaces/Flight";
import { useState } from "react";

interface SortFlightsProps {
  flights: IFlight[];
  setFlights: React.Dispatch<React.SetStateAction<IFlight[]>>;
}

const SortFlights: React.FC<SortFlightsProps> = ({ flights, setFlights }) => {
  const [originalFlights] = useState(flights);
  const [filter, setFilter] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    handleFilter(selectedFilter);
  };

  const handleFilter = (filter: string) => {
    let sortedFlights = [...flights];

    switch (filter) {
      case "high-low":
        sortedFlights = sortedFlights.sort((a, b) => b.price - a.price);
        break;
      case "low-high":
        sortedFlights = sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case "favourite":
        sortedFlights = JSON.parse(localStorage.getItem("favourite") || "[]");
        break;

      case "all":
        sortedFlights = [...originalFlights];
        console.log("💖 ~ handleFilter ~ flights:", flights);
        break;
      default:
        break;
    }

    setFlights(sortedFlights);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="filterId">Sort</InputLabel>
        <Select
          labelId="filterId"
          id="select"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value="high-low">High-Low Price</MenuItem>
          <MenuItem value="low-high">Low-High Price</MenuItem>
          <MenuItem value="favourite">Favourite</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFlights;
