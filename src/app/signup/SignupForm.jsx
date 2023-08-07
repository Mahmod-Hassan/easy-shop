"use client";

import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createJWT";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const SignupForm = () => {
  const imageHostKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const { createUser, profileUpdate, googleLogin } = useAuth();

  const uploadImage = async (event) => {
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
    const formData = new FormData();
    const image = event.target.files[0];
    if (!image) return;
    formData.append("image", image);
    const toastId = toast.loading("Image uploading...");
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      toast.dismiss(toastId);
      toast.success("Image uploaded successfully!");
      setValue("photo", data.data.url);
    } catch (error) {
      toast.error("Image not uploaded!");
      toast.dismiss(toastId);
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const toastId = toast.loading("Loading...");
    try {
      const user = await createUser(email, password);
      createJWT({ email });
      await profileUpdate({
        displayName: name,
        photoURL: photo,
      });
      toast.dismiss(toastId);
      toast.success("signup successfull");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "User not signed in");
    }
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const { user } = await googleLogin();
      createJWT({ email: user?.email });
      toast.dismiss(toastId);
      toast.success("successfully sign in");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "User not signed in");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
        <label htmlFor="name" className="label label-text">
          Name
        </label>
        <input
          type="text"
          placeholder="name"
          id="name"
          name="name"
          className="input input-bordered"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-base mt-1">
            Please enter your name.
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label label-text">
          Email
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          className="input input-bordered"
          autoComplete="email"
          {...register("email", {
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-base mt-1">
            Please enter a valid email address.
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label label-text">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="input input-bordered"
          autoComplete="new-password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <span className="text-red-500 text-base mt-1">
            Please enter a password.
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label label-text">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          className="input input-bordered"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: true,
            minLength: 6,
            validate: (value) =>
              value === getValues("password") || "The passwords do not match.",
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-base mt-1">
            {errors.confirmPassword.message || "Please confirm password"}
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="photo" className="label label-text">
          Photo
        </label>
        <input
          type="file"
          id="photo"
          onChange={uploadImage}
          className="file-input file-input-bordered file-input-primary w-full"
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </div>
      <p className="mt-3">
        Already have an account?{" "}
        <Link className="text-blue-500 underline ml-1" href="/login">
          Login
        </Link>
      </p>
      <div className="divider mt-5">OR</div>
      <button
        className="flex items-center border border-base-400 text-xl justify-center gap-5"
        type="button"
        onClick={handleGoogleLogin}
      >
        <img
          className="w-12 h-12"
          src="https://i.ibb.co/Rz9mzBJ/google.png"
          alt="google-icon"
        />
        Sign In with Google
      </button>
    </form>
  );
};

export default SignupForm;
