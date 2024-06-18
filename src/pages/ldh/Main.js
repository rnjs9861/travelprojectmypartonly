import axios from "axios";
import "../../css/ldh/main/main.css";
import { useContext, useEffect, useState } from "react";
import { userInfoContext } from "../../context/UserInfoProvider";

const Main = () => {
  const { isUser } = useContext(userInfoContext);
  const [title, settitle] = useState("");
  const [tourStartDay, setTourStartDay] = useState("");
  const [tourFinishDay, setTourFinishDay] = useState("");
  const [tourLocation, setTourLocation] = useState("");
  const [tourBudget, setTourBudget] = useState(null);
  const [d_Day, setD_Day] = useState("");

  const getMain = async () => {
    try {
      const response = await axios.get(`/api/main?signed_user_id=${isUser}`);
      console.log(response);
      if (response.status === 200) {
        settitle(response.data.resultData.title);
        setTourStartDay(response.data.resultData.tourStartDay);
        setTourFinishDay(response.data.resultData.tourFinishDay);
        setTourLocation(response.data.resultData.tourLocation);
        setTourBudget(response.data.resultData.tourBudget);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calcDDay = startday => {
    const today = new Date();
    const startDate = new Date(startday);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    const dDay = startDate - today;
    const diffDays = Math.ceil(dDay / (1000 * 60 * 60 * 24));
    setD_Day(diffDays);
  };

  useEffect(() => {
    if (isUser) {
      getMain();
    }
  }, [isUser]);

  useEffect(() => {
    calcDDay(tourStartDay);
  }, [tourStartDay]);

  return (
    <div className="main-index-wrap">
      <div className="main-index-top">
        <div className="main-index-top-inner">
          <div className="main-index-top-inner-content">
            {isUser ? (
              <>
                <h2>{title}</h2>
                <div className="main-index-top-content-banner">
                  {/* <div className="main-index-top-userprofile">
                    <span>userid님 반갑습니다</span>
                  </div> */}
                  <div className="main-index-content-wrap">
                    <p>여행 장소 : {tourLocation}</p>
                    <p>여행 시작일 : {tourStartDay}</p>
                    <p>여행 종료일 : {tourFinishDay}</p>
                    <p>예산 : {tourBudget} 원</p>
                    <p>d-day : d-{d_Day}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>아직 회원이 아니신가요? 로그인이 필요한 서비스입니다</p>
                <p>로그인하여 당신의 여행계획을 세워보세요</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="main-index-bottom">
        <div className="main-index-bottom-content">
          <div className="container-fluid text-center">
            <h2>여행계획을 세워보세요</h2>
            <h4>어디로 가시나요?</h4>
            <br />
            <div className="row">
              <div className="col-sm-4">
                <p className="glyphicon glyphicon-leaf"></p>
                <h4>힐링하러 떠나요</h4>
                <br />
                <span>빌딩 숲을 떠나 휴양림은 어떠신가요?</span>
              </div>
              <div className="col-sm-4">
                <p className="glyphicon glyphicon-heart"></p>
                <h4>사랑하는 사람과</h4>
                <br />
                <span>추억을 쌓을 테마여행은 어떤가요?</span>
              </div>
              <div className="col-sm-4">
                <p className="glyphicon glyphicon-globe logo"></p>
                <h4>국내는 지겨우신가요?</h4>
                <br />
                <span>전세계로 떠나요!</span>
              </div>
            </div>
          </div>
        </div>
        <div className="manual">
          <div className="main-ad"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
