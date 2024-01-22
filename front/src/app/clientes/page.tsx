"use client";
import useGetClients from "@/hooks/useGetClients";
import { ICliente } from "../interfaces/cliente";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IRota } from "../interfaces/rota";
import usePostGerarRota from "@/hooks/usePostGerarRota";

export default function Clientes() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [rota, setRota] = useState<IRota>();

  const handleCarregarClientes = async () => {
    try {
      const clientesData = await useGetClients();
      setClientes(clientesData);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const handleGerarRota = async () => {
    try {
      const rotaData = await usePostGerarRota();
      setRota(rotaData);
    } catch (error) {
      console.error("Erro ao gerar rota:", error);
    }
  };

  useEffect(() => {
    handleCarregarClientes();
  }, []);

  return (
    <>
      <div className="text-center border-solid rounded border-2 border-black p-4">
        <h2 className="text-2xl font-bold mb-4">Tabela de Clientes</h2>
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Telefone</th>
              <th className="py-2 px-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(({ Id, Nome, Email, Telefone }: ICliente) => (
              <tr key={Id} className="border-b">
                <td className="py-2 px-4">{Nome}</td>
                <td className="py-2 px-4">{Email}</td>
                <td className="py-2 px-4">{Telefone}</td>
                <td className="py-2 px-4">
                  <button className="bg-red-500 text-white py-2 px-4 rounded">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 m-1 rounded">
            <Link href="/clientes/cadastro">Adicionar</Link>
          </button>
          <button
            onClick={() => {
              openModal();
              handleGerarRota();
            }}
            className="bg-green-500 text-white py-2 px-4 m-1 rounded"
          >
            Gerar Rota
          </button>
        </div>
      </div>

      {/* MODAL */}
      <div
        className={`${
          isModalOpen ? "block" : "hidden"
        } fixed inset-0 overflow-y-auto`}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className={`${
              isModalOpen ? "inline-block" : "hidden"
            } align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Detalhes da Rota</h3>
              {rota && rota.melhorRota ? (
                <>
                  <p>Ordem de visitação:</p>
                  <ol className="list-decimal pl-4">
                    {rota.melhorRota.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                  <p>Distância Total: {rota.distancia} un</p>
                </>
              ) : (
                <p>Aguardando geração da rota...</p>
              )}
              <button
                onClick={() => closeModal()}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Fechar modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
