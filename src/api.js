import axios from 'axios';

axios.defaults.baseURL = 'https://super-hero-backend.onrender.com';
const char = '/characters';

export const getAllCharacters = async () => {
  try {
    const response = await axios.get(`${char}`);
    return response.data.data;
  } catch (err) {
    console.error('Not found:', err);
    throw new Error(err);
  }
};

export const getCharacterById = async id => {
  try {
    const response = await axios.get(`${char}/${id}`);
    return response.data.data;
  } catch (err) {
    console.error('Character not found:', err);
    throw new Error(err);
  }
};

export const createCharacter = async characterData => {
  try {
    const response = await axios.post(char, characterData);
    console.log('Character creation response:', response.data); // Выводим ответ в консоль
    return response.data;
  } catch (err) {
    console.error('Failed to create character:', err);
    throw new Error(err);
  }
};

export const updateCharacter = async (id, updateData) => {
  try {
    const response = await axios.patch(`${char}/${id}`, updateData);
    return response.data;
  } catch (err) {
    console.error('Failed to update character:', err);
    throw new Error(err);
  }
};

export const updateCharacterAvatar = async (id, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await axios.patch(`${char}/${id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Server response:', response); // Выводим весь ответ в консоль

    if (response.data && response.data.url) {
      return response.data;
    } else {
      console.error('Avatar URL not found in response:', response);
      throw new Error('Avatar URL not found in response.');
    }
  } catch (err) {
    console.error('Failed to update avatar:', err);
    throw new Error(err.response?.data?.message || 'Failed to update avatar.');
  }
};

// Убедитесь, что ваш метод deleteCharacter выглядит так
export const deleteCharacterAvatar = async id => {
  try {
    const response = await axios.delete(`${char}/${id}/avatar`); // Проверьте, правильно ли формируется URL
    return response.data; // Здесь мы ожидаем, что ответ будет содержать нужные данные
  } catch (err) {
    console.error('Failed to delete avatar:', err);
    throw new Error(err.response?.data?.error || err.message); // Убедитесь, что вы обрабатываете сообщение об ошибке
  }
};

export const addCharacterImages = async (id, imageFiles) => {
  try {
    const formData = new FormData();

    imageFiles.forEach(file => {
      console.log(file.name, file.size, file.type); // Логируем данные файла
      formData.append('image', file);
    });

    // Логирование формируемых данных для проверки
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const response = await axios.patch(`${char}/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Логируем ответ сервера
    console.log(response.data);

    // Измените здесь, чтобы вернуть нужное значение из ответа
    return response.data.urls || response.data.imageUrl; // Возвращаем массив URL или одиночный URL
  } catch (err) {
    console.error('Failed to add images:', err);
    throw new Error(err);
  }
};
export const removeCharacterImage = async (id, imageUrl) => {
  try {
    const response = await axios.delete(`${char}/${id}/image`, {
      data: { imageUrl },
    });
    console.log('Ответ сервера на удаление изображения:', response.data);
    return response.data;
  } catch (err) {
    console.error('Failed to delete image:', err);
    throw new Error(err.response?.data?.error || err.message);
  }
};
export const deleteCharacter = async id => {
  try {
    const response = await axios.delete(`${char}/${id}`);
    if (response.status === 204) {
      // Успешное удаление
      return true; // Можно вернуть true или просто ничего не возвращать
    }
  } catch (err) {
    console.error('Failed to delete character:', err);
    throw new Error(err);
  }
};
