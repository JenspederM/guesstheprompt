import { useEffect, useState } from "react";
import { DALLE_FACTS, Fact } from "../facts";

export function Welcome() {
  const [message, setMessage] = useState<Fact>({ id: 0, fact: "" });

  useEffect(() => {
    setMessage(DALLE_FACTS[Math.floor(Math.random() * DALLE_FACTS.length)]);

    const interval = setInterval(() => {
      setMessage(DALLE_FACTS[Math.floor(Math.random() * DALLE_FACTS.length)]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col absolute inset-0 items-center overscroll-contain max-h-screen min-h-0 overflow-hidden">
      <div className="flex flex-col grow w-full sm:max-w-md xl:max-w-2xl max-w-4xl items-center max-h-screen pt-8 pb-12 px-4">
        <div className="flex flex-col grow w-full items-center justify-center">
          <div className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Welcome to
          </div>
          <div className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
            Guess the prompt!
          </div>
          <div className="flex flex-col mt-10 items-center space-y-2">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span>{message.fact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
