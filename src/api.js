import axios from 'axios';

axios.defaults.baseURL = 'https://super-hero-backend.onrender.com';
const char = '/characters';

export const getAllCharacters = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${char}`, {
      params: { page, limit },
    });
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

export const deleteCharacterAvatar = async id => {
  try {
    const response = await axios.delete(`${char}/${id}/avatar`);
    return response.data;
  } catch (err) {
    console.error('Failed to delete avatar:', err);
    throw new Error(err.response?.data?.error || err.message);
  }
};

export const addCharacterImages = async (id, imageFiles) => {
  try {
    const formData = new FormData();

    imageFiles.forEach(file => {
      console.log(file.name, file.size, file.type);
      formData.append('image', file);
    });

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const response = await axios.patch(`${char}/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.urls || response.data.imageUrl;
  } catch (err) {
    throw new Error(err);
  }
};
export const removeCharacterImage = async (id, imageUrl) => {
  try {
    const response = await axios.delete(`${char}/${id}/image`, {
      data: { imageUrl },
    });
    return response.data;
  } catch (err) {
    console.error('Failed to delete image:', err);
    throw new Error(err.response?.data?.error || err.message);
  }
};
export const deleteCharacter = async (id, avatarUrl = null) => {
  try {
    if (avatarUrl) {
      await axios.delete(avatarUrl);
    }

    // Удаляем персонажа
    const response = await axios.delete(`${char}/${id}`);

    if (response.status === 204 || response.status === 200) {
      return true;
    }

    throw new Error(`Unexpected status code: ${response.status}`);
  } catch (err) {
    console.error('Failed to delete character:', err);
    throw err;
  }
};
