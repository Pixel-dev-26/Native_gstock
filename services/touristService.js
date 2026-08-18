import api from "./api";

const prefix = "/v1/touristes";

export const touristService = {
  getAll: async () => {
    const response = await api.get(`${prefix}/`);
    return response.data;
  },

  create: async (tourist) => {
    const response = await api.post(`${prefix}/`, tourist);
    return response.data;
  },

  update: async (id, tourist) => {
    const response = await api.put(`${prefix}/${id}`, tourist);
    return response.data;
  },

  remove: async (id) => {
    await api.delete(`${prefix}/${id}`);
  },
};
