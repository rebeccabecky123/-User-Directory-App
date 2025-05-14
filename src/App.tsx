import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import UserProfile from "./pages/userprofile";
import AddUser from "./pages/adduser";
import { UserProvider } from "./context/usercontext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <nav className="p-4 bg-gray-200  gap-4 flex flex-col text-center justify-center ">
          <Link to="/" className="text-green-400 text-2xl ">Home</Link>
          <Link to="/add-user">Add User</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
