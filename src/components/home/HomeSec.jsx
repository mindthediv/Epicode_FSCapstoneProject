import { Container, Row, Col } from "react-bootstrap";

const HomeSec = (props) => {
  return (
    <div className="homeSec d-flex flex-column justify-content-between h-100 p-2 myBg">
      <h2 className="text-uppercase rounded-top">{props.title}</h2>
      <p className="rounded-bottom">{props.content}</p>
      <img className="secImg" src={props.img} />
    </div>
  );
};

export default HomeSec;
