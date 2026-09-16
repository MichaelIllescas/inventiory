import { Atom } from "react-loading-indicators";

export const LoadingScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <Atom color="#7da17d" size="large" text="Cargando..." textColor="#6e6a6a" id='atom'/>
      </div>
    </div>
  );
};
