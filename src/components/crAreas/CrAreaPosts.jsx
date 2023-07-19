import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../feed/PostCard";
import { useEffect } from "react";
import { getLoggedPosts } from "../../redux/actions/postActions";

const CrAreaPosts = () => {
  const loggedPosts = useSelector((state) => state.posts.loggedPosts);
  const logged = useSelector((state) => state.logged.loggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedPosts(logged.id));
  }, []);

  return (
    <div className="profileGridPost">
      <Container fluid>
        <Row className="d-flex row-cols-3">
          {/* mobile da progettare */}

          {loggedPosts[0] ? (
            loggedPosts.map((el, i) => (
              <Col className="postCol" xs={12} md={4}>
                <PostCard key={el.id + i} post={el} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="d-flex flex-column align-items-center">
              <h4 className="text-center mt-4 noPost w-50 m-auto">
                Non hai ancora pubblicato post, inizia!
              </h4>
              <Button className="px-4">+</Button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default CrAreaPosts;
