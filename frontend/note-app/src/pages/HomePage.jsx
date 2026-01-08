import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import RateLimitUi from "../components/RateLimitUi";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoNotesUi from "../components/NoNotesUi";
import api from "../lib/axios";

export default function HomePage({ isRateLimit, setIsrateLimit }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${api}/notes`);

        setNotes(res.data);
        setIsrateLimit(false);
      } catch (error) {
        if (error.response.status == 429) {
          setIsrateLimit(true);
          toast.error("Too many requests");
        } else {
          toast.error("error fetching notes");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, []);
  return (
    <div>
      <Navbar />
      {isRateLimit && <RateLimitUi />}
      <div className="w-auto  p-4 mt-6 ">
        {isLoading && (
          <div className="text-center text-primary">Loading Notes...</div>
        )}
        {notes.length === 0 && !isRateLimit && (isLoading ? "" : <NoNotesUi />)}
        {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} setNotes={setNotes} notes={notes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
