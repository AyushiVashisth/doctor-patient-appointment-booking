import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="text-gray-600 text-sm mt-16">
      <Link to="/patient-dashboard">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            {isLast ? `/${name}` : <Link to={routeTo}>{`/${name}`}</Link>}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
