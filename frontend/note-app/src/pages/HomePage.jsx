import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import RateLimitUi from "../components/RateLimitUi";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimit(false);
      } catch (error) {
        if (error.response.status == 429) {
          setIsRateLimit(true);
        } else {
          toast.error("error getting notes");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);
  return (
    <div>
      <Navbar />
      {isRateLimit && <RateLimitUi />}
    </div>
  );
}
