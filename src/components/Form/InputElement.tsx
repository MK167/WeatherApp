import { Form } from "react-bootstrap";
import type { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputElementProps<TFieldValue extends FieldValues> = {
  name: Path<TFieldValue>;
  label: string;
  type: string;
  errors?: string;
  register: UseFormRegister<TFieldValue>;
  placeholder?: string;
  autoComplete?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  accept?: string;
};

const InputElement = <TFieldValue extends FieldValues>({
  name,
  label,
  type,
  errors,
  register,
  placeholder,
  autoComplete,
  options = [],
  rows = 3,
  accept,
}: InputElementProps<TFieldValue>) => {
  if (type === "checkbox") {
    return (
      <Form.Group className="mb-3" controlId={`formBasic${name}`}>
        <Form.Check
          type="checkbox"
          label={label}
          isInvalid={!!errors}
          feedback={errors}
          feedbackType="invalid"
          {...register(name)}
        />
      </Form.Group>
    );
  }

  if (type === "select") {
    return (
      <Form.Group className="mb-3" controlId={`formBasic${name}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Select title={label} isInvalid={!!errors} {...register(name)}>
          <option value="">-- Select --</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    );
  }

  if (type === "radio") {
    return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <div>
          {options.map((opt) => (
            <Form.Check
              key={opt.value}
              type="radio"
              id={`${name}-${opt.value}`}
              label={opt.label}
              value={opt.value}
              isInvalid={!!errors}
              {...register(name)}
            />
          ))}
        </div>
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    );
  }

  if (type === "file") {
    return (
      <Form.Group className="mb-3" controlId={`formBasic${name}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="file"
          accept={accept}
          isInvalid={!!errors}
          {...register(name)}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    );
  }

  if (type === "textarea") {
    return (
      <Form.Group className="mb-3" controlId={`formBasic${name}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="textarea"
          rows={rows}
          placeholder={placeholder}
          isInvalid={!!errors}
          {...register(name)}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    );
  }

  return (
    <Form.Group className="mb-3" controlId={`formBasic${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        isInvalid={!!errors}
        {...register(name)}
      />
      <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputElement;
