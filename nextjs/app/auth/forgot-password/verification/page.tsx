"use client";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import Card from "@/app/components/Card";
import { useRouter } from "next/navigation";

export default function Page() {
  const [code, setCode] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState("");
  const router = useRouter();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    const PINInput = form.elements.namedItem("code") as HTMLInputElement;
    const errors: { [key: string]: string } = {};

    if (!PINInput.checkValidity()) {
      PINInput.setCustomValidity("");
      errors["code"] = PINInput.validationMessage;
    } else if (code.length !== 6) {
      PINInput.setCustomValidity("PIN must be a 6-digit number");
      errors["code"] = PINInput.validationMessage;
    } else if (!(await checkPINValidity(code))) {
      PINInput.setCustomValidity("Invalid code");
      errors["code"] = PINInput.validationMessage;
      setCode("");
    } else {
      PINInput.setCustomValidity("");
      errors["code"] = "";
    }

    if (form.checkValidity()) {
      router.push(`/auth/forgot-password/${code}/`);
    }

    setFormErrors(errors);
    setFormSubmitted("was-validated");
  };

  const checkPINValidity = async (code: string) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/verifypin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pin: code,
      }),
    });
    const data = await response.json();
    return data.valide;
  };
  const handlePINChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.setCustomValidity("");
    if (!event.target.checkValidity()) {
      event.target.setCustomValidity(event.target.validationMessage);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        code: event.target.validationMessage,
      }));
    }
  };

  const title = "PIN CODE";
  const footer = <Link href="/auth/signup">need account? sign up</Link>;

  return (
    <div className="col-lg-5">
      <Card title={title} footer={footer}>
        <form
          method="post"
          onSubmit={submit}
          className={formSubmitted}
          noValidate
        >
          <div className="mb-3">
            <label className="small mb-1" htmlFor="code">
              Code:
            </label>
            <input
              className="form-control"
              type="number"
              id="code"
              name="code"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
              onInput={handlePINChange}
              // min={100000}
              // max={999999}
            />
            <div className="invalid-feedback">{formErrors.code}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
            <Link className="small" href="/auth/login">
              Return to login
            </Link>
            <button className="btn btn-primary" type="submit" value="Submit">
              Reset Password
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
