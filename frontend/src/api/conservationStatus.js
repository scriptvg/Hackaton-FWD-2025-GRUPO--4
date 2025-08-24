import axiosInstance from "./axiosInstance";

export const getConservationStatuses = async () => {
  try {
    const response = await axiosInstance.get("/api/wildlife/conservation-status/");
    return response.data;
  } catch (error) {
    console.error("Error obtener conservation status:", error);
    throw error;
  }
};

export const getConservationStatusById = async (id) => {
  try {
    const response = await axiosInstance.get(`a/api/wildlife/conservation-status/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error obtener conservation status con ID ${id}:`, error);
    throw error;
  }
};

export const createConservationStatus = async (statusData) => {
  try {
    const response = await axiosInstance.post(
      "api/wildlife/conservation-status/create/",
      statusData
    );
    return response.data;
  } catch (error) {
    console.error("Error crear conservation status:", error);
    throw error;
  }
};

export const updateConservationStatus = async (id, statusData) => {
  try {
    const response = await axiosInstance.put(
      `api/wildlife/conservation-status/${id}/update/`,
      statusData
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizar conservation status con ID ${id}:`, error);
    throw error;
  }
};

export const deleteConservationStatus = async (id) => {
  try {
    await axiosInstance.delete(`api/wildlife/conservation-status/${id}/delete/`);
  } catch (error) {
    console.error(`Error eliminar conservation status con ID ${id}:`, error);
    throw error;
  }
};

export const getConservationStatusChoices = async () => {
  try {
    const response = await axiosInstance.get(
      "api/wildlife/conservation-status/"
    );
    return response.data;
  } catch (error) {
    console.error("Error obtener conservation status choices:", error);
    throw error;
  }
};

export default {
  getConservationStatuses,
  getConservationStatusById,
  createConservationStatus,
  updateConservationStatus,
  deleteConservationStatus,
  getConservationStatusChoices,
};
