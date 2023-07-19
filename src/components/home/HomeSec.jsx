import { Container, Row, Col } from "react-bootstrap";

const HomeSec = (props) => {
  return (
    <div className="homeSec ">
      <h2 className="text-uppercase rounded-top">{props.title}</h2>
      <p className="rounded-bottom">{props.content}</p>
    </div>
  );
};

export default HomeSec;
