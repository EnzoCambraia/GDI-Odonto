import api from "@/lib/api";

export const usuarioService = {
  async getAll() {
    const response = await api.get("/users");
    return response.data;
  },
};
