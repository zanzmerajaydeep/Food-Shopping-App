import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
} from "reactstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

export const FoodCard = (foods) => {
    console.log("card=="+foods)
  return (
    <>
      <div>
      {foods.foodName}
        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
            position="top"
            alt="..."
          />
          <MDBCardBody>
            <MDBCardTitle>{foods.foodName}</MDBCardTitle>
            <MDBCardText>
              {foods.description}
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
            <MDBBtn href="#">Button</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};
