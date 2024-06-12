import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendars from "./components/gmu/Calendars";
import CalendarsForAllPlan from "./components/gmu/CalendarsForAllPlan";
import PlanPage from "./pages/gmu/PlanPage";
import SignupPage from "./pages/gmu/SignupPage";
import PlanModifyPage from "./pages/gmu/PlanModifyPage";
import Footer from "./components/gmu/Footer";
import MyPage from "./components/gmu/MyPage";
import EditProfile from "./components/gmu/EditProfile";
import { UserInfoProvider } from "./context/UserInfoProvider";
import LogIn from "./pages/ldh/LogIn";
import Header from "./Headers";
import Signup from "./components/gmu/Signup";

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

          <Route path="/plan/:id" element={<Calendars></Calendars>} />
          <Route
            path="/allSchedule"
            element={<CalendarsForAllPlan></CalendarsForAllPlan>}
          />
          <Route path="/plan" element={<PlanPage></PlanPage>} />
          <Route
            path="/signup"
            element={<Signup setOnHeader={setOnHeader} />}
          />
          <Route
            path="/planModify/:id"
            element={<PlanModifyPage></PlanModifyPage>}
          />
          <Route path="/mypage/:uid" element={<MyPage />} />
          <Route path="/editmypage/:id" element={<EditProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
