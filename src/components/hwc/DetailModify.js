import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER } from "../../apis/config";
import styled from "styled-components";
import UpdatePages from "./UpdatePages";
import DeleteModify from "./DeletePage";

const DetailModify = () => {
  const { tourScheduleId } = useParams(); // useParams에서 tourScheduleId를 가져옴
  const [tourData, setTourData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false); // 데이터 업데이트 상태 추가
  const [IsDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchTourData = async () => {
      if (!tourScheduleId) return; // tourScheduleId가 없으면 함수를 종료

      try {
        // tourScheduleId를 사용하여 해당 스케줄의 데이터를 가져오는 API 요청
        const response = await axios.get(
          `${SERVER}/api/tour/schedule/${tourScheduleId}`,
        );

        console.log("tourScheduleId:", tourScheduleId); // tourScheduleId 출력
        console.log("API Response:", response.data); // API 응답 데이터 출력

        const { data } = response; // response에서 data를 추출

        if (Array.isArray(data.resultData)) {
          setTourData(data.resultData); // 배열 형태인 경우 바로 저장
        } else {
          setTourData([data.resultData]); // 단일 객체 형태인 경우 배열로 감싸서 저장
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        console.error(error);
      }
    };

    fetchTourData(); // useEffect 내에서 함수를 호출해야 함
  }, [tourScheduleId, isUpdated]); // useEffect의 의존성 배열에 tourScheduleId와 isUpdated 추가

  const handleUpdate = () => {
    setIsUpdated(!isUpdated); // 데이터 업데이트 상태 변경
  };

  const handleDelete = () => {
    setIsDelete(!IsDelete); // 데이터 삭제
  };

  return (
    <Container>
      {tourData ? (
        <div>
          {tourData
            .filter(item => item !== null && item !== undefined) // null 또는 undefined가 아닌 항목만 필터링
            .map(item => (
              <Item key={item.tourScheduleId}>
                <Title>{item.title}</Title>
                <Detail>Schedule Day: {item.tourScheduleDay}</Detail>
                <Detail>Start Date: {item.tourScheduleStart}</Detail>
                <Detail>End Date: {item.tourScheduleEnd}</Detail>
                <Detail>Contents: {item.contents}</Detail>
                <Detail>Cost: {item.cost}</Detail>
                <UpdatePages tourData={item} onUpdate={handleUpdate} />
                {/* 수정 페이지 렌더링 */}
                <DeleteModify tourData={item} onDelete={handleDelete} />
              </Item>
            ))}
        </div>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </Container>
  );
};

export default DetailModify;

// Styled-components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const Detail = styled.p`
  margin: 5px 0;
  color: #555;
`;

const Loading = styled.p`
  text-align: center;
  color: #777;
`;
