import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_UPLOADS } from "../../feed/PostMaker";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditProfileModal from "../EditProfileModal";
import { API_USERS, putFollow } from "../../../redux/actions/usersActions";
import { getLogged } from "../../../redux/actions/loggedActions";

const UserProfileHead = ({ user }) => {
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  const dispatch = useDispatch();
  // STATE
  const [pImg, setPImg] = useState(null);
  const [follower, setFollower] = useState([]);
  // FETCH PER FOTO PROFILO
  const getProfilePic = async () => {
    try {
      const response = await fetch(
        API_UPLOADS + "/profile/" + user.profileImg,
        {
          method: "GET",
          headers: {
            "Content-Type": "blob",
            Authorization: "Bearer " + logged.auth,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        setPImg(blob);
        console.log(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //GET Follower
  const getFollower = async () => {
    try {
      const response = await fetch(API_USERS + "/follow/" + user.userId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + logged.auth,
        },
      });

      if (response.ok) {
        const follow = await response.json();
        setFollower(follow);
        return follow;
      } else {
        console.log("Errore nel caricare i follower");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE FOLLOW
  const hFollow = async () => {
    if (user.userId) {
      dispatch(putFollow(user.userId));
      if (follower.includes(logged.id)) {
        setFollower(user.follower.filter((id) => id !== logged.id));
      } else {
        setFollower([logged.id, ...user.follower]);
      }
    }
    if (followBtn.current) {
      follower.includes(logged.id)
        ? followBtn.current.classList.add("hoLike")
        : followBtn.current.classList.remove("hoLike");
    }
  };

  // FOLLOW FX
  useEffect(() => {
    const hfx = async () => {
      if (followBtn.current) {
        follower.includes(logged.id)
          ? followBtn.current.classList.add("hoLike")
          : followBtn.current.classList.remove("hoLike");
      }
    };
    hfx();
  }, [follower]);

  // INIT FX
  useEffect(() => {
    const handleEffect = async () => {
      getProfilePic();
      if (user.follower) {
        setFollower(user.follower);
      }
    };
    handleEffect();
  }, []);

  const followBtn = useRef();

  return (
    <div className="profileHead">
      <div className="d-flex banner justify-content-center p-4">
        {/* FOTO PROFILO ? URL FP : FP PLACEHOLDER */}
        {pImg != null ? (
          <div
            className="profileImg me-4"
            style={{
              backgroundImage: "url(" + URL.createObjectURL(pImg) + ")",
              height: 300 + "px",
              width: 300 + "px",
            }}
          ></div>
        ) : (
          <div
            className="profileImg me-4 "
            style={{
              backgroundImage:
                "url('assets/imgs/placeholders/userPlaceholder.png')",
              height: 300 + "px",
              width: 300 + "px",
              border: "none",
            }}
          ></div>
        )}

        <div className="infoBox w-100">
          <div className="px-3 py-4 upText">
            <div className="text-center mb-3">
              {user && <h2>{user.username}</h2>}
              {user && <h5>{user.firstName + " " + user.lastName}</h5>}
              {/* <span className="d-block">
                  <i className="fas fa-map-marker-alt me-2"></i>LUOGO
                </span> */}
            </div>
            <div>
              {user.follower != null ? (
                <span className="text-muted small">
                  follower: {follower.length}{" "}
                </span>
              ) : (
                <span className="text-muted small">follower: 0 </span>
              )}
              {user.followed != null ? (
                <span className="text-muted small">
                  followed: {user.followed.length}{" "}
                </span>
              ) : (
                <span className="text-muted small">followed: 0 </span>
              )}
            </div>
            {user.userId == logged.id ? (
              <></>
            ) : (
              <div className=" d-flex justify-content-evenly ">
                <span
                  className="btnInter interLike "
                  ref={followBtn}
                  onClick={() => hFollow()}
                >
                  <i
                    className={
                      follower.includes(logged.id)
                        ? "fa fa-user-plus hoLike"
                        : "fa fa-user-plus"
                    }
                  ></i>
                </span>
                <span className=" btnInter interComment">
                  <i className="fa fa-comment "></i>
                </span>
                <span className="btnInter interSave">
                  <i className="fa fa-ellipsis-h "></i>
                </span>
              </div>
            )}
          </div>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfileHead;
