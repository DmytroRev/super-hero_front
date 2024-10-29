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
import {
  IoArrowBackCircleOutline,
  IoCloudUploadOutline,
} from 'react-icons/io5';
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
      <div className={css.containerHeader}>
        <button className={css.back}>
          <Link
            to={backToPage.current}
            style={{ textDecoration: 'none', color: '#e0e0e0' }}
            className={css.link}
          >
            <IoArrowBackCircleOutline className={css.iconBack} /> Back
          </Link>
        </button>
        <div className={css.delete}>
          <DeleteCharacter
            characterId={id}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </div>
      <div className={css.containerAvatar}>
        <div className={css.containerAvatarAndInput}>
          <img
            src={character.avatarUrl || defaultAvatarUrl}
            alt={character.nickname || 'Default Avatar'}
            className={css.avatar}
          />
          <div className={css.uploadContainer}>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              onChange={handleChangeAvatar}
              className={css.fileInput}
            />
            <label htmlFor="avatar" className={css.uploadLabel}>
              <IoCloudUploadOutline size={24} className={css.uploadIcon} />
              <span>Upload Avatar</span>
            </label>
            <div className={css.containerWithButtonSaveAndDelete}>
              <button
                onClick={handleSaveAvatar}
                disabled={isLoading}
                className={css.back}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handleDeleteAvatar} className={css.back}>
                Delete avatar
              </button>
            </div>
          </div>
        </div>
        {/* {newAvatar && (
            <div>
              <h4>Предварительный просмотр нового аватара:</h4>
              <img src={photoPreview} alt="New Avatar Preview" width="100" />
            </div>
          )} */}
        <div>
          <div className={css.changeInfo}>
            <button onClick={handleOpenModal} className={css.back}>
              Change Info Character
            </button>
          </div>
          {isModalOpen && (
            <ChangeCharacterInfo
              character={character}
              onSave={handleSaveCharacterInfo}
              onClose={handleCloseModal}
            />
          )}
          <div className={css.containerNameAndRealName}>
            <h2>{character.nickname}</h2>
            <p>Real name: {character.real_name}</p>
            <p className={css.paragraphOrigin}>
              Origin description: {character.origin_description}
            </p>
            <p>Superpowers: {character.superpowers}</p>
            <p>Catch phrase: {character.catch_phrase}</p>
          </div>
        </div>
      </div>

      <AddCharacterImages characterId={id} />
    </div>
  );
}
