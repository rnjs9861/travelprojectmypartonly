import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <HeaderWrapper>
      <h1></h1>
      <nav>
        <NavList>
          <NavItem>
            <Link to="/">홈</Link>
          </NavItem>
          {!userName ? (
            <NavItem>
              <Link to="/login">로그인</Link>
            </NavItem>
          ) : (
            <>
              <NavItem>안녕하세요, {userName}님</NavItem>
              <NavItem>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              </NavItem>
            </>
          )}
        </NavList>
      </nav>
    </HeaderWrapper>
  );
};

export default Header;

// Styled-components

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: blue;
  color: white;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
