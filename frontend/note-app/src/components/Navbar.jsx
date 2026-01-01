import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="bg-base-300 flex justify-between items-center px-40 py-4 border-b border-accent ">
      <h1 className="text-2xl text-primary font-bold">ThinkBoard</h1>
      <Link to="/create" className="btn btn-soft btn-primary rounded-3xl">
        <PlusIcon className="size-5" />
        <div>New Note</div>
      </Link>
    </header>
  );
}
