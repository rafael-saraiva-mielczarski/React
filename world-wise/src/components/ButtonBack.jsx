import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton({ navRoute }) {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(navRoute);
      }}
    >
      &larr; Back
    </Button>
  );
}
