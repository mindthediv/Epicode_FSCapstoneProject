import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileHead from "./ProfileHead";
import ProfilePostGrid from "./ProfilePostGrid";
import ProfileCrExp from "./ProfileCrExp";
import { getLoggedPosts } from "../../redux/actions/postActions";

let GOOGLE_API_KEY = "AIzaSyC6yXG1NCfl7Fgj3OXn398kipRRM75cz0U";

const ProfilePage = () => {
  const logged = useSelector((state) => state.logged);
  const dispatch = useDispatch();

  return (
    <div className="bgProfile" id="profilePage">
      <Container fluid>
        <Row className="d-flex justify-content-center ">
          <Col xs={10} className="">
            <ProfileHead userImg={logged.loggedUser.profileImg} />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center ">
          <Col xs={7} className="bgGrid">
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

export default ProfilePage;