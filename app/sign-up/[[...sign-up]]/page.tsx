import { SignUp } from "@clerk/nextjs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md mx-auto">
        {/* Custom header with Codaiq logo */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-8">
          <div className="flex items-center justify-center gap-3 glass-layer px-6 py-3 rounded-xl mb-6 ">
            <FontAwesomeIcon
              icon={faRocket as unknown as IconProp}
              className="text-blue-400 w-6 h-6 animate-pulse"
            />
            <span className="text-2xl font-bold text-white">Codaiq</span>
          </div>
          <div className="w-full text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Get started</h1>
            <p className="text-gray-300">Create your Codaiq account</p>
          </div>
        </div>

        {/* Clerk component with enhanced dark theme */}
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              // Main container
              rootBox: "w-full",
              card: "w-full bg-gray-800/80 backdrop-blur-lg border border-gray-600/50 rounded-2xl shadow-2xl p-8",

              // Header (hide it since we have custom)
              header: "hidden",

              // Social buttons with better contrast
              socialButtonsBlockButton:
                "w-full mb-3 px-4 py-3 bg-gray-700/60 hover:bg-gray-600/70 border border-gray-500/50 hover:border-gray-400/60 text-gray-100 hover:text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md",
              socialButtonsBlockButtonText: "text-gray-100 font-medium",
              socialButtonsBlockButtonArrow: "text-gray-300",

              // Form fields with high contrast
              formFieldLabel: "text-gray-100 font-semibold text-sm mb-2 block",
              formFieldInput:
                "w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-gray-600/60 text-white placeholder-gray-300 rounded-xl transition-all duration-200 outline-none font-medium",

              // Primary button with enhanced gradient
              formButtonPrimary:
                "w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",

              // Divider with better visibility
              dividerLine: "bg-gray-500/60 h-px",
              dividerText:
                "text-gray-300 text-sm px-4 bg-gray-800/80 font-medium",

              // Links with better contrast
              footerActionLink:
                "text-blue-400 hover:text-blue-300 transition-colors font-semibold",
              formFieldAction: "text-right mt-2",
              formFieldActionLink:
                "text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors",

              // Error states with high contrast
              formFieldErrorText: "text-red-300 text-sm mt-1 font-medium",
              formFieldWarningText: "text-yellow-300 text-sm mt-1 font-medium",
              formFieldSuccessText: "text-green-300 text-sm mt-1 font-medium",

              // Footer styling to match dark theme
              footer: "mt-6 text-center",
              footerActionText: "text-gray-300 text-sm font-medium",
              footerAction:
                "mt-4 p-4 bg-gray-700/40 border border-gray-600/40 rounded-xl",

              // Style the Clerk branding to match
              footerPages:
                "mt-4 p-4 bg-gray-700/40 border border-gray-600/40 rounded-xl",
              footerPagesLink:
                "text-blue-400 hover:text-blue-300 font-medium transition-colors",

              // OTP code inputs
              otpCodeFieldInput:
                "w-12 h-12 mx-1 bg-gray-700/50 border border-gray-500/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 text-white text-center rounded-lg text-lg font-bold transition-all duration-200 outline-none",

              // Loading states
              spinner: "border-blue-400",
              loadingButtonSpinner: "border-white",

              // Identity preview (for email verification steps)
              identityPreview:
                "bg-gray-700/40 border border-gray-600/40 rounded-xl p-4",
              identityPreviewText: "text-gray-100 font-medium",
              identityPreviewEditButton:
                "text-blue-400 hover:text-blue-300 font-medium ml-2 transition-colors",
            },
            variables: {
              // Color variables for better theming
              colorPrimary: "#3b82f6",
              colorDanger: "#ef4444",
              colorSuccess: "#22c55e",
              colorWarning: "#f59e0b",
              colorNeutral: "#6b7280",
              colorText: "#f9fafb",
              colorTextSecondary: "#d1d5db",
              colorBackground: "#1f2937",
              colorInputBackground: "#374151",
              colorInputText: "#f9fafb",
              borderRadius: "0.75rem",
              fontFamily: "inherit",
              fontSize: "14px",
              fontWeight: {
                normal: 500,
                medium: 600,
                bold: 800,
              },
            },
          }}
        />

        {/* Custom footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm font-medium">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
