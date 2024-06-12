import axios from "axios";

export const postLogin = async data => {
  try {
    const res = await axios.post("/api/user/sign-in", data);
    console.log(res.data);
    if (res.status === "500") {
      alert(res.message);
      return "회원가입 성공";
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
