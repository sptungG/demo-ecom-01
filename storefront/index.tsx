import React from "react";

type TPageProps = { children?: React.ReactNode };

const Page = ({ children }: TPageProps) => {
  return <div>{children}</div>;
};

export default Page;
