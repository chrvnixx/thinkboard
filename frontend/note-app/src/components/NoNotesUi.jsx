import { NotebookTabsIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function NoNotesUi() {
  return (
    <div className="max-w-7xl flex justify-center flex-col items-center mx-auto mt-30">
      <div className="bg-primary/50 w-13 h-13 flex items-center justify-center rounded-full mb-7 ">
        <NotebookTabsIcon className="text-primary size-8" />
      </div>
      <h2 className="text-2xl mb-7">No notes yet</h2>
      <p className="text-center text-sm mb-7">
        Ready to organize your thoughts? Creat your first Note <br />
        to get started on your journey.
      </p>
      <Link to={"/create"} className="btn btn-primary rounded-full">
        Create Your First Note
      </Link>
    </div>
  );
}
