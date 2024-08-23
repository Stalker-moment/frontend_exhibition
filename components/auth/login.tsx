"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialValues: LoginFormType = {
    email: "admin@akti.ac.id",
    password: "12345",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      setError(null); // Reset error state before login attempt
      try {
        const response = await fetch('https://machapi.akti.cloud/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();

        // Save token to cookie or localStorage
        await createAuthCookie(data.token);

        // Redirect to home page after successful login
        router.replace("/");
      } catch (error) {
        setError('Login failed. Please check your credentials.');
      }
    },
    [router]
  );

  const handleGuestLogin = useCallback(async () => {
    try {
      // Save "guest" token to cookie or localStorage
      await createAuthCookie("guest");

      // Redirect to home page after guest login
      router.replace("/");
    } catch (error) {
      setError('Guest login failed.');
    }
  }, [router]);

  return (
    <div className='w-full max-w-md mx-auto mt-10 px-4 relative'>
      {error && (
        <div className='mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg shadow-sm'>
          {error}
        </div>
      )}

      <div className='text-center text-[25px] font-bold mb-6'>Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className='flex flex-col w-full gap-4 mb-4'>
              <Input
                variant='bordered'
                label='Email'
                type='email'
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant='bordered'
                label='Password'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant='flat'
              color='primary'
              className='w-full'>
              Login
            </Button>
          </>
        )}
      </Formik>

      <div className='font-light text-slate-400 mt-4 text-sm text-center'>
        Don&apos;t have an account?{" "}
        <button
          onClick={handleGuestLogin}
          className='font-bold text-blue-500 hover:underline mt-2 block w-full py-2 z-50'>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};