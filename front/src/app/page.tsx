import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold mb-4">Bem-vindo(a) ao Sistema de Clientes!</p>
          <button className="bg-blue-500 text-white py-2 px-4 m-1 rounded">
            <Link href="/clientes">
              Entrar
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
