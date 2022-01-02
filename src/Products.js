import React from "react";
import {Link} from "react-router-dom";
const Products = () => {
  return (
    <div>
      <h3>Products</h3>
      <Link to="/product" >Go to product</Link>
    </div>
  );
};
export default Products;