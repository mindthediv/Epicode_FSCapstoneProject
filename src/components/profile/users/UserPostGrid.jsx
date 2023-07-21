import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../feed/PostCard";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PostMaker from "../../feed/PostMaker";
import { getUserPosts } from "../../../redux/actions/postActions";

const UserPostGrid = ({ user }) => {
  // REDUX
  const userPosts = useSelector((state) => state.posts.userPosts);
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();

  // Ottiene i post dell'utente (il BE sarà da modificare con tabelle relazionate)
  useEffect(() => {
    if (logged.auth) {
      dispatch(getUserPosts(user.userId));
    }
  }, []);

  return (
    <Container fluid>
      <Row className="d-flex row-cols-3">
        {userPosts[0] ? (
          userPosts.map((el, i) => (
            <Col xs={12} lg={4}>
              <PostCard key={el.id} post={el} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="d-flex flex-column align-items-center">
            <h4 className="text-center mt-4 noPost w-50 m-auto">
              Questo utente non ha pubblicato post.
            </h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default UserPostGrid;
