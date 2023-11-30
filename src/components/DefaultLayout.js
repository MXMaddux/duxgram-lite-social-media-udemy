import React from "react";
import Header from "./Header";

const DefaultLayout = (props) => {
  return (
    <div>
      <Header />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
