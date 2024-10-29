import Modal from 'react-modal';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import CustomModal from '../CustomModal/CustomModal';
import css from './ChangeCharacterInfo.module.css';

Modal.setAppElement('#root');

const ChangeCharacterInfo = ({ character, onSave, onClose }) => {
  if (!character) return null; // Добавлено, чтобы избежать ошибки PropTypes
  const initialValues = {
    nickname: character.nickname,
    real_name: character.real_name,
    origin_description: character.origin_description,
    superpowers: character.superpowers,
    catch_phrase: character.catch_phrase,
  };

  const handleSubmit = values => {
    onSave(values);
  };

  return (
    <CustomModal isOpen={true} onRequestClose={onClose}>
      <h2>Change character info</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className={css.containerField}>
            <div>
              <Field
                type="text"
                name="nickname"
                placeholder="Nickname"
                className={css.inputField}
              />
            </div>
            <div>
              <Field
                type="text"
                name="real_name"
                placeholder="Real name"
                className={css.inputField}
              />
            </div>
            <div>
              <Field
                type="text"
                name="origin_description"
                placeholder="Origin description"
                className={css.inputField}
              />
            </div>
            <div>
              <Field
                type="text"
                name="superpowers"
                placeholder="Superpowers"
                className={css.inputField}
              />
            </div>
            <div>
              <Field
                type="text"
                name="catch_phrase"
                placeholder="Catch phrase"
                className={css.inputField}
              />
            </div>
            <div className={css.containerButton}>
              <button type="submit" className={css.btn}>
                Save
              </button>
              <button type="button" onClick={onClose} className={css.btn}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

ChangeCharacterInfo.propTypes = {
  character: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default ChangeCharacterInfo;
