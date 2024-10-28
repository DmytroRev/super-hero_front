import { useState, useEffect } from 'react';
import { addCharacterImages, getCharacterById } from '../../api'; // Импортируем функцию получения персонажа
import PropTypes from 'prop-types';

const AddCharacterImages = ({ characterId, onImagesAdded }) => {
  const [imageFiles, setImageFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedImages, setAddedImages] = useState([]); // Для хранения загруженных изображений
  const [character, setCharacter] = useState(null); // Для хранения данных о персонаже

  useEffect(() => {
    const fetchCharacter = async id => {
      if (!id) {
        console.error('No character ID provided');
        return; // Прекращаем выполнение, если ID не задан
      }

      try {
        const characterData = await getCharacterById(id);
        setCharacter(characterData);
      } catch (error) {
        console.error('Failed to fetch character:', error);
        setError('Failed to fetch character data');
      }
    };

    fetchCharacter(characterId); // Передаем characterId
  }, [characterId]);

  const handleFileChange = e => {
    setImageFiles(e.target.files);
  };

  const handleAddImages = async () => {
    if (imageFiles) {
      setIsLoading(true);
      setError(null);
      try {
        const filesArray = Array.from(imageFiles);
        const addedImagesResponse = await addCharacterImages(
          characterId,
          filesArray
        );

        const newImages = Array.isArray(addedImagesResponse)
          ? addedImagesResponse
          : [];
        setAddedImages(prevImages => [...prevImages, ...newImages]); // Сохраняем загруженные изображения
        onImagesAdded(newImages); // Передаем загруженные изображения в родительский компонент
        setImageFiles(null); // Сбрасываем файлы после загрузки
      } catch (err) {
        setError('Failed to add images: ' + err.message); // Уточняем сообщение об ошибке
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h3>Add character images</h3>
      {character && <h4>Character: {character.nickname}</h4>}{' '}
      {/* Отображаем имя персонажа, если данные загружены */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleAddImages} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add images'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {addedImages.length > 0 && (
        <div>
          <h4>Uploaded Images:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {addedImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                style={{ width: '100px', margin: '5px' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

AddCharacterImages.propTypes = {
  characterId: PropTypes.string,
  onImagesAdded: PropTypes.func,
};

export default AddCharacterImages;
