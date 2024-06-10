import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ALOTlogo from "../../images/ALOTlogo.png";
import { checkDuplicateId, postAccount } from "../../apis/gmu/signupApi";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");
  const [idDuplicateError, setIdDuplicateError] = useState("");

  const [emailError, setEmailError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const validateInput = (value, type) => {
    const regEx = /^(?=.*\d).{5,}$/;
    if (!regEx.test(value)) {
      return `${type}는 5자 이상과 숫자가 포함되어야 합니다.`;
    }
    return "";
  };

  const validateEmail = (email) => {
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regEx.test(email);
  };

  const handleIdChange = async (e) => {
    const newId = e.target.value;
    setUserId(newId);

    const validationError = validateInput(newId, "ID");
    setIdError(validationError);

    if (!validationError) {
      try {
        const isDuplicate = await checkDuplicateId(newId);
        if (isDuplicate) {
          setIdDuplicateError("이미 사용 중인 ID입니다.");
        } else {
          setIdDuplicateError("");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setIdDuplicateError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idValidationError = validateInput(userId, "ID");
    const pwValidationError = validateInput(userPw, "비밀번호");
    const confirmPwValidationError =
      userPw !== confirmPw ? "비밀번호가 일치하지 않습니다." : "";
    const emailValidationError = !validateEmail(userEmail)
      ? "올바른 이메일 형식이 아닙니다."
      : "";

    setIdError(idValidationError);
    setPwError(pwValidationError);
    setConfirmPwError(confirmPwValidationError);
    setEmailError(emailValidationError);

    if (
      idValidationError ||
      pwValidationError ||
      confirmPwValidationError ||
      idDuplicateError
    ) {
      return;
    }

    const signupData = {
      uid: userId,
      upw: userPw,
      nm: userName,
      email: userEmail,
    };

    try {
      await postAccount(signupData);
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>
          <img src={ALOTlogo} alt="로고" />
        </h1>
      </Header>
      <Container>
        <SignupForm onSubmit={handleSubmit}>
          <h1>회원가입</h1>
          <InputField>
            <Label>아이디</Label>
            <Input type="text" value={userId} onChange={handleIdChange} />
            {idError && <ErrorMessage>{idError}</ErrorMessage>}
            {idDuplicateError && (
              <ErrorMessage>{idDuplicateError}</ErrorMessage>
            )}
          </InputField>
          <InputField>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={userPw}
              onChange={(e) => {
                setUserPw(e.target.value);
                setPwError(validateInput(e.target.value, "비밀번호"));
              }}
            />
            {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              value={confirmPw}
              onChange={(e) => {
                setConfirmPw(e.target.value);
                setConfirmPwError(
                  userPw !== e.target.value
                    ? "비밀번호가 일치하지 않습니다."
                    : ""
                );
              }}
            />
            {confirmPwError && <ErrorMessage>{confirmPwError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label>이메일</Label>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label>이름</Label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputField>
          <Button type="submit">회원가입</Button>
          {showSuccess && (
            <SuccessMessage>
              <p>회원가입이 완료되었습니다.</p>
              <Link to="/">확인</Link>
            </SuccessMessage>
          )}
        </SignupForm>
      </Container>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div``;

const Header = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SignupForm = styled.form`
  background: white;
  padding: 2vw;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const InputField = styled.div`
  margin-bottom: 1vw;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 0;
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
`;
