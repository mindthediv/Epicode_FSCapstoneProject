import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const FeedContacts = () => {
  const allPosts = useSelector((state) => state.posts.allPosts);

  return (
    <Container fluid>
      <h2>I TUOI CONTATTI</h2>
      <Row className="w-100 ">
        {/* mobile da progettare */}

        {allPosts.length > 0 ? (
          allPosts.map((el, i) => (
            <Col className="postCol" xs={12} md={4} lg={3}>
              <PostCard key={el + i} post={el} />
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center my-4">
            <Spinner></Spinner>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default FeedContacts;
