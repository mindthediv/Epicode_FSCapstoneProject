import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import FeedGrid from "./FeedGrid";

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <Container fluid id="feedPage">
      {/* I TUOI CONTATTI  */}
      <Row>
        <Col>
          <FeedGrid />
        </Col>
      </Row>
    </Container>
  );
};

export default FeedPage;
