import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bem-vindo ao Sistema Escolar
        </h1>
        <p className="text-gray-600 mb-6">
          Gerencie suas turmas, alunos e professores com facilidade. Este
          sistema foi desenvolvido para otimizar a gestão escolar, facilitando o
          acompanhamento de notas, turmas e muito mais.
        </p>
        <a
          href="/professores"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Acessar o Painel
        </a>
      </div>
    </div>
  );
};

export default Home;
