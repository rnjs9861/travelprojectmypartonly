import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calendars from "./components/gmu/Calendars";
import CalendarsForAllPlan from "./components/gmu/CalendarsForAllPlan";
import ScheduleTest from "./pages/hwc/ScheduleTest";
import Header from "./components/layout/Header";
import { UserInfoProvider } from "./context/UserInfoProvider";
import "./css/common.css";
import "./css/reset.css";
import PlanModifyPage from "./pages/gmu/PlanModifyPage";
import PlanPage from "./pages/gmu/PlanPage";
import SignupPage from "./pages/gmu/SignupPage";
import CheckList from "./pages/ldh/CheckList";
import LogIn from "./pages/ldh/LogIn";
import UserInfo from "./pages/ldh/UserInfo";
import Main from "./pages/ldh/Main";
import Footer from "./components/gmu/Footer";

function App() {
  const [onHeader, setOnHeader] = useState(true);
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Header onheader={onHeader} />
        <Routes>
          <Route
            path="/login"
            element={<LogIn setOnHeader={setOnHeader} />}
          ></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="/checklist" element={<CheckList></CheckList>}></Route>
          <Route path="/userinfo" element={<UserInfo />} />

          {/* GMU경로 */}
          <Route path="/plan/:id" element={<Calendars />} />
          <Route path="/allSchedule" element={<CalendarsForAllPlan />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/planModify/:id" element={<PlanModifyPage />} />
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          {/* <Route path="/editmypage" element={<EditProfile />} /> */}
          {/* <Route path="/detail/:id" element={<Detail />} /> */}
          <Route
            path="/detail/:tourScheduleId"
            element={<ScheduleTest></ScheduleTest>}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
