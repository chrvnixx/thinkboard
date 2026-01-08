import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import RateLimitUi from "../components/RateLimitUi";
import api from "../lib/axios";

export default function CreatePage({ isRateLimit, setIsrateLimit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${api}/notes`, {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        setIsrateLimit(true);
      }
      console.error("cant create note");
      toast.error("couldn't create note");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen">
      <Link to={"/"} className="btn btn-ghost ml-20 my-10">
        <ArrowLeftIcon />
        Back to Notes
      </Link>

      <div className="card bg-base-100 px-10 max-w-4xl mx-auto  ">
        <div className="card-body max-w-7xl mx-auto ">
          <h2 className="card-title text-2xl">Create New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4 flex flex-col">
              <label className="label">
                <span className="label-text text-lg">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered  outline-none md:w-lg lg:w-xl"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-lg">Content</span>
              </label>
              <textarea
                placeholder="write notes here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-bordered outline-none md:w-lg lg:w-xl"
              ></textarea>
            </div>
            {isRateLimit ? (
              <RateLimitUi />
            ) : (
              <div className="card-actions justify-end mt-7 ">
                <button
                  type="submit"
                  disabled={isLoading}
                  className=" btn btn-primary"
                >
                  {isLoading ? "Creating..." : "Create Note"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
