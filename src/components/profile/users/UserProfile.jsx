import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_USERS, CACHE_USER } from "../../../redux/actions/usersActions";
import { useEffect } from "react";
import UserProfileHead from "./UserProfileHead";
import NavUI from "../../navbar/NavUI";
import UserPostGrid from "./UserPostGrid";

const UserProfile = () => {
  // REDUX
  const user = useSelector((state) => state.users.user);
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();

  //OTTIENE LO USER DEL POST VIA PATHNAME SU "/users/{userId}"
  const getUserViaPath = async () => {
    try {
      let resp = await fetch(
        API_USERS + "/" + window.location.pathname.split("/")[2],
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + logged.auth,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (resp.ok) {
        let user = await resp.json();
        dispatch({
          type: CACHE_USER,
          payload: user,
        });
        return user;
      } else {
        alert("Errore nel caricamento dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleEffect = async () => {
      getUserViaPath();
    };
    handleEffect();
  }, []);
  useEffect(() => {}, []);

  return (
    <div>
      <Container fluid className="bgProfile" id="profilePage">
        <Row className="d-flex justify-content-center ">
          <Col xs={12} className="">
            <UserProfileHead user={user} />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs={12}>
            <UserPostGrid user={user} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NavUI />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
