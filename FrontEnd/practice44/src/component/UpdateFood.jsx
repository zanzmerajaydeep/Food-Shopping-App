import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";
import "../utility/UpdateFood.css";

export const UpdateFood = () => {
  const { id } = useParams();

  //const[RawFastFood,setRawFastFood]=useState({})
  const [Foods, setFood] = useState({
    id: "",
    foodName: "",
    foodCategory: "",
    hotelName: "",
    description: "",
    price: 0,
    image: null,
  });

  //fetch FastFood by Id..............................
  useEffect((e) => {
    axios
      .get(`http://localhost:8080/getFastFoodDeatilsById`, {
        params: {
          id: id,
        },
      })
      .then(
        (response) => {
          // setRawFastFood(response.data);
          console.log(response);
          setFood(response.data);
        },
        (error) => {
          alert("data not fetch....from DB");
          console.log(error);
        }
      );
  }, []);

  //code to save update fastFood data................
  const handleForm = (e) => {
    console.log("insert Data" + Foods);
    updatePostDataToServer(Foods);
    e.preventDefault();
  };

  //Update data into database with api
  const updatePostDataToServer = (data) => {
    console.log("data call==" + data);
    axios
      .post(`http://localhost:8080/updateFastFoodDetails`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then(
        (response) => {
          console.log(response);
          console.log("success");
          alert("updated");
          //toast.success("Food added");
        },
        (error) => {
          console.log(error);
          alert("error");
          console.log("not insertted.....");
          //toast.error("Error | Something went wrong!....");
        }
      );
  };

  console.log(id);
  return (
    <div  
    style={{display:'flex',justifyContent:"center"}}>
      <div  >
        <Form className="my-form" onSubmit={handleForm} encType="multipart/form-data" action="post">
          <div style={{justifyContent:"center",margin:"20px"}}>
            
            <h3>Update User Credentials Form</h3>
            <p>-Update an Account</p>
            </div>

          <FormGroup>
            <Input
              type="text"
              placeholder="Enter ID"
              name="id"
              id="id"
              value={Foods.id}
              className="form-control"
              onChange={(e) => setFood({ ...Foods, id: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter food Name"
              name="foodName"
              id="foodName"
              value={Foods.foodName}
              className="form-control"
              onChange={(e) => {
                setFood({ ...Foods, foodName: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter food Category Name"
              name="foodCategory"
              id="foodCategory"
              value={Foods.foodCategory}
              className="form-control"
              onChange={(e) =>
                setFood({ ...Foods, foodCategory: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter Hotel Name"
              name="hotelName"
              id="hotelName"
              value={Foods.hotelName}
              className="form-control"
              onChange={(e) => setFood({ ...Foods, hotelName: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Enter Description Name"
              name="description"
              id="description"
              value={Foods.description}
              className="form-control"
              onChange={(e) =>
                setFood({ ...Foods, description: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              placeholder="Enter price"
              name="price"
              id="price"
              value={Foods.price}
              className="form-control"
              onChange={(e) => setFood({ ...Foods, price: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="file"
              name="image"
              placeholder="Select food image!"
              id="image"
              className="form-control-file"
              onChange={(e) => setFood({ ...Foods, image: e.target.files[0] })}
            />
          </FormGroup>
          <Container>
            <Button type="submit" color="success" outline className="my-button">
              Add Food Item
            </Button>
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
  );
};
