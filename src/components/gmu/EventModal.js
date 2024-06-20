import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveEvent } from "../../apis/gmu/planCalendar";

const EventModal = ({ date, onSubmit, event, tourId }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState(0);
  const isReadOnly = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStartTime(formatTime(event.start) || "00:00"); // 시간 형식 변환
      setEndTime(formatTime(event.end) || "00:00"); // 시간 형식 변환
      setDescription(event.description || "");
      setExpense(event.expense || 0);
    }
  }, [event]);

  const handleSubmit = async () => {
    const newEvent = {
      tour_id: tourId,
      title,
      start: startTime,
      end: endTime,
      date: `${date}`,
      description,
      expense: parseFloat(expense),
    };

    try {
      const savedEvent = await saveEvent(newEvent);
      console.log("Event saved:", savedEvent);
      onSubmit(savedEvent);
      setTitle("");
      setStartTime("00:00");
      setEndTime("00:00");
      setDescription("");
      setExpense(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <h2>
        {date} 일정 {isReadOnly ? "" : "추가"}
      </h2>
      <Time>
        <label>시작 시간</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          readOnly={isReadOnly}
          required
        />
        <label>끝 시간</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          readOnly={isReadOnly}
        />
      </Time>
      <Else>
        <label>제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={isReadOnly}
          placeholder="제목을 입력해 주세요"
          required
        />
        {!isReadOnly && (
          <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="내용을 입력해 주세요"
            ></textarea>
            <label>소비금</label>
            <input
              type="number"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              placeholder="소비금"
            />
          </>
        )}
      </Else>
      {isReadOnly ? (
        <ReadOnlyButton>상세보기</ReadOnlyButton>
      ) : (
        <Button onClick={handleSubmit}>저장</Button>
      )}
    </Form>
  );
};

export default EventModal;

// 시간 형식을 HH:mm으로 변환하는 함수
const formatTime = (timeString) => {
  if (!timeString) return "";

  // timeString이 '2024-06-13T15:04' 형식이라면 이를 HH:mm으로 변환
  const time = new Date(timeString);
  return time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Form = styled.div`
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 5px 5px 5px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
    font-size: 1rem;
  }
`;

const Else = styled.div`
  margin-bottom: 10px;
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    resize: none;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005cb2;
  }
`;

const ReadOnlyButton = styled.button`
  padding: 5px 10px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #005cb2;
  }
`;
