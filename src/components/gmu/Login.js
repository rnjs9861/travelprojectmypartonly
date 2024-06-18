import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postLogin } from "../../apis/gmu/loginApi"; // 로그인 API 함수 가져오기

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { userId, userPw };

    try {
      const response = await postLogin(loginData);
      const { userName } = response.data; // 서버에서 반환된 사용자 이름

      // 로그인 성공 시 로컬 스토리지에 저장
      localStorage.setItem("user_id", userId);
      localStorage.setItem("user_name", userName);

      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      setLoginError(
        "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요."
      );
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <h1>로그인</h1>
          <InputField>
            <Label>아이디</Label>
            <Input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </InputField>
          <InputField>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              required
            />
          </InputField>
          <Button type="submit">로그인</Button>
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        </LoginForm>
      </Container>
    </Wrapper>
  );
};

export default Login;

// Styled-components

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  h1 {
    background-color: blue;
    padding: 20px 20px 20px 20px;
    margin: 0 auto;
  }
  img {
    margin: auto;
    display: block;
    width: 300px;
  }
`;

const Container = styled.div`
  margin-top: 50px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const InputField = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;
