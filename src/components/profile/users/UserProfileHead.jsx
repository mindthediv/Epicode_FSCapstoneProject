import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_UPLOADS } from "../../feed/PostMaker";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditProfileModal from "../EditProfileModal";
import { API_USERS, putFollow } from "../../../redux/actions/usersActions";

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
      } else {
        console.log("Errore nel caricare i follower");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // LIKES HANDLER
  const hFollow = async () => {
    getFollower();
    dispatch(putFollow(user.userId));
    if (followBtn.current) {
      follower.includes(logged.id)
        ? followBtn.current.classList.add("hoLike")
        : followBtn.current.classList.remove("hoLike");
    }
  };

  useEffect(() => {
    const handleEffect = async () => {
      getProfilePic();
    };
    handleEffect();
  }, []);

  const followBtn = useRef();
  // FOLLOW  FX
  useEffect(() => {
    if (followBtn.current) {
      follower.includes(logged.id)
        ? followBtn.current.classList.add("hoLike")
        : followBtn.current.classList.remove("hoLike");
    }
  }, []);

  return (
    <div className="profileHead">
      <div className="d-flex banner p-4">
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
          <div className="textBox">
            <div className="upText ">
              <div className="text-center mb-3">
                {user && <h2>{user.username}</h2>}
                {user && <h5>{user.firstName + " " + user.lastName}</h5>}
                <span className="d-block">
                  <i className="fas fa-map-marker-alt me-2"></i>LUOGO
                </span>
              </div>
              <div>
                {logged.follower != null ? (
                  <span className="text-muted small">
                    follower: {user.follower.length}{" "}
                  </span>
                ) : (
                  <span className="text-muted small">follower: 0 </span>
                )}
                {logged.followed != null ? (
                  <span className="text-muted small">
                    followed: {user.followed.length}{" "}
                  </span>
                ) : (
                  <span className="text-muted small">followed: 0 </span>
                )}
              </div>
              <div className="profileBtnLine d-flex me-5 justify-content-evenly ">
                <span
                  className="btnInter interLike "
                  ref={followBtn}
                  onClick={() => hFollow()}
                >
                  <i className="fa fa-user-plus"></i>
                </span>
                <span className=" btnInter interComment">
                  <i className="fa fa-comment "></i>
                </span>
                <span className="btnInter interSave">
                  <i className="fa fa-ellipsis-h "></i>
                </span>
              </div>
            </div>
          </div>
          <p>
            BIO: Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusamus voluptates eveniet, iure reprehenderit possimus rerum
            exercitationem numquam provident officia sit commodi odit libero
            amet officiis sunt corporis tenetur nobis doloribus?
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHead;
