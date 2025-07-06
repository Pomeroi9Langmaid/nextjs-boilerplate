[16:58:42.194] Running build in Washington, D.C., USA (East) – iad1
[16:58:42.195] Build machine configuration: 2 cores, 8 GB
[16:58:42.223] Cloning github.com/Pomeroi9Langmaid/nextjs-boilerplate (Branch: main, Commit: 180fb21)
[16:58:47.033] Cloning completed: 4.810s
[16:58:47.428] Restored build cache from previous deployment (BjYyEChokP7iN2rLAwn8m6orccqG)
[16:58:47.879] Running "vercel build"
[16:58:48.463] Vercel CLI 44.2.10
[16:58:48.998] Installing dependencies...
[16:58:50.253] 
[16:58:50.254] up to date in 860ms
[16:58:50.254] 
[16:58:50.255] 15 packages are looking for funding
[16:58:50.255]   run `npm fund` for details
[16:58:50.286] Detected Next.js version: 15.3.5
[16:58:50.288] Running "npm run build"
[16:58:50.424] 
[16:58:50.425] > nextjs@0.1.0 build
[16:58:50.425] > next build
[16:58:50.425] 
[16:58:51.357]    ▲ Next.js 15.3.5
[16:58:51.357] 
[16:58:51.384]    Creating an optimized production build ...
[16:58:57.339]  ✓ Compiled successfully in 2000ms
[16:58:57.345]    Linting and checking validity of types ...
[16:59:00.526] Failed to compile.
[16:59:00.526] 
[16:59:00.527] ./app/page.tsx:82:17
[16:59:00.527] Type error: Type '{ leadId: string; currentStage: string; onStageChange: (leadId: string, newStage: string) => Promise<void>; }' is not assignable to type 'IntrinsicAttributes & DealStageDropdownProps'.
[16:59:00.527]   Property 'onStageChange' does not exist on type 'IntrinsicAttributes & DealStageDropdownProps'.
[16:59:00.527] 
[16:59:00.527] [0m [90m 80 |[39m                 leadId[33m=[39m{lead[33m.[39mid}[0m
[16:59:00.527] [0m [90m 81 |[39m                 currentStage[33m=[39m{lead[33m.[39mcurrent_stage [33m||[39m [32m''[39m}[0m
[16:59:00.527] [0m[31m[1m>[22m[39m[90m 82 |[39m                 onStageChange[33m=[39m{handleStageChange}[0m
[16:59:00.527] [0m [90m    |[39m                 [31m[1m^[22m[39m[0m
[16:59:00.527] [0m [90m 83 |[39m               [33m/[39m[33m>[39m[0m
[16:59:00.527] [0m [90m 84 |[39m             [33m<[39m[33m/[39m[33mdiv[39m[33m>[39m[0m
[16:59:00.527] [0m [90m 85 |[39m             [33m<[39m[33mdiv[39m[33m>[39m🌍 [33mCountry[39m[33m:[39m {lead[33m.[39mcountry [33m||[39m [32m'—'[39m}[33m<[39m[33m/[39m[33mdiv[39m[33m>[39m[0m
[16:59:00.543] Next.js build worker exited with code: 1 and signal: null
[16:59:00.562] Error: Command "npm run build" exited with 1
[16:59:00.735] 