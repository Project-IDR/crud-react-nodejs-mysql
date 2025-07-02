import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
