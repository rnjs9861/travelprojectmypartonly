import axios from "axios";
import { SERVER } from "../config";

export const postPlan = async (newPlan) => {
  try {
    const res = await axios.post(`${SERVER}/tour`, newPlan);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlan = (id) => {
  return axios.get(`${SERVER}/tour/${id}`);
};
