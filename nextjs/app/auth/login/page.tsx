"use client";
import Link from "next/link";
import Card from "@/app/components/Card";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const title = "Login";
  const footer = <Link href="/auth/signup">Need an account? Sign up!</Link>;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");

  const router = useRouter();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;
    if (form.checkValidity()) {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const content = await response.json();
      if (content.detail) {
        setError(content.detail);
      } else {
        router.push("/");
      }
    } else {
      const errors: { [key: string]: string } = {};
      Array.from(form.elements).forEach(
        (value: Element, index: number, array: Element[]) => {
          const element = value as HTMLInputElement;
          if (!element.checkValidity()) {
            errors[element.name] = element.validationMessage;
          }
        }
      );
      setFormErrors(errors);
    }
    setFormSubmitted("was-validated");
  };

  return (
    <div className="col-lg-5">
      <Card title={title} footer={footer}>
        {error && <div className="alert alert-danger">{error}</div>}
        <form
          method="post"
          onSubmit={submit}
          className={formSubmitted}
          noValidate
        >
          <div className="mb-3">
            <label className="small mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              required
              maxLength={30}
              minLength={4}
            />
            <div className="invalid-feedback">{formErrors.username}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
              minLength={8}
            />
            <div className="invalid-feedback">{formErrors.password}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
            <Link className="small" href="/auth/forgot-password">
              Forgot Password?
            </Link>
            <button className="btn btn-primary" type="submit" value="Submit">
              Login
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
