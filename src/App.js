import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginSignup from './components/loginSignup/LoginSignup';
import Dashboard from './components/dashboard/Dashboard';
import EditPostForm from './components/dashboard/posts/EditPostForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/login" element={<LoginSignup/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/edit/post/:_id" element={<EditPostForm/>}></Route>
        <Route path="/*" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;