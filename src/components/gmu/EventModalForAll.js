// src/EventModal.js
import React, { useState, useEffect } from "react";
import { saveEvent } from "./routes/api";

const EventModalForAll = ({ date, onSubmit, event }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const isReadOnly = !!event; // event가 있으면 읽기 모드

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStartTime(event.start ? event.start.split("T")[1] : "");
      setEndTime(event.end ? event.end.split("T")[1] : "");
      setDescription(event.description || "");
      setExpense(event.expense || "");
    }
  }, [event]);

  const handleSubmit = async () => {
    const newEvent = {
      title,
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
      description,
      expense,
    };

    try {
      const savedEvent = await saveEvent(newEvent);
      console.log("Event saved", savedEvent);
      onSubmit(savedEvent); // 저장된 이벤트 데이터 전달
    } catch (error) {
      console.error("There was an error saving the event!", error);
    }
  };

  return (
    <div>
      <h2>
        {date} 일정 {isReadOnly ? "읽기" : "추가"}
      </h2>
      <label>제목</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        readOnly={isReadOnly}
      />
      <label>시작 시간</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        readOnly={isReadOnly}
      />
      <label>끝 시간</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        readOnly={isReadOnly}
      />
      <label>내용</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        readOnly={isReadOnly}
      ></textarea>
      <label>소비금</label>
      <input
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
        readOnly={isReadOnly}
      />
      {!isReadOnly && <button onClick={handleSubmit}>저장</button>}
    </div>
  );
};

export default EventModalForAll;
