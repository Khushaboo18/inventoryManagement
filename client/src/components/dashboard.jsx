import React, { useState, useEffect } from "react";
import InventoryService from "../services/inventory.service";
import EventBus from "../common/EventBus";

const Dashboard = (props) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    retrieveInventory();
  }, []);

  const retrieveInventory = () => {
    InventoryService.getInventory().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(error.response.data.message);

        if (error.response && (error.response.status === 403||error.response.status === 401)) {
          EventBus.dispatch("logout");
          props.history.push("/login");
        }
      }
    );
  };

  const sellFromInventory = (id) =>{
    if(id){
      InventoryService.sellFromInventory(id).then(
        (res) => {
          console.log("Great, you just sold a car!");
          setContent("");
          alert(res.message);
          retrieveInventory();
        }
      );
    };
  }

  const renderInventoryData = () => {
    if(content.length)
    return content.map((data, index)=>{
      return (
        <tr key={index} style={{display: "table", overflow: "auto", width: "100%"}}>
            <td>{1+index}</td>
            <td>{data.car_make}</td>
            <td>{data.car_model}</td>
            <td>{data.car_year}</td>
            <td>{data.car_color}</td>
            <td>{data.car_sales_price}</td>
            <td>{data.car_cost}</td>
            {props.showColumn? <td><button className="btn btn-dark" type="submit" onClick={()=>{sellFromInventory(data._id)}}>Sell</button></td> : <></>}
          </tr>
      );
    }
    )
  };

  return (
    <div className="container-fluid">
      
      <div className="" style={{textAlign: "center"}}>
        <h3>{props.headerTitle}</h3>
      </div>
      <table className="table table-striped table-hover">
        <thead className="fixHeader" >
          <tr style={{position: "relative"}}>
            <th scope="col">#</th>
            <th scope="col">Make</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Color</th>
            <th scope="col">Sales Price ($)</th>
            <th scope="col">Cost ($)</th>
            {props.showColumn? <th scope="col"></th> : <></>}
          </tr>
        </thead>
        <tbody className="scrollContent">
          {renderInventoryData()}
        </tbody>
      </table>
      
    </div>
  );
};

export default Dashboard;
