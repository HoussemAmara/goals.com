"use client";
import Link from "next/link";
import Card from "@/app/components/Card";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const title = "Create Account";
  const footer = <Link href="/auth/login">Have an account? Go to login</Link>;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState("");

  const router = useRouter();

  const payload = {
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    password: password,
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;

    if (form.checkValidity()) {
      if ((await checkUsernameAvailability(username)) == false) {
        const response = await fetch("http://127.0.0.1:8000/api/users/signup/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        console.log(response)
        router.push("/auth/login");
      }
    } else {
      const errors: { [key: string]: string } = {};
      Array.from(form.elements).forEach(
        (value: Element, index: number, array: Element[]) => {
          const element = value as HTMLInputElement;

          if (!element.checkValidity()) {
            errors[element.name] = element.validationMessage;
          } else {
            element.setCustomValidity("");
          }
        }
      );
      if (password !== confirmPassword) {
        errors["confirmPassword"] = "Passwords do not match";
        // Set custom validity for confirmPassword input
        const confirmPasswordInput = form.elements.namedItem(
          "confirmPassword"
        ) as HTMLInputElement;
        confirmPasswordInput.setCustomValidity(errors["confirmPassword"]);
      }
      if (await checkUsernameAvailability(username)) {
        errors["username"] = "username is taken";
        const usernameInput = form.elements.namedItem(
          "username"
        ) as HTMLInputElement;
        usernameInput.setCustomValidity(errors["username"]);
      }
      if (await checkEmailAvailability(email)) {
        errors["email"] = "Email is already in use. Please try a different email or login using your existing account.";
        const usernameInput = form.elements.namedItem(
          "email"
        ) as HTMLInputElement;
        usernameInput.setCustomValidity(errors["email"]);
      }


      setFormErrors(errors);
      console.log(formErrors);
      console.log(password, confirmPassword);
    }
    setFormSubmitted("was-validated");
  };
  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordInput = event.target as HTMLInputElement;
    confirmPasswordInput.setCustomValidity("");
    const confirmPassword = confirmPasswordInput.value;

    if (!confirmPasswordInput.checkValidity()) {
      confirmPasswordInput.setCustomValidity(confirmPasswordInput.validationMessage);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmPasswordInput.validationMessage,
      }));
    } else if (password !== confirmPassword) {
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      confirmPasswordInput.setCustomValidity("");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };
  const handleUsernameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.setCustomValidity("");
    const username = event.target.value;
    if (!event.target.checkValidity()) {
      event.target.setCustomValidity(event.target.validationMessage);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: event.target.validationMessage,
      }));
    } else if (await checkUsernameAvailability(username)) {
      event.target.setCustomValidity("Username is taken");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is taken",
      }));
    } else {
      event.target.setCustomValidity("");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }
  };
  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.setCustomValidity("");
    const email = event.target.value;
    if (!event.target.checkValidity()) {
      event.target.setCustomValidity(event.target.validationMessage);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: event.target.validationMessage,
      }));
    } else if (await checkEmailAvailability(email)) {
      event.target.setCustomValidity("Email is already in use. Please try a different email or login using your existing account.");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is already in use. Please try a different email or login using your existing account.",
      }));
    } else {
      event.target.setCustomValidity("");
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };
  const checkUsernameAvailability = async (username: String) => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/users/checkusernameavailability/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
        }),
      }
    );
    const content = await res.json();
    return content.isTaken;
  };
  const checkEmailAvailability = async (email: String) => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/users/checkemailavailability/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const content = await res.json();
    return content.isTaken;
  };

  return (
    <div className="col-lg-5">
      <Card title={title} footer={footer}>
        <form
          method="POST"
          onSubmit={submit}
          className={formSubmitted}
          noValidate
        >
          <div className="row gx-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="small mb-1" htmlFor="first_name">
                  First Name
                </label>
                <input
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  maxLength={50}
                  minLength={2}
                />
                <div className="invalid-feedback">{formErrors.first_name}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="small mb-1" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                  maxLength={50}
                  minLength={2}
                />
                <div className="invalid-feedback">{formErrors.last_name}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="small mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onInput={handleEmailChange}
                  aria-describedby="emailHelp"
                  placeholder="Enter email address"
                  required
                  maxLength={254}
                />
                <div className="invalid-feedback">{formErrors.email}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="col-md-6">
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
                  onInput={handleUsernameChange}
                  placeholder="Enter your username"
                  required
                  maxLength={30}
                  minLength={4}
                />
                <div className="invalid-feedback">{formErrors.username}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="small mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  onInput={handleConfirmPasswordChange}
                  placeholder="Confirm password"
                  required
                  minLength={8}
                />
                <div className="invalid-feedback">
                  {formErrors.confirmPassword}
                </div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block">Create Account</button>
        </form>
      </Card>
    </div>
  );
}
