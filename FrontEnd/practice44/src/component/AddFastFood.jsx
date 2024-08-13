import axios from "axios";
import React, { useState } from "react";
import { Form, FormGroup, Input, Container, Button, Row, Col } from "reactstrap";

export const AddFastFood = () => {
  const [Foods, setFood] = useState({
    //id: "",
    foodName: "",
    foodCategory: "",
    hotelName: "",
    description: "",
    price: 0,
    image: null,
  });

  const handleForm = (e) => {
    console.log(Foods);
    postDataToServer(Foods);
    e.preventDefault();
  };

  //insert  data into database with api
  const postDataToServer = (data) => {
    axios
      .post(`http://localhost:8080/addFastFoodDetails`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then(
        (response) => {
          console.log(response);
          console.log("success");
          alert("istem inserted!...");
          //toast.success("Food added");
        },
        (error) => {
          console.log(error);
          console.log("not insertted.....");
          //toast.error("Error | Something went wrong!....");
        }
      );
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:"center"}}>
      <div  >
        <Form className="my-form"onSubmit={handleForm} encType="multipart/form-data" action="post">
        <div >
               <h1>Add Food Details Form</h1>
                <p>- Enter your Food Details</p>
                </div>
          {/* <FormGroup>
            <Input
              type="text"
              placeholder="Enter ID"
              name="id"
              id="id"
              className="form-control"
              onChange={(e) => setFood({ ...Foods, id: e.target.value })}

                            
              required
              pattern="^[a-zA-Z0-9]+$"
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | FoodName must be in String!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 
      
            />
          </FormGroup> */}

          <FormGroup>
            <Input
              type="text"
              placeholder="Enter food Name"
              name="foodName"
              id="foodName"
              className="my-input"
              onChange={(e) => {
                setFood({ ...Foods, foodName: e.target.value });
              }}
              
              required
              pattern="^[a-zA-Z\s]+$"
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | FoodName must be in String!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 
      
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter food Category Name"
              name="foodCategory"
              id="foodCategory"
              className="my-input"
              onChange={(e) => {
                setFood({ ...Foods, foodCategory: e.target.value });
              }}


              required
              pattern="^[a-zA-Z\s]+$"
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | foodCategory must be in String!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 


            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter Hotel Name"
              name="hotelName"
              id="hotelName"
              className="my-input"
              onChange={(e) => {
                setFood({ ...Foods, hotelName: e.target.value });
              }}
             
              required
              pattern="^[a-zA-Z\s]+$"
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | hotelName must be in String!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 


            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter Description Name"
              name="description"
              id="description"
              className="my-input"
              onChange={(e) => {
                setFood({ ...Foods, description: e.target.value });
              }}
              
              required
              pattern="^[a-zA-Z\s]+$"
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | description must be in String!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 


            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              placeholder="Enter price"
              name="price"
              id="price"
              className="my-input"
              onChange={(e) => {
                setFood({ ...Foods, price: e.target.value });
              }}


              required
              pattern="^\d+(\.\d{1,2})?$"
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | Price must be in Number!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 


              
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="file"
              name="image"
              placeholder="select food image!"
              id="image"
              className="my-input"
              onChange={(e) => {
                setFood({ ...Foods, image: e.target.files[0] });
              }}

              
              required
              onInvalid={(e)=>{
                e.target.setCustomValidity(" required | File must be required!")

              }}
              onInput={(e)=>{e.target.setCustomValidity("")}} 
 
            />
          </FormGroup>
          <Container>
            <Button type="submit" color="success" outline className="my-button">
              Add Food Item
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              color="warning ml-2"
              type="reset"
              outline
              className="my-button"
            >
              Clear Food Item
            </Button>
          </Container>
        </Form>
        </div>
      </div>
    
    </>
  );
};
