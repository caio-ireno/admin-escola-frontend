import React, { useEffect, useState } from "react";
import { TurmaProps, TurmaServices } from "../shared/service/turmas";
import { ModalTurma } from "../shared/components/ModalTurma";

const TurmaPage: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<TurmaProps | null>(null);

  const fetchTurmas = async () => {
    setLoading(true);
    const result = await TurmaServices.getAll();
    if (!(result instanceof Error)) {
      setTurmas(result.data);
    }
    setLoading(false);
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
      }
    }
  };

  const handleOpenModal = (turma?: TurmaProps) => {
    setSelectedTurma(turma || null);
    setShowModal(true); // Abre o modal
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

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
                {turma.descricao} - {turma.professor.id}
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
