import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";

const FeedCrAreas = () => {
  return (
    <Container fluid>
      <h2>AREE CR</h2>
      <Row>
        {/* mobile da progettare */}
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={3} lg={3}>
          <PostCard />
        </Col>
      </Row>
    </Container>
  );
};

export default FeedCrAreas;
