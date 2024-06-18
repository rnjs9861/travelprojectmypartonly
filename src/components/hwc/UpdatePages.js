import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER } from "../../apis/config";
import styled from "styled-components";

const UpdatePages = ({ onUpdate, tourData }) => {
  const { tourScheduleId } = useParams();
  const [formData, setFormData] = useState({
    tourScheduleDay: tourData.tourScheduleDay || "",
    tourScheduleStart: tourData.tourScheduleStart || "",
    tourScheduleEnd: tourData.tourScheduleEnd || "",
    title: tourData.title || "",
    contents: tourData.contents || "",
    cost: tourData.cost || "",
  });

  useEffect(() => {
    setFormData({
      tourScheduleDay: tourData.tourScheduleDay || "",
      tourScheduleStart: tourData.tourScheduleStart || "",
      tourScheduleEnd: tourData.tourScheduleEnd || "",
      title: tourData.title || "",
      contents: tourData.contents || "",
      cost: tourData.cost || "",
    });
  }, [tourData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${SERVER}/api/tour/schedule?tour_schedule_id=${tourScheduleId}`,
        {
          tourScheduleId: tourScheduleId,
          ...formData,
        },
      );
      console.log("Update successful:", response.data);
      onUpdate(); // 데이터가 업데이트된 후 부모 컴포넌트에 알림
    } catch (error) {
      console.error("Error updating schedule:", error);
      console.log(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        name="tourScheduleDay"
        value={formData.tourScheduleDay}
        onChange={handleChange}
        placeholder="Tour Schedule Day"
      />
      <Input
        type="text"
        name="tourScheduleStart"
        value={formData.tourScheduleStart}
        onChange={handleChange}
        placeholder="Start Time"
      />
      <Input
        type="text"
        name="tourScheduleEnd"
        value={formData.tourScheduleEnd}
        onChange={handleChange}
        placeholder="End Time"
      />
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <Input
        type="text"
        name="contents"
        value={formData.contents}
        onChange={handleChange}
        placeholder="Contents"
      />
      <Input
        type="number"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        placeholder="Cost"
      />
      <Button type="submit">Update</Button>
    </FormContainer>
  );
};

export default UpdatePages;

// Styled-components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
