import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ChangeCharacterInfo = ({ character, onSave, onClose }) => {
  if (!character) return null; // Добавлено, чтобы избежать ошибки PropTypes
  const initialValues = {
    nickname: character.nickname,
    real_name: character.real_name,
    origin_description: character.origin_description,
    superpowers: character.superpowers,
    catch_phrase: character.catch_phrase,
  };

  const handleSubmit = (values) => {
    onSave(values);
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
      <h2>Change character info</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div>
              <label>Nickname:</label>
              <Field type="text" name="nickname" />
            </div>
            <div>
              <label>Real name:</label>
              <Field type="text" name="real_name" />
            </div>
            <div>
              <label>Origin description:</label>
              <Field type="text" name="origin_description" />
            </div>
            <div>
              <label>Superpowers:</label>
              <Field type="text" name="superpowers" />
            </div>
            <div>
              <label>Catch phrase:</label>
              <Field type="text" name="catch_phrase" />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

ChangeCharacterInfo.propTypes = {
  character: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default ChangeCharacterInfo;
