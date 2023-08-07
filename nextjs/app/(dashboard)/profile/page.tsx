"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from "@/app/Context/ImageContext";

export default function UserPage() {
  const [picURL1, setPicURL1] = useState("/profile.png");
  const [username1, setUsername1] = useState("");
  const [email1, setEmail1] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const { username, setUsername, email, setEmail, picURL, setPicURL, pageNameForHeader, setPageNameForHeader, pageURLForHeader, setPageURLForHeader, setPageSectionNameForHeader, setIconForHeader } = useGlobalContext();
  const router = useRouter();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target as HTMLFormElement;

    if (form.checkValidity()) {
      const res = await fetch(
        "http://127.0.0.1:8000/api/users/submitaccoutdetails/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: currentUsername,
            new_username: username1,
            firstname: firstname,
            lastname: lastname,
            email: email1,
            job: job,
            phone: phone,
          }),
        }
      );
      const content = await res.json();
      return content;

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
      if (username !== currentUsername && await checkUsernameAvailability(username)) {
        errors["username"] = "username is taken";
        const usernameInput = form.elements.namedItem(
          "username"
        ) as HTMLInputElement;
        usernameInput.setCustomValidity(errors["username"]);
      }
      if (email !== currentEmail && await checkEmailAvailability(email)) {
        errors["email"] = "Email is already in use. Please try a different email.";
        const usernameInput = form.elements.namedItem(
          "email"
        ) as HTMLInputElement;
        usernameInput.setCustomValidity(errors["email"]);
      }
      setFormErrors(errors);
      console.log(formErrors);
    }
    setFormSubmitted("was-validated");
  };
  useEffect(() => {
    const fetchData = async () => {
      setPageNameForHeader("Profile");
      setPageURLForHeader("/profil");
      setPicURL("/profile.png");
      setPageSectionNameForHeader("Account Settings - Profile");
      setIconForHeader("user");
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/api/users/user/',
          { credentials: 'include' }
        );
        if (response.status === 403) {
          router.push('/auth/login');
        } else {
          const content = await response.json();
          console.log(content);
          setCurrentUsername(content.username);
          setUsername(content.username);
          setUsername1(content.username);
          setFirstname(content.first_name);
          setLastname(content.last_name);
          setJob(content.job);
          setEmail(content.email);
          setEmail1(content.email);
          setCurrentEmail(content.email);
          setPhone(content.phone_number);
          if (content.image) {
            setPicURL(`http://127.0.0.1:8000${content.image}`);
            setPicURL1(`http://127.0.0.1:8000${content.image}`);
          }
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        // Handle error
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

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

  const deleteImage = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/users/deleteimage/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const content = await res.json();
    setPicURL1("/profile.png");
    const imageInput = document.getElementById("image") as HTMLInputElement;
    imageInput.value = '';

    console.log(content);
  }

  function handleUploadButtonOrImageClick() {
    const imageInput = document.getElementById("image") as HTMLInputElement;
    imageInput.click();
  }
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const image = document.createElement("img");
        image.src = e.target?.result as string;
        image.onload = async () => {
          const fileSize = file.size;
          const fileType = file.type;
          const allowedExtensions = ["image/jpeg", "image/png"]; // Add more if needed
          if (allowedExtensions.includes(fileType) && fileSize <= 5 * 1024 * 1024) {
            // Valid image with correct extension and size
            setPicURL1(image.src);
          } else {
            // Invalid image
            console.log("Invalid image. Please select a valid image.");
            // You can display an error message or take other actions here
          }
        };
      };

      fileReader.readAsDataURL(file);
    }
  };
  const onSubmitImage = async () => {
    const imageInput = document.getElementById("image") as HTMLInputElement;
    const file = imageInput.files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/users/upload/", {
          credentials: 'include',
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Image uploaded successfully");
          try {
            const response = await fetch(
              'http://127.0.0.1:8000/api/users/user/',
              { credentials: 'include' }
            );
            if (response.status === 403) {
              router.push('/auth/login');
            } else {
              const content = await response.json();
              setUsername(content.username);
              setUsername1(content.username);
              setEmail(content.email);
              setEmail1(content.email);
              if (content.image) {
                setPicURL(`http://127.0.0.1:8000${content.image}`);
              }
            }
          } catch (error) {
            console.error("Error retrieving user data:", error);
            // Handle error
          }
          // Handle success
        } else {
          console.error("Failed to upload image");
          // Handle error
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error
      }
    } else {
      setPicURL("/profile.png");
    }
  }
  return (
    <div className="row">
      <div className='col-xl-4'>
        <Card title="Profile Picture">
          <div className="text-center">
            <Image className="rounded-circle mb-2" onClick={handleUploadButtonOrImageClick} src={picURL1} width={200} height={200} alt="" />
            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <input
              className="form-control"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div className="d-flex justify-content-between">

              <button className="btn btn-primary" type="button" onClick={onSubmitImage}>
                Upload new image
              </button>
              <button className="btn btn-outline-primary" type="button" onClick={deleteImage}>
                Delete image
              </button>
            </div>
          </div>
        </Card>
      </div>
      <div className='col-xl-8'>
        <Card title="Account Details">
          <form method="POST"
            onSubmit={submit}
            className={formSubmitted}
            noValidate>
            <div className="mb-3">
              <label className="small mb-1">Username</label>
              <input className="form-control" id="inputUsername" name="username" type="text" placeholder="Enter your username" value={username1} onChange={e => setUsername1(e.target.value)} maxLength={30}
                minLength={4} required />
              <div className="invalid-feedback">{formErrors.username}</div>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label className="small mb-1">First name</label>
                <input className="form-control" id="inputFirstName" name="first_name" type="text" placeholder="Enter your first name" value={firstname} onChange={e => setFirstname(e.target.value)} required
                  maxLength={50}
                  minLength={2} />
                <div className="invalid-feedback">{formErrors.first_name}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <label className="small mb-1">Last name</label>
                <input className="form-control" id="inputLastName" name="last_name" type="text" placeholder="Enter your last name" value={lastname} onChange={e => setLastname(e.target.value)} required
                  maxLength={50}
                  minLength={2} />
                <div className="invalid-feedback">{formErrors.last_name}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="small mb-1">Email address</label>
              <input className="form-control" id="inputEmailAddress" name="email" type="email" placeholder="Enter your email address" value={email1} onChange={e => setEmail1(e.target.value)} required
                maxLength={254} />
              <div className="invalid-feedback">{formErrors.email}</div>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="row gx-3 mb-3">
              <div className="col-md-6">
                <label className="small mb-1">Job</label>
                <input className="form-control" id="job" name="job" type="text" placeholder="Enter your job" value={job} onChange={e => setJob(e.target.value)} maxLength={50}
                  minLength={2} />
                <div className="invalid-feedback">{formErrors.job}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-md-6">
                <label className="small mb-1">Phone number</label>
                <input className="form-control" id="inputPhone" name="phone" type="tel" placeholder="Enter your phone number" maxLength={15} value={phone} onChange={e => setPhone(e.target.value)}
                  minLength={5} />
                <div className="invalid-feedback">{formErrors.phone}</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>

            <button className="btn btn-primary" type="submit">Save changes</button>
          </form>
        </Card>
      </div>
    </div>
  );
}