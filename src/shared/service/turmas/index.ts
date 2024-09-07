import api from '../axios-config'

export interface TurmaProps {
  id?: number;
  descricao: string;
  professor: ProfessorProps; // Atualize para incluir o professor completo
  ativo: boolean;
}


export interface ProfessorProps {
  id: number;
  nome: string; // Certifique-se de que o nome está aqui
}


export interface ProfessorProps {
  id: number;
  nome: string; // Adicione o nome do professor aqui
}

export interface TurmaProps {
  id?: number;
  descricao: string;
  professor: ProfessorProps; // Deve incluir todas as propriedades de ProfessorProps
  ativo: boolean;
}

type TurmaComTotalCount = {
  data: TurmaProps[]
}


const getAll = async (): Promise<TurmaComTotalCount | Error> => {
  try {
    const urlRelativa = '/turmas'
    const { data } = await api.get(urlRelativa)

    if (data) {
      return {
        data,
      }
    }

    return new Error('Erro ao listar as Turmas')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao Carregar',
    )
  }
}

const getById = async (id: number): Promise<TurmaProps | Error> => {
  try {
    const { data } = await api.get(`/turmas/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar a Turma')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete<TurmaProps>(`/turmas/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

const createTurma = async (dados: TurmaProps): Promise<void | Error> => {
  try {
    await api.post('/turmas', dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar a turma');
  }
}

const updateTurmaById = async (id: number, dados: TurmaProps): Promise<void | Error> => {
  try {
    await api.put(`/turmas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar a turma');
  }
}

export const TurmaServices = {
  getAll,
  getById,
  deleteById,
  createTurma,
  updateTurmaById
}
