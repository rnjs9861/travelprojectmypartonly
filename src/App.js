import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendars from "./components/gmu/Calendars";
import CalendarsForAllPlan from "./components/gmu/CalendarsForAllPlan";
import PlanPage from "./pages/PlanPage";
import SignupPage from "./pages/SignupPage";
import PlanModifyPage from "./pages/PlanModifyPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
