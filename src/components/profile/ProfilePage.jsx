import { Container, Row, Col } from "react-bootstrap";
import ProfileHead from "./ProfileHead";
import ProfilePostGrid from "./ProfilePostGrid";
import NavUI from "../navbar/NavUI";

const ProfilePage = () => {
  return (
    <Container fluid id="profilePage">
      <Row className="d-flex justify-content-center ">
        <Col xs={12} lg={10}>
          <ProfileHead />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center ">
        <Col xs={12} md={10} className="bgGrid">
          <ProfilePostGrid />
        </Col>
      </Row>
      <Row>
        <Col>
          <NavUI />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
