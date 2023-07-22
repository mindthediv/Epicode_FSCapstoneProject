import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_USERS, cacheUser } from "../../redux/actions/usersActions";
import { useEffect, useState, useRef } from "react";
import { API_UPLOADS } from "./PostMaker";
import { CACHE_USER } from "../../redux/actions/usersActions";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import PostMaker from "./PostMaker";
import { Modal } from "react-bootstrap";
import PostPutter from "./PostPutter";
import { getLikes, putLike } from "../../redux/actions/postActions";
import { API_POSTS } from "../../redux/actions/postActions";

const PostCard = (post) => {
  let p = post.post;
  const navigate = useNavigate();
  const likeBtn = useRef();
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const loggedState = useSelector((state) => state.logged);
  const u = useSelector((state) => state.users.user);
  // const likes = useSelector((state) => state.posts.postLikes);
  const dispatch = useDispatch();
  //STATE
  const [postImg, setPostImg] = useState(null);
  const [userState, setUserState] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [likes, setLikes] = useState([]);
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

  //GET POST LIKES
  const getLikes = async () => {
    try {
      const response = await fetch(API_POSTS + "/likes/" + p.id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + logged.auth,
        },
      });

      if (response.ok) {
        const postLikes = await response.json();
        setLikes(postLikes);
      } else {
        console.log("Errore nel caricare i like");
      }
    } catch (error) {
      console.log(error);
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
    getLikes();
    dispatch(putLike(p.id));

    if (likeBtn.current) {
      likes.includes(logged.id)
        ? likeBtn.current.classList.add("hoLike")
        : likeBtn.current.classList.remove("hoLike");
    }
  };

  // INIT FX
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
  // PRFOILE PIC FX
  useEffect(() => {
    if (userState != null) {
      let handleEffect = async () => {
        getProfilePic(userState.profileImg);
      };
      handleEffect();
    }
  }, [userState]);

  // LIKE BTNS IF LIKED FX
  useEffect(() => {
    if (likeBtn.current) {
      p.likes.includes(logged.id)
        ? likeBtn.current.classList.add("hoLike")
        : likeBtn.current.classList.remove("hoLike");
    }
  }, []);

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
                  ref={likeBtn}
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
