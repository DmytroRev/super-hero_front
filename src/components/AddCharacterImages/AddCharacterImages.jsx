import { useState, useEffect } from 'react';
import {
  addCharacterImages,
  getCharacterById,
  removeCharacterImage,
} from '../../api';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import css from './AddCharacterImages.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

Modal.setAppElement('#root');

const AddCharacterImages = ({ characterId, onImagesAdded }) => {
  const [imageFiles, setImageFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedImages, setAddedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const fetchCharacter = async id => {
    if (!id) return;

    try {
      const characterData = await getCharacterById(id);
      if (characterData.imageUrl && addedImages.length === 0) {
        setAddedImages(characterData.imageUrl);
      }
    } catch (error) {
      setError('Failed to fetch character data: ' + error.message);
    }
  };

  const addImages = async () => {
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
        setAddedImages(prevImages => [...prevImages, ...newImages]);
        onImagesAdded(newImages);
        setImageFiles(null);
      } catch (err) {
        setError('Failed to add images: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Пример, если server ожидает imageId
  const deleteImage = async () => {
    if (!imageToDelete) return;

    try {
      console.log('Deleting image:', imageToDelete); // Логирование URL для удаления

      // Если нужно, получите imageId
      const imageId = getIdFromUrl(imageToDelete);
      console.log('Using image ID for deletion:', imageId);

      const response = await removeCharacterImage(characterId, imageId);
      console.log('Server response:', response); // Логируйте ответ сервера

      // Обновите состояние
      setAddedImages(prevImages =>
        prevImages.filter(img => img !== imageToDelete)
      );

      setIsModalOpen(false);
      setImageToDelete(null);
    } catch (err) {
      setError('Failed to delete image: ' + err.message);
      console.error(err); // Логирование ошибки
    }
  };
  const getIdFromUrl = url => {
    // Здесь можно использовать регулярное выражение или метод строк для получения нужного ID
    const parts = url.split('/');
    return parts[parts.length - 1]; // например, если ID в конце URL
  };
  useEffect(() => {
    fetchCharacter(characterId);
  }, [characterId]);

  const handleFileChange = e => setImageFiles(e.target.files);

  const openDeleteModal = imageUrl => {
    setImageToDelete(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageToDelete(null);
  };

  return (
    <div>
      {addedImages.length > 0 && (
        <div>
          <h4>Images:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {addedImages.map((url, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '100px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  style={{ width: '100%', display: 'block' }}
                />
                <button
                  className={css.deleteButton}
                  onClick={() => openDeleteModal(url)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={addImages} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add images'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
      >
        <h3>Are you sure you want to delete this image?</h3>
        <button onClick={deleteImage}>Yes, delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <style>{`
        .delete-button {
          display: none;
        }
        div:hover .delete-button {
          display: block;
        }
      `}</style>
    </div>
  );
};

AddCharacterImages.propTypes = {
  characterId: PropTypes.string,
  onImagesAdded: PropTypes.func,
};

export default AddCharacterImages;
