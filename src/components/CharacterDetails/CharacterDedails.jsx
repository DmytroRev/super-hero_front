import { Link, useParams } from 'react-router-dom';
import {
  deleteCharacterAvatar,
  getCharacterById,
  updateCharacter,
  updateCharacterAvatar,
} from '../../api';
import { useEffect, useRef, useState } from 'react';
import ChangeCharacterInfo from '../ChangeCharacterInfo/ChangeCharacterInfo';
import AddCharacterImages from '../AddCharacterImages/AddCharacterImages';
import DeleteCharacter from '../DeleteCharacter/DeleteCharacter';
import { useNavigate } from 'react-router-dom';
import css from './CharacterDetails.module.css';

export const defaultAvatarUrl =
  'https://res.cloudinary.com/drg797a6g/image/upload/v1730202328/zttvdayfjopc05w8buik.jpg';

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const backToPage = useRef(location.state ?? '/');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleDeleteAvatar = async () => {
    try {
      await deleteCharacterAvatar(id);
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        avatarUrl: null,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangeAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveAvatar = async () => {
    if (newAvatar) {
      try {
        setIsLoading(true);
        const response = await updateCharacterAvatar(id, newAvatar);

        const updatedAvatarUrl = response.url;

        console.log('New Avatar URL:', updatedAvatarUrl);

        setCharacter(prevCharacter => ({
          ...prevCharacter,
          avatarUrl: updatedAvatarUrl,
        }));
        setPhotoPreview(null);
      } catch (err) {
        console.error('Error updating avatar:', err.message || err);
        setError(err.message || 'Failed to update avatar.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>Loading...</div>;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCharacterInfo = async updatedCharacterInfo => {
    try {
      await updateCharacter(id, updatedCharacterInfo);
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        ...updatedCharacterInfo,
      }));
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  return (
    <div>
      <button>
        <Link to={backToPage.current}>Back</Link>
      </button>
      <div>
        <div>
          <DeleteCharacter
            characterId={id}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
        <img
          src={character.avatarUrl || defaultAvatarUrl}
          alt={character.nickname || 'Default Avatar'}
        />
        <input type="file" accept="image/*" onChange={handleChangeAvatar} />
        <button onClick={handleSaveAvatar} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={handleDeleteAvatar}>Delete</button>
        {/* {newAvatar && (
          <div>
            <h4>Предварительный просмотр нового аватара:</h4>
            <img src={photoPreview} alt="New Avatar Preview" width="100" />
          </div>
        )} */}
      </div>
      <button onClick={handleOpenModal}>Change Info Character</button>
      {isModalOpen && (
        <ChangeCharacterInfo
          character={character}
          onSave={handleSaveCharacterInfo}
          onClose={handleCloseModal}
        />
      )}

      <h1>{character.nickname}</h1>
      <p>Real name: {character.real_name}</p>
      <p>Origin description: {character.origin_description}</p>
      <p>Superpowers: {character.superpowers}</p>
      <p>Catch phrase: {character.catch_phrase}</p>
      <AddCharacterImages characterId={id} />
    </div>
  );
}
