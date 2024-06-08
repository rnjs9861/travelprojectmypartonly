import axios from "axios";
import { SERVER } from "../config";

export const getPlanOne = async (id) => {
  try {
    const res = await axios.get(`${SERVER}/travel/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const modifyPlan = async (updatePlan) => {
  try {
    const res = await axios.patch(`${SERVER}/${updatePlan.id}`, updatePlan);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlan = async (id) => {
  try {
    const res = await axios.delete(`${SERVER}/travel/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
