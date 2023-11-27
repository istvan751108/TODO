import React from "react";
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
