import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getUserDataFromServer } from "../services/FoodService.jsx";

import { Home } from "./Home";
import { debounce } from "debounce";

export const AllFood = ({ foods, addToCart }) => {
  //validate login and user=========================================================
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userdata.username === undefined) {
      navigate("/Login");
    }
  }, [userdata]);

  //===========================================================================

  const [FastFoods, setFastFoods] = useState([]);

  //search mechanosm...............
  const [searchFoodName, setSearchFoodName] = useState("");
  const [searchValue, setSearchValue] = useState({});

  //search mwchanism...............
  const handleForm = (e) => {
    setSearchFoodName(e.target.value);
  };
  useEffect(
    (e) => {
      axios
        .get(`http://localhost:8080/getFastFoodDeatilsBySearch`, {
          params: {
            searchFoodName: searchFoodName,
          },
        })
        .then(
          (response) => {
            setSearchValue(response.data);
            //console.log(response);
          },
          (error) => {
            alert("data not Found!..");
            // console.log(error);
          }
        );
    },
    [searchFoodName]
  );

  // const name = "jaydeep";
  // const obj = {
  //   name: name
  // };
  
  // const checkIt = (e) => {
  //   axios
  //     .post(`http://localhost:8888/roomservice/testPost`,obj )
  //     .then(
  //       (response) => {
  //         console.log("responnnn: "+response.data);
  //         //console.log(response);
  //       },
  //       (error) => {
  //         console.log(error);
  //         // console.log(error);
  //       }
  //     );
  // };
  

  const handleClear = () => {
    // Clear search value
    setSearchValue("");
  };

  return (
    <>
      <div className="myDiv">
        <div >
          {/* Form for Searching item  .............................................*/}
          <Form
            onSubmit={handleForm}
            style={{
              width: "1200px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormGroup>
              <Input
                type="text"
                placeholder="Search item"
                id="name"
                onChange={debounce(handleForm, 370)}

                // onChange={(e) => {
                //   setSearchFoodName(e.target.value);
                // }}
              />
            </FormGroup>
            <Button type="submit" color="primary" >
              Search
            </Button>
           
          </Form>
          {/* <Button  color="primary"  onClick={checkIt}>
              check
            </Button> */}
          <br></br>
          <div>
            {searchFoodName.length != 0 ? (
              //search items...............................................................
              // <pre>{JSON.stringify(searchValue, null, 2)}</pre>
              <>
                <div className="card-container">
                  {Array.from(searchValue).map((items) => (


                    <div key={items.id} className="card">
                      <img
                        className="card-image"
                        src={"data:image/png;base64," + items.image}
                        alt="Card"
                      />
                      <div className="card-content">
                        <h2 className="card-title">{items.foodName}</h2>
                        <p className="card-text">
                          {items.description}
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <Button
                          type="submit"
                          color="success"
                          outline
                          className="my-button"
                          onClick={() => addToCart(items)}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>

                    
                  ))}
                </div>
              </>
            ) : (
              //All items.........................................................................
              <>
                <div className="card-container">
                  {Array.from(foods).map((items) => (
                    <div key={items.id} className="card" >
                      <img
                        className="card-image"
                        src={"data:image/png;base64," + items.image}
                        alt="Card"
                      />
                      <div className="card-content">
                        <h2 className="card-title">{items.foodName}</h2>
                        <p className="card-text">
                          {items.description}
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>

                        <Button
                          type="submit"
                          color="success"
                          outline
                          className="my-button"
                          onClick={() => addToCart(items)}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>

                  
                  ))}
                </div>
              </>

              //...............................................................................
            )}
          </div>
        </div>
      </div>
    </>
  );
};
