import axios from "axios";

axios.defaults.baseURL = "https://super-hero-backend.onrender.com";
const char = "/characters";

export const getAllCharacters = async () => {
  try {
    const response = await axios.get(`${char}`);
    return response.data.data;
  } catch (err) {
    console.error("Not found:", err);
    throw new Error(err);
  }
};

export const getCharacterById = async (id) => {
  try {
    const response = await axios.get(`${char}/${id}`);
    return response.data.data;
  } catch (err) {
    console.error("Character not found:", err);
    throw new Error(err);
  }
};

export const createCharacter = async (characterData) => {
  try {
    const response = await axios.post(char, characterData);
    return response.data.data;
  } catch (err) {
    console.error("Failed to create character:", err);
    throw new Error(err);
  }
};

export const updateCharacter = async (id, updateData) => {
  try {
    const response = await axios.patch(`${char}/${id}`, updateData);
    return response.data.data;
  } catch (err) {
    console.error("Failer to update character:", err);
    throw new Error(err);
  }
};

export const updateCharacterAvatar = async (id, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await axios.patch(`${char}/${id}/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Server response:", response); // Выводим весь ответ в консоль

    if (response.data && response.data.avatarUrl) {
      return response.data;
    } else {
      console.error("Avatar URL not found in response:", response);
      throw new Error("Avatar URL not found in response.");
    }
  } catch (err) {
    console.error("Failed to update avatar:", err);
    throw new Error(err.response?.data?.message || "Failed to update avatar.");
  }
};

export const removeCharacterAvatar = async (id) => {
  try {
    const response = await axios.delete(`${char}/${id}/avatar`);
    return response.data.data;
  } catch (err) {
    console.error("Failed to delete avatar:", err);
    throw new Error(err);
  }
};

export const addCharacterImages = async (id, imageFiles) => {
  try {
    const formData = new FormData();
    imageFiles.forEach((file) => formData.append("images", file));
    const response = await axios.post(`${char}/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (err) {
    console.error("Failed to add images:", err);
    throw new Error(err);
  }
};

export const removeCharacterImage = async (id, imageId) => {
  try {
    const response = await axios.delete(`${char}/${id}/image`, {
      data: { imageId },
    });
    return response.data.data;
  } catch (err) {
    console.error("Failed to delete image:", err);
    throw new Error(err);
  }
};

export const deleteCharacter = async (id) => {
  try {
    const response = await axios.delete(`${char}/${id}`);
    return response.data.data;
  } catch (err) {
    console.error("Failed to delete character:", err);
    throw new Error(err);
  }
};
