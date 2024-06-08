import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPlan } from "../apis/planApi";
import ALOTlogo from "../images/ALOTlogo.png";
// import DetailPlanForm from "./DetailPlanForm";
import Calendars from "./Calendars";

const PlanCalendar = () => {
  const { id } = useParams();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [forms, setForms] = useState([1]);
  const [events, setEvents] = useState([]);

  const addForm = () => {
    setForms([...forms, forms.length + 1]);
  };

  const removeForm = (index) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (eventDetails) => {
    setEvents([...events, eventDetails]);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await getPlan(id);
        setPlan(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  if (loading) {
    return <div>불러오는 중</div>;
  }

  if (!plan) {
    return <div>삭제 된 계획 입니다.</div>;
  }

  return (
    <Wrapper>
      <Header>
        <h1>
          <img src={ALOTlogo} alt="로고" />
        </h1>
      </Header>
      <Content>
        <LeftSection>
          <Calendars></Calendars>
        </LeftSection>
        <RightSection>
          <TypedPlan>
            <ul>
              {events.map((event, index) => (
                <li key={index}>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>시작 시간: {event.startTime}</p>
                  <p>끝 시간: {event.endTime}</p>
                  <p>태그: {event.tags.join(", ")}</p>
                  <p>비용: {event.cost}</p>
                </li>
              ))}
            </ul>
          </TypedPlan>
          <TypingPlan>
            {/* {forms.map((_, index) => (
              // <DetailPlanForm
              //   key={index}
              //   onSubmit={handleFormSubmit}
              //   onRemove={() => removeForm(index)}
              // />
            ))} */}
          </TypingPlan>
          <button type="button" onClick={addForm}>
            + 추가
          </button>

          {/* <p>{plan.title}</p>
          <p>{plan.tourStartDay}</p>
          <p>{plan.tourFinishDay}</p>
          <p>{plan.tourLocation}</p>
          <p>{plan.tourBudget}</p> */}
        </RightSection>
      </Content>
      <Footer>
        <p>푸터</p>
      </Footer>
    </Wrapper>
  );
};

export default PlanCalendar;

const TypedPlan = styled.div``;

const TypingPlan = styled.div``;

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 20px;
`;

const LeftSection = styled.div`
  position: relative;
  height: 80vh;

  @media (max-width: 760px) {
    display: none;
  }
`;

const RightSection = styled.div`
  position: absolute;
  right: 20px;
  width: 300px;
  height: 80vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100000;
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  animation: slideIn 0.5s ease-in-out 0.1s forwards;

  @keyframes slideIn {
    to {
      transform: translateX(0);
      opacity: 1;
      right: 0;
    }
  }

  @media (max-width: 760px) {
    position: relative;
    margin: 0 auto;
  }
`;
const Footer = styled.div`
  z-index: 999999;
  background-color: blue;
  margin: 0px 0px 0px 0px;
`;
