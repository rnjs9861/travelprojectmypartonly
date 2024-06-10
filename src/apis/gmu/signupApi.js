import axios from "axios";
import { SERVER } from "../config";

export const postAccount = async (signupData) => {
  try {
    const response = await axios.post(`${SERVER}/api/user/sign-up`, signupData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkDuplicateId = async (userId) => {
  const response = await axios.get(`${SERVER}/백엔드?userId=${userId}`);
  return response.data.isDuplicate;
};
