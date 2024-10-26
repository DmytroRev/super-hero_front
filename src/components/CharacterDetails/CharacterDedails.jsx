import { Link, useParams } from "react-router-dom";
import {
  deleteCharacter,
  getCharacterById,
  updateCharacterAvatar,
} from "../../api";
import { useEffect, useRef, useState } from "react";

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const backToPage = useRef(location.state ?? "/character");

  // Объявление fetchCharacter
  const fetchCharacter = async () => {
    try {
      const data = await getCharacterById(id);
      setCharacter(data); // Обновляем состояние персонажа
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]); // Зависимость по ID персонажа

  const handleDeleteAvatar = async () => {
    try {
      await deleteCharacter(id);
      setCharacter(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangeAvatar = (e) => {
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
        const updatedAvatarUrl = await updateCharacterAvatar(id, newAvatar);

        if (updatedAvatarUrl) {
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            avatarUrl: updatedAvatarUrl,
          }));
          setPhotoPreview(null);
        } else {
          console.error("Avatar URL is missing in the server response.");
        }
      } catch (err) {
        console.error("Error updating avatar:", err.message || err);
        setError(err.message || "Failed to update avatar.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <button>
        <Link to={backToPage.current}>Back</Link>
      </button>
      <div>
        <img src={character.avatar} alt={character.nickname} />
        <input type="file" accept="image/*" onChange={handleChangeAvatar} />
        <button onClick={handleSaveAvatar} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button onClick={handleDeleteAvatar}>Delete</button>
        {newAvatar && (
          <div>
            <h4>Предварительный просмотр нового аватара:</h4>
            <img src={photoPreview} alt="New Avatar Preview" width="100" />
          </div>
        )}
      </div>
      <h1>{character.nickname}</h1>
      <p>Real name: {character.real_name}</p>
      <p>Origin description: {character.origin_description}</p>
      <p>Superpowers: {character.superpowers}</p>
      <p>Catch phrase: {character.catch_phrase}</p>

      <h3>Images:</h3>
      <div>
        {character.image && character.image.length > 0 ? (
          character.image.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Image ${index + 1}`}
              width="100"
              style={{ margin: "5px" }}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}
