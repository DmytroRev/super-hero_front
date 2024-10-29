// import { useState } from 'react';
// import Modal from 'react-modal';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { createCharacter } from '../../api';
// import css from './CreateCharacter.module.css';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     padding: '20px',
//     border: '1px solid #ccc',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   },
// };

// Modal.setAppElement('#root');

// const CreateCharacter = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const validationSchema = Yup.object({
//     nickname: Yup.string().required('Nickname is required'),
//     real_name: Yup.string().required('Real name is required'),
//     origin_description: Yup.string().required('Origin description is required'),
//     superpowers: Yup.string().required('Superpowers are required'),
//     catch_phrase: Yup.string().required('Catch phrase is required'),
//   });

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setAvatar(null);
//     setAvatarPreview(null);
//   };

//   return (
//     <div>
//       <button onClick={openModal}>Create Character</button>
//       {/* <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Create Character Modal"
//         style={customStyles}
//         overlayClassName="modal-overlay"
//         className={css.modalOverlay}
//       > */}
//       <h2>Create a New Character</h2>
//       <Formik
//         initialValues={{
//           nickname: '',
//           real_name: '',
//           origin_description: '',
//           superpowers: '',
//           catch_phrase: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={async values => {
//           try {
//             const formData = new FormData();
//             formData.append('nickname', values.nickname);
//             formData.append('real_name', values.real_name);
//             formData.append('origin_description', values.origin_description);
//             formData.append('superpowers', values.superpowers);
//             formData.append('catch_phrase', values.catch_phrase);

//             if (avatar) {
//               formData.append('avatar', avatar);
//             }

//             console.log('Submitting character data:', formData);

//             setIsLoading(true);

//             const result = await createCharacter(formData);
//             console.log('Character created result:', result);

//             alert('Character created successfully!');
//             closeModal();
//           } catch (error) {
//             console.error('Error creating character:', error);
//             alert('Failed to create character.');
//           } finally {
//             setIsLoading(false);
//           }
//         }}
//       >
//         {({ setFieldValue }) => (
//           <Modal
//             isOpen={isModalOpen}
//             onRequestClose={closeModal}
//             contentLabel="Create Character Modal"
//             style={customStyles}
//             overlayClassName="modal-overlay"
//             className={css.modalOverlay}
//           >
//             <Form>
//               <div>
//                 <label>Avatar</label>
//                 <input
//                   name="avatar"
//                   type="file"
//                   accept="image/*"
//                   onChange={e => {
//                     const file = e.currentTarget.files[0];
//                     setFieldValue('avatar', file);
//                     if (file) {
//                       setAvatar(file);
//                       setAvatarPreview(URL.createObjectURL(file));
//                     }
//                   }}
//                 />
//                 {avatarPreview && (
//                   <img src={avatarPreview} alt="Avatar Preview" width="100" />
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="nickname">Nickname</label>
//                 <Field type="text" name="nickname" />
//                 <ErrorMessage
//                   name="nickname"
//                   component="div"
//                   className={css.error}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="real_name">Real Name</label>
//                 <Field type="text" name="real_name" />
//                 <ErrorMessage
//                   name="real_name"
//                   component="div"
//                   className={css.error}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="origin_description">Origin Description</label>
//                 <Field type="text" name="origin_description" />
//                 <ErrorMessage
//                   name="origin_description"
//                   component="div"
//                   className={css.error}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="superpowers">Superpowers</label>
//                 <Field type="text" name="superpowers" />
//                 <ErrorMessage
//                   name="superpowers"
//                   component="div"
//                   className={css.error}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="catch_phrase">Catch Phrase</label>
//                 <Field type="text" name="catch_phrase" />
//                 <ErrorMessage
//                   name="catch_phrase"
//                   component="div"
//                   className={css.error}
//                 />
//               </div>

//               <button type="submit" disabled={isLoading}>
//                 {isLoading ? 'Creating...' : 'Create Character'}
//               </button>
//               <button type="button" onClick={closeModal}>
//                 Cancel
//               </button>
//             </Form>
//           </Modal>
//         )}
//       </Formik>
//       {/* // </Modal> */}
//     </div>
//   );
// };

// export default CreateCharacter;

// CreateCharacter.js
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createCharacter } from '../../api';
import CustomModal from '../Modal/CustomModal';
import css from './CreateCharacter.module.css';
import {
  IoCloseCircleOutline,
  IoCloudUploadOutline,
  IoCreateOutline,
} from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

const CreateCharacter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Nickname is required'),
    real_name: Yup.string().required('Real name is required'),
    origin_description: Yup.string().required('Origin description is required'),
    superpowers: Yup.string().required('Superpowers are required'),
    catch_phrase: Yup.string().required('Catch phrase is required'),
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setAvatar(null);
    setAvatarPreview(null);
  };

  return (
    <div>
      <button onClick={openModal} className={css.buttonCreate}>
        Create
        <div>
          <IoCreateOutline className={css.iconCreate} />
        </div>
      </button>
      <Toaster position="top-right" reverseOrder={false} />
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title="Create a New Character"
      >
        <div className={css.modalContainer}>
          <button className={css.closeButton} onClick={closeModal}>
            <IoCloseCircleOutline className={css.closeIconModal} />
          </button>
          <Formik
            initialValues={{
              nickname: '',
              real_name: '',
              origin_description: '',
              superpowers: '',
              catch_phrase: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              try {
                const formData = new FormData();
                formData.append('nickname', values.nickname);
                formData.append('real_name', values.real_name);
                formData.append(
                  'origin_description',
                  values.origin_description
                );
                formData.append('superpowers', values.superpowers);
                formData.append('catch_phrase', values.catch_phrase);

                if (avatar) {
                  formData.append('avatar', avatar);
                }

                console.log('Submitting character data:', formData);

                setIsLoading(true);

                const result = await createCharacter(formData);
                console.log('Character created result:', result);
                toast.success('Character created successfully!');

                closeModal();
              } catch (error) {
                console.error('Error creating character:', error);
                alert('Failed to create character.');
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className={css.formContainer}>
                <div className={css.uploadContainer}>
                  <input
                    name="avatar"
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={e => {
                      const file = e.currentTarget.files[0];
                      setFieldValue('avatar', file);
                      if (file) {
                        setAvatar(file);
                        setAvatarPreview(URL.createObjectURL(file));
                      }
                    }}
                    className={css.fileInput}
                  />
                  <label htmlFor="avatar" className={css.uploadLabel}>
                    <IoCloudUploadOutline
                      size={24}
                      className={css.uploadIcon}
                    />
                    <span>Upload Photo</span>
                  </label>
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      width="80"
                      className={css.avatarPreview}
                    />
                  )}
                </div>

                <div className={css.containerInputField}>
                  <Field
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="nickname"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.containerInputField}>
                  <Field
                    type="text"
                    name="real_name"
                    placeholder="Real Name"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="real_name"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.containerInputField}>
                  <Field
                    type="text"
                    name="origin_description"
                    placeholder="Origin Description"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="origin_description"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.containerInputField}>
                  <Field
                    type="text"
                    name="superpowers"
                    placeholder="Superpowers"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="superpowers"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.containerInputField}>
                  <Field
                    type="text"
                    name="catch_phrase"
                    placeholder="Catch Phrase"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="catch_phrase"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className={css.containerButtonModal}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={css.buttonCreateModal}
                  >
                    {isLoading ? 'Creating...' : 'Create Character'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className={css.buttonCancelModal}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default CreateCharacter;
