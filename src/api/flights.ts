import axios from "axios";

const BASE_URL =
  "https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights";

export const getAllFlights = () => {
  const data = axios
    .get(BASE_URL)
    .then((res) => res.data)
    .catch((err) => console.error("Error fetching all flights:", err));

  return data;
};

export const getFlightById = (id: string) => {
  const data = axios
    .get(`${BASE_URL}/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error fetching  flight by id:", err));

  return data;
};
