import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  const location = useLocation();

  return (
    <nav className="text-md mt-4 mb-6 font-bold">
      <ol className="list-none p-0 inline-flex">
        {items.map((name, index) => {
          const isActive = location.pathname === name.link;
          return (
            <li
              key={name.title}
              className={`flex items-center ${
                isActive ? "text-gray-600" : "text-blue-600"
              }`}
            >
              {isActive ? (
                <span>{name.title}</span>
              ) : (
                <Link to={name.link}>{name.title}</Link>
              )}
              {index !== items.length - 1 && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
