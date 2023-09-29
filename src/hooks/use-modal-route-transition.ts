import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useModalRouteTrasition(duration = 300) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(true), []);

  const goBack = () => {
    setOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, duration);
  };

  return { open, goBack };
}
