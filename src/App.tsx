import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CreateAccount from "./pages/auth/CreateAccount";
import Dashboard from "./pages/dashboard/Dashboard";
import DepartmentDetails from "./pages/departments/DepartmentDetails";
import DepartmentsList from "./pages/departments/DepartmentsList";
import EmployeeCreate from "./pages/employees/EmployeeCreate";
import EmployeeDetails from "./pages/employees/EmployeeDetails";
import EmployeesList from "./pages/employees/EmployeesList";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
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
