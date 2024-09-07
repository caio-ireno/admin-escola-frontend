import React, { useState, useEffect } from "react";
import { ProfessorProps } from "../service/professores";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    nome: string;
    idade: number;
    materia: string;
    observacoes: string;
  }) => void;
  professor?: ProfessorProps; // prop adicional para edição
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  professor,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: 0,
    materia: "",
    observacoes: "",
  });

  useEffect(() => {
    if (professor) {
      setFormData({
        nome: professor.nome,
        idade: professor.idade,
        materia: professor.materia,
        observacoes: professor.observacoes,
      });
    }
  }, [professor]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose(); // Fecha o modal após o envio
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {professor ? "Editar Professor" : "Adicionar Professor"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Idade:</label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Matéria:</label>
            <input
              type="text"
              name="materia"
              value={formData.materia}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Observações:</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              {professor ? "Salvar" : "Adicionar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
