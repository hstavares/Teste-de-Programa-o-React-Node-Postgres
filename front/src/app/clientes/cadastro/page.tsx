"use client";
import usePostClient from "@/hooks/usePostClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function CadastroCliente() {
  const router = useRouter();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const { success, message } = await usePostClient(nome, email, telefone);
    if (!success) {
      setNome("");
      setEmail("");
      setTelefone("");
      alert("email já cadastrado!");
      setLoading(false);
    }else {
      alert(message);
      router.push("/clientes");
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastro Cliente</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-600"
          >
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-600"
          >
            Telefone:
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            onChange={(e) => setTelefone(e.target.value)}
            value={telefone}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {loading && <div>Carregando</div>}
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 m-1 rounded-md hover:bg-blue-600"
          disabled={loading}
          onClick={handleSubmit}
        >
          Adicionar
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 m-1 rounded-md hover:bg-gray-600"
          disabled={loading}
        >
          <Link href="/clientes">Voltar</Link>
        </button>
      </form>
    </div>
  );
}
