import { Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const CrAreaHead = () => {
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  const { area } = useParams();

  return (
    <div className="CrAreaHead">
      <div
        style={{
          backgroundImage: 'url("http://www.placekitten.com/1200")',
          height: 300 + "px",
        }}
        className="w-100 profileBanner"
      >
        {/* <img src="http://www.placekitten.com/1200" className="w-100" alt="" /> */}
      </div>
      <div className="d-flex underBanner">
        <div className="imgBox">
          <img
            className="profileImg "
            src="http://www.placekitten.com/1200"
            alt=""
          />
        </div>
        <div className="d-flex infoBox flex-column justify-content-between">
          <div className="textBox">
            <h2>{area}</h2>
            <h5>{area}</h5>
            <span className="d-block">
              <i className="fas fa-map-marker-alt me-2"></i>LUOGO
            </span>
            <p>{area}</p>
          </div>
          <div className="profileBtnLine d-flex  p-2">
            <Button variant="p-2 m-2">
              <i className="fa fa-user-plus fs-1"></i>
            </Button>
            <Button variant="p-2 m-2">
              <i className="fa fa-comment fs-1"></i>
            </Button>
            <Button variant="p-2 m-2">
              <i className="fa fa-ellipsis-h fs-1"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrAreaHead;
