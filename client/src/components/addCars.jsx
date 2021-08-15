import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import InventoryService from "../services/inventory.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import Dashboard from "./dashboard";

const AddCars = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [salesPrice, setSalesPrice] = useState(undefined);
  const [cost, setCost] = useState(undefined);
  const inventoryForm = useRef();

  const addtoInventory = (e) => {
    e.preventDefault();
    inventoryForm.current.validateAll();
    if(make && year && model && color && salesPrice && cost){
      InventoryService.addToInventory(make, year, model, color, salesPrice, cost).then(
        (res) => {
          alert(res.message);
        }
      );
      setMake("");
      setColor("");
      setModel("");
      setYear("");
      setSalesPrice(undefined);
      setCost(undefined);
      window.location.reload();
    };
  }
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      EventBus.dispatch("logout");
    }
  }, []);

  return (
    <div>
    <div className="container-fluid">
      <div style={{"textAlign": "center"}}>
        <h3>Purchase a new car</h3>
      </div>
      <Form onSubmit={addtoInventory} ref={inventoryForm}>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="make">Make</label>
            <input
              type="text"
              className={"form-control " + (make ? 'is-valid' : 'is-invalid')}
              name="Make"
              placeholder=" Enter make"
              value={make}
              onChange={(e)=>{setMake(e.target.value)}}
              required
            />
            <div className="invalid-feedback">
              Please provide make of the car.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              className={"form-control " + (model ? 'is-valid' : 'is-invalid')}
              name="Model"
              placeholder=" Enter model"
              value={model}
              onChange={(e)=>{setModel(e.target.value)}}
              required
            />
            <div className="invalid-feedback">
              Please provide model of the car.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="year">Year</label>
            <input
              type="month"
              min="1990-01"
              className={"form-control " + (year ? 'is-valid' : 'is-invalid')}
              name="Year"
              placeholder=" Enter year"
              value={year}
              onChange={(e)=>{setYear((e.target.value).toString())}}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid year.
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              className={"form-control " + (color ? 'is-valid' : 'is-invalid')}
              name="Color"
              placeholder=" Enter color"
              value={color}
              onChange={(e)=>{setColor(e.target.value)}}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="sales">Sales Price ($)</label>
            <input
              type="number" min="0" step="0.01"
              className={"form-control " + (salesPrice ? 'is-valid' : 'is-invalid')}
              name="Sales Price"
              placeholder=" Enter sales price"
              value={salesPrice}
              onChange={(e)=>{setSalesPrice(Number(e.target.value))}}
              required
            />
            <div className="invalid-feedback">
              Please provide sales price.
            </div>
          </div>
          <div className="col-md-4 mb-3">
          <label htmlFor="cost">Cost ($)</label>
           <input 
              type="number" min="0" step="0.01"
              className={"form-control " + (cost ? 'is-valid' : 'is-invalid')}
              name="Cost"
              placeholder=" Enter cost"
              value={cost}
              onChange={(e)=>{setCost(Number(e.target.value))}} 
              required 
            />
            <div className="invalid-feedback">
              Please provide a cost.
            </div>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">Add to Inventory</button>
      </Form>
    </div>
    <div>
    <Dashboard headerTitle={"Purchase History"} showColumn={false}/>
    </div>
    </div>
  );
};

export default AddCars;
