import { ActivityIcon } from "lucide-react";
import React from "react";

export default function RateLimitUi() {
  return (
    <div className="bg-primary/30 max-w-200 mx-auto mt-7 p-5 border border-primary/70 rounded-md flex items-center  ">
      <div className="bg-primary/50 w-13 h-13 flex items-center justify-center rounded-full mr-5">
        <ActivityIcon className="text-primary size-10" />
      </div>
      <div className="text-white">
        <h2 className="text-xl font-bold mb-2">Rate Limit Reached</h2>
        <p>
          You've made too many requests in a short period. Please wait a moment.
        </p>
        <p className="text-sm">
          Try again in a few seconds for the best experience
        </p>
      </div>
    </div>
  );
}
