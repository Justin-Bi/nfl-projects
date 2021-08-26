import React from "react";
import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <h1>Page Not Found</h1>
      <p>
        Looks like the page you were looking for doesn't exist. Click{" "}
        <a href="https://nfl-projects.herokuapp.com/">here</a> to go to the home
        page, or use the links in the navigation bar.
      </p>
    </div>
  );
}

export default PageNotFound;
