import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { API_UPLOADS } from "../feed/PostMaker";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditProfileModal from "./EditProfileModal";

const ProfileHead = () => {
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  // STATE
  const [pImg, setPImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  // MODALI
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);
  // FETCH PER FOTO PROFILO
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

  useEffect(() => {
    const handleEffect = async () => {
      if (logged) {
        getProfilePic();
        // getBackgroundPic();
      }
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
          >
            <Button className="btnProfileConf" onClick={handleMasterModal}>
              <i className="fa fa-pencil"></i>
            </Button>
            <Modal show={masterModal} onHide={closeMasterModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>MODIFICA PROFILO</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProfileModal />
              </Modal.Body>
            </Modal>
          </div>
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
          >
            <Button className="btnProfileConf" onClick={handleMasterModal}>
              <i className="fa fa-pencil"></i>
            </Button>
            <Modal
              show={masterModal}
              onHide={closeMasterModal}
              centered
              className="d-flex justify-content-center align-items-center"
            >
              <Modal.Header closeButton>
                <Modal.Title>MODIFICA PROFILO</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProfileModal />
              </Modal.Body>
            </Modal>
          </div>
        )}

        <div className="infoBox w-100">
          <div className="textBox">
            <div className="upText ">
              <div className="text-center mb-3">
                {isLogged && <h2>{logged.username}</h2>}
                {isLogged && (
                  <h5>{logged.firstName + " " + logged.lastName}</h5>
                )}
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

export default ProfileHead;
