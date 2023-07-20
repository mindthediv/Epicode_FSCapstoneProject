import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_USERS } from "../../redux/actions/usersActions";
import { useEffect, useState } from "react";
import { API_UPLOADS } from "./PostMaker";
import { CACHE_USER } from "../../redux/actions/usersActions";
import { Col, Container, Row } from "react-bootstrap";

const PostCard = (post) => {
  let p = post.post;
  // REDUX
  const auth = useSelector((state) => state.logged.loggedUser.auth);
  const u = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  //STATE
  const [imgState, setImgState] = useState(null);
  const [userState, setUserState] = useState(null);
  const [pImg, setPImg] = useState(null);

  //SUB GET SULL'ENDPOINT DEL FILE UPLOADATO
  const getURLFile = async () => {
    try {
      const fileResp = await fetch(API_UPLOADS + "/" + p.filePath, {
        method: "GET",
        headers: {
          "Content-Type": "blob",
          Authorization: "Bearer " + auth,
        },
      });
      if (fileResp.ok) {
        const blob = await fileResp.blob();
        setImgState(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //OTTIENE LO USER DEL POST VIA PATHNAME SU "/users/{userId}"
  const getUserViaPath = async () => {
    try {
      let resp = await fetch(
        API_USERS + "/" + window.location.pathname.split("/")[2],
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth,
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
        alert("Errore nel caricamento dell'utente del post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // OTTIENE LO USER DEL POST VIA PROPS p.userId
  const getUserViaProp = async () => {
    try {
      let resp = await fetch(API_USERS + "/" + p.userId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (resp.ok) {
        let user = await resp.json();
        dispatch({
          type: CACHE_USER,
          payload: user,
        });
        return user;
      } else {
        alert("Errore nel caricamento dell'utente del post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfilePic = async (picName) => {
    try {
      const response = await fetch(API_UPLOADS + "/profile/" + picName, {
        method: "GET",
        headers: {
          "Content-Type": "blob",
          Authorization: "Bearer " + auth,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        setPImg(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (p) {
      let handleEffect = async () => {
        if (window.location.pathname.includes("/users/")) {
          let usr = await getUserViaPath();
          setUserState(usr);
        } else {
          let usr = await getUserViaProp();
          setUserState(usr);
        }
        if (p.filePath) {
          getURLFile();
        }
      };
      handleEffect();
    }
  }, []);

  useEffect(() => {
    if (userState != null) {
      let handleEffect = async () => {
        await getProfilePic(userState.profileImg);
      };
      handleEffect();
    }
  }, [userState]);

  return (
    <Container className="postCard">
      <Row className="align-items-center justify-content-between pt-2">
        <Col xs={2}>
          {/* foto profilo ? url fp : fp placeholder  */}
          {pImg != null ? (
            <img
              className="miniUserImg rounded-circle"
              src={URL.createObjectURL(pImg)}
            />
          ) : (
            <img
              className="miniUserImg rounded-circle"
              src="assets/imgs/placeHolders/userPlaceholder.png"
              alt="Person-placeholder"
            />
          )}
        </Col>
        <Col xs={10}>
          {/* waiter */}
          {p && userState != null && (
            <div className="miniInfo">
              <div className="d-flex align-items-center justify-content-between">
                <Link to={"/users/" + p.userId}>
                  <span className="d-block">{userState.username}</span>
                </Link>
                <span className="smallTxt me-2">{p.date}</span>
              </div>
              <span className="smallTxt">
                <i className="fas fa-map-marker-alt me-2"></i>LOCATION
              </span>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center py-2">Titolo Post</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* IMMAGINE */}
          {imgState != null && (
            <div
              className="postImgWrapper"
              style={{
                backgroundImage: "url(" + URL.createObjectURL(imgState) + ")",
              }}
            ></div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* TESTO */}
          {p && (
            <div className="postText px-5">
              <p>{p.text}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* INTERACTION BTN */}
          {window.location.pathname == "/me" ? (
            <></>
          ) : (
            <div className="btnPost">
              <div className="w-100 d-flex justify-content-center">
                <span className="btnInter interLike ">
                  <i className="far fa-heart"></i>
                </span>
                <span className="btnInter interComment">
                  <i className="far fa-comments "></i>
                </span>
                <span className="btnInter interSave">
                  <i className="far fa-bookmark "></i>
                </span>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PostCard;
