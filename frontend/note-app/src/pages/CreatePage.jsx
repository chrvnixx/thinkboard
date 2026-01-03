import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function CreatePage() {
  return (
    <div className="min-h-screen">
      <Link to={"/"} className="btn btn-ghost ml-20 my-10">
        <ArrowLeftIcon />
        Back to Notes
      </Link>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Create New Note</h2>
          <form onSubmit={() => handleSubmit()}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input type="text" className="input input_bordered" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
