"use client";
import Link from "next/link";
import { useState } from "react";

export default function resetCompletePage() {
  return (
    <div>
      <h1>Password reset complete</h1>
      <p>
        Your new password has been set. You can log in now on the login .
      </p>{" "}
      <br></br>
      <Link href="/login">Login</Link>
    </div>
  );
}
