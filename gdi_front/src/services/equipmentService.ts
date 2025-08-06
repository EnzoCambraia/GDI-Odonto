import api from "@/lib/api";

export const equipamentService = {
  async getAll() {
    const response = await api.get("/equipments");
    return response.data;
  },

  async createEquipment(equipamento) {
    const response = await api.post("/equipments", equipamento);
    return response.data;
  },

  async updateEquipament(equipamento) {
    const { id, ...equipmentData } = equipamento;
    const response = await api.put(`/equipments/${id}`, equipmentData);
    return response.data;
  },

  async deleteEquipament(equipamento) {
    const response = await api.delete(`/equipments/${equipamento.id}`);
    return response.data;
  },
};
