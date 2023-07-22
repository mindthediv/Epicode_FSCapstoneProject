import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CACHE_USER } from "../../redux/actions/usersActions";
import { cacheUser } from "../../redux/actions/usersActions";
import { API_USERS } from "../../redux/actions/usersActions";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { API_UPLOADS } from "../feed/PostMaker";

const UserLabel = ({ user }) => {
  const navigate = useNavigate();
  //REDUX
  const logged = useSelector((state) => state.logged);
  const dispatch = useDispatch();
  //STATE
  const [profileImg, setProfileImg] = useState(null);

  // OTTIENE LO USER DEL POST VIA PROPS user.userId
  const getUserViaProp = async () => {
    try {
      let resp = await fetch(API_USERS + "/" + user.userId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + logged.loggedUser.auth,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (resp.ok) {
        let u = await resp.json();
        dispatch({
          type: CACHE_USER,
          payload: u,
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
  const getProfilePic = async () => {
    try {
      const response = await fetch(
        API_UPLOADS + "/profile/" + user.profileImg,
        {
          method: "GET",
          headers: {
            "Content-Type": "blob",
            Authorization: "Bearer " + logged.loggedUser.auth,
          },
        }
      );
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
    let u = await getUserViaProp(user.userId);
    dispatch(cacheUser(u));
    navigate("/users/" + user.userId);
  };

  useEffect(() => {
    const hFx = async () => {
      getProfilePic();
    };
    hFx();
  }, []);

  return (
    <div className="p-3 rounded my-wbg border border-secondary mb-2 d-flex align-items-center justify-content-between">
      <div className="d-flex" onClick={() => userLink()}>
        {profileImg != null ? (
          <div
            className="me-2"
            style={{
              backgroundImage: "url('" + URL.createObjectURL(profileImg) + "')",
              height: 48 + "px",
              width: 48 + "px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: 50 + "%",
            }}
          ></div>
        ) : (
          <div
            className="me-2 d-flex justify-content-center align-items-center"
            style={{
              height: 48 + "px",
              width: 48 + "px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: 50 + "%",
            }}
          >
            <Spinner></Spinner>
          </div>
        )}
        <div className="userInfo">
          <span>{user.username}</span>
          <br />
          <span>{user.firstName + " " + user.lastName}</span>
        </div>
      </div>
      <div>
        <span className="btnInter interLike ">
          <i className="fa fa-user-plus"></i>
        </span>
      </div>
    </div>
  );
};
export default UserLabel;
