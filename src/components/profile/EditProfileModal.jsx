import { Button, Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ProfilePicModal from "./ProfilePicModal";

const EditProfileModal = () => {
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const closeProfilePic = () => setShowProfilePic(false);
  const handleshowProfilePic = () => setShowProfilePic(true);

  return (
    <Container className="d-flex justify-content-center align-items-center p-3">
      <Row>
        <Col>
          {/* MODAL PROFILE PIC */}
          <Button onClick={handleshowProfilePic} className="p-2">
            Cambia l'immagine profilo
          </Button>

          <Modal show={showProfilePic} onHide={closeProfilePic} centered>
            <Modal.Header closeButton>
              <Modal.Title>Immagine Profilo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProfilePicModal />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfileModal;
