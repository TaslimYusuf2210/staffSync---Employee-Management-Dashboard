import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard";
import DepartmentDetails from "./components/DepartmentDetails";
import DepartmentsList from "./components/DepartmentsList";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeesList from "./components/EmployeesList";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (no sidebar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />

          {/* App routes (with sidebar layout) */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeesList />} />
            <Route path="employees/create" element={<EmployeeCreate />} />
            <Route path="employees/:id" element={<EmployeeDetails />} />
            <Route path="departments" element={<DepartmentsList />} />
            <Route path="departments/:id" element={<DepartmentDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
