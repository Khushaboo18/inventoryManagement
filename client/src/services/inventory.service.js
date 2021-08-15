import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const getInventory = () => {
  return axios.get(API_URL + "inventory", { headers: authHeader() });
};

const addToInventory = (car_make, car_year, car_model, car_color, car_sales_price, car_cost) => {
  return axios.post(API_URL + "inventory/add", {car_make, car_year, car_model, car_color, car_sales_price, car_cost}, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const sellFromInventory = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

export default {
  getInventory,
  addToInventory,
  sellFromInventory,
};
