import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewTicket from "./pages/NewTicket";
import PrivateRoutes from "./components/PrivateRoutes";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/new-ticket"
              element={
                <PrivateRoutes>
                  <NewTicket />
                </PrivateRoutes>
              }
            />
            <Route
              path="/tickets"
              element={
                <PrivateRoutes>
                  <Tickets />
                </PrivateRoutes>
              }
            />
               <Route
              path="/ticket/:ticketId"
              element={
                <PrivateRoutes>
                  <Ticket />
                </PrivateRoutes>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
