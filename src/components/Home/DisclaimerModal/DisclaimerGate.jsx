"use client";

import { useEffect, useState } from "react";
import DisclaimerModal from "./DisclaimerModal.jsx";

const DISCLAIMER_KEY = "disclaimerAccepted";

export default function DisclaimerGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(DISCLAIMER_KEY);
    if (accepted !== "true") {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleAccept = () => {
    window.localStorage.setItem(DISCLAIMER_KEY, "true");
    setShow(false);
  };

  if (!show) return null;

  return <DisclaimerModal onAccept={handleAccept} />;
}
