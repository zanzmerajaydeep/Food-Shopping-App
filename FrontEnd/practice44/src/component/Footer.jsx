import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Col, Container, Row } from 'reactstrap'

export const Footer = () => {
  return (
    <div className="footer">
      <footer className="footer">
      <div className="footer-content-center">
        <Container>
            <Row>
          <Col xs={12} md={6}>
            <h5>Notifier.com</h5>
          </Col>
       
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center justify-content-md-end"
          >
            <a>
              <FaGithub className="mr-3" size={30} />
            </a>
            <a>
              <FaLinkedin className="mr-3" size={30} />
            </a>
            <a>
              <FaEnvelope size={30} />
            </a>
          </Col>
          </Row>
        </Container>
      </div>
    </footer>
  </div>
  )
}
