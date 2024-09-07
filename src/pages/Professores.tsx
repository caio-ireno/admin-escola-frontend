import React, { useEffect, useState } from "react";
import {
  ProfessorServices,
  ProfessorProps,
} from "../shared/service/professores";
import { Modal } from "../shared/components/Modal";

const ProfessoresPage: React.FC = () => {
  const [professores, setProfessores] = useState<ProfessorProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      // O ID pode ser deixado de fora, pois o backend irá gerá-lo
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

  useEffect(() => {
    fetchProfessores();
  }, []);

  return (
    <div>
      <h1>Lista de Professores</h1>
      <button onClick={() => setShowModal(true)}>Adicionar Professor</button>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {professores.map((professor) => (
            <li key={professor.id}>
              {professor.nome} - {professor.materia}
              {professor.id && ( // Verifica se o ID está presente
                <>
                  <button onClick={() => handleDelete(professor.id!)}>
                    Deletar
                  </button>
                  <button onClick={() => /* lógica para editar */ {}}>
                    Editar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProfessor}
      />
    </div>
  );
};

export default ProfessoresPage;
