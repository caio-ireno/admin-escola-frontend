import { Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/context/DrawerContext";
import { useEffect } from "react";
import Professores from "../pages/Professores";
import AlunosPage from "../pages/Alunos";
import TurmaPage from "../pages/Turmas";

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        label: "Professores",
        path: "/professores",
      },
      {
        label: "Turmas",
        path: "/turmas",
      },

      {
        label: "Alunos",
        path: "/alunos",
      },
    ]);
  }, [setDrawerOption]);

  return (
    <Routes>
      <Route path="/professores" element={<Professores />} />
      <Route path="/alunos" element={<AlunosPage />} />
      <Route path="/turmas" element={<TurmaPage />} />
    </Routes>
  );
};
