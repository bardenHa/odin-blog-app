import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <div className="">
      <div className="">
        <p className="mt-10 text-5xl text-center">Not found!</p>
      </div>
    </div>
  );
}
