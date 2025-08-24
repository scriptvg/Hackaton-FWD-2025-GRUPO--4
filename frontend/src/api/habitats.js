import axiosInstance from "./axiosInstance";

export const getHabitats = async () => {
  try {
    const response = await axiosInstance.get("/api/habitats/");
    return response.data;
  } catch (error) {
    console.error("Error obtener habitats:", error);
    throw error;
  }
};

export const getHabitatById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/habitats/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obtener habitat por ID ${id}:`, error);
    throw error;
  }
};

export const createHabitat = async (habitatData) => {
  try {
    const response = await axiosInstance.post("/api/habitats/", habitatData);
    return response.data;
  } catch (error) {
    console.error("Error crear habitat:", error);
    throw error;
  }
};

export const updateHabitat = async (id, habitatData) => {
  try {
    const response = await axiosInstance.put(
      `/api/habitats/${id}/`,
      habitatData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar habitat con ID ${id}:`, error);
    throw error;
  }
};

export const deleteHabitat = async (id) => {
  try {
    await axiosInstance.delete(`/api/habitats/${id}/`);
  } catch (error) {
    console.error(`Error eliminar habitat con ID ${id}:`, error);
    throw error;
  }
};

export default {
  getHabitats,
  getHabitatById,
  createHabitat,
  updateHabitat,
  deleteHabitat,
};
