import React, { useState, useEffect } from "react";
import { TurmaProps } from "../service/turmas";

interface ModalTurmaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: TurmaProps) => void;
  turma?: TurmaProps | null;
}

export const ModalTurma: React.FC<ModalTurmaProps> = ({
  isOpen,
  onClose,
  onSubmit,
  turma,
}) => {
  const [formData, setFormData] = useState({
    descricao: "",
    professorId: 0,
    professorNome: "", // Adicione um campo para o nome do professor se necessário
    ativo: true,
  });

  useEffect(() => {
    if (turma) {
      setFormData({
        descricao: turma.descricao,
        professorId: turma.professor.id,
        professorNome: turma.professor.nome, // Inclua o nome do professor se disponível
        ativo: turma.ativo,
      });
    }
  }, [turma]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const formDataToSubmit: TurmaProps = {
      descricao: formData.descricao,
      professor: {
        id: formData.professorId,
        nome: formData.professorNome, // Certifique-se de que o nome está incluído
      },
      ativo: formData.ativo,
    };
    onSubmit(formDataToSubmit);
    onClose(); // Fecha o modal após o envio
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {turma ? "Editar Turma" : "Adicionar Turma"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Professor:</label>
            <input
              type="number"
              name="professorId"
              value={formData.professorId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nome do Professor:</label>
            <input
              type="text"
              name="professorNome"
              value={formData.professorNome}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ativo:</label>
            <input
              type="checkbox"
              name="ativo"
              checked={formData.ativo}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Sim</span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {turma ? "Atualizar" : "Adicionar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ml-2"
          >
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
};
