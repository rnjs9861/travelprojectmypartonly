import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getUserInfo } from "../../apis/gmu/signupApi";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState("");

  const { uid } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(uid);
        setUserInfo(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>내 정보</h1>
        {userInfo && (
          <UserInfo>
            <p>
              <strong>아이디:</strong> {userInfo.uid}
            </p>
            <p>
              <strong>이름:</strong> {userInfo.nm}
            </p>
            <p>
              <strong>이메일:</strong> {userInfo.email}
            </p>
          </UserInfo>
        )}
      </Container>
      <Link to={`/editmypage/${uid}`}>회원정보 수정</Link>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div``;

const Container = styled.div`
  text-align: center;
`;

const UserInfo = styled.div`
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  background-color: #f9f9f9;
`;
