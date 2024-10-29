import { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteCharacter } from '../../api';
import { AiTwotoneDelete } from 'react-icons/ai';
import css from './DeleteCharacter.module.css';
import CustomModal from '../Modal/CustomModal';

export const DeleteCharacter = ({ characterId, onDeleteSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    console.log('Character ID:', characterId);

    try {
      const result = await deleteCharacter(characterId);
      if (result && onDeleteSuccess) {
        onDeleteSuccess(characterId);
      }
    } catch (err) {
      console.error('Error deleting character:', err);
    }
  };

  return (
    <div>
      <button onClick={openModal} className={css.buttonDelete}>
        <AiTwotoneDelete
          style={{ color: 'white' }}
          className={css.deleteIcon}
        />
      </button>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
      >
        <h3>Are you sure you want to delete this character?</h3>
        <div className={css.containerButtonModal}>
          <button onClick={handleDelete} className={css.btn}>
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

DeleteCharacter.propTypes = {
  characterId: PropTypes.string,
  onDeleteSuccess: PropTypes.func,
};

export default DeleteCharacter;
