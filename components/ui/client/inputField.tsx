'use client';

import React, { forwardRef, useState, HTMLInputTypeAttribute } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Optional: use Lucide icons if available

const Input = forwardRef(
    (
        {
            errors,
            type,
            placeholder,
            label,
            onChange,
            value = '',
            readOnly = false,
            ...rest
        }: {
            errors: string | undefined;
            type: HTMLInputTypeAttribute;
            placeholder: string;
            label: string;
            onChange: (e: string) => void;
            value: string | number | undefined;
            readOnly?: boolean;
        },
        ref: any
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        return (
            <div className="w-full flex flex-col gap-[6px] relative">
                <label className="text-sm font-medium text-white">{label}</label>
                <div className="relative">
                    <input
                        className={`w-full px-4 py-3 pr-10 rounded-lg bg-white/5 border ${errors ? 'border-red-500' : 'border-white/10'
                            } focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition duration-200 text-white placeholder:text-gray-400`}
                        placeholder={placeholder}
                        type={isPassword && showPassword ? 'text' : type}
                        {...rest}
                        ref={ref}
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                        readOnly={readOnly}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
                {errors && <p className="text-red-500 text-xs">{errors}</p>}
            </div>
        );
    }
);

Input.displayName = 'SingleInput';
export default Input;
