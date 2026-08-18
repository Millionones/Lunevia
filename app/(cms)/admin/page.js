"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, Mail } from "lucide-react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import toast, { Toaster } from "react-hot-toast";

import * as Yup from "yup";
import { useFormik } from "formik";
import { get, post } from "../../../helpers/api";
import { useRouter } from "next/navigation";
import "./app.css"
function AdminLogin() {
  const router = useRouter();
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
      // .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (data) => {
    post("auth/login", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify({ email: res.email, name: res.name }));
        router.push("/admin/blogs")
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom duration-500">
          <Card className="border-2">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center bg-black text-white">
                  <LockKeyhole className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      error={validation.touched.email && validation.errors.email ? validation.errors.email : ""}
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.password || ""}
                      error={
                        validation.touched.password && validation.errors.password
                          ? validation.errors.password
                          : ""
                      }
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-black text-white">
                  Sign in
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
