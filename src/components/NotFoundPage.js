import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Go home</Link>
    <button>styled button</button>
    <button>styled button2</button>
  </div>
);

export default NotFoundPage;
