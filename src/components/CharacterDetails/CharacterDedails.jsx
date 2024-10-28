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

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const backToPage = useRef(location.state ?? '/character');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterImages, setCharacterImages] = useState([]); // Состояние для изображений

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
        setCharacterImages(data.image || []); // Устанавливаем начальные изображения
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleDeleteAvatar = async () => {
    try {
      await deleteCharacterAvatar(id); // Изменено на deleteCharacterAvatar
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        avatarUrl: null, // Сбрасываем аватар после удаления
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
        const response = await updateCharacterAvatar(id, newAvatar); // Ожидаем ответа с URL

        // Получаем URL нового аватара из ответа
        const updatedAvatarUrl = response.url;

        // Выводим новый аватар в консоль
        console.log('New Avatar URL:', updatedAvatarUrl);

        setCharacter(prevCharacter => ({
          ...prevCharacter,
          avatarUrl: updatedAvatarUrl, // Обновляем avatarUrl здесь
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
      await updateCharacter(id, updatedCharacterInfo); // Обновляем данные персонажа
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        ...updatedCharacterInfo, // Обновляем состояние с новыми данными
      }));
      setIsModalOpen(false); // Закрываем модалку
    } catch (err) {
      setError(err.message); // Обрабатываем ошибку
    }
  };

  const handleImagesAdded = newImages => {
    setCharacterImages(prevImages => [...prevImages, ...newImages]);
  };

  return (
    <div>
      <button>
        <Link to={backToPage.current}>Back</Link>
      </button>
      <div>
        <img src={character.avatarUrl} alt={character.nickname} />
        <input type="file" accept="image/*" onChange={handleChangeAvatar} />
        <button onClick={handleSaveAvatar} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={handleDeleteAvatar}>Delete</button>
        {newAvatar && (
          <div>
            <h4>Предварительный просмотр нового аватара:</h4>
            <img src={photoPreview} alt="New Avatar Preview" width="100" />
          </div>
        )}
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

      <h3>Images:</h3>
      <div>
        {characterImages && characterImages.length > 0 ? (
          characterImages.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Image ${index + 1}`}
              width="100"
              style={{ margin: '5px' }}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <AddCharacterImages characterId={id} onImagesAdded={handleImagesAdded} />
    </div>
  );
}
