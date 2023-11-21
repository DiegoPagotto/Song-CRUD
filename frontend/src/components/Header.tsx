import { SongModal } from "./SongModal";
import { useNavigate } from "react-router-dom";
import icon from "../assets/logotipo.png";


interface HeaderProps {
  modalAction: (object: any) => void;
  showOptions: boolean;
}

export function Header({ modalAction, showOptions }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <header className="flex items-end w-9/12 justify-center">
      <div className="flex items-center justify-center">
        <img src={icon} className="w-1/2" />
      </div>
      {showOptions && (
        <div className="flex gap-5 items-center justify-end">
          <SongModal isEdit={false} action={modalAction} />
          <button
            className="text-violet-800 hover:text-violet-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

