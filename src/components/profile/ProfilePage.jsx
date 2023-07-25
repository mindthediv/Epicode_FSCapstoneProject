import { Container, Row, Col } from "react-bootstrap";
import ProfileHead from "./ProfileHead";
import ProfilePostGrid from "./ProfilePostGrid";
import NavUI from "../navbar/NavUI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_UPLOADS } from "../feed/PostMaker";
import store from "../../redux/store/store";
import { cacheUser } from "../../redux/actions/usersActions";

const ProfilePage = () => {
  //STATE
  const [profileImg, setProfileImg] = useState(null);
  const [bio, setBio] = useState(null);
  //REDUX
  const currentState = store.getState();
  const u = currentState.logged.loggedUser;
  const rdxUser = currentState.users.user;
  const user = useSelector((state) => state.logged.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const response = await fetch(API_UPLOADS + "/profile/" + u.profileImg, {
          method: "GET",
          headers: {
            "Content-Type": "blob",
            Authorization: "Bearer " + u.auth,
          },
        });
        if (response.ok) {
          const blob = await response.blob();
          setProfileImg(blob);
          console.log(blob);
        }
      } catch (e) {
        console.log("Errore nel caricamento dell'immagine profilo: " + e);
      }
    };
    const hFx = async () => {
      if (user) {
        getProfilePic();
        dispatch(cacheUser(user.id));
      }
    };
    hFx();
  }, [user]);

  return (
    <Container fluid id="profilePage">
      <Row className="d-flex justify-content-center ">
        <Col xs={12} lg={10}>
          <ProfileHead user={user} profileImg={profileImg} bio={rdxUser.bio} />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center ">
        <Col xs={12} md={10} className="bgGrid">
          <ProfilePostGrid user={user} />
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
