import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { deleteCharacter } from '../../api'; // Импортируйте ваш API метод для удаления персонажа

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

export const DeleteCharacter = ({ characterId, onDeleteSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCharacter(characterId);
      if (response.status === 200) {
        onDeleteSuccess(characterId);
        closeModal();
      } else {
        setError('Not found character!');
      }
    } catch (err) {
      setError('Error delete character:', err);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Delete character</button>
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
      >
        <h3>Are you sure you want to delete this character?</h3>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={closeModal}>Cancel</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Modal>
    </div>
  );
};

DeleteCharacter.propTypes = {
  characterId: PropTypes.string,
  onDeleteSuccess: PropTypes.func,
};
export default DeleteCharacter;
