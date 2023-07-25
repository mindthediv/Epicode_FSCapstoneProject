import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import FeedGrid from "./FeedGrid";
import NavUI from "../navbar/NavUI";

const FeedPage = () => {
  //REDUX
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <Container fluid id="feedPage">
      {/* I TUOI CONTATTI  */}
      <Row className=" justify-content-center">
        <Col>
          <FeedGrid />
        </Col>
      </Row>
      <Row className=" justify-content-center">
        <Col>
          <NavUI />
        </Col>
      </Row>
    </Container>
  );
};

export default FeedPage;
