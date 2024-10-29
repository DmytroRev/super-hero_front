import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
// import CharacterList from '../CharacterList/CharacterList';
// import CharacterDetails from '../CharacterDetails/CharacterDedails';
// import CreateCharacter from '../CreateCharacter/CreateCharacter';
// import ChangeCharacterInfo from '../ChangeCharacterInfo/ChangeCharacterInfo';
// import AddCharacterImages from '../AddCharacterImages/AddCharacterImages';
// import DeleteCharacter from '../DeleteCharacter/DeleteCharacter';

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
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
