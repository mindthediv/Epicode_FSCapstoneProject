import { Button, Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ProfilePicModal from "./ProfilePicModal";
import BackgroundPicModal from "./BackgroundPicModal";

const EditProfileModal = () => {
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const closeProfilePic = () => setShowProfilePic(false);
  const closeBackground = () => setShowBackground(false);
  const handleshowProfilePic = () => setShowProfilePic(true);
  const handleBackground = () => setShowBackground(true);

  return (
    <Container>
      <Row>
        <Col>
          {/* MODAL PROFILE PIC */}
          <Button className="btnProfileConf" onClick={handleshowProfilePic}>
            Cambia l'immagine profilo
          </Button>

          <Modal
            show={showProfilePic}
            onHide={closeProfilePic}
            centered
            className="d-flex justify-content-center align-self-center"
          >
            <Modal.Header closeButton>
              <Modal.Title>Immagine Profilo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProfilePicModal />
            </Modal.Body>
          </Modal>
          {/* fine modal profilePic */}
        </Col>
      </Row>
      {/* MODAL BACKGROUND */}
      <Row>
        <Col>
          <Button className="btnProfileConf" onClick={handleBackground}>
            Cambia Background
          </Button>

          <Modal
            show={showBackground}
            onHide={closeBackground}
            centered
            className="d-flex justify-content-center align-self-center"
          >
            <Modal.Header closeButton>
              <Modal.Title>Background</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BackgroundPicModal />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfileModal;
