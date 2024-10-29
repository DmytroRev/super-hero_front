import { useState, useEffect } from 'react';
import {
  addCharacterImages,
  getCharacterById,
  removeCharacterImage,
} from '../../api';
import PropTypes from 'prop-types';
import css from './AddCharacterImages.module.css';
import { AiTwotoneDelete } from 'react-icons/ai';
import { IoCloudUploadOutline } from 'react-icons/io5';
import CustomModal from '../Modal/CustomModal';

const AddCharacterImages = ({ characterId, onImagesAdded }) => {
  const [imageFiles, setImageFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addedImages, setAddedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!characterId) return;

      try {
        const characterData = await getCharacterById(characterId);
        if (characterData.imageUrl && addedImages.length === 0) {
          setAddedImages(characterData.imageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();
  }, [characterId, addedImages.length]);

  const addImages = async () => {
    if (imageFiles) {
      setIsLoading(true);
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
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteImage = async () => {
    if (!imageToDelete) return;

    try {
      const response = await removeCharacterImage(characterId, imageToDelete);

      if (response.status === 200) {
        setAddedImages(prevImages =>
          prevImages.filter(img => img !== imageToDelete)
        );
      } else {
        console.error('Error');
      }

      setIsModalOpen(false);
      setImageToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className={css.containerImages}>
      {addedImages.length > 0 && (
        <div className={css.imageList}>
          {addedImages.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Uploaded ${index}`} className={css.images} />
              <button
                className={css.deleteButton}
                onClick={() => openDeleteModal(url)}
              >
                <AiTwotoneDelete
                  style={{ color: 'white' }}
                  className={css.deleteIcon}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={css.containerButton}>
        <label className={css.uploadButton}>
          <IoCloudUploadOutline size={24} className={css.uploadIcon} />
          <span>Upload Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        <button
          onClick={addImages}
          disabled={isLoading}
          className={css.uploadButton}
        >
          {isLoading ? 'Adding...' : 'Add images'}
        </button>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
      >
        <h3>Are you sure you want to delete this image?</h3>
        <div className={css.containerButtonModal}>
          <button onClick={deleteImage} className={css.btn}>
            Yes, delete
          </button>
          <button onClick={closeModal} className={css.btn}>
            Cancel
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

AddCharacterImages.propTypes = {
  characterId: PropTypes.string,
  onImagesAdded: PropTypes.func,
};

export default AddCharacterImages;
