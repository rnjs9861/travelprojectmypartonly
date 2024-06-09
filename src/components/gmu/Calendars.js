import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getAllEvents, getOnePlan } from "../../apis/gmu/planCalendar";
import ALOTlogo from "../../images/ALOTlogo.png";

const Calendars = () => {
  const { id } = useParams(); // URL에서 ID 값 가져오기

  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const tours = await getOnePlan(id); // ID를 기반으로 투어 데이터 가져오기
        // console.log(tours);
        setEvents(tours);
      } catch (error) {
        console.error("Error loading tours:", error);
      }
    };

    loadTours(); // 초기 로드 시 투어 데이터 가져오기
  }, [id]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getAllEvents(id);
      } catch (error) {
        console.log(error);
      }
    };
  }, [id]);

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
      <Body>
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
      </Body>
    </>
  );
};

export default Calendars;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

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

const Body = styled.div`
  padding-top: 180.24px;
`;

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
