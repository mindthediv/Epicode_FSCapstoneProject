import { useNavigate } from "react-router-dom";

const HomeCrAreas = () => {
  const navigate = useNavigate();
  return (
    <div className="homeCrAreas w-100">
      {/* <p>Esplora ogni zona!</p> */}
      <div className="areaBoxDiv w-100">
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/albano")}
            id="albano"
          ></div>
          <h4>Albano Laziale</h4>
        </div>
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/ariccia")}
            id="ariccia"
          ></div>
          <h4>Ariccia</h4>
        </div>
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/castelgandolfo")}
            id="castelGandolfo"
          ></div>
          <h4>Castel Gandolfo</h4>
        </div>
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/genzano")}
            id="genzano"
          ></div>
          <h4>Genzano di Roma</h4>
        </div>
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/lariano")}
            id="lariano"
          ></div>
          <h4>Lariano</h4>
        </div>
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/nemi")}
            id="nemi"
          ></div>
          <h4>Nemi</h4>
        </div>
        <div className="areaDiv">
          <div
            className="crAreaBox"
            onClick={() => navigate("/crArea/frascati")}
            id="frascati"
          ></div>
          <h4>Frascati</h4>
        </div>
      </div>
    </div>
  );
};
export default HomeCrAreas;
