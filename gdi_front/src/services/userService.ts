import api from "../lib/api";

export const usuarioService = {
  async listarTodos() {
    const response = await api.get("/users");
    return response.data;
  },
};
