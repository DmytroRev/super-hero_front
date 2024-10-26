import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CharacterList from "../CharacterList/CharacterList";
import CharacterDetails from "../CharacterDetails/CharacterDetails.jsx";
import { Suspense } from "react";
import Home from "../Home/Home";

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}
