import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_USERS, cacheUser } from "../../redux/actions/usersActions";
import { useEffect, useState } from "react";
import { API_UPLOADS } from "./PostMaker";
import { CACHE_USER } from "../../redux/actions/usersActions";
import { Button, Form } from "react-bootstrap";

const PostCard = (post) => {
  const isLogged = useSelector((state) => state.logged.isLogged);
  const logged = useSelector((state) => state.logged.loggedUser);
  const auth = useSelector((state) => state.logged.loggedUser.auth);
  const u = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  let p = post.post;
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

  //GET DELLO USERID
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
        alert("Si è verificato un errore: fetchFailed");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        alert("Si è verificato un errore: fetchFailed");
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

  let fileURL;
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
  }, [window.location]);

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
          {window.location.pathname == "/me" ? (
            <></>
          ) : (
            <div className="d-flex userInfo align-items-center w-100 pb-1">
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
                    alt="Person-placeholder - Person Placeholder@pngkey.com"
                  />
                </div>
              )}
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
          <div
            className="postImgWrapper"
            style={{
              backgroundImage: "url(" + URL.createObjectURL(imgState) + ")",
            }}
          ></div>

          {p && (
            <div className="postText">
              <p className="">{p.text}</p>
            </div>
          )}
        </div>
      )}
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
                // onChange={(e) =>
                //   setComment({
                //     text: e.target.value,
                //     file: postState.file,
                //     userId: postState.userId,
                //   })
                // }
              />
            </Form.Group>
            <Button type="submit" className="btnInter interComment">
              <i className="fa fa-comments "></i>
            </Button>
          </Form>
          {/* <Button className="btnInter interMenu">
          <i className="fa fa-ellipsis-h "></i>
        </Button> */}
        </div>
      )}
    </div>
  );
};

export default PostCard;
