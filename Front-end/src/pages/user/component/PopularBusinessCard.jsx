import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";


const PopularBusinessCard = ({ service }) => {
    const { id, name, image, address, category, provider } = service; // Correct destructure

    return (
      <Link to={'/my-project/user/login'} className="product-card">
        <img src={image} alt={name} className="product-image" />
        <div className="product-content">
          <h3 className="product-category">{category}</h3>
          <h2 className="product-name">{name}</h2>
          <h4 className="product-provider">{provider}</h4>
          <p className="product-address">{address}</p>
          <Button className="product-button">Book Now</Button>
        </div>
      </Link>
    );
  };
  export default PopularBusinessCard;