import React from "react";
import "./page404.scss"

const Page404 = () => {
  return (
    <div style={{fontSize: '40px'}} className="page404">
      <main>
        <h1 className="text-9xl">
          4
          <span>
            <i className="fas fa-ghost"></i>
          </span>
          4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
      </main>
    </div>
  );
};

export default Page404;
