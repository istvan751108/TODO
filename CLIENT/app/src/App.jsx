import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/Homepage";
import TodoUp from "./components/TodoUp";
import Navbar from "./components/parts/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/todoup" element={<TodoUp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
