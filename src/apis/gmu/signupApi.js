import axios from "axios";
import { SERVER } from "../config";

export const postAccount = async (signupData) => {
  const response = await axios.post(`${SERVER}/account`, signupData);
  return response.data;
};

export const checkDuplicateId = async (userId) => {
  const response = await axios.get(`${SERVER}/백엔드?userId=${userId}`);
  return response.data.isDuplicate;
};
