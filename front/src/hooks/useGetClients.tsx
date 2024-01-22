import { ICliente } from "@/app/interfaces/cliente";

const useGetClients = async (): Promise<ICliente[]> => {
  const response = await fetch("http://127.0.0.1:8800/clientes", { method: "GET", cache: "no-store" });
  if (!response.ok) {
    throw new Error("erro: " + response.status);
  }
  const data: ICliente[] = await response.json();

  return data;
};

export default useGetClients;
