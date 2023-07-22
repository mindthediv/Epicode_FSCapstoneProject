import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_USERS, cacheUser } from "../../redux/actions/usersActions";
import { useEffect, useState } from "react";
import { API_UPLOADS } from "./PostMaker";
import { CACHE_USER } from "../../redux/actions/usersActions";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import PostMaker from "./PostMaker";
import { Modal } from "react-bootstrap";
import PostPutter from "./PostPutter";
import { putLike } from "../../redux/actions/postActions";

const PostCard = (post) => {
  let p = post.post;
  const navigate = useNavigate();
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const loggedState = useSelector((state) => state.logged);
  const u = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  //STATE
  const [postImg, setPostImg] = useState(null);
  const [userState, setUserState] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  // MODAL
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);

  //OTTIENE LA POST IMG
  const getPostImg = async () => {
    try {
      const fileResp = await fetch(API_UPLOADS + "/" + p.filePath, {
        method: "GET",
        headers: {
          "Content-Type": "blob",
          Authorization: "Bearer " + logged.auth,
        },
      });
      if (fileResp.ok) {
        const blob = await fileResp.blob();
        setPostImg(blob);
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
          Authorization: "Bearer " + logged.auth,
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
  //OTTIENE LA PROFILEIMG
  const getProfilePic = async (picName) => {
    try {
      const response = await fetch(API_UPLOADS + "/profile/" + picName, {
        method: "GET",
        headers: {
          "Content-Type": "blob",
          Authorization: "Bearer " + logged.auth,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        setProfileImg(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // USER LINK HANDLER
  const userLink = async () => {
    let u = await getUserViaProp(p.userId);
    dispatch(cacheUser(u));
    navigate("/users/" + p.userId);
  };

  // LIKES HANDLER
  const handleLike = async () => {
    dispatch(putLike(p.id));
  };

  useEffect(() => {
    if (p) {
      let handleEffect = async () => {
        if (logged) {
          if (window.location.pathname.includes("/users/")) {
            let usr = await getUserViaPath();
            setUserState(usr);
          } else {
            let usr = await getUserViaProp();
            setUserState(usr);
          }
          if (p.filePath) {
            getPostImg();
          }
        }
      };
      handleEffect();
    }
  }, []);

  useEffect(() => {
    if (userState != null) {
      let handleEffect = async () => {
        getProfilePic(userState.profileImg);
      };
      handleEffect();
    }
  }, [userState]);

  return (
    <Container className="postCard ">
      {window.location.pathname == "/me" ? (
        <></>
      ) : (
        <Row className="align-items-center justify-content-between p-2 pb-0 mt-2">
          <Col xs={2}>
            {/* foto profilo ? url fp : fp placeholder  */}
            {profileImg != null ? (
              <img
                className="miniUserImg rounded-circle"
                src={URL.createObjectURL(profileImg)}
              />
            ) : (
              <div className="miniUserImg rounded-circle">
                <Spinner></Spinner>
              </div>
            )}
          </Col>
          <Col xs={10}>
            {/* waiter */}
            {p && userState != null ? (
              <div className="miniInfo">
                <div className="d-flex align-items-center justify-content-between">
                  <span
                    className="d-block userLink my-2"
                    onClick={() => userLink()}
                  >
                    {userState.username}
                  </span>
                  <span className="smallTxt me-2">{p.date}</span>
                </div>

                <span className="smallTxt">
                  <i className="fas fa-map-marker-alt me-2"></i>LOCATION
                </span>
              </div>
            ) : (
              <div className="miniInfo">
                <div className="d-flex align-items-center justify-content-between">
                  <span
                    className="d-block userLink my-2 bg-muted rounded"
                    onClick={() => userLink()}
                  >
                    _____
                  </span>
                  <span className="smallTxt me-2 bg-muted rounded">__</span>
                </div>

                <span className="smallTxt bg-muted rounded">
                  <i className="fas fa-map-marker-alt me-2"></i>__
                </span>
              </div>
            )}
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <h2 className="p-3 m-auto fs-1 text-bold">{p.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* IMMAGINE */}
          {postImg != null ? (
            <div
              className="postImgWrapper "
              style={{
                backgroundImage: "url(" + URL.createObjectURL(postImg) + ")",
              }}
            ></div>
          ) : (
            <>
              {p.filePath != null ? (
                <div className="d-flex align-items-center justify-content-center postImgWrapper">
                  <Spinner></Spinner>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* TESTO */}
          {p && (
            <div className="postText px-1">
              <p className="fs-5">{p.text}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* INTERACTION BTN */}
          {window.location.pathname == "/me" ? (
            <>
              <div className="btnPost">
                <div className="w-100 d-flex justify-content-center">
                  <span
                    className="btnInter interSave"
                    onClick={handleMasterModal}
                  >
                    <i className="far farfa  fa-edit"></i>
                  </span>
                  <Modal
                    show={masterModal}
                    onHide={closeMasterModal}
                    centered
                    className="masterModal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>MODIFICA IL POST</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <PostPutter post={p} />
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </>
          ) : (
            <div className="btnPost">
              <div className="w-100 d-flex justify-content-center">
                <span
                  className="btnInter interLike"
                  onClick={() => handleLike()}
                >
                  <i className="far fa-heart"></i>
                </span>
                <span className="btnInter interComment">
                  <i className="far fa-comments "></i>
                </span>
                {loggedState.loggedUser.id != p.userId ? (
                  <span className="btnInter interSave">
                    <i className="far fa-bookmark "></i>
                  </span>
                ) : (
                  <>
                    <span
                      className="btnInter interSave"
                      onClick={handleMasterModal}
                    >
                      <i className="far farfa  fa-edit"></i>
                    </span>
                    <Modal
                      show={masterModal}
                      onHide={closeMasterModal}
                      centered
                      className="masterModal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>MODIFICA IL POST</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <PostPutter post={p} />
                      </Modal.Body>
                    </Modal>
                  </>
                )}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PostCard;
