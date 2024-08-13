import React, { useEffect, Component } from "react";
import { json } from "react-router-dom";
import { FoodCartStyle } from "../utility/FoodCartStyle.css";
import { debounce } from "debounce";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { Image } from "react-bootstrap";

export const CartFood = ({ foods, resetcart, removeCartItem }) => {
  //code for login======================================
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    alert("status = " + userdata.username + " " + userdata.role);
    if (userdata.username === undefined ) {
      navigate("/Login");
    } else if (userdata.role === "Admin") {
      alert("This page is not for u!");
      navigate("/AllFood");
    }
  }, userdata);

  //===========================================================================

  return (
    <>
      <div className="myDiv">
        <div>
           
        {foods.length !== 0 ? (
          <>
           <h3 >Cart Items</h3>
            
          <table >
            <tbody>
              {Array.from(foods).map((items, index1) => (

                <>

                {
                  items.qty<=0? removeCartItem(items.id):""
                }

                
                <tr key={items.id} className="highlight-row">
                  <td>
                    <div className="">
                      <Image style={{width:"150px",height:"150px"}}
                        className="card-image"
                        src={"data:image/png;base64," + items.image}
                        alt="Item"
                      />
                    </div>
                  </td>
                  <td>
                    
                    <h2 className="card-title">{items.foodName}</h2>
                  </td>
                  
                  <td>
                   
                    <p className="card-text">{items.description}</p>
                  </td>
                  
                  <td>
                    
                    <button
                      className="quantity-button minus-button card-button"
                      onClick={() => {
                        const _CART = foods.map((item, index2) => {
                          return index1 === index2
                            ? { ...item, qty: item.qty > 0 ? item.qty - 1 : 0 }
                            : item;
                        });
                        resetcart(_CART);
                      }}
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <span className="quantity-text">{items.qty}</span>
                  </td>
                  <td>
                    
                    <button
                      className="quantity-button plus-button card-button"
                      onClick={() => {
                        const _CART = foods.map((item, index2) => {
                          return index1 === index2
                            ? { ...item, qty: item.qty + 1 }
                            : item;
                        });
                        resetcart(_CART);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    {" "}
                    <Button
                      className="action-button remove-button card-button"
                      onClick={() => removeCartItem(items.id)}
                    >
                      Remove
                    </Button>
                  </td>
                  <span></span>
                  <td><p>Price : {items.qty*items.price}</p></td>
                </tr>

                </>

              ))}
            </tbody>
          </table>
          </>
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "200px",
            }}
          >
            No items in your cart!...
          </h1>
        )}
        </div>
      </div>
    </>

    // <>
    //   <div className="myDiv">
    //     {foods.length !== 0 ? (
    //       <div style={{  justifyContent: "center" ,margin:"20px"}}>
    //         {Array.from(foods).map((items, index1) => (

    //          <table style={{ width: "100%", borderCollapse: "collapse" }}>
    //          <tbody>
    //            {Array.from(foods).map((items, index1) => (
    //              <tr key={items.id}>
    //                <td style={{ padding: "10px" }}>
    //                  {/* <img
    //                    className="item-image"
    //                    src={"data:image/png;base64," + items.image}
    //                    alt="Item"
    //                  /> */}
    //                </td>
    //                <td style={{ padding: "10px" }}>
    //                  <h2 style={{ fontSize: "20px" }}>{items.foodName}</h2>
    //                  <p>{items.description}</p>
    //                </td>
    //                <td style={{ padding: "10px" }}>
    //                  <button
    //                    onClick={() => {
    //                      const _CART = foods.map((item, index2) => {
    //                        return index1 === index2
    //                          ? { ...item, qty: item.qty > 0 ? item.qty - 1 : 0 }
    //                          : item;
    //                      });
    //                      resetcart(_CART);
    //                    }}
    //                  >
    //                    -
    //                  </button>
    //                  <span style={{ margin: "0 5px" }}>{items.qty}</span>
    //                  <button
    //                    onClick={() => {
    //                      const _CART = foods.map((item, index2) => {
    //                        return index1 === index2
    //                          ? { ...item, qty: item.qty + 1 }
    //                          : item;
    //                      });
    //                      resetcart(_CART);
    //                    }}
    //                  >
    //                    +
    //                  </button>
    //                </td>
    //                <td style={{ padding: "10px" }}>
    //                  <button onClick={() => removeCartItem(items.id)}>Remove</button>
    //                </td>
    //              </tr>
    //            ))}
    //          </tbody>
    //        </table>

    //         ))}
    //       </div>
    //     ) : (
    //       <h1
    //         className="empty-cart-message"
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           margin: "200px",
    //         }}
    //       >
    //         No items in your cart!...
    //       </h1>
    //     )}
    //   </div>
    // </>
  );
};
