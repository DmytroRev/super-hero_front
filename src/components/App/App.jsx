import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';

const CharacterList = lazy(() => import('../CharacterList/CharacterList'));
const CharacterDetails = lazy(
  () => import('../CharacterDetails/CharacterDedails')
);
const CreateCharacter = lazy(
  () => import('../CreateCharacter/CreateCharacter')
);
const ChangeCharacterInfo = lazy(
  () => import('../ChangeCharacterInfo/ChangeCharacterInfo')
);
const AddCharacterImages = lazy(
  () => import('../AddCharacterImages/AddCharacterImages')
);
const DeleteCharacter = lazy(
  () => import('../DeleteCharacter/DeleteCharacter')
);

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/createCharacter" element={<CreateCharacter />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/character:id" element={<ChangeCharacterInfo />} />
          <Route
            path="/addCharacterImages/id"
            element={<AddCharacterImages />}
          />
          <Route path="/deleteCharacter/:id" element={<DeleteCharacter />} />
        </Routes>
      </Suspense>
    </>
  );
}
