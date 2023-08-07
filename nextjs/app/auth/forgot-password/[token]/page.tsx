"use client";
import Link from "next/link";
import Card from "@/app/components/Card";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword({
  params,
}: {
  params: { token: string };
}) {
  const title = "Change your password";
  const footer = <Link href="/auth/login/">Try Login!</Link>;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const token = params.token;
  const router = useRouter();
  const payload = {
    token: token,
    password: password,
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;

    if (form.checkValidity()) {
      if (password === confirmPassword) {
        
        const response = await fetch(
          "http://127.0.0.1:8000/api/users/verifyotp/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        console.log(data);
        router.push("/auth/login/");
      }
    } else {
      const errors: { [key: string]: string } = {};
      if (password !== confirmPassword) {
        errors["confirmPassword"] = "Passwords do not match";
        const confirmPasswordInput = form.elements.namedItem(
          "confirmPassword"
        ) as HTMLInputElement;
        confirmPasswordInput.setCustomValidity(errors["confirmPassword"]);
        /*setPassword("");
        setConfirmPassword("");*/
      }
      Array.from(form.elements).forEach(
        (value: Element, index: number, array: Element[]) => {
          const element = value as HTMLInputElement;
          element.setCustomValidity("");
          if (!element.checkValidity()) {
            errors[element.name] = element.validationMessage;
          }
        }
      );

      setFormErrors(errors);
    }
    setFormSubmitted("was-validated");
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await verifyPIN(token);
      if (!data) {
        alert(
          "Token expired. You will be redirected to the forgot password page."
        );
        router.push(`/auth/forgot-password/`);
      }
    };
    fetchData();
  }, []);
  const verifyPIN = async (pin: string) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/verifypin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pin: pin,
      }),
    });
    const data = await response.json();
    return data.valide;
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordInput = event.target as HTMLInputElement;
    confirmPasswordInput.setCustomValidity("");
    if (!confirmPasswordInput.checkValidity()) {
      confirmPasswordInput.setCustomValidity(
        confirmPasswordInput.validationMessage
      );
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmPasswordInput.validationMessage,
      }));
    }    else if (password === confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity("");
    } 
    else {
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    }
  };

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
            <label className="small mb-1" htmlFor="Password">
              New Password
            </label>
            <input
              className="form-control"
              type="password"
              id="Password"
              name="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="new password"
              required
              minLength={8}
            />
            <div className="invalid-feedback">{formErrors.Password}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onInput={handleConfirmPasswordChange}
              placeholder="Confirm password"
              required
              minLength={8}
            />
            <div className="invalid-feedback">{formErrors.confirmPassword}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
            <button className="btn btn-primary" type="submit" value="Submit">
              Change Password
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
