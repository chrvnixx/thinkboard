import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";

export default function NoteCard({ note }) {
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary"
    >
      <div className="card-body  ">
        <h3 className="card-title pl-5 pt-5 text-base-content ">
          {note.title}
        </h3>
        <p className="pl-5 pt-2 pb-4 font-light">{note.content}</p>
        <div className="flex justify-between">
          <span className="pl-5 font-light">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex mr-5 gap-2 items-center mb-7 ">
            <PenSquareIcon className="size-5" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-5 text-red" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
