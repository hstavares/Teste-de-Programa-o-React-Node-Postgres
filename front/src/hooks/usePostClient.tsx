import { IResponse } from "@/app/interfaces/response";

const usePostClient = async (
  Nome: string,
  Email: string,
  Telefone: string
): Promise<IResponse> => {
  try {
    const response = await fetch("http://127.0.0.1:8800/clientes/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: Nome,
        email: Email,
        telefone: Telefone,
      }),
    });

    const data: IResponse = await response.json();

    if (!response.ok) {
      return (response.status as IResponse);
    }

    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export default usePostClient;
