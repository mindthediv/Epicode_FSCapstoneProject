import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../feed/PostCard";
import { useEffect, useState } from "react";
import { getLoggedPosts } from "../../redux/actions/postActions";
import Modal from "react-bootstrap/Modal";
import PostMaker from "../feed/PostMaker";

const ProfilePostGrid = ({ user }) => {
  // REDUX
  const loggedPosts = useSelector((state) => state.posts.loggedPosts);
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();
  // MODAL
  const [masterModal, setMasterModal] = useState(false);
  const handleMasterModal = () => setMasterModal(true);
  const closeMasterModal = () => setMasterModal(false);

  useEffect(() => {
    if (user) {
      dispatch(getLoggedPosts(user.id));
    }
  }, [user]);
  useEffect(() => {}, [loggedPosts]);

  return (
    <Container fluid>
      <Row className="d-flex row-cols-3">
        {loggedPosts.length > 0 ? (
          loggedPosts.map((el, i) => (
            <Col xs={12} lg={4} className="px-1 ">
              <PostCard key={el.id} post={el} className="profilePost" />
            </Col>
          ))
        ) : (
          <Col xs={12} className="d-flex flex-column align-items-center">
            <h4 className="text-center mt-4 noPost w-50 m-auto">
              Non hai ancora pubblicato post, inizia!
            </h4>
            <Button className="px-4" onClick={handleMasterModal}>
              +
            </Button>
            <Modal
              show={masterModal}
              onHide={closeMasterModal}
              centered
              className="masterModal"
            >
              <Modal.Header closeButton>
                <Modal.Title>CREA UN POST</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PostMaker />
              </Modal.Body>
            </Modal>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default ProfilePostGrid;
