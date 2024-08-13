import axios from "axios";
import React, { useEffect, useState } from "react";
import "../utility/ShowAllFastFoodCss.css";
import { useNavigate } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

export const ShowAllFastFood = () => {
  const [AllFastFood, setAllFastFood] = useState([]);

  //method to get all FastFood
  useEffect(() => {
    axios.get(`http://localhost:8080/getFastFoodDeatils`).then(
      (response) => {
        setAllFastFood(response.data);
        console.log(response);
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  }, []);

  //handle Delete by id
  const deleteFastFoodByItem = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:8080/deleteFastFoodByID`, {
        params: {
          id: id,
        },
      })
      .then(
        (response) => {
          alert("item deleted" + id);
        },
        (error) => {
          alert("Not delete | somethong wrong!");
        }
      );
  };

  //handle edit..........................
  const navigate = useNavigate();

  //method for redirect user to update page...........
  const handleRedirect = (id) => {
    navigate(`/UpdateFood/${id}`);
  };
  return (
    <>
      <div className="myDiv">
        <div >
          
            <h3>Update User Credentials Form</h3>
            <p>-Update an Account</p>
          
          <table className="card-table table table-striped">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Food Category</th>
                <th>Hotel Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(AllFastFood).map((item) => (
                <tr key={item.id} class="highlight-row">
                  <td>{item.foodName}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.hotelName}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <img
                      class="round-image"
                      src={"data:image/png;base64," + item.image}
                      alt="Food"
                      style={{
                        borderRadius: "10px",
                        width: "50px",
                        height: "80px",
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      className="card-button btn btn-primary"
                      variant="primary"
                      onClick={() => handleRedirect(item.id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="card-button btn btn-danger"
                      variant="danger"
                      onClick={() => deleteFastFoodByItem(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
