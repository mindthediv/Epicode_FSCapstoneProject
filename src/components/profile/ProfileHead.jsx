import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_UPLOADS } from "../feed/PostMaker";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ProfileSettings from "./ProfileSettings";
import ProfilePicsModal from "./ProfilePicsModal";
import BackgroundPicModal from "./BackgroundPicModal";

const ProfileHead = (userImg) => {
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  const [pImg, setPImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const navigate = useNavigate();
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);

  const getProfilePic = async () => {
    try {
      const response = await fetch(
        API_UPLOADS + "/profile/" + logged.profileImg,
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
  const getBackgroundPic = async () => {
    try {
      const response = await fetch(
        API_UPLOADS + "/background/" + logged.backgroundImg,
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
        setBackImg(blob);
        console.log(blob);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (logged.auth) {
      const thunk = async () => {
        getProfilePic();
        getBackgroundPic();
      };
      thunk();
    }
  }, []);

  return (
    <div className="profileHead">
      {backImg != null ? (
        <div
          style={{
            backgroundImage: "url(" + URL.createObjectURL(backImg) + ")",
            height: 300 + "px",
          }}
          className="w-100 profileBanner"
        ></div>
      ) : (
        <div
          style={{
            backgroundImage: "url('assets/imgs/placeholders/artCover.jpg')",
            height: 300 + "px",
          }}
          className="w-100 profileBanner"
        ></div>
      )}

      <div className="d-flex underBanner">
        <div className="imgBox">
          {pImg != null ? (
            <div
              className="profileImg "
              style={{
                backgroundImage: "url(" + URL.createObjectURL(pImg) + ")",
                height: 300 + "px",
                width: 300 + "px",
              }}
            >
              {/* MASTER MODAL ********************************** */}
              <Button className="btnProfileConf" onClick={handleMasterModal}>
                <i className="fa fa-pencil"></i>
              </Button>
              <Modal
                show={masterModal}
                onHide={closeMasterModal}
                centered
                className="masterModal"
              >
                {" "}
                <Modal.Header closeButton>
                  <Modal.Title>MODIFICA PROFILO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ProfilePicsModal />
                </Modal.Body>
              </Modal>
            </div>
          ) : (
            <div
              className="profileImg "
              style={{
                backgroundImage:
                  "url('assets/imgs/placeholders/userPlaceholder.png')",
                height: 300 + "px",
                width: 300 + "px",
                border: "none",
              }}
            >
              {/* MASTER MODAL ********************************** */}

              <Button className="btnProfileConf" onClick={handleMasterModal}>
                <i className="fa fa-pencil"></i>
              </Button>
              <Modal
                show={masterModal}
                onHide={closeMasterModal}
                centered
                className="masterModal"
              >
                {" "}
                <Modal.Header closeButton>
                  <Modal.Title>MODIFICA PROFILO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ProfilePicsModal />
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>

        <div className="d-flex infoBox flex-column justify-content-between">
          <div className="textBox">
            <div className="d-flex justify-content-between">
              <div>
                {isLogged && <h2>{logged.username}</h2>}
                {isLogged && (
                  <h5>{logged.firstName + " " + logged.lastName}</h5>
                )}
                <span className="d-block">
                  <i className="fas fa-map-marker-alt me-2"></i>LUOGO
                </span>
              </div>
              <div className="profileBtnLine d-flex me-5 p-2">
                <Button variant="p-2 m-2">
                  <i className="fa fa-user-plus fs-1"></i>
                </Button>
                <Button variant="p-2 m-2">
                  <i className="fa fa-comment fs-1"></i>
                </Button>
                <Button variant="p-2 m-2">
                  <i className="fa fa-ellipsis-h fs-1"></i>
                </Button>
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
    </div>
  );
};

export default ProfileHead;
