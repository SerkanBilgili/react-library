import React from "react";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";


function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/add-book" element={<AddBook />}/>
    <Route path="/edit-book/:bookId" element={<EditBook />}/>
  </Routes>
</BrowserRouter>
  )
}

export default App;
