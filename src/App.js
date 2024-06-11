import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/plan/:id" element={<Calendars></Calendars>} />
        <Route
          path="/allSchedule"
          element={<CalendarsForAllPlan></CalendarsForAllPlan>}
        />
        <Route path="/plan" element={<PlanPage></PlanPage>} />
        <Route path="/signup" element={<SignupPage></SignupPage>} />
        <Route
          path="/planModify/:id"
          element={<PlanModifyPage></PlanModifyPage>}
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/editmypage" element={<EditProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
