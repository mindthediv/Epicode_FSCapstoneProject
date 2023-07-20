import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const FeedGrid = () => {
  const allPosts = useSelector((state) => state.posts.allPosts);

  return (
    <Container fluid id="feedGrid">
      <Row className="w-100 justify-content-column">
        {allPosts.length > 0 ? (
          allPosts.map((el, i) => (
            <Col xs={12} md={12} lg={3}>
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

export default FeedGrid;
