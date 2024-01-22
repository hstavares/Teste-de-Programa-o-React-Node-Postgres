import { IRota } from "@/app/interfaces/rota";

const usePostGerarRota = async (): Promise<IRota> => {
  const response = await fetch("http://127.0.0.1:8800/clientes/gerarRota", { method: "POST", cache: "no-store" });
  if (!response.ok) {
    throw new Error("erro: " + response.status);
  }
  const data: IRota = await response.json();

  return data;
};

export default usePostGerarRota;
