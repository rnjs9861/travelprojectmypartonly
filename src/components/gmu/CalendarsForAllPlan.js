import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import styled from "styled-components";
import { getAllPlans } from "../../apis/gmu/planCalendar";

const CalendarsForAllPlan = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const loadAllPlans = async () => {
      try {
        const plans = await getAllPlans(); // 모든 계획을 가져오기
        console.log("Loaded Plans:", plans); // 로드된 계획 데이터 확인

        // 캘린더에서 필요한 형식으로 데이터 변환
        const formattedEvents = plans.map((plan) => ({
          title: plan.tourTitle,
          start: plan.tourStartDay,
          end: plan.tourFinishDay,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error loading plans:", error);
      }
    };

    loadAllPlans(); // 초기 로드 시 모든 계획 데이터 가져오기
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
  );
};

export default CalendarsForAllPlan;

const CalendarContainer = styled.div`
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
