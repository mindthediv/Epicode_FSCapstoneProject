import { Button, Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ProfileBioModal from "./ProfileBioModal";
import ProfilePicModal from "./ProfilePicModal";
import DeleteProfileModal from "./DeleteProfileModal";

const EditProfileModal = () => {
  const [showModal1, setShowModal1] = useState(false);
  const closeModal1 = () => setShowModal1(false);
  const handleshowModal1 = () => setShowModal1(true);
  const [showModal2, setShowModal2] = useState(false);
  const closeModal2 = () => setShowModal2(false);
  const handleshowModal2 = () => setShowModal2(true);
  const [showModal3, setShowModal3] = useState(false);
  const closeModal3 = () => setShowModal3(false);
  const handleshowModal3 = () => setShowModal3(true);

  return (
    <Container className="d-flex flex-column  justify-content-center align-items-center p-3">
      <Row>
        <Col>
          {/* MODAL PROFILE PIC */}
          <Button onClick={handleshowModal1} className="p-2 mb-3">
            Cambia l'immagine profilo
          </Button>

          <Modal show={showModal1} onHide={closeModal1} centered>
            <Modal.Header closeButton>
              <Modal.Title>Immagine Profilo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProfilePicModal />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* MODAL PROFILE PIC */}
          <Button onClick={handleshowModal2} className="p-2 mb-3">
            Cambia la Bio
          </Button>

          <Modal show={showModal2} onHide={closeModal2} centered>
            <Modal.Header closeButton>
              <Modal.Title>Bio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProfileBioModal />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* MODAL PROFILE PIC */}
          <Button variant="danger" onClick={handleshowModal3} className="p-2">
            Elimina Profilo
          </Button>

          <Modal show={showModal3} onHide={closeModal3} centered>
            <Modal.Header closeButton>
              <Modal.Title>Eliminare il profilo?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteProfileModal />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfileModal;
