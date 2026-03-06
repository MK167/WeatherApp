import { Col, Container, Row } from "react-bootstrap";
import ComplexForm from "./Form/ComplexForm";
import LoginForm from "./Form/LoginForm";
import RegisterationForm from "./Form/RegisterationForm";
function BasicForm() {
  return (
    <Container fluid className="mt-5">
      <h3 className="mb-4 justify-content-center text-center strong">
        Basic Forms with React Hook Form and Zod Validation
      </h3>
      <Row md={12}>
        <Col md={6}>
          <RegisterationForm />
        </Col>

        <Col md={6}>
          <LoginForm />
        </Col>
      </Row>

      <hr className="my-5" />

      <h3 className="mb-4 text-center">
        Complex Form — FormArray &amp; Nested FormGroup
      </h3>
      <Row>
        <Col md={12}>
          <ComplexForm />
        </Col>
      </Row>
    </Container>
  );
}

export default BasicForm;
