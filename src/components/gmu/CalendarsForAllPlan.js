import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import styled from "styled-components";
import { getAllEvents, getAllPlans } from "../../apis/gmu/planCalendar"; // 여기에서 getAllEvents를 가져옵니다.
import ALOTlogo from "../../images/ALOTlogo.png";

const CalendarsForAllPlan = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const plans = await getAllPlans();
        const eventsData = await getAllEvents();
        console.log("Loaded Plans:", plans);
        console.log("Loaded Events:", eventsData);

        // 플랜 데이터 형식 맞추기
        const formattedPlans = plans.map((plan) => ({
          title: plan.tourTitle,
          start: plan.tourStartDay,
          end: plan.tourFinishDay,
          description: plan.description,
          expense: plan.expense,
        }));

        // 이벤트 데이터 형식 맞추기
        const formattedEvents = eventsData.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          description: event.description,
          expense: event.expense,
        }));

        // 플랜과 이벤트 데이터를 합치기
        const combinedEvents = [...formattedPlans, ...formattedEvents];
        setEvents(combinedEvents);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter(
        (event) => event.start.split("T")[0] === selectedDate
      );
      const sortedEvents = filteredEvents.sort((a, b) => {
        const aTime = new Date(a.start).getTime();
        const bTime = new Date(b.start).getTime();
        return aTime - bTime;
      });
      setSelectedEvents(sortedEvents);
    }
  }, [selectedDate, events]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const handleEventSubmit = (event) => {
    setEvents([...events, event]);
  };

  return (
    <>
      <Header>
        <h1>
          <img src={ALOTlogo} alt="로고" />
        </h1>
      </Header>
      <CalendarContainer>
        <Calendar>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
          />
        </Calendar>
        <EventModalWrap>
          {selectedDate && (
            <>
              <SelectedDate>{selectedDate} 일정 </SelectedDate>
              <EventModal
                date={selectedDate}
                onSubmit={handleEventSubmit}
                event={null} // 새로운 이벤트 폼
              />
              {selectedEvents.map((event, index) => (
                <EventModal
                  key={index}
                  date={event.start.split("T")[0]}
                  event={event}
                />
              ))}
            </>
          )}
        </EventModalWrap>
      </CalendarContainer>
    </>
  );
};

export default CalendarsForAllPlan;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  h1 {
    background-color: #f5f5f5;
    padding: 20px 20px 20px 20px;
    margin: 0 auto;
  }
  img {
    margin: auto;
    display: block;
    width: 300px;
  }
`;

const CalendarContainer = styled.div`
  padding-top: 180.24px;
  display: flex;
`;

const Calendar = styled.div`
  flex: 1;
`;

const EventModalWrap = styled.div`
  width: 300px;
  padding: 20px;
  border-left: 1px solid #ccc;
  background-color: #f9f9f9;
  overflow-y: auto;
`;

const SelectedDate = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;
