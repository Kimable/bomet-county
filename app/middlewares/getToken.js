"use client";
import { useState, useEffect } from "react";

export const getToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (!tkn) {
      return null;
    }
    setToken(tkn);
  }, []);

  return token;
};
