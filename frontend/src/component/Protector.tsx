import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protector({ children }: any) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (token) {
    return <>{children}</>;
  } else {
    useEffect(() => {
      navigate("/");
    }, []);
  }
}

export default Protector;
