import {
  useForm,
  useFieldArray,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Row, Col, Card, Badge } from "react-bootstrap";
import type { Path } from "react-hook-form";
import {
  complexFormSchema,
  type ComplexFormInputs,
} from "../../validation/complexFormValidation";
import InputElement from "./InputElement";

// Cast helper: allows dynamic array index paths (e.g. `skills.0.name`)
// to satisfy the strict Path<T> type required by InputElement
const p = (path: string) => path as Path<ComplexFormInputs>;

function ComplexForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplexFormInputs>({
    resolver: zodResolver(complexFormSchema),
    mode: "onBlur",
    defaultValues: {
      skills: [{ name: "" }],
      workExperiences: [
        {
          company: "",
          position: "",
          startYear: "",
          isCurrent: false,
          endYear: "",
        },
      ],
    },
  });

  // ─── FormArray: simple controls (Angular: FormArray of FormControls) ─────────
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  // ─── FormArray: grouped controls (Angular: FormArray of FormGroups) ──────────
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "workExperiences" });

  // Watch isCurrent per experience to conditionally show/hide End Year field
  const watchedExperiences = useWatch({ control, name: "workExperiences" });

  const onSubmit: SubmitHandler<ComplexFormInputs> = (data) => {
    console.log("Complex Form Data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── Start Basic fields ─────────────────────────────────────────────────── */}
      <Row>
        <Col md={6}>
          <InputElement
            name="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            errors={errors.fullName?.message || ""}
            register={register}
          />
        </Col>
        <Col md={6}>
          <InputElement
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            errors={errors.email?.message || ""}
            register={register}
          />
        </Col>
      </Row>
      {/* ── End Basic fields ─────────────────────────────────────────────────── */}

      {/* ── Start Nested FormGroup: Address ─────────────────────────────────────── */}
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center gap-2">
          <strong>Address</strong>
          <Badge bg="info" className="fw-normal fs-6">
            Nested FormGroup
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              <InputElement
                name="address.street"
                label="Street"
                type="text"
                placeholder="123 Main St"
                errors={errors.address?.street?.message || ""}
                register={register}
              />
            </Col>
            <Col md={4}>
              <InputElement
                name="address.city"
                label="City"
                type="text"
                placeholder="New York"
                errors={errors.address?.city?.message || ""}
                register={register}
              />
            </Col>
            <Col md={4}>
              <InputElement
                name="address.state"
                label="State"
                type="text"
                placeholder="NY"
                errors={errors.address?.state?.message || ""}
                register={register}
              />
            </Col>
            <Col md={4}>
              <InputElement
                name="address.zipCode"
                label="Zip Code"
                type="text"
                placeholder="10001"
                errors={errors.address?.zipCode?.message || ""}
                register={register}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* ── End Nested FormGroup: Address ─────────────────────────────────────── */}

      {/* ── Start FormArray of controls: Skills ─────────────────────────────────── */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <strong>Skills</strong>
            <Badge bg="success" className="fw-normal fs-6">
              FormArray of Controls
            </Badge>
          </div>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => appendSkill({ name: "" })}
          >
            + Add Skill
          </Button>
        </Card.Header>
        <Card.Body>
          {(errors.skills as { message?: string })?.message && (
            <div className="text-danger small mb-2">
              {(errors.skills as { message?: string }).message}
            </div>
          )}
          {skillFields.map((field, index) => (
            <Row key={field.id} className="align-items-end">
              <Col>
                <InputElement
                  name={p(`skills.${index}.name`)}
                  label={`Skill ${index + 1}`}
                  type="text"
                  placeholder="e.g. React, TypeScript"
                  errors={errors.skills?.[index]?.name?.message || ""}
                  register={register}
                />
              </Col>
              {skillFields.length > 1 && (
                <Col xs="auto" className="mb-3">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeSkill(index)}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
          ))}
        </Card.Body>
      </Card>
      {/* ── End FormArray of controls: Skills ─────────────────────────────────── */}
      {/* ── Start FormArray of FormGroups: Work Experience ──────────────────────── */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <strong>Work Experience</strong>
            <Badge bg="warning" text="dark" className="fw-normal fs-6">
              FormArray of FormGroups
            </Badge>
          </div>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() =>
              appendExp({
                company: "",
                position: "",
                startYear: "",
                isCurrent: false,
                endYear: "",
              })
            }
          >
            + Add Experience
          </Button>
        </Card.Header>
        <Card.Body>
          {(errors.workExperiences as { message?: string })?.message && (
            <div className="text-danger small mb-2">
              {(errors.workExperiences as { message?: string }).message}
            </div>
          )}
          {expFields.map((field, index) => {
            const isCurrent = watchedExperiences?.[index]?.isCurrent;
            return (
              <Card key={field.id} className="mb-3 border-secondary">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                  <span className="fw-semibold">Experience #{index + 1}</span>
                  {expFields.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeExp(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <InputElement
                        name={p(`workExperiences.${index}.company`)}
                        label="Company"
                        type="text"
                        placeholder="Company name"
                        errors={
                          errors.workExperiences?.[index]?.company?.message ||
                          ""
                        }
                        register={register}
                      />
                    </Col>
                    <Col md={6}>
                      <InputElement
                        name={p(`workExperiences.${index}.position`)}
                        label="Position"
                        type="text"
                        placeholder="Job title"
                        errors={
                          errors.workExperiences?.[index]?.position?.message ||
                          ""
                        }
                        register={register}
                      />
                    </Col>
                    <Col md={6}>
                      <InputElement
                        name={p(`workExperiences.${index}.startYear`)}
                        label="Start Year"
                        type="text"
                        placeholder="e.g. 2020"
                        errors={
                          errors.workExperiences?.[index]?.startYear?.message ||
                          ""
                        }
                        register={register}
                      />
                    </Col>
                    <Col md={6} className="d-flex align-items-center mt-2">
                      <InputElement
                        name={p(`workExperiences.${index}.isCurrent`)}
                        label="Currently Working Here"
                        type="checkbox"
                        errors=""
                        register={register}
                      />
                    </Col>
                    {/* Conditionally rendered End Year — only when not current */}
                    {!isCurrent && (
                      <Col md={6}>
                        <InputElement
                          name={p(`workExperiences.${index}.endYear`)}
                          label="End Year"
                          type="text"
                          placeholder="e.g. 2023"
                          errors={
                            errors.workExperiences?.[index]?.endYear?.message ||
                            ""
                          }
                          register={register}
                        />
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Card.Body>
      </Card>
      {/* ── End FormArray of FormGroups: Work Experience ──────────────────────── */}

      <Button variant="primary" type="submit" className="mb-4">
        Submit
      </Button>
    </Form>
  );
}

export default ComplexForm;
