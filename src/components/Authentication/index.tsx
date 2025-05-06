import type React from "react";
interface AuthenticationProps {
  children: React.ReactNode;
  id: string;
  sideImage: string;
  direction: string;
  quote: string;
  addClass?: string;
}

export default function Authentication({
  children,
  id,
  sideImage,
  direction,
  quote,
  addClass,
}: AuthenticationProps) {
  return (
    <section
      id={id}
      className={`flex items-center justify-center pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50 ${addClass}`}
    >
      <div className="w-full max-w-screen-xl">
        <div
          className={`flex ${
            direction === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
          } flex-col rounded-2xl mx-auto overflow-hidden shadow-md`}
        >
          <div
            className={`h-48 md:h-64 lg:h-auto w-full lg:w-1/2 bg-cover bg-center relative group transition-all duration-500 ease-in-out overflow-hidden`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url('${sideImage}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-light-base/20 to-dark-base/60"></div>
            <div className="absolute inset-0 flex items-end p-4 md:p-8">
              <div className="relative z-10 max-w-md">
                <p className="text-light-base font-medium italic leading-relaxed">
                  {quote}
                </p>
                <div className="md:mt-2 lg:mt-4 h-1 w-16 bg-teal-300 rounded-full"></div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
