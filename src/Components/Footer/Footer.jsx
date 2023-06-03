import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#E8E9EB", padding: "50px 0" }}>
            <div style={{ backgroundColor: "#3F4E29", padding: "10px" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h5 style={{ color: "white" }}>
                                    Get connected with us on social media networks:
                                </h5>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <a href="https://github.com/KaptenenK/RecipeRescue" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} size="2x" className="mr-10" style={{ color: "white" }} />
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" className="mr-10" style={{ color: "white" }} />
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faTwitter} size="2x" className="mr-10" style={{ color: "white" }} />
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" className="mr-10" style={{ color: "white" }} />
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} size="2x" className="mr-10" style={{ color: "white" }} />
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                        <h5>Om oss</h5>
                        <a style={{color:"black"}} href="/AboutUs"><p>Grupp 8</p> </a>
                        <a style={{color:"black"}} href="https://www.iths.se/om-oss/" target="_blank"><p>ITHS</p> </a>
                        <p>Recipe Rescue</p>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                        <h5>Bra länkar</h5>
                        <p><a style={{color:"black"}} href="https://www.youtube.com/watch?v=SB-qEYVdvXA">Länk 1</a></p>
                        <p><a style={{color:"black"}} href="https://www.youtube.com/watch?v=6UVEVSz4Zsg">Länk 2</a></p>
                        <p><a style={{color:"black"}} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Länk 3</a></p>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                        <h5>Contact</h5>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" style={{ verticalAlign: "middle", marginRight: "10px" }} />
                            <p style={{ verticalAlign: "middle", marginTop: "15px" }}>Address: Där det händer</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ verticalAlign: "middle", marginRight: "10px" }} />
                            <p style={{ verticalAlign: "middle", marginTop: "15px" }}>Email: Houssein.Khodr@iths.se</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faPhone} size="lg" style={{ verticalAlign: "middle", marginRight: "10px" }} />
                            <p style={{ verticalAlign: "middle", marginTop: "15px" }}>Phone: +46(0)73 654 543 32</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;