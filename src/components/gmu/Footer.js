import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FooterBody>
        <FirmName>ALOT PTE LTD</FirmName>
        <Ad>광고문의: 02-xxx-xxxx</Ad>{" "}
        <Email>이메일 문의:ALifeOfTravel@gmail.com</Email>
        <CopyRight>© Copyright ALOT Pte Ltd. Since 10 April 2024.</CopyRight>
      </FooterBody>
    </>
  );
};

export default Footer;

const FooterBody = styled.div`
  margin: 0 auto;
  background-color: skyblue;
  height: 200px;
  padding: 20px 0px;
  text-align: center;
  color: white;
`;

const FirmName = styled.div`
  padding: 10px 10px 10px 10px;
  font-size: 20px;
`;

const Ad = styled.div`
  margin: 0 auto;
  padding: 10px 10px 10px 10px;
`;

const Email = styled.div`
  margin: 0 auto;
  padding: 10px 10px 10px 10px;
`;

const CopyRight = styled.div`
  margin: 0 auto;
  padding: 10px 10px 10px 10px;
`;
