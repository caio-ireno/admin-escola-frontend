import { useNavigate } from "react-router-dom";
import { useDrawerContext } from "../context/DrawerContext";
import generationLogo from "../../assets/generation.png"; // Logo

interface ListItemLinkProps {
  label: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer text-lg text-gray-800 hover:text-orange-500 transform hover:scale-105 transition duration-300 ease-in-out"
    >
      <p>{label}</p>
    </div>
  );
};

interface MenuProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuProps> = ({ children }) => {
  const { drawerOptions } = useDrawerContext();

  return (
    <div className="relative min-h-screen flex bg-cover bg-center bg-[#117864]">
      {/* Sidebar */}
      <div className=" w-full md:w-72 bg-white p-6  shadow-2xl h-[90vh] mt-auto mb-0 ml-8 rounded-lg">
        <div className="text-center mb-10">
          {/* Logo */}
          <img
            src={generationLogo}
            alt="Generation Logo"
            className="mx-auto w-32 h-auto"
          />
        </div>
        <nav className="space-y-6">
          {drawerOptions.map((drawerOption) => (
            <ListItemLink
              key={drawerOption.path}
              to={drawerOption.path}
              label={drawerOption.label}
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <section className="bg-white bg-opacity-80 p-6 rounded-md shadow-lg">
          {children}
        </section>
      </main>
    </div>
  );
};
