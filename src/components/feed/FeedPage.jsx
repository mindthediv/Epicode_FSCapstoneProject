import { Container, Row, Col } from "react-bootstrap";
import FeedContacts from "./FeedContacts";
import FeedCrAreas from "./FeedCrAreas";
import FeedForYou from "./FeedForYou";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import PostMaker from "./PostMaker";

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div id="feedPage">
      <Container fluid>
        {/* I TUOI CONTATTI  */}
        <Row>
          <Col xs={12} className="feedContacts">
            <FeedContacts />
          </Col>
        </Row>
        {/* AREE CR */}
        <Row>
          <Col xs={12} className="feedCrAreas">
            <FeedCrAreas />
          </Col>
        </Row>
        {/* PER TE */}
        <Row>
          <Col xs={12} className="feedForYou">
            <FeedForYou />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeedPage;
