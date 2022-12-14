import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import User from './Components/User';
import Setting from './Components/Setting';
import Expense from './Components/Expense';
import Summary from './Components/Summary';
import Logout from './Components/Logout';
import { useState } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/setting" element={<User component={Setting} userDetails={userDetails} setUserDetails={setUserDetails} />} />
        <Route path="/expense" element={<User component={Expense} userDetails={userDetails} setUserDetails={setUserDetails} />} />
        <Route path="/summary" element={<User component={Summary} userDetails={userDetails} setUserDetails={setUserDetails} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/setting" replace />} />
      </Routes>
    </div>
  );
}

export default App;
