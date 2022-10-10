import React from "react";

type Props = {
  children: JSX.Element,
};

export const MainContent: React.FC<Props> = ({ children }) => {
  return (
    <main className="container mx-auto lg:max-w-[1024px] flex flex-col items-center justify-center w-full mt-16 sm:mt-24 md:px-4 pb-8 text-neutral-500">
      {children}
    </main>
  );
};

