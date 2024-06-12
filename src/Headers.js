import React from "react";

const Header = ({ onheader }) => {
  return onheader ? (
    <body>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              {/* <img
                src="/www/images/KakaoTalk_20240607_150139849.jpg"
                className="alotimg"
              /> */}
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <a href="#">계획세우기</a>
            </li>
            <li className="active">
              <a href="#">캘린더</a>
            </li>
            <li>
              <a href="#">상세계획</a>
            </li>
            <li>
              <a href="#">체크리스트</a>
            </li>
          </ul>
        </div>
      </nav>
    </body>
  ) : null;
};

export default Header;
