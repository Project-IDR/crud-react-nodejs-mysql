import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import Login from "./pages/Login"; // kamu buat file ini
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
