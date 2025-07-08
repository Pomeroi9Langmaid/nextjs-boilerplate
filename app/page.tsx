[18:07:38.417] Running build in Washington, D.C., USA (East) – iad1
[18:07:38.418] Build machine configuration: 4 cores, 8 GB
[18:07:38.445] Cloning github.com/Pomeroi9Langmaid/nextjs-boilerplate (Branch: main, Commit: aa12830)
[18:07:43.750] Cloning completed: 5.305s
[18:07:43.984] Restored build cache from previous deployment (6esQmbeTitD7rA4ziaRSv7UJYR4u)
[18:07:44.337] Running "vercel build"
[18:07:44.889] Vercel CLI 44.2.13
[18:07:45.191] Installing dependencies...
[18:07:46.128] 
[18:07:46.128] up to date in 687ms
[18:07:46.128] 
[18:07:46.128] 15 packages are looking for funding
[18:07:46.129]   run `npm fund` for details
[18:07:46.162] Detected Next.js version: 15.3.5
[18:07:46.166] Running "npm run build"
[18:07:46.297] 
[18:07:46.297] > nextjs@0.1.0 build
[18:07:46.298] > next build
[18:07:46.298] 
[18:07:47.349]    ▲ Next.js 15.3.5
[18:07:47.350] 
[18:07:47.381]    Creating an optimized production build ...
[18:07:50.618] Failed to compile.
[18:07:50.619] 
[18:07:50.619] ./app/page.tsx
[18:07:50.619] Error:   [31mx[0m Expected '}', got '<eof>'
[18:07:50.619]      ,-[[36;1;4m/vercel/path0/app/page.tsx[0m:110:1]
[18:07:50.619]  [2m107[0m |       setFilteredLeads(data);
[18:07:50.619]  [2m108[0m |     };
[18:07:50.619]  [2m109[0m |     load();
[18:07:50.619]  [2m110[0m |   }, []);
[18:07:50.619]      : [35;1m        ^[0m
[18:07:50.619]      `----
[18:07:50.619] 
[18:07:50.619] Caused by:
[18:07:50.619]     Syntax Error
[18:07:50.619] 
[18:07:50.619] Import trace for requested module:
[18:07:50.620] ./app/page.tsx
[18:07:50.620] 
[18:07:50.624] 
[18:07:50.624] > Build failed because of webpack errors
[18:07:50.650] Error: Command "npm run build" exited with 1
[18:07:50.838] 
[18:07:53.783] Exiting build container