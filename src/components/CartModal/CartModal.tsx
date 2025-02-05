import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTicketFromCart, clearCart } from "../../redux/cartSlice";

import { RootState } from "../../redux/store";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import dateFormatter from "../../helpers/dateFormatter";

const CartModal: FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemoveTicket = (seatId: string | undefined) => {
    if (seatId) {
      dispatch(removeTicketFromCart(seatId));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <Button
        startIcon={<ShoppingCartIcon />}
        onClick={handleOpen}
        variant="contained"
        color="primary"
      >
        View Cart
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "80%",
            maxWidth: "600px",
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your Cart
          </Typography>

          {cartItems.length === 0 ? (
            <Typography>No tickets in the cart.</Typography>
          ) : (
            <>
              <Box
                sx={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  marginBottom: "20px",
                }}
              >
                {" "}
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.seatId} style={{ marginBottom: "15px" }}>
                      <Typography variant="body1">
                        Airline: {item.airline}, Seat: {item.seatId}
                      </Typography>
                      <Typography variant="body1">
                        Departure time: {dateFormatter(item.departureTime)},
                        Arival time:
                        {dateFormatter(item.arrivalTime)}
                      </Typography>
                      <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        Gate: {item.gate}
                      </Typography>
                      <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        Terminal: {item.terminal}
                      </Typography>
                      <Typography variant="body1">
                        Price: ${item.price}
                      </Typography>
                      <Button
                        onClick={() => handleRemoveTicket(item.seatId)}
                        startIcon={<DeleteIcon />}
                        color="error"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </Box>

              <Typography variant="h6" align="right" sx={{ marginTop: "20px" }}>
                Total: ${getTotalPrice()}
              </Typography>
            </>
          )}

          <Button
            onClick={() => dispatch(clearCart())}
            variant="outlined"
            color="error"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            Clear Cart
          </Button>

          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: "10px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CartModal;
