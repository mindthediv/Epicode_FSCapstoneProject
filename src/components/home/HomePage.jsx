import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeSec from "./HomeSec";
import HomeJumbo from "./HomeJumbo";
import HomeCrAreas from "./HomeCrAreas";
import HomePacks from "./HomePacks";

const Home = () => {
  return (
    <div id="homePage" className="bgWrap rounded">
      <Container fluid className="btnLineGlass">
        <Row>
          <Col>
            <HomeJumbo />
          </Col>
        </Row>
        {/* <div className="d-flex justify-content-center w-100"> */}
        <Row>
          <Col className="homeSection discoverSection" xs={12} md={4} lg={4}>
            <HomeSec
              title="Scopri la bellezza"
              content="Esplora i luoghi, la cultura e le tradizoni delle meravigliose terre Castellane.
             Qui, come narrano le leggende, Enea stabilì la sua stirpe, il seme dell'impero Romano.
              Monte Cavo troneggia sul Vulcano Laziale, dove si incastonano due fiorenti specchi d'acqua:
               il lago di Nemi ed il lago di Castel Gandolfo. Dal fitto verde dell'altura  alle splendenti
                campagne litorali, borghi e paesi costellano la zona, sempre ricca di vita e coinvolgente.
                Festività, sagre, eventi, divertimento, cucina, relax ed avventura, un'esperienza tutta da scoprire!"
            />
          </Col>
          <Col className="homeSection communitySection" xs={12} md={4} lg={4}>
            <HomeSec
              title="Incontra la comunità"
              content="Coinvolgi e fatti coinvolgere. Accedi al sito ed entra a 
              far parte della comunità social di WeAreCr!
              Potrai condividere le tue esperienze di viaggio o far sapere a tutti le tue attività sul territorio. 
              Stai organizzando un evento? Ti basterà un post per invitare chi vuoi a partecipare!
              Resta aggiornato sulle novità della zona, crea nuovi contatti ed esplora ogni giorno ciò che stai cercando!"
            />
          </Col>
          <Col className="homeSection travelSection" xs={12} md={4} lg={4}>
            <HomeSec
              title="Crea il tuo viaggio"
              content="Che tu sia da solo o in compagnia, i Castelli Romani saranno sempre
               la meta che cerchi. Vuoi vivere la natura? Centinaia di percorsi ed escursioni ti aspettano! Panorami nascosti 
               possono essere trovati dietro ogni angolo, tanto tra le vie dei paesi, circondati dal viavai delle osterie e dei negozi, quanto
                nelle incontaminate aree boschive a nord-est.
                Troppe zanzare? Che ne dici allora di un romantico weekend con vista lago? Relax, benessere e deliziose gastronomie potrebbero 
                accompagnare il tuo soggiorno, perso nella bellezza dei borghi e dei monumenti che punteggiano tutta la zona. 
                Prenota il tuo viaggio, controlla le mappe ed i trasporti e regalati un'esperienza unica: sei a due passi da Roma e a due passi dal mare,
                 ma i Catelli hanno già tutto ciò che cerchi, meglio di così? 
                "
            />
          </Col>
        </Row>
        {/* </div> */}

        <Row className="justify-content-center mapRow">
          <Col xs={10} className="d-flex justify-content-center p-2">
            <iframe
              height="450"
              className="mapFrame d-block"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC6yXG1NCfl7Fgj3OXn398kipRRM75cz0U
              &q=Parco+Dei+Castelli+Romani,Rome+Italy
              &zoom=11
              &maptype=satellite"
              //  &center=41.747267,12.697881
            ></iframe>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} className="d-flex justify-content-center ">
            <HomeCrAreas />
          </Col>
        </Row>

        {/* <Row className="justify-content-center">
          <Col xs={12} className="d-flex justify-content-center ">
            <HomePacks />
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default Home;
