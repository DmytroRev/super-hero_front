import Modal from 'react-modal';
import PropTypes from 'prop-types';
import css from './CustomModal.module.css';

const CustomModal = ({ isOpen, onClose, children, contentLabel }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={contentLabel}
      style={{
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
          zIndex: '1001',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: '1000',
        },
      }}
      overlayClassName={css.customModalOverlay}
    >
      {/* <button className={css.closeButton} onClick={onClose}>
        &times;
      </button> */}
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  contentLabel: PropTypes.string,
};

export default CustomModal;
