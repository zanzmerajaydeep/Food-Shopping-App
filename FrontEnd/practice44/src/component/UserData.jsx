import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import DatePicker from "react-datepicker";

export const UserData = () => {
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8081/fetchAll`).then(
      (response) => {
        setUserData(response.data);
        // alert("get Data");
      },
      (error) => {
        // alert(error);
      }
    );
  });

  //-----------------------------------------------------------------------------
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);

  const handleFromDateChange = (e) => {
    const date = e.target.value;
    if (!selectedToDate || date <= selectedToDate) {
      setSelectedFromDate(date);
    }
  };

  const handleToDateChange = (e) => {
    const date = e.target.value;
    if (!selectedFromDate || date >= selectedFromDate) {
      setSelectedToDate(date);
    }
  };

  const setReservationdate=(e)=>{
    axios.get(`http://localhost:8080/reservationTest`,{
      params:{
        fromDate:selectedFromDate,
        toDate:selectedToDate
      }
    }).then(
      (response)=>{
        console.log(response);

      },
      (error)=>{
        console.log(error)

      })
  }

  // var dateToday = new Date();
  // var dates = $("#from, #to").datepicker({
  //   defaultDate: "+1w",
  //   changeMonth: true,
  //   numberOfMonths: 3,
  //   minDate: dateToday,
  //   onSelect: function (selectedDate) {
  //     var option = this.id == "from" ? "minDate" : "maxDate",
  //       instance = $(this).data("datepicker"),
  //       date = $.datepicker.parseDate(
  //         instance.settings.dateFormat || $.datepicker._defaults.dateFormat,
  //         selectedDate,
  //         instance.settings
  //       );
  //     dates.not(this).datepicker("option", option, date);
  //   },
  // });

  return (
    <>
      <div className="myDiv">
        <div>
          <div>
            <input
              type="date"
              value={selectedFromDate}
              onChange={handleFromDateChange}
              // min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="date"
              value={selectedToDate}
              onChange={handleToDateChange}
              min={selectedFromDate}
            />
            <Button className=" my-button" color="primary" onClick={()=>setReservationdate()} outline >selectDate</Button>
          </div>

          <Form>
            <FormGroup>
              <Input
                type="text"
                placeholder="Enter your search query"
                id="name"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </FormGroup>
            <Button type="submit" color="primary" outline className="my-button">
              Search
            </Button>
          </Form>
          <br></br>
          <br></br>
          <div >
            <div className="table-container">
              <table className="card-table">
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
                  {Array.from(userData)
                    .filter((usr) => {
                      return search.toLocaleLowerCase() === ""
                        ? usr
                        : usr.username.toLocaleLowerCase().includes(search);
                    })
                    .map((item, index) => (
                      <tr key={index} class="highlight-row">
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="logo192.png" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
