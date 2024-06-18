import axios from "axios";

export const detailIdGet = async tourId => {
  try {
    const response = await axios.get(`/api/tour/detail?tour_id=${tourId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    throw error;
  }
};

export const detailDayGet = async tourScheduleDay => {
  try {
    const response = await axios.get(
      `/api/tour/detail?tour_schedule_day=${tourScheduleDay}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    throw error;
  }
};

// 일정 스케줄 삭제 함수
export const deleteSchedule = async (tourId, tourScheduleId) => {
  try {
    const response = await axios.delete(`/api/tour/schedule/delete`, {
      params: {
        tour_id: tourId,
        tour_schedule_id: tourScheduleId,
      },
    });
    console.log("Schedule deleted:", response.data);
    return response.data; // 성공적으로 삭제된 경우 응답 데이터 반환
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error; // 삭제 중 에러 발생 시 예외 던지기
  }
};
