import React, { useEffect, useState } from "react";
import {
  ProfessorServices,
  ProfessorProps,
} from "../shared/service/professores";
import { Modal } from "../shared/components/Modal";

interface ProfessorPropsComId extends Omit<ProfessorProps, "id"> {
  id: number; // Certifica que o 'id' está sempre presente quando necessário
}

const ProfessoresPage: React.FC = () => {
  const [professores, setProfessores] = useState<ProfessorProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] =
    useState<ProfessorPropsComId | null>(null); // Agora selecionamos com a certeza de que o id é um número

  const fetchProfessores = async () => {
    setLoading(true);
    const result = await ProfessorServices.getAll();
    if (!(result instanceof Error)) {
      setProfessores(result.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este professor?")) {
      const result = await ProfessorServices.deleteById(id);
      if (!(result instanceof Error)) {
        fetchProfessores();
      }
    }
  };

  const handleAddProfessor = async (formData: {
    nome: string;
    idade: number;
    materia: string;
    observacoes: string;
  }) => {
    const result = await ProfessorServices.createProfessor({
      nome: formData.nome,
      idade: Number(formData.idade),
      materia: formData.materia,
      observacoes: formData.observacoes,
    });

    if (!(result instanceof Error)) {
      fetchProfessores(); // Atualiza a lista de professores após adicionar
      setShowModal(false); // Fecha o modal
    }
  };

  const handleEditProfessor = async (formData: {
    nome: string;
    idade: number;
    materia: string;
    observacoes: string;
  }) => {
    if (selectedProfessor && selectedProfessor.id) {
      const result = await ProfessorServices.updateProfessorById(
        selectedProfessor.id,
        {
          nome: formData.nome,
          idade: Number(formData.idade),
          materia: formData.materia,
          observacoes: formData.observacoes,
        }
      );

      if (!(result instanceof Error)) {
        fetchProfessores(); // Atualiza a lista após edição
        setShowModal(false); // Fecha o modal
        setSelectedProfessor(null); // Limpa o professor selecionado
      }
    }
  };

  const handleOpenModal = (professor?: ProfessorPropsComId) => {
    if (professor) {
      setSelectedProfessor(professor); // Define o professor a ser editado
    } else {
      setSelectedProfessor(null); // Se for adição, reseta o professor selecionado
    }
    setShowModal(true); // Abre o modal
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Lista de Professores
      </h1>
      <button
        onClick={() => {
          setSelectedProfessor(null); // Limpa o professor selecionado
          setShowModal(true); // Abre o modal
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out mb-4"
      >
        Adicionar Professor
      </button>

      {loading ? (
        <p className="text-center text-lg">Carregando...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {professores.map((professor) => (
            <li
              key={professor.id}
              className="flex justify-between items-center p-4"
            >
              <div className="text-lg font-medium">
                Id:{professor.id} - {professor.nome} - {professor.materia}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDelete(professor.id!)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Deletar
                </button>
                <button
                  onClick={() =>
                    handleOpenModal(professor as ProfessorPropsComId)
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={selectedProfessor ? handleEditProfessor : handleAddProfessor} // Altera a função de envio com base se está editando ou adicionando
        professor={selectedProfessor || undefined} // Passa undefined se selectedProfessor for null
      />
    </div>
  );
};

export default ProfessoresPage;
