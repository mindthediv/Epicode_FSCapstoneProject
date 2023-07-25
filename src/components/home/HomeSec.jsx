import { Container, Row, Col } from "react-bootstrap";

const HomeSec = (props) => {
  return (
    <div className="homeSec d-flex flex-column justify-content-between h-100 p-2 myBg">
      <h2 className="text-uppercase rounded-top py-1 px-2 text-center text-light">
        {props.title}
      </h2>
      <p className="rounded-bottom p-3">{props.content}</p>
      <img className="secImg" src={props.img} />
    </div>
  );
};

export default HomeSec;
