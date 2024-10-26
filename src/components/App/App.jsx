import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import CharacterList from "../CharacterList/CharacterList";
import CharacterDetails from "../CharacterDetails/CharacterDedails";
import Home from "../Home/Home";

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}
