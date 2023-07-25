import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { API_UPLOADS } from "../feed/PostMaker";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditProfileModal from "./EditProfileModal";
import ProfileBioModal from "./ProfileBioModal";

const ProfileHead = ({ user, profileImg, bio }) => {
  // REDUX
  const logged = useSelector((state) => state.logged.loggedUser);
  const isLogged = useSelector((state) => state.logged.isLogged);
  // MODALI
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);
  const [masterModal2, setMasterModal2] = useState(false);
  const handleMasterModal2 = () => setMasterModal2(true);
  const closeMasterModal2 = () => setMasterModal2(false);

  useEffect(() => {});

  return (
    <div className="profileHead">
      {user && (
        <div className="d-flex banner p-4">
          {/* FOTO PROFILO ? URL FP : FP PLACEHOLDER */}
          {profileImg ? (
            <div
              className="profileImg me-4"
              style={{
                backgroundImage: "url(" + URL.createObjectURL(profileImg) + ")",
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
                  <h2>{user.username}</h2>

                  <h5>{user.firstName + " " + user.lastName}</h5>

                  {/* <span className="d-block">
                    <i className="fas fa-map-marker-alt me-2"></i>LUOGO
                  </span> */}
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
              </div>
            </div>
            {bio ? (
              <>
                <p>{bio}</p>
              </>
            ) : (
              <div className="d-flex flex-column align-items-center my-gbg p-1 rounded">
                <p>Aggiungi una bio...</p>
                <Button
                  variant="primary p-2 py-1 "
                  onClick={handleMasterModal2}
                >
                  +
                </Button>
                <Modal show={masterModal2} onHide={closeMasterModal2} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>MODIFICA BIO</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ProfileBioModal />
                  </Modal.Body>
                </Modal>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHead;
