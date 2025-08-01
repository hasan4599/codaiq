export const htmlcode = `<!DOCTYPE html>
<html>

<head>
  <title>My app</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body
  class="h-full min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-indigo-100 font-sans text-gray-800 overflow-x-hidden">

  <!-- Decorative blobs -->
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-emerald-400 opacity-20 blur-3xl"></div>
    <div class="absolute bottom-[-10rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
  </div>

  <main class="relative z-10 w-full max-w-6xl px-4 sm:px-6 py-10">
    <!-- Hero card -->
    <section class="glass rounded-[2rem] p-6 sm:p-10 md:p-20 text-center flex flex-col items-center">
      
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 mb-8">
        <span class="relative flex h-4 w-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
        <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full px-3 py-1">
          Codaiq AI • Live
        </span>
      </div>

      <!-- Headline -->
      <h1 class="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6">
        <span class="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">Ask Codaiq Anything.</span>
      </h1>

      <!-- Tagline -->
      <p class="text-base sm:text-xl md:text-2xl font-medium text-gray-700 mb-8 max-w-3xl">
        Describe your site in one line—see a live preview in seconds.
      </p>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center text-sm sm:text-base md:text-lg">
        
        <!-- Step 1 -->
        <div class="glass p-6 sm:p-8 rounded-2xl flex flex-col items-center space-y-4">
          <span class="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-indigo-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 2.21-1.79 4-4 4H8l-4 4V8c0-2.21 1.79-4 4-4h9c2.21 0 4 1.79 4 4v4z" />
            </svg>
          </span>
          <h3 class="text-base sm:text-lg md:text-xl font-bold">Prompt</h3>
          <p class="font-medium">Tell Codaiq your idea.</p>
        </div>

        <!-- Step 2 -->
        <div class="glass p-6 sm:p-8 rounded-2xl flex flex-col items-center space-y-4">
          <span class="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
          <h3 class="text-base sm:text-lg md:text-xl font-bold">Preview</h3>
          <p class="font-medium">Watch it appear live.</p>
        </div>

        <!-- Step 3 -->
        <div class="glass p-6 sm:p-8 rounded-2xl flex flex-col items-center space-y-4">
          <span class="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7M5 13l-1 6 6-1m-5-5l6-6 4 4" />
            </svg>
          </span>
          <h3 class="text-base sm:text-lg md:text-xl font-bold">Launch</h3>
          <p class="font-medium">Publish with a click.</p>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`