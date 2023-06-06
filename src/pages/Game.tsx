import { useNavigate, useParams } from "react-router-dom";
import { GoBack } from "../components/GoBack";

export const Game = () => {
  const navigate = useNavigate();
  const { roomCode } = useParams();

  return (
    <>
      <GoBack onClick={() => navigate(-1)} />
      <div>Welcome to {roomCode}</div>
    </>
  );
};
