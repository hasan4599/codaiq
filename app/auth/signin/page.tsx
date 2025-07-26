'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FcGoogle } from 'react-icons/fc';
import { User, Lock } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [signInError, setSignInError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setSignInError('');
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard"
    });

    if (result?.error) {
      setSignInError('Invalid email or password');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-8">
          <div className="flex items-center justify-center gap-3 glass-layer px-6 py-3 rounded-xl mb-6">
            <FontAwesomeIcon icon={faRocket as IconProp} className="text-blue-400 w-6 h-6 animate-pulse" />
            <span className="text-2xl font-bold text-white">Codaiq</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-300">Sign in to your Codaiq account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-gray-800/80 backdrop-blur-lg border border-gray-600/50 rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* Email */}
          <div className="relative">
            <User className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-500/50'
                    } bg-gray-700/50 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none font-medium`}
                />
              )}
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-500/50'
                    } bg-gray-700/50 text-white placeholder-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none font-medium`}
                />
              )}
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Error Message */}
          {signInError && <p className="text-red-300 text-sm font-medium">{signInError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-6">
            <div className="flex-1 h-px bg-gray-500/60" />
            or
            <div className="flex-1 h-px bg-gray-500/60" />
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: "/dashboard" })}
            className="w-full mt-4 px-4 py-3 bg-gray-700/60 hover:bg-gray-600/70 border border-gray-500/50 hover:border-gray-400/60 text-gray-100 hover:text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-3"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm font-medium">
            Don’t have an account?{' '}
            <a href="/sign-up" className="text-blue-400 hover:text-blue-300 font-bold transition-colors hover:underline">
              Create one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
