"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Phone, User, Loader2, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import { registerschema } from "./registerschema";
import { RegisterFormData } from "./type_register";
import { Myregister } from "./register_accations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Form_register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<RegisterFormData>({
    resolver: zodResolver(registerschema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function mysubmit(data: RegisterFormData) {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const isregister = await Myregister(data);
      console.log(isregister);

      if (isregister) {
        toast.success("Account created successfully");
        router.replace("/login");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 px-4 py-12">
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left side */}
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Join FreshCart Today
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
              Welcome to <span className="text-emerald-600">FreshCart</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Create your account and enjoy a faster, easier, and more secure shopping experience.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-100 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Premium Quality</h3>
                  <p className="text-sm text-slate-600">
                    Products sourced from trusted suppliers with the best quality.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-100 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Fast Delivery</h3>
                  <p className="text-sm text-slate-600">
                    Same-day delivery available in many locations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-100 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Secure Shopping</h3>
                  <p className="text-sm text-slate-600">
                    Your data and payments are protected with a secure experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Start your fresh journey with us today
              </p>
            </div>

            <form onSubmit={handleSubmit(mysubmit)} className="space-y-5">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-emerald-500"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        type="email"
                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-emerald-500"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-emerald-500"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm password"
                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-emerald-500"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Phone</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter phone"
                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-emerald-500"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create My Account"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}