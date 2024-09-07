import React, { useState, useEffect } from "react";
import { AlunoProps } from "../service/alunos";

interface ModalAlunoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    nome: string;
    idade: number;
    turma: { id: number };
    dataNascimento: string;
    notaPrimeiroSemestre: number;
    notaSegundoSemestre: number;
  }) => void;
  aluno?: AlunoProps | null;
  feedback?: string; // Adicionar feedback
}

export const ModalAluno: React.FC<ModalAlunoProps> = ({
  isOpen,
  onClose,
  onSubmit,
  aluno,
  feedback,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: 0,
    turma: { id: 0 },
    dataNascimento: "",
    notaPrimeiroSemestre: 0,
    notaSegundoSemestre: 0,
  });

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    if (aluno) {
      setFormData({
        nome: aluno.nome,
        idade: aluno.idade,
        turma: aluno.turma,
        dataNascimento: aluno.dataNascimento,
        notaPrimeiroSemestre: aluno.notaPrimeiroSemestre,
        notaSegundoSemestre: aluno.notaSegundoSemestre,
      });
    }
  }, [aluno]);

  if (!isOpen) return null;

  // Calcular a média das notas
  const calcularMedia = () => {
    const { notaPrimeiroSemestre, notaSegundoSemestre } = formData;
    return (notaPrimeiroSemestre + notaSegundoSemestre) / 2;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "idade" ||
        name === "notaPrimeiroSemestre" ||
        name === "notaSegundoSemestre"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose(); // Fecha o modal após o envio
  };

  const toggleFeedbackModal = () => {
    setShowFeedbackModal((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {aluno ? "Editar Aluno" : "Adicionar Aluno"}
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
            <label className="block text-gray-700">Turma ID:</label>
            <input
              type="number"
              name="turma"
              value={formData.turma.id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  turma: { id: Number(e.target.value) },
                }))
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data de Nascimento:</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Nota do Primeiro Semestre:
            </label>
            <input
              type="number"
              name="notaPrimeiroSemestre"
              value={formData.notaPrimeiroSemestre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Nota do Segundo Semestre:
            </label>
            <input
              type="number"
              name="notaSegundoSemestre"
              value={formData.notaSegundoSemestre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Média das Notas:</label>
            <input
              type="text"
              value={calcularMedia().toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-200"
            />
          </div>
          {feedback && (
            <div className="mb-4 p-2 bg-blue-100 text-blue-800 border border-blue-300 rounded">
              {feedback}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              {aluno ? "Salvar" : "Adicionar"}
            </button>
            <button
              type="button"
              onClick={toggleFeedbackModal}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Feedback
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

      {/* Modal de Feedback */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Feedback</h2>
            <p>{feedback || "Sem feedback disponível."}</p>
            <button
              type="button"
              onClick={toggleFeedbackModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
