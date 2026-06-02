import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeesList from './components/EmployeesList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetails from './components/EmployeeDetails';
import DepartmentsList from './components/DepartmentsList';
import DepartmentDetails from './components/DepartmentDetails';
import Reports from './components/Reports';
import Settings from './components/Settings';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (no sidebar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />

          {/* App routes (with sidebar layout) */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/employees" element={<Layout><EmployeesList /></Layout>} />
          <Route path="/employees/create" element={<Layout><EmployeeCreate /></Layout>} />
          <Route path="/employees/:id" element={<Layout><EmployeeDetails /></Layout>} />
          <Route path="/departments" element={<Layout><DepartmentsList /></Layout>} />
          <Route path="/departments/:id" element={<Layout><DepartmentDetails /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
