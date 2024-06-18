import React from "react";
import axios from "axios";
import { SERVER } from "../../apis/config";

const DeleteModify = ({ tourId, tourScheduleId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${SERVER}/api/tour/schedule?tour_id=${tourId}&tour_schedule_id=${tourScheduleId}`,
        {
          params: {
            tour_id: tourId,
            tour_schedule_id: tourScheduleId,
          },
        },
      );
      console.log("Schedule deleted:", response.data);
      // 성공적으로 삭제된 경우 필요한 처리
    } catch (error) {
      console.error("Error deleting schedule:", error);
      console.error(error);
      // 삭제 중 에러 발생 시 처리
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteModify;
