import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeJumbo = () => {
  const isLogged = useSelector((state) => state.logged.isLogged);
  return (
    <div className="homeJumbo">
      <div className="d-flex justify-content-center align-items-center p-3 flex-wrap homeBrand ">
        <img
          src="/assets/imgs/logoAlpha2.png"
          className="d-inline-block"
          width={320}
        />
        <div>
          <h1 className="text-uppercase homeTitle p-1">
            We Are
            <br /> Castelli Romani
          </h1>
          {isLogged ? (
            <div className="btnBox ">
              <Link to="/me">
                <h2 className="text-center homeLogin rounded text-uppercase">
                  Accedi al sito
                </h2>
              </Link>
            </div>
          ) : (
            <div className="btnBox ">
              <Link to="/register">
                <h2 className="text-center homeLogin rounded text-uppercase">
                  Accedi al sito
                </h2>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeJumbo;
