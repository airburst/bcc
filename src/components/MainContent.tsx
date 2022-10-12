import React from "react";

type Props = {
  children: JSX.Element;
};

export const MainContent: React.FC<Props> = ({ children }) => (
  <main className="container mx-auto mt-16 flex w-full flex-col items-center justify-center pb-16 text-neutral-500 sm:mt-24 md:px-4 lg:max-w-[1024px]">
    {children}
  </main>
);
