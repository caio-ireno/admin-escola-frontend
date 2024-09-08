import React, { useEffect, useState } from "react";
import { TurmaProps, TurmaServices } from "../shared/service/turmas";
import {
  ProfessorProps,
  ProfessorServices,
} from "../shared/service/professores"; // Importe o serviço de professores
import { ModalTurma } from "../shared/components/ModalTurma";

const TurmaPage: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<TurmaProps | null>(null);
  const [professoresCache, setProfessoresCache] = useState<{
    [key: number]: ProfessorProps;
  }>({});

  const fetchTurmas = async () => {
    //setLoading(true);
    const result = await TurmaServices.getAll();
    if (!(result instanceof Error)) {
      setTurmas(result.data);
      setLoading(false);
      // Verifique se os professores estão no cache e busque se necessário
      result.data.forEach(async (turma) => {
        if (turma.professor && !professoresCache[turma.professor.id]) {
          await getProfessorName(turma.professor.id);
        }
      });
    }
  };

  const getProfessorName = async (professorId: number) => {
    if (professoresCache[professorId]) {
      return professoresCache[professorId].nome;
    } else {
      const result = await ProfessorServices.getById(professorId);
      if (!(result instanceof Error)) {
        setProfessoresCache((prev) => ({
          ...prev,
          [professorId]: result,
        }));
        return result.nome;
      } else {
        return "Professor não encontrado";
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta turma?")) {
      const result = await TurmaServices.deleteById(id);
      if (!(result instanceof Error)) {
        fetchTurmas();
      }
    }
  };

  const handleAddTurma = async (formData: TurmaProps) => {
    const result = await TurmaServices.createTurma(formData);
    if (!(result instanceof Error)) {
      fetchTurmas(); // Atualiza a lista de turmas após adicionar
      setShowModal(false); // Fecha o modal
    } else {
      alert("Erro ao adicionar nova turma - Verifique o ID do professor");
    }
  };

  const handleEditTurma = async (formData: TurmaProps) => {
    if (selectedTurma && selectedTurma.id) {
      const result = await TurmaServices.updateTurmaById(
        selectedTurma.id,
        formData
      );
      if (!(result instanceof Error)) {
        fetchTurmas(); // Atualiza a lista após edição
        setShowModal(false); // Fecha o modal
        setSelectedTurma(null); // Limpa a turma selecionada
      } else {
        alert("Erro ao editar nova turma - Verifique o ID do professor");
      }
    }
  };

  const handleOpenModal = (turma?: TurmaProps) => {
    setSelectedTurma(turma || null);
    setShowModal(true); // Abre o modal
  };

  useEffect(() => {
    fetchTurmas();
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Turmas</h1>
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
      >
        Adicionar Turma
      </button>

      {loading ? (
        <p className="text-center text-lg">Carregando...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {turmas.map((turma) => (
            <li
              key={turma.id}
              className="flex justify-between items-center p-4 hover:bg-gray-100 transition duration-300"
            >
              <div className="text-lg font-medium">
                TurmaId: {turma.id} - {turma.descricao} - Professor:{" "}
                {professoresCache[turma.professor.id]?.nome || "Carregando..."}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDelete(turma.id!)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Deletar
                </button>
                <button
                  onClick={() => handleOpenModal(turma)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ModalTurma
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={selectedTurma ? handleEditTurma : handleAddTurma}
        turma={selectedTurma}
      />
    </div>
  );
};

export default TurmaPage;
