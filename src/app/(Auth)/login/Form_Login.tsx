"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Loginschema } from "./Loginschema";
import { LoginFormData } from "./type_login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ServerResponse } from "http";
import { usecart } from "@/_provider/Providercart";

export default function Form_login() {
  const {numberofcart, setnumberofcart, numberofWhishlist, setnumberofWhishlist}=usecart()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(Loginschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function mysubmit(data: LoginFormData) {
    if (isLoading) return;



    try {
      setIsLoading(true);

      await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: "/"
      });

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }

  }      

      

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 px-4 py-12">
      {/* background effects */}
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">

        {/* Left */}
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Welcome Back
            </div>

            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
              Login to <span className="text-emerald-600">FreshCart</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              Continue your shopping journey with fast, secure, and easy access.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-emerald-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Premium Quality</h3>
                  <p className="text-sm text-slate-600">
                    Fresh and high-quality products always.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-emerald-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Fast Delivery</h3>
                  <p className="text-sm text-slate-600">
                    Get your orders delivered quickly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-emerald-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Secure</h3>
                  <p className="text-sm text-slate-600">
                    Safe login and secure data protection.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-[28px] bg-white p-6 shadow-xl border border-gray-100 sm:p-8">

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Sign In
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit(mysubmit)} className="space-y-5">

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        className="pl-11 h-12 rounded-xl"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold transition hover:bg-emerald-700 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>

            {/* Links */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don’t have an account?{" "}
              <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}