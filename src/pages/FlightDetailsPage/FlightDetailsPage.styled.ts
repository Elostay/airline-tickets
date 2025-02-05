import styled from "@emotion/styled";

const colors = {
  primary: "#3498db",
  secondary: "#2ecc71",
  accent: "#f39c12",
  background: "#ecf0f1",
  textPrimary: "#2c3e50",
  textSecondary: "#95a5a6",
  disabled: "#bdc3c7",
};

export const PageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${colors.textPrimary};

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const FlightInfo = styled.p`
  font-size: 18px;
  color: ${colors.textSecondary};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SeatGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const SeatRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;

  @media (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const SeatButton = styled.button<{
  disabled: boolean;
  selected: boolean;
  occupied: boolean;
}>`
  background-color: ${({ selected, occupied }) =>
    occupied ? colors.disabled : selected ? colors.accent : colors.secondary};
  color: ${({ disabled, occupied }) =>
    disabled ? "gray" : occupied ? "white" : "black"};
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled, selected }) =>
      disabled ? colors.disabled : selected ? colors.primary : colors.accent};
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const SelectedSeatsContainer = styled.div`
  margin-top: 30px;
  max-width: 600px;
  margin: 30px auto;
`;

export const SelectedSeatsTitle = styled.h2`
  font-size: 20px;
  color: ${colors.textPrimary};
  margin-bottom: 10px;
  text-align: center;
`;

export const SelectedSeatItem = styled.p`
  font-size: 16px;
  color: ${colors.textPrimary};
  margin: 5px 0;
  text-align: center;
`;
