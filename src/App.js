import './App.css';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginSignup from './components/loginSignup/LoginSignup';
import Dashboard from './components/dashboard/Dashboard';
import EditPostForm from './components/dashboard/posts/EditPostForm';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginSignup/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/edit/post/:_id" element={<EditPostForm/>}></Route>
        <Route path="/*" element={<Dashboard/>}></Route>
      </Routes>
    </HashRouter>
  );
};
export default App;