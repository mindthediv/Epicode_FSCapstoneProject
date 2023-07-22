import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { API_UPLOADS } from "../../feed/PostMaker";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditProfileModal from "../EditProfileModal";

const UserProfileHead = ({ user }) => {
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  // STATE
  const [pImg, setPImg] = useState(null);
  // MODAL
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);
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

  useEffect(() => {
    const handleEffect = async () => {
      getProfilePic();
    };
    handleEffect();
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
              <div className="profileBtnLine d-flex me-5 justify-content-evenly ">
                <span className="m-auto">
                  <i className="fa fa-user-plus "></i>
                </span>
                <span className="m-auto">
                  <i className="fa fa-comment "></i>
                </span>
                <span className="m-auto">
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
