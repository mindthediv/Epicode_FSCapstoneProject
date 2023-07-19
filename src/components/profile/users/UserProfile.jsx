import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProfileHead from "../ProfileHead";
import ProfilePostGrid from "../ProfilePostGrid";
import ProfileCrExp from "../ProfileCrExp";

let GOOGLE_API_KEY = "AIzaSyC6yXG1NCfl7Fgj3OXn398kipRRM75cz0U";

const UserProfile = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <div className="bgProfile" id="profilePage">
      <Container fluid>
        <Row className="d-flex justify-content-center ">
          <Col xs={10} className="">
            <ProfileHead user />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center ">
          <Col xs={7} className="bg-light">
            <ProfilePostGrid />
          </Col>
          <Col className="bg-light" xs={3}>
            <ProfileCrExp />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
