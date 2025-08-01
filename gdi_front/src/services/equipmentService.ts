import api from "../lib/api";

export const equipamentService = {
  async listarTodos() {
    const response = await api.get("/equipments");
    return response.data;
  },

  async criar(equipamento) {
    const response = await api.post("/equipments", equipamento);
    return response.data;
  },
};
