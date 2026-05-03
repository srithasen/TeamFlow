
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";

import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";

import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";

import CalendarPage from "./pages/CalendarPage";

import TeamPage from "./pages/TeamPage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<AuthPage />}
        />

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>

          {/* ADMIN */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* MEMBER */}
          <Route
            path="/member-dashboard"
            element={
              <ProtectedRoute allowedRoles={["member"]}>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />

          {/* PROJECTS */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />

          {/* TASKS */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "member"]}
              >
                <TasksPage />
              </ProtectedRoute>
            }
          />

          {/* CALENDAR */}
          <Route
            path="/calendar"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "member"]}
              >
                <CalendarPage />
              </ProtectedRoute>
            }
          />

          {/* TEAM */}
          <Route
            path="/team"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "member"]}
              >
                <TeamPage />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "member"]}
              >
                <ProfilePage />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;
