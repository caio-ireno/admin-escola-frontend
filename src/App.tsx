import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components/Menu";
import { DrawerProvider } from "./shared/context/DrawerContext";

export const App = () => {
  return (
    <BrowserRouter>
      <DrawerProvider>
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
      </DrawerProvider>
    </BrowserRouter>
  );
};

export default App;
