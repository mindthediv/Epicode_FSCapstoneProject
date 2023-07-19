import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
const FeedForYou = () => {
  return (
    <Container fluid>
      <h2>CONSIGLIATI PER TE</h2>
      <Row>
        {/* mobile da progettare */}
        <Col className="postCol" xs={12} md={4} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={4} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={4} lg={3}>
          <PostCard />
        </Col>
        <Col className="postCol" xs={12} md={4} lg={3}>
          <PostCard />
        </Col>
      </Row>
    </Container>
  );
};

export default FeedForYou;
