import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import './App.css';
import CharacterList from '../CharacterList/CharacterList';
import CharacterDetails from '../CharacterDetails/CharacterDedails';
import Home from '../Home/Home';
import CreateCharacter from '../CreateCharacter/CreateCharacter';
import ChangeCharacterInfo from '../ChangeCharacterInfo/ChangeCharacterInfo';
import AddCharacterImages from '../AddCharacterImages/AddCharacterImages';

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createCharacter" element={<CreateCharacter />} />
          <Route path="/character" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/character:id" element={<ChangeCharacterInfo />} />
          <Route
            path="/addCharacterImages/id"
            element={<AddCharacterImages />}
          />
        </Routes>
      </Suspense>
    </>
  );
}
