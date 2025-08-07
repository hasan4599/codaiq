'use client'

import { AiOutlineLoading3Quarters } from "react-icons/ai";

type button = {
    children: any;
    variant: number;
    onPress: () => void;
    loading: boolean;
    className?: string;
    icon?: any
} 
export default function Button({
    className,
    children,
    onPress,
    loading,
    icon = '',
    variant = 0,
    ...rest
}: button) {

    const Buttons: { element: any }[] = [
        {
            element: <button
                {...rest}
                className={className? className : 'flex py-[7px] px-[20px] bg-zinc-900 text-white font-semibold items-center justify-center gap-[10px] rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full h-full border border-zinc-500'}
                onClick={() => onPress()}
            >
                {children} {loading ? <AiOutlineLoading3Quarters className="animate-spin text-[16px]" /> : icon}
            </button>
        },
        {
            element: <button
                {...rest}
                className={className? className : 'flex py-[7px] px-[20px] bg-red-800 text-white font-semibold items-center gap-[10px] rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}
                onClick={() => onPress()}
            >
                {children} {loading ? <AiOutlineLoading3Quarters className="animate-spin text-[16px]" /> : icon}
            </button>
        }
    ]
    return Buttons[variant].element
}