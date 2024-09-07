import api from '../axios-config'

export interface ProfessorProps {
  id?: number
  nome: string
  idade: number
  materia: string
  observacoes: string
}

type ProfessorComTotalCount = {
  data: ProfessorProps[]
}

const getAll = async (): Promise<ProfessorComTotalCount | Error> => {
  try {
    const urlRelativa = '/professores'
    const { data } = await api.get(urlRelativa)

    if (data) {
      return {
        data,
      }
    }

    return new Error('Erro ao listar os Professores')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao Carregar',
    )
  }
}

const getById = async (id: number): Promise<ProfessorProps | Error> => {
  try {
    const { data } = await api.get(`/professores/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar o Professor')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete<ProfessorProps>(`/professores/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}


const updateProfessorById = async (id: number, dados: ProfessorProps): Promise<void | Error> => {
  try {
    await api.put(`/professores/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o professor');
  }
}

const createProfessor = async (dados: Omit<ProfessorProps, 'id'>): Promise<void | Error> => {
  try {
    await api.post('/professores', dados); // O ID não precisa ser passado
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o professor');
  }
}

export const ProfessorServices = {
  getAll,
  getById,
  deleteById,
  updateProfessorById,
  createProfessor
}
