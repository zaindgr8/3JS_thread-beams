import React, { startTransition } from "react";
import "../../App.css";

const Filter = ({ setActiveFilter }) => {
  const handleFilterClick = (filter) => {
    startTransition(() => {
      setActiveFilter(filter);
    });
  };

  return (
    <div className="filter-main w-screen h-10 flex justify-between items-center px-12 pt-6 text-lg bold">
      <p className="cursor-pointer" onClick={() => handleFilterClick("manufacturing")}>
        MANUFACTURING
      </p>
      <p className="cursor-pointer" onClick={() => handleFilterClick("Design")}>
        DESIGN
      </p>
      <p className="cursor-pointer" onClick={() => handleFilterClick("advisory")}>
        ADVISORY
      </p>
      <p className="cursor-pointer" onClick={() => handleFilterClick("Sourcing")}>
        SOURCING
      </p>
      {/* <p className="cursor-pointer" onClick={() => handleFilterClick("")}>
        ALL
      </p> */}
    </div>
  );
};

export default Filter;
