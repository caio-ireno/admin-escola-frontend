import api from '../axios-config'

export interface AlunoProps {
  id?: number;
  nome: string;
  idade: number;
  turma: { id: number };
  dataNascimento: string;
  notaPrimeiroSemestre: number;
  notaSegundoSemestre: number;
}


type AlunoComTotalCount = {
  data: AlunoProps[]
}

const getAll = async (): Promise<AlunoComTotalCount | Error> => {
  try {
    const urlRelativa = '/alunos'
    const { data } = await api.get(urlRelativa)

    if (data) {
      return {
        data,
      }
    }

    return new Error('Erro ao listar os Alunos')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao Carregar',
    )
  }
}

const getById = async (id: number): Promise<AlunoProps | Error> => {
  try {
    const { data } = await api.get(`/alunos/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar o Aluno')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete<AlunoProps>(`/alunos/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

const createAluno = async (dados: AlunoProps): Promise<void | Error> => {
  try {
    await api.post('/alunos', dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o aluno');
  }
}

const updateAlunoById = async (id: number, dados: AlunoProps): Promise<void | Error> => {
  try {
    await api.put(`/alunos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o aluno');
  }
}
export const AlunoServices = {
  getAll,
  getById,
  deleteById,
  createAluno,
  updateAlunoById
}
