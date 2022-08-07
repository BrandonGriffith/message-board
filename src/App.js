import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginSignup from './components/loginSignup/LoginSignup';
import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup/>}></Route>
        <Route path="dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;