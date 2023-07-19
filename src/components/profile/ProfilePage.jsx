import { Container, Row, Col } from "react-bootstrap";
import ProfileHead from "./ProfileHead";
import ProfilePostGrid from "./ProfilePostGrid";
import ProfileCrExp from "./ProfileCrExp";

const ProfilePage = () => {
  return (
    <div className="bgProfile" id="profilePage">
      <Container fluid>
        <Row className="d-flex justify-content-center ">
          <Col xs={10}>
            <ProfileHead />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center ">
          <Col xs={7} className="bgGrid">
            <ProfilePostGrid />
          </Col>
          <Col xs={3}>
            <ProfileCrExp />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
