import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { store } from "./redux/store";
import FlightsPage from "./pages/FlightsPage/FlightsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage/FlightDetailsPage";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<FlightsPage />} />
            <Route path="/flights/:id" element={<FlightDetailsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
