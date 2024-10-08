import React, { useEffect, useState } from "react";
import { AlunoProps, AlunoServices } from "../shared/service/alunos";
import { TurmaProps, TurmaServices } from "../shared/service/turmas"; // Importe o serviço de turmas
import { ModalAluno } from "../shared/components/ModalAluno";

const AlunosPage: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<AlunoProps | null>(null);
  const [turmasCache, setTurmasCache] = useState<{ [key: number]: TurmaProps }>(
    {}
  );

  const fetchAlunos = async () => {
    const result = await AlunoServices.getAll();
    if (!(result instanceof Error)) {
      setAlunos(result.data);
      // Verifique se as turmas estão no cache e busque se necessário
      result.data.forEach(async (aluno) => {
        if (aluno.turma && !turmasCache[aluno.turma.id]) {
          await getTurmaName(aluno.turma.id);
        }
      });
    }
    setLoading(false);
  };

  const getTurmaName = async (turmaId: number) => {
    if (turmasCache[turmaId]) {
      return turmasCache[turmaId].descricao;
    } else {
      const result = await TurmaServices.getById(turmaId);
      if (!(result instanceof Error)) {
        setTurmasCache((prev) => ({
          ...prev,
          [turmaId]: result,
        }));
        return result.descricao;
      } else {
        return "Turma não encontrada";
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este aluno?")) {
      const result = await AlunoServices.deleteById(id);
      if (!(result instanceof Error)) {
        fetchAlunos();
      }
    }
  };

  const handleAddAluno = async (formData: {
    nome: string;
    idade: number;
    turma: { id: number };
    dataNascimento: string;
    notaPrimeiroSemestre: number;
    notaSegundoSemestre: number;
  }) => {
    const result = await AlunoServices.createAluno(formData);
    console.log(result);
    if (!(result instanceof Error)) {
      fetchAlunos(); // Atualiza a lista de alunos após adicionar
      setShowModal(false); // Fecha o modal
    } else {
      alert("Erro ao cadastrar um aluno, verifique se o ID turma é valido");
    }
  };

  const handleEditAluno = async (formData: {
    nome: string;
    idade: number;
    turma: { id: number };
    dataNascimento: string;
    notaPrimeiroSemestre: number;
    notaSegundoSemestre: number;
  }) => {
    if (selectedAluno && selectedAluno.id) {
      const result = await AlunoServices.updateAlunoById(
        selectedAluno.id,
        formData
      );
      if (!(result instanceof Error)) {
        fetchAlunos(); // Atualiza a lista após edição
        setShowModal(false); // Fecha o modal
        setSelectedAluno(null); // Limpa o aluno selecionado
      } else {
        alert("Erro ao editar um aluno, verifique se o ID turma é valido");
      }
    }
  };

  const handleOpenModal = (aluno?: AlunoProps) => {
    setSelectedAluno(aluno || null);
    setShowModal(true); // Abre o modal
  };

  useEffect(() => {
    fetchAlunos();
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Alunos</h1>
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out mb-4"
      >
        Adicionar Aluno
      </button>

      {loading ? (
        <p className="text-center text-lg">Carregando...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {alunos.map((aluno) => (
            <li
              key={aluno.id}
              className="flex justify-between items-center p-4 hover:bg-gray-100 transition duration-300"
            >
              <div className="text-lg font-medium">
                {aluno.nome} - Turma{": "}
                {turmasCache[aluno.turma.id]?.descricao || "Carregando..."} -
                Média{" "}
                {(aluno.notaPrimeiroSemestre + aluno.notaSegundoSemestre) / 2}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDelete(aluno.id!)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Deletar
                </button>
                <button
                  onClick={() => handleOpenModal(aluno)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ModalAluno
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={selectedAluno ? handleEditAluno : handleAddAluno}
        aluno={selectedAluno}
      />
    </div>
  );
};

export default AlunosPage;
