import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CrAreaPosts from "./CrAreaPosts";
import CrAreaHead from "./CrAreaHead";

const CrAreaPage = () => {
  const { area } = useParams();
  return (
    <Container className="m-auto">
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center">
          <CrAreaHead />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <CrAreaPosts />
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
};
export default CrAreaPage;
