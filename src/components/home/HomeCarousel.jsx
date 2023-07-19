import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  return (
    <video autoplay muted className="bgvid">
      <source src="assets/vids/bgVid.mov" />
    </video>
    // <Carousel fade>
    //   <Carousel.Item interval={5000}>
    //     <img
    //       height={600}
    //       className="d-block w-100"
    //       src="assets/imgs/porchetta.jpg"
    //       alt="First slide"
    //     />

    //     <Carousel.Caption>
    //       <h3>First slide label</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={5000}>
    //     <img
    //       height={600}
    //       className="d-block w-100"
    //       src="assets/imgs/Ariccia.jpg"
    //       alt="Second slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>Second slide label</h3>
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={5000}>
    //     <img
    //       height={600}
    //       className="d-block w-100"
    //       src="assets/imgs/montePorzio.jpg"
    //       alt="Third slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
  );
}

export default HomeCarousel;
