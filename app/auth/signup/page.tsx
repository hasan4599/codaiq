'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { GoArrowRight } from 'react-icons/go';
import { Fetch } from '@/hooks/fetch';
import Button from '@/components/ui/client/button';
import Input from '@/components/ui/client/inputField';
import Verification_Code from '@/components/ui/client/verification';
import Userdetails from '@/components/ui/client/userdetails';

const validEmailSchema = z.object({
  email: z.string().email({ message: 'enter a valid email' }),
})
type ValidEmailSchema = z.infer<typeof validEmailSchema>;

export default function SignUp() {
  const [validEmail, setValidEmail] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const { control, handleSubmit, formState: { errors } } = useForm<ValidEmailSchema>({
    resolver: zodResolver(validEmailSchema)
  });

  const checkEmail = async (data: ValidEmailSchema) => {
    try {
      const response = await Fetch({
        body: { email: data.email },
        api: 'post/auth/email',
        method: 'POST',
        host: 'server',
        loading: setIsLoading,
      });

      if (response) {
        setEmail(data.email);
        setValidEmail(true);
        toast.success('Verification code sent!');
      } else {
        toast.error('Please try again later');
      }
    } catch (err) {
      toast.error('Something went wrong while verifying your email.');
    }
  };


  return (
    !validCode && validEmail ? (
      <Verification_Code email={email} onSuccess={() => setValidCode(true)} />
    ) : (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 relative space-y-5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        {!validEmail && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-lg"
          >
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-sm text-gray-400">Join us today and get started</p>
            </div>

            <form onSubmit={handleSubmit(checkEmail)} className="space-y-5 w-full">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    errors={errors.email?.message || ''}
                    placeholder="you@example.com"
                    {...field}
                    type="email"
                    label="Email Address"
                  />
                )}
              />
              <Button
                onPress={handleSubmit(checkEmail)}
                loading={isLoading}
                icon={<GoArrowRight className="text-xl" />}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30"
                variant={0}>
                Next
              </Button>
            </form>
          </motion.section>
        )}

        {validEmail && validCode && <Userdetails email={email} />}

        <div className="w-full flex items-center justify-center gap-2 text-white text-sm">
          <span>Already have an account?</span>
          <Link href={'/auth/signin'} className="underline text-sky-300 cursor-pointer">
            Sign In
          </Link>
        </div>
      </div>
    )
  );
}

