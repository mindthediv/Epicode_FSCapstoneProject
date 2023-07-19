import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_USERS } from "../../redux/actions/usersActions";
import { useEffect, useState } from "react";
import { API_UPLOADS } from "./PostMaker";
import { CACHE_USER } from "../../redux/actions/usersActions";
import { Button, Form } from "react-bootstrap";

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
    <div className="postCard w-100">
      {imgState != null && (
        <div className="postContent">
          {/* Se si è sul profilo personale non renderizza le userInfo del post */}
          {window.location.pathname == "/me" ? (
            <></>
          ) : (
            // USERINFO
            <div className="d-flex userInfo align-items-center w-100 pb-1">
              {/* foto profilo ? url fp : fp placeholder  */}
              {pImg != null ? (
                <div>
                  <img
                    className="miniUserImg rounded-circle p-1"
                    src={URL.createObjectURL(pImg)}
                  />
                </div>
              ) : (
                <div>
                  <img
                    className="miniUserImg rounded-circle p-1"
                    src="assets/imgs/placeHolders/userPlaceholder.png"
                    alt="Person-placeholder"
                  />
                </div>
              )}
              {/* waiter */}
              {p && userState != null && (
                <div>
                  <div className="miniInfo">
                    <Link to={"/users/" + p.userId}>
                      <span className="d-block">{userState.username}</span>
                    </Link>
                    <span className="smallTxt">
                      <i className="far fa-clock me-2"></i>
                      {p.date}
                    </span>
                    <br />
                    <span className="smallTxt">
                      <i className="fas fa-map-marker-alt me-2"></i>LOCATION
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* IMMAGINE */}
          <div
            className="postImgWrapper"
            style={{
              backgroundImage: "url(" + URL.createObjectURL(imgState) + ")",
            }}
          ></div>
          {/* TESTO */}
          {p && (
            <div className="postText">
              <p className="">{p.text}</p>
            </div>
          )}
        </div>
      )}

      {/* INTERACTION BTN */}
      {window.location.pathname == "/me" ? (
        <></>
      ) : (
        <div className="btnPost ">
          <Form className="w-100 d-flex justify-content-between">
            <Button className="btnInter interLike ">
              <i className="fa fa-thumbs-up "></i>
            </Button>
            <Form.Group className="w-100" controlId="postComment">
              <Form.Control
                as="textarea"
                rows={2}
                className="postCommentArea"
                placeholder="Commenta..."
              />
            </Form.Group>
            <Button type="submit" className="btnInter interComment">
              <i className="fa fa-comments "></i>
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
