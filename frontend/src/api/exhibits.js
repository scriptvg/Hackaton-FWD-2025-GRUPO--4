import axiosInstance from "./axiosInstance";

export const getExhibits = async () => {
  try {
    const response = await axiosInstance.get("/api/exhibitions/");
    return response.data;
  } catch (error) {
    console.error("Error fetching exhibits:", error);
    throw error;
  }
};

export const getExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibitions/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const createExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibitions/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exhibit:", error);
    throw error;
  }
};

export const updateExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibitions/${id}/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const deleteExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibitions/${id}/`);
  } catch (error) {
    console.error(`Error deleting exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const getImageExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibitions/images/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo la imagen`)
  }
};

export const getImageExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibitions/${id}/images/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exhibit with ID ${id}:`, error);
    throw error;
  }
};

export const createImageExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibitions/images/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating exhibit:", error);
    throw error;
  }
};

export const updateImageExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibitions/images/${id}/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando imagen con ID ${id}:`, error);
    throw error;
  }
};

export const deleteImageExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibitions/images/${id}/`);
  } catch (error) {
    console.error(`Error eliminando imagen con ID ${id}:`, error);
    throw error;
  }
};

export const getFactsExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibitions/facts/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo facts`)
  }
};

export const getFactsExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibitions/facts/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo facts con ID ${id}:`, error);
    throw error;
  }
};

export const createFactsExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibitions/facts/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating facts:", error);
    throw error;
  }
};

export const updateFactsExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibitions/facts/${id}/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando facts con ID ${id}:`, error);
    throw error;
  }
};

export const deleteFactsExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibitions/facts/${id}/`);
  } catch (error) {
    console.error(`Error eliminando facts con ID ${id}:`, error);
    throw error;
  }
};

export const getDescriptionExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibitions/descriptions/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo description`)
  }
};

export const getDescriptionExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibitions/descriptions/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo description con ID ${id}:`, error);
    throw error;
  }
};

export const createDescriptionExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibitions/descriptions/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating description:", error);
    throw error;
  }
};

export const updateDescriptionExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibitions/descriptions/${id}/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando description con ID ${id}:`, error);
    throw error;
  }
};

export const deleteDescriptionExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibitions/descriptions/${id}/`);
  } catch (error) {
    console.error(`Error eliminando description con ID ${id}:`, error);
    throw error;
  }
};

export const getButtonsExhibit = async () => {
  try {
    const response = await axiosInstance.get('/api/exhibitions/buttons/');
    return response.data
  } catch (error) {
    console.error(`Error obteniendo buttons`)
  }
};

export const getButtonsExhibitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/exhibitions/buttons/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo buttons con ID ${id}:`, error);
    throw error;
  }
};

export const createButtonsExhibit = async (exhibitData) => {
  try {
    const response = await axiosInstance.post(
      "/api/exhibitions/buttons/",
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating buttons:", error);
    throw error;
  }
};

export const updateButtonsExhibit = async (id, exhibitData) => {
  try {
    const response = await axiosInstance.put(
      `/api/exhibitions/buttons/${id}/`,
      exhibitData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando buttons con ID ${id}:`, error);
    throw error;
  }
};

export const deleteButtonsExhibit = async (id) => {
  try {
    await axiosInstance.delete(`/api/exhibitions/buttons/${id}/`);
  } catch (error) {
    console.error(`Error eliminando buttons con ID ${id}:`, error);
    throw error;
  }
};

export default {
  getExhibits,
  getExhibitById,
  createExhibit,
  updateExhibit,
  deleteExhibit,
  getImageExhibit,
  getImageExhibitById,
  createImageExhibit,
  updateImageExhibit,
  deleteImageExhibit,
  getFactsExhibit,
  getFactsExhibitById,
  createFactsExhibit,
  updateFactsExhibit,
  deleteFactsExhibit,
  getDescriptionExhibit,
  getDescriptionExhibitById,
  createDescriptionExhibit,
  updateDescriptionExhibit,
  deleteDescriptionExhibit,
  getButtonsExhibit,
  getButtonsExhibitById,
  createButtonsExhibit,
  updateButtonsExhibit,
  deleteButtonsExhibit
};
