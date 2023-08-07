"use client";
import Link from "next/link";
import Card from "@/app/components/Card";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Forget() {
  const title = "Forget Password";
  const footer = <Link href="/auth/signup">need account? sign up</Link>;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const errors: { [key: string]: string } = {};

    if (!emailInput.checkValidity()) {
      emailInput.setCustomValidity("");
      errors["email"] = emailInput.validationMessage;
    } else if (!(await checkEmailValidity(emailInput.value))) {
      emailInput.setCustomValidity("Invalid email");
      errors["email"] = emailInput.validationMessage;
    } else {
      emailInput.setCustomValidity("");
      errors["email"] = "";
    }

    if (form.checkValidity()) {
      router.push("/auth/forgot-password/verification/");
    }

    setFormErrors(errors);
    setFormSubmitted("was-validated");
  };

  const checkEmailValidity = async (email: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/users/forgetpassword/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const data = await response.json();
    return data.token_created;
  };

  return (
    <div className="col-lg-5">
      <Card title={title} footer={footer}>
        {error && <div className="alert alert-danger">{error}</div>}
        <form
          method="post"
          onSubmit={handleSubmit}
          className={formSubmitted}
          noValidate
        >
          <div className="mb-3">
            <label className="small mb-1" htmlFor="inputEmailAddress">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter email address"
              required
              maxLength={254}
            />
            <div className="invalid-feedback">{formErrors.email}</div>
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
