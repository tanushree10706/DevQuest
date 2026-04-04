/* ===================================
   DevQuest — app.js
   Page logic: dashboard, subjects, profile
   =================================== */

(function () {
  'use strict';

  /* ─── QUEST DATA (7 worlds × 10 quests) ─── */
  const QUEST_DATA = {
    html: {
      icon: '🌐', name: 'HTML Quest', tag: 'WORLD 01', color: 'orange',
      sub: 'Master the building blocks of the web',
      quests: [
        { title: 'Document Structure', desc: 'Learn the skeleton of every web page', info: 'Every HTML page starts with <!DOCTYPE html>, followed by <html>, <head>, and <body> tags.\n\nThe <head> holds meta info (title, charset, links to CSS).\nThe <body> holds all visible content.\n\nKey tags: <html lang="en">, <meta charset="UTF-8">, <meta name="viewport">, <title>' },
        { title: 'Text Elements',      desc: 'Headings, paragraphs, spans and more', info: 'Headings: <h1> to <h6> — use only one <h1> per page.\nParagraphs: <p> — block-level text container.\nInline: <span>, <strong> (bold), <em> (italic), <br> (line break).\n\nSemantic text: <mark>, <small>, <abbr title="...">, <code>, <pre>' },
        { title: 'Links & Images',     desc: 'Anchor tags and the img element', info: 'Links: <a href="url" target="_blank" rel="noopener">Text</a>\n\nImages: <img src="path" alt="description" width="300">\n• alt is required for accessibility\n• Use relative paths for local files\n\nImage formats: JPG (photos), PNG (transparency), SVG (icons), WebP (modern)' },
        { title: 'Lists',              desc: 'Ordered, unordered and definition lists', info: 'Unordered list: <ul> with <li> items — renders as bullet points.\nOrdered list: <ol> with <li> items — renders as numbered list.\nDefinition list: <dl> with <dt> (term) and <dd> (description).\n\nLists can be nested inside each other for sub-lists.' },
        { title: 'Tables',             desc: 'Build data tables with HTML', info: 'Structure: <table> → <thead> / <tbody> / <tfoot>\nRow: <tr> (table row)\nHeader cell: <th scope="col">  |  Data cell: <td>\n\nAttributes: colspan (span columns), rowspan (span rows)\nAlways use <thead> for accessibility and styling hooks.' },
        { title: 'Forms',              desc: 'Input, select, textarea and form submission', info: 'Form wrapper: <form action="/submit" method="POST">\n\nCommon inputs: text, email, password, number, checkbox, radio, file, hidden\nOther controls: <select> + <option>, <textarea>, <button type="submit">\n\nAlways pair <label for="id"> with <input id="id"> for accessibility.' },
        { title: 'Semantic HTML',      desc: 'header, nav, main, article, section, footer', info: 'Semantic elements describe meaning, not appearance:\n<header> — top of page or section\n<nav> — navigation links\n<main> — primary content (one per page)\n<section> — thematic grouping\n<article> — self-contained content\n<aside> — sidebar/complementary\n<footer> — bottom of page or section\n\nBenefit: better SEO, accessibility, and readable code.' },
        { title: 'Media Elements',     desc: 'Audio, video and iframe embeds', info: '<video src="file.mp4" controls autoplay muted loop>\n<audio src="file.mp3" controls>\n<iframe src="https://..." width="560" height="315">\n\nAlways add controls attribute for usability.\nFor YouTube embeds, use the embed URL (not the watch URL).\nautoplay usually requires muted to work in modern browsers.' },
        { title: 'Meta & SEO Tags',    desc: 'Head tags that help search engines', info: 'Essential meta tags:\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="Page description">\n<title>Page Title | Site Name</title>\n\nOpen Graph (social sharing):\n<meta property="og:title" content="...">\n<meta property="og:image" content="...">' },
        { title: 'Accessibility',      desc: 'ARIA roles, alt text and keyboard nav', info: 'Core principles (WCAG):\n• Perceivable — alt text, captions, sufficient contrast\n• Operable — keyboard navigable, no seizure-inducing flashes\n• Understandable — clear labels, consistent navigation\n• Robust — valid HTML, ARIA landmarks\n\nKey ARIA attributes: role, aria-label, aria-labelledby, aria-hidden, tabindex\nAlways test with a screen reader (NVDA, VoiceOver).' },
      ],
    },
    css: {
      icon: '🎨', name: 'CSS Quest', tag: 'WORLD 02', color: 'purple',
      sub: 'Style the web with colors, layouts, and animations',
      quests: [
        { title: 'Selectors & Specificity', desc: 'Class, ID, pseudo and combinators', info: 'Selectors: element, .class, #id, [attr], ::pseudo-element, :pseudo-class\nCombinatores: space (descendant), > (child), + (adjacent), ~ (sibling)\n\nSpecificity order (low→high): element < class < ID < inline < !important\n\nBEM naming: .block__element--modifier keeps specificity flat and predictable.' },
        { title: 'Box Model',              desc: 'Margin, padding, border and width', info: 'Every element is a box:\ncontent → padding → border → margin\n\nbox-sizing: border-box makes width include padding + border (use globally).\n\nMargin collapse: vertical margins between block elements collapse to the larger value.\nOutline does NOT affect layout (useful for debugging).' },
        { title: 'Flexbox',               desc: 'One-dimensional layout with flex', info: 'Container: display:flex\n• flex-direction: row | column\n• justify-content: flex-start | center | space-between | space-around\n• align-items: stretch | center | flex-start | flex-end\n• gap: adds space between items\n\nItem: flex: 1 (grow to fill), flex-shrink, flex-basis, align-self, order' },
        { title: 'CSS Grid',              desc: 'Two-dimensional layout system', info: 'Container: display:grid\n• grid-template-columns: repeat(3, 1fr) | 200px auto 1fr\n• grid-template-rows, gap, place-items\n\nItem: grid-column: 1 / 3 (span 2 cols), grid-row, place-self\n\nfr unit = fractional unit of available space.\nauto-fill vs auto-fit with minmax() for responsive grids without media queries.' },
        { title: 'Responsive Design',     desc: 'Media queries and mobile-first CSS', info: 'Mobile-first: write base styles for small screens, use min-width breakpoints to scale up.\n\nCommon breakpoints: 480px, 768px, 1024px, 1280px\n\n@media (min-width: 768px) { ... }\n\nFluid techniques: %, vw/vh units, clamp(min, preferred, max), auto-fill grids.\nAlways include: <meta name="viewport" content="width=device-width, initial-scale=1">' },
        { title: 'Typography',            desc: 'Fonts, sizing, line-height and spacing', info: 'Font loading: @import Google Fonts or @font-face for self-hosted.\n\nKey properties: font-family, font-size, font-weight, line-height (use unitless, e.g. 1.5), letter-spacing, text-transform, text-align.\n\nResponsive type: use rem (relative to root), clamp() for fluid sizes.\nMinimum body font-size: 16px for readability.' },
        { title: 'Colors & Variables',    desc: 'CSS custom properties and color systems', info: 'CSS Variables: --variable-name: value; then use var(--variable-name)\nDeclare on :root for global scope.\n\nColor formats: hex (#fff), rgb(255,255,255), hsl(240, 100%, 50%), oklch (modern)\nTransparency: rgba(), hsla(), or #ffffff80 (hex with alpha)\n\nTip: build a color system with --color-primary, --color-bg, --color-text etc.' },
        { title: 'Transitions & Animations', desc: 'CSS keyframes and smooth effects', info: 'Transition: transition: property duration easing delay\nExample: transition: all 0.3s ease;\n\nAnimation: @keyframes name { from {} to {} } then animation: name 1s ease infinite;\n\nPerformance: only animate transform and opacity — they use the GPU compositor.\nprefers-reduced-motion media query lets you respect accessibility settings.' },
        { title: 'Positioning',           desc: 'static, relative, absolute, fixed, sticky', info: 'static — default, in normal flow.\nrelative — offset from its normal position; creates stacking context.\nabsolute — removed from flow; positioned relative to nearest non-static ancestor.\nfixed — relative to viewport; stays on scroll.\nsticky — hybrid: relative until scroll threshold, then fixed.\n\nz-index only works on non-static elements.' },
        { title: 'Modern CSS',            desc: ':is(), :where(), container queries, layers', info: 'Newer features now well-supported:\n:is(.a, .b) — matches any selector in list (inherits highest specificity)\n:where() — same but zero specificity\n:has() — parent selector! a:has(> img) selects <a> containing <img>\n\n@container queries — style based on parent size, not viewport.\n@layer — explicit cascade layers to manage specificity at scale.' },
      ],
    },
    js: {
      icon: '⚡', name: 'JS Quest', tag: 'WORLD 03', color: 'yellow',
      sub: 'Breathe life into web pages with JavaScript',
      quests: [
        { title: 'Variables & Data Types', desc: 'let, const, primitives and type coercion', info: 'Declarations: var (avoid), let (block-scoped, reassignable), const (block-scoped, no reassign)\n\nPrimitive types: string, number, boolean, null, undefined, symbol, bigint\nReference types: object, array, function\n\ntypeof null === "object" is a historic bug.\nLoose == does type coercion; always use strict === in production.' },
        { title: 'Functions',              desc: 'Declarations, expressions and arrow functions', info: 'Declaration: function name(params) {} — hoisted.\nExpression: const fn = function() {} — not hoisted.\nArrow: const fn = (params) => expression — no own this.\n\nDefault params: function greet(name = "Hero") {}\nRest params: function sum(...nums) {}\nSpread: Math.max(...arr)\n\nPure functions: same input → same output, no side effects.' },
        { title: 'DOM Manipulation',       desc: 'querySelector, createElement and innerHTML', info: 'Select: document.querySelector(".class") — first match\ndocument.querySelectorAll("li") — NodeList\ndocument.getElementById("id")\n\nCreate: document.createElement("div")\nInsert: parent.appendChild(el), parent.insertBefore(el, ref), el.remove()\n\nContent: el.textContent (safe), el.innerHTML (XSS risk — sanitize user input!)\nAttributes: el.setAttribute("href", "#"), el.dataset.value' },
        { title: 'Events',                 desc: 'addEventListener, bubbling and delegation', info: 'Add listener: el.addEventListener("click", handler)\nRemove: el.removeEventListener("click", handler) — needs same function reference\n\nEvent object: e.target (element clicked), e.currentTarget (element with listener), e.preventDefault(), e.stopPropagation()\n\nBubbling: events bubble up the DOM tree.\nEvent delegation: attach ONE listener to a parent, check e.target inside.' },
        { title: 'Arrays & Methods',       desc: 'map, filter, reduce, find and more', info: 'Mutation methods: push, pop, shift, unshift, splice, sort, reverse\nNon-mutation (return new array): map, filter, slice, concat, flat, flatMap\nSearch: find, findIndex, indexOf, includes, some, every\nAggregation: reduce(accumulator, currentValue)\n\nDestructuring: const [a, b, ...rest] = arr\nSpread: [...arr1, ...arr2]\nArray.from(nodeList) to convert NodeList to array' },
        { title: 'Objects & Classes',      desc: 'Object methods, prototypes and ES6 classes', info: 'Object literal: { key: value, method() {} }\nShorthand: const name = "Hero"; const obj = { name } // same as { name: name }\nDestructuring: const { username, xp = 0 } = user\nSpread: const updated = { ...user, xp: 100 }\n\nclass Hero {\n  constructor(name) { this.name = name; }\n  greet() { return `Hi, ${this.name}`; }\n}\nclass Wizard extends Hero { ... }' },
        { title: 'Async JS',               desc: 'Promises, async/await and the event loop', info: 'Call stack + Web APIs + callback queue = event loop.\nMacrotasks: setTimeout, setInterval\nMicrotasks: Promise.then (run before macrotasks)\n\nPromise: new Promise((resolve, reject) => {})\nChaining: promise.then(...).catch(...).finally(...)\nAsync/await: async function load() { const data = await fetch(url); }\nParallel: await Promise.all([p1, p2]) — all or nothing\nPartial: await Promise.allSettled([p1, p2]) — all results' },
        { title: 'Fetch API',              desc: 'HTTP requests, JSON parsing and error handling', info: 'Basic GET:\nconst res = await fetch("/api/data");\nconst data = await res.json();\nif (!res.ok) throw new Error(res.statusText);\n\nPOST with JSON:\nawait fetch("/api", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ key: value })\n});\n\nAlways check res.ok — fetch only rejects on network failure, not 4xx/5xx.' },
        { title: 'Local Storage',          desc: 'Persist data in the browser', info: 'API: localStorage.setItem(key, value), getItem(key), removeItem(key), clear()\nNote: only stores strings — JSON.stringify/parse for objects.\n\nsessionStorage — same API but clears when tab closes.\ncookies — sent with every HTTP request, have expiry.\nindexedDB — async, structured, for large datasets.\n\nNever store sensitive data (tokens etc.) in localStorage in high-security apps — httpOnly cookies are safer.' },
        { title: 'Error Handling',         desc: 'try/catch, custom errors and debugging', info: 'try { } catch (err) { } finally { }\nerr.name — error type (TypeError, ReferenceError...)\nerr.message — human-readable description\nerr.stack — full stack trace\n\nCustom error: class ValidationError extends Error { constructor(msg) { super(msg); this.name = "ValidationError"; } }\n\nDebugging tools:\nconsole.log / warn / error / table / group\ndebugger; statement\nChrome DevTools: breakpoints, watch expressions, network tab' },
      ],
    },
    os: {
      icon: '💻', name: 'Operating Systems', tag: 'WORLD 04', color: 'blue',
      sub: 'Understand the software that runs the machine',
      quests: [
        { title: 'What is an OS?',         desc: 'Role, types and history of operating systems', info: 'An OS is software that manages hardware resources and provides services to programs.\n\nCore roles: process management, memory management, file system, I/O, security.\n\nTypes: batch, time-sharing, real-time, distributed, embedded.\nExamples: Windows NT, Linux (monolithic kernel), macOS (XNU hybrid kernel), Android.' },
        { title: 'Processes & Threads',    desc: 'PCB, states, context switching', info: 'Process: a program in execution. Each has its own memory space.\nThread: lightweight unit within a process — shares memory with siblings.\n\nProcess states: New → Ready → Running → Waiting → Terminated\nPCB (Process Control Block): stores PID, state, registers, memory pointers.\nContext switch: OS saves/restores PCB when switching CPU between processes.' },
        { title: 'CPU Scheduling',         desc: 'FCFS, SJF, Round Robin, Priority', info: 'FCFS — First Come First Served: simple, convoy effect.\nSJF — Shortest Job First: optimal average wait time, needs burst time prediction.\nRound Robin: each process gets a time quantum; fair, good for time-sharing.\nPriority: higher priority runs first; risk of starvation → use aging.\nMLFQ (Multi-Level Feedback Queue): adapts priority based on behavior.' },
        { title: 'Memory Management',      desc: 'Paging, segmentation and virtual memory', info: 'Physical memory is divided into frames; virtual memory into pages (same size).\nPage table maps virtual pages → physical frames.\nTLB (Translation Lookaside Buffer) caches recent translations for speed.\n\nVirtual memory: allows programs larger than RAM using swap space.\nPage fault: page not in RAM → OS loads it from disk.\nFragmentation: internal (within page), external (between segments).' },
        { title: 'File Systems',           desc: 'inodes, directories, FAT, ext4, NTFS', info: 'File system organizes data on disk into files and directories.\ninode: data structure storing file metadata (permissions, size, timestamps, block pointers).\n\nFAT32 — simple, wide compatibility, max 4GB file.\nNTFS — Windows default, journaling, permissions, large files.\next4 — Linux default, journaling, extents, fast.\nZFS/Btrfs — modern, checksumming, snapshots, RAID built-in.' },
        { title: 'Deadlocks',              desc: 'Conditions, prevention and detection', info: 'Deadlock: two or more processes wait forever for resources held by each other.\n\nNecessary conditions (all 4 must hold):\n1. Mutual exclusion\n2. Hold and wait\n3. No preemption\n4. Circular wait\n\nStrategies:\n• Prevention — eliminate one condition\n• Avoidance — Banker\'s Algorithm (safe state)\n• Detection — resource allocation graph + recovery\n• Ignore — ostrich algorithm (used in some OS!)' },
        { title: 'Synchronization',        desc: 'Race conditions, mutexes and semaphores', info: 'Race condition: output depends on the timing of concurrent operations.\nCritical section: code accessing shared resources — must be mutually exclusive.\n\nMutex (lock): only one thread holds it at a time.\nSemaphore: integer counter; wait() decrements, signal() increments.\nBinary semaphore ≈ mutex.\n\nMonitor: high-level construct with built-in mutual exclusion (Java synchronized).\nDeadlock can occur with locks — always acquire in consistent order.' },
        { title: 'I/O Systems',            desc: 'Device drivers, DMA, interrupts', info: 'I/O methods:\nProgrammed I/O — CPU polls device status (busy-wait, wasteful).\nInterrupt-driven — device interrupts CPU when ready.\nDMA (Direct Memory Access) — device transfers data to RAM directly, then interrupts.\n\nDevice driver: OS module translating generic requests to device-specific commands.\nBuffering: kernel buffers I/O to smooth out speed differences.\nSpooling: queue for slow devices (e.g., printer queue).' },
        { title: 'Virtualization',         desc: 'Hypervisors, VMs and containers', info: 'Virtualization: run multiple OS instances on one physical machine.\n\nType 1 Hypervisor (bare metal): runs directly on hardware. Examples: VMware ESXi, KVM, Hyper-V.\nType 2 Hypervisor (hosted): runs on a host OS. Examples: VirtualBox, VMware Workstation.\n\nContainers (Docker): share host OS kernel, isolated via namespaces + cgroups. Lighter than VMs.\nVM provides full isolation; container provides process isolation.\nOrchestration: Kubernetes manages containers at scale.' },
        { title: 'Security & Protection',  desc: 'Access control, privilege rings and exploits', info: 'Protection rings: Ring 0 (kernel, full access) → Ring 3 (user space, restricted).\nSystem calls: user programs ask the kernel to perform privileged operations.\n\nAccess control: DAC (Discretionary — Unix permissions), MAC (Mandatory — SELinux).\nCommon vulnerabilities: buffer overflow, privilege escalation, race condition (TOCTOU).\nASLR (Address Space Layout Randomization) — randomizes memory addresses to hinder exploits.\nSecure boot, code signing, sandboxing limit damage from compromised processes.' },
      ],
    },
    algo: {
      icon: '🧮', name: 'Algorithms', tag: 'WORLD 05', color: 'green',
      sub: 'Think computationally and solve problems efficiently',
      quests: [
        { title: 'Big-O Notation',          desc: 'Time & space complexity analysis', info: 'Big-O describes the worst-case growth rate of an algorithm as input size n → ∞.\n\nCommon complexities (fast → slow):\nO(1) — constant (hash map lookup)\nO(log n) — logarithmic (binary search)\nO(n) — linear (single loop)\nO(n log n) — linearithmic (merge sort)\nO(n²) — quadratic (nested loops)\nO(2ⁿ) — exponential (recursive subsets)\n\nDrop constants and lower-order terms: O(2n + 5) → O(n)' },
        { title: 'Arrays & Strings',        desc: 'Two pointers, sliding window, prefix sums', info: 'Two pointers: use left/right pointers converging for sorted array problems. O(n).\nSliding window: maintain a window [l, r] over array/string for subarray/substring problems.\nPrefix sum: precompute cumulative sums so range-sum queries are O(1).\n\nCommon patterns:\n• Reverse a string in-place\n• Find duplicates with a Set\n• Anagram check with frequency map\n• Longest substring without repeating chars (sliding window)' },
        { title: 'Sorting Algorithms',      desc: 'Bubble, merge, quick and counting sort', info: 'Bubble sort: O(n²) — compare adjacent, swap. Simple but slow.\nInsertion sort: O(n²) avg, O(n) best — good for nearly-sorted data.\nMerge sort: O(n log n) stable — divide & conquer, needs O(n) space.\nQuick sort: O(n log n) avg, O(n²) worst — in-place, great cache performance.\nHeap sort: O(n log n) — in-place but not stable.\nCounting/Radix/Bucket: O(n+k) — linear for restricted ranges.\n\nStable sort preserves order of equal elements.' },
        { title: 'Binary Search',           desc: 'Search sorted arrays in O(log n)', info: 'Condition: array must be sorted.\nTemplate:\nlo = 0, hi = n-1\nwhile lo <= hi:\n  mid = (lo + hi) // 2\n  if arr[mid] == target: return mid\n  elif arr[mid] < target: lo = mid + 1\n  else: hi = mid - 1\n\nVariants: find first/last occurrence, search rotated array, binary search on answer (e.g., "minimum capacity").\nKey insight: eliminate half the search space each iteration.' },
        { title: 'Linked Lists',            desc: 'Singly, doubly, Floyd\'s cycle detection', info: 'Node: { value, next } for singly; { value, prev, next } for doubly.\n\nOperations: insert O(1) with pointer, search O(n), delete O(1) with pointer.\nCommon problems:\n• Reverse a linked list (iterative & recursive)\n• Detect cycle: Floyd\'s tortoise & hare — slow/fast pointers meet if cycle exists\n• Find middle: fast moves 2 steps, slow 1 step\n• Merge two sorted lists\n• Remove nth node from end (two-pointer with gap of n)' },
        { title: 'Stacks & Queues',         desc: 'LIFO, FIFO, monotonic stacks', info: 'Stack: LIFO — push/pop from same end. Use for: undo, balanced brackets, DFS.\nQueue: FIFO — enqueue at back, dequeue from front. Use for: BFS, scheduling.\nDeque (double-ended queue): insert/remove from both ends.\n\nMonotonic stack: maintains elements in increasing or decreasing order.\nUse cases: Next Greater Element, Largest Rectangle in Histogram, Daily Temperatures.\n\nImplementation: stack → array + pointer; queue → circular array or linked list.' },
        { title: 'Trees & Graphs',          desc: 'BFS, DFS, trees and traversals', info: 'Tree: connected acyclic graph. Binary tree: each node has at most 2 children.\nBST (Binary Search Tree): left < root < right. Search, insert, delete: O(h).\n\nTraversals: inorder (LNR), preorder (NLR), postorder (LRN), level-order (BFS).\n\nGraph: V vertices, E edges. Directed vs undirected, weighted vs unweighted.\nBFS: queue, explores level by level. Good for shortest path (unweighted).\nDFS: stack/recursion, explores deep first. Good for cycle detection, topological sort.' },
        { title: 'Dynamic Programming',     desc: 'Memoization, tabulation and subproblems', info: 'DP: solve problems by breaking into overlapping subproblems and storing results.\n\nApproach 1 — Memoization (top-down): recursive + cache (dict/array).\nApproach 2 — Tabulation (bottom-up): fill DP table iteratively.\n\nClassic problems:\n• Fibonacci (DP baseline)\n• Coin change (unbounded knapsack)\n• 0/1 Knapsack\n• Longest Common Subsequence (LCS)\n• Longest Increasing Subsequence (LIS)\n• Edit distance\n\nState identification is the hard part — ask: "what changes between subproblems?"' },
        { title: 'Recursion & Backtracking', desc: 'Base cases, call stack and pruning', info: 'Recursion: function calls itself with a smaller subproblem.\nMust have: base case (stops recursion), recursive case (reduces problem).\n\nBacktracking: explore all possibilities, undo choices that lead to dead ends.\nTemplate: choose → explore → unchoose\n\nClassic problems:\n• N-Queens\n• Sudoku solver\n• Permutations and Combinations\n• Word search on a grid\n• Subset sum\n\nPruning: skip branches that can\'t lead to a valid solution — critical for performance.' },
        { title: 'Greedy Algorithms',       desc: 'Local optimal choices and proof techniques', info: 'Greedy: make the locally optimal choice at each step, hoping for global optimum.\nNot always correct — must prove greedy choice property and optimal substructure.\n\nClassic greedy problems:\n• Activity selection (interval scheduling)\n• Fractional knapsack\n• Huffman coding\n• Dijkstra\'s shortest path (greedy + priority queue)\n• Prim\'s / Kruskal\'s MST\n\nProof methods: exchange argument (show swapping doesn\'t improve solution), induction.' },
      ],
    },
    ct: {
      icon: '🧠', name: 'Critical Thinking', tag: 'WORLD 06', color: 'blue',
      sub: 'Reason clearly, argue well, and spot bad logic',
      quests: [
        { title: 'What is Critical Thinking?', desc: 'Definition, importance and core skills', info: 'Critical thinking is the disciplined process of actively analyzing, evaluating, and synthesizing information to form well-reasoned judgments.\n\nCore skills: analysis, interpretation, inference, evaluation, explanation, self-regulation.\n\nWhy it matters in tech: debugging requires hypothesis testing; architecture requires trade-off analysis; code reviews require evidence-based critique.\n\nCharacteristics of a critical thinker: intellectual curiosity, open-mindedness, systematic reasoning, intellectual humility.' },
        { title: 'Logic & Arguments',         desc: 'Premises, conclusions and argument forms', info: 'An argument consists of premises (supporting evidence) and a conclusion.\n\nDeductive: if premises are true, conclusion must be true. (All men are mortal; Socrates is a man; therefore...)\nInductive: premises make conclusion probable but not certain.\nAbductive: inference to the best explanation.\n\nValid vs Sound:\nValid — if premises are true, conclusion must be true (structure is correct).\nSound — valid AND all premises are actually true.\n\nTest any argument: identify premises → check validity → check truth of premises.' },
        { title: 'Logical Fallacies',         desc: 'Ad hominem, straw man, false dichotomy', info: 'A fallacy is an error in reasoning that makes an argument invalid.\n\nCommon fallacies:\n• Ad hominem — attacking the person, not the argument\n• Straw man — misrepresenting opponent\'s position\n• False dichotomy — presenting only 2 options when more exist\n• Appeal to authority — using an authority as sole evidence\n• Slippery slope — assuming one event leads inevitably to extreme outcome\n• Circular reasoning — conclusion used as premise\n• Hasty generalization — drawing broad conclusions from few examples\n• Post hoc — A happened before B, therefore A caused B' },
        { title: 'Cognitive Biases',          desc: 'Confirmation bias, anchoring and framing', info: 'Cognitive biases are systematic errors in thinking that affect judgment.\n\nKey biases:\n• Confirmation bias — seeking info that confirms existing beliefs\n• Anchoring — over-relying on first piece of information\n• Dunning-Kruger effect — low competence leads to overestimation of ability\n• Availability heuristic — judging probability by how easily examples come to mind\n• Sunk cost fallacy — continuing because of past investment\n• Framing effect — decision changes based on how info is presented\n• In-group bias — favoring your own group\n\nCountermeasure: seek disconfirming evidence, slow down, use checklists.' },
        { title: 'Problem Decomposition',     desc: 'Breaking complex problems into parts', info: 'Decomposition: breaking a complex problem into smaller, manageable sub-problems.\n\nTechniques:\n• Top-down: start with the big picture, recursively break down\n• Bottom-up: identify smallest components, combine into larger solutions\n• Divide & conquer: split problem, solve parts independently, combine\n\nTools: mind maps, flowcharts, decision trees, fishbone diagrams.\n\nIn software: functions, modules, microservices all reflect decomposition.\nKey insight: each sub-problem should be solvable independently.' },
        { title: 'Evaluating Evidence',       desc: 'Sources, data quality and peer review', info: 'Not all evidence is equal. Evaluation criteria:\n\nSource quality: peer-reviewed > expert consensus > individual expert > anecdote\nStudy design: RCT > cohort > case-control > case study > opinion\nSample size: larger samples → more reliable statistics\nBias: funding source, selection bias, publication bias, p-hacking\nReplication: single study ≠ fact; replication builds confidence\n\nQuestions to ask:\n• Who conducted this? What\'s their incentive?\n• What was the methodology?\n• Has it been replicated?\n• What do critics say?' },
        { title: 'Decision Making',           desc: 'Decision matrices, risk and trade-offs', info: 'Rational decision making: define problem → gather info → identify alternatives → evaluate → choose → implement → review.\n\nTools:\n• Decision matrix: weight criteria, score options, multiply and sum\n• Cost-benefit analysis: quantify pros and cons\n• Expected value: probability × outcome for uncertain decisions\n• Pre-mortem: imagine failure and work backwards to prevent it\n\nCommon errors: analysis paralysis, HIPPO (Highest Paid Person\'s Opinion), recency bias.\n\nIn tech: architecture decisions, tool selection, build-vs-buy all benefit from structured decision frameworks.' },
        { title: 'Scientific Method',         desc: 'Hypothesis, testing and falsifiability', info: 'The scientific method is a systematic approach to building knowledge.\n\nSteps: Observe → Question → Hypothesize → Predict → Test → Analyze → Conclude → Replicate\n\nKey concepts:\nFalsifiability (Popper): a scientific hypothesis must be capable of being proven false.\nNull hypothesis: assume no effect; require evidence to reject it.\nControl group: isolate the variable being tested.\nBlinding: prevents bias from expectation (single-blind, double-blind).\np-value: probability of results assuming null hypothesis is true (p<0.05 ≠ proof!).' },
        { title: 'Socratic Method',           desc: 'Questioning assumptions through dialogue', info: 'The Socratic method uses probing questions to examine beliefs, expose contradictions, and arrive at deeper understanding.\n\nTypes of Socratic questions:\n• Clarifying: "What do you mean by...?"\n• Probing assumptions: "What are you assuming here?"\n• Probing evidence: "How do you know that?"\n• Alternative perspectives: "What would someone who disagrees say?"\n• Implications: "What follows if that\'s true?"\n• Meta-questions: "Why do you think this question is important?"\n\nIn code reviews and design discussions, Socratic questioning surfaces hidden assumptions.' },
        { title: 'Argumentation & Rhetoric',  desc: 'Ethos, pathos, logos and persuasion', info: 'Rhetoric is the art of effective communication and persuasion.\n\nAristotle\'s appeals:\n• Ethos — credibility ("As an engineer with 10 years experience...")\n• Pathos — emotion ("Imagine losing all your work because of no backups")\n• Logos — logic and evidence ("The data shows a 40% performance gain")\n\nToulmin model of argument:\nClaim → Data (evidence) → Warrant (principle linking data to claim) → Qualifier → Rebuttal\n\nIn tech: writing proposals, presenting architecture decisions, and writing documentation all benefit from structured argumentation.' },
      ],
    },
    stats: {
      icon: '📊', name: 'Stats & Data Science', tag: 'WORLD 07', color: 'green',
      sub: 'Make sense of data and draw valid conclusions',
      quests: [
        { title: 'Descriptive Statistics',    desc: 'Mean, median, mode, variance, std dev', info: 'Descriptive stats summarize a dataset without making inferences.\n\nCentral tendency:\n• Mean: sum / n — sensitive to outliers\n• Median: middle value — robust to outliers\n• Mode: most frequent value\n\nSpread:\n• Range: max - min\n• Variance: average squared deviation from mean\n• Standard deviation: sqrt(variance) — in same units as data\n• IQR (Interquartile Range): Q3 - Q1 — robust spread measure\n\nShapes: symmetric, left-skewed, right-skewed. Skew affects mean vs median relationship.' },
        { title: 'Probability Basics',        desc: 'Events, independence, conditional probability', info: 'Probability: P(A) = favorable outcomes / total outcomes. Range: [0, 1].\n\nRules:\n• Addition: P(A or B) = P(A) + P(B) - P(A and B)\n• Multiplication (independent): P(A and B) = P(A) × P(B)\n• Conditional: P(A|B) = P(A and B) / P(B)\n• Complement: P(not A) = 1 - P(A)\n\nBayes\' Theorem: P(A|B) = P(B|A)×P(A) / P(B)\n\nIndependence: P(A|B) = P(A) — knowing B doesn\'t change probability of A.' },
        { title: 'Distributions',             desc: 'Normal, binomial, Poisson and more', info: 'Normal distribution: bell curve, symmetric, defined by mean (μ) and std dev (σ).\n68-95-99.7 rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ.\n\nBinomial: n trials, probability p of success, counts successes.\nPoisson: count of events in fixed interval (rare events, e.g., server crashes/hour).\nUniform: all outcomes equally likely.\nExponential: time between events in a Poisson process.\n\nCLT (Central Limit Theorem): sample means approach normal distribution regardless of underlying distribution, as n increases.' },
        { title: 'Data Visualization',        desc: 'Charts, when to use them and misleading graphs', info: 'Match chart type to data type and question:\n• Bar chart — compare categories\n• Line chart — trends over time\n• Scatter plot — relationship between two numeric variables\n• Histogram — distribution of one numeric variable\n• Box plot — distribution + outliers across groups\n• Heatmap — correlation matrix or 2D density\n• Pie chart — proportion (use sparingly, max ~5 slices)\n\nCommon misleading techniques: truncated y-axis, dual axes, cherry-picked date ranges, area charts with linear data, confusing correlation for causation.' },
        { title: 'Hypothesis Testing',        desc: 'p-values, null hypothesis, Type I & II errors', info: 'Hypothesis test: assess whether data provides enough evidence against the null hypothesis (H₀).\n\nSteps: State H₀ and H₁ → Choose significance level α (usually 0.05) → Collect data → Calculate test statistic → Compute p-value → Reject or fail to reject H₀.\n\np-value: probability of observing results at least as extreme as the data, assuming H₀ is true.\nNOT the probability that H₀ is true.\n\nType I error (α): reject H₀ when it\'s true (false positive).\nType II error (β): fail to reject H₀ when it\'s false (false negative).\nPower = 1 - β: probability of correctly detecting an effect.' },
        { title: 'Correlation & Causation',   desc: 'Pearson r, confounders and causal inference', info: 'Correlation measures the linear relationship between two variables.\nPearson r: ranges from -1 to +1. r=0 means no linear relationship.\n\n⚠️ Correlation ≠ Causation.\nConfounding variable: a third variable that causes both X and Y.\nExample: ice cream sales and drowning rates correlate (both caused by hot weather).\n\nEstablishing causation requires:\n• Controlled experiment (RCT) — gold standard\n• Temporal precedence — cause before effect\n• Ruling out confounders\n• Dose-response relationship\n• Plausible mechanism\n\nCausal inference tools: A/B testing, instrumental variables, regression discontinuity.' },
        { title: 'Regression Analysis',       desc: 'Linear regression, R², residuals', info: 'Linear regression models the relationship: y = β₀ + β₁x + ε\nβ₀: intercept, β₁: slope, ε: error.\n\nOLS (Ordinary Least Squares): minimizes sum of squared residuals.\nR² (coefficient of determination): proportion of variance in y explained by x. Range [0,1].\nResidual = actual - predicted. Check residual plots for patterns (should be random).\n\nAssumptions (LINE):\n• Linearity\n• Independence of errors\n• Normality of residuals\n• Equal variance (homoscedasticity)\n\nMultiple regression: y = β₀ + β₁x₁ + β₂x₂ + ...' },
        { title: 'A/B Testing',               desc: 'Experiment design, sample size and pitfalls', info: 'A/B test: randomly assign users to control (A) or treatment (B) and measure effect on a metric.\n\nDesign considerations:\n• Define one primary metric before starting\n• Calculate required sample size from: effect size, α, and power (β)\n• Run test for a full business cycle (avoid day-of-week bias)\n• Don\'t stop early based on results (p-hacking)\n\nCommon pitfalls:\n• Network effects (users interact)\n• Novelty effect (users respond to change, not the change itself)\n• Multiple testing without correction (use Bonferroni or FDR)\n• SRM (Sample Ratio Mismatch) — check A:B ratio matches expectation.' },
        { title: 'Data Cleaning',             desc: 'Missing values, outliers and normalization', info: 'Real data is messy. Common issues:\n\nMissing values:\n• MCAR, MAR, MNAR — missingness mechanism matters\n• Options: drop rows, impute (mean/median/mode/model), flag with indicator\n\nOutliers:\n• Detect: Z-score > 3, IQR rule (< Q1-1.5×IQR or > Q3+1.5×IQR)\n• Handle: cap, transform (log), remove if data entry error\n\nNormalization vs Standardization:\n• Min-max scaling: maps to [0,1] — use when distribution unknown\n• Z-score standardization: mean=0, std=1 — use for Gaussian assumptions\n\nDuplicates, type mismatches, inconsistent categories: always audit first.' },
        { title: 'Intro to ML Concepts',      desc: 'Supervised, unsupervised, bias-variance', info: 'Machine Learning: algorithms that learn patterns from data.\n\nSupervised: labeled data → predict output. Regression (continuous) or Classification (discrete).\nUnsupervised: unlabeled data → find structure. Clustering (k-means), dimensionality reduction (PCA).\nReinforcement: agent learns by reward/penalty in environment.\n\nBias-Variance tradeoff:\n• High bias (underfitting): model too simple, misses patterns\n• High variance (overfitting): model memorizes training data, fails on new data\n• Goal: balance with regularization (L1/L2), cross-validation, early stopping.\n\nEvaluation: train/val/test split. Never evaluate on training data.' },
      ],
    },
  };

  /* ─── UTILITIES ─── */
  function showToast(msg, type = 'success') {
    const t = document.getElementById('dqToast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'dq-toast show' + (type === 'error' ? ' toast-error' : '');
    setTimeout(() => { t.className = 'dq-toast'; }, 3000);
  }

  function showXPPopup(amount) {
    const p = document.getElementById('xpPopup');
    if (!p) return;
    p.querySelector('.xp-popup-text').textContent = `+${amount} XP`;
    p.classList.add('show');
    setTimeout(() => p.classList.remove('show'), 1800);
  }

  function closeLevelUp() {
    const o = document.getElementById('levelupOverlay');
    if (o) o.classList.remove('show');
  }
  window.closeLevelUp = closeLevelUp;

  function showLevelUp(level) {
    const o = document.getElementById('levelupOverlay');
    const n = document.getElementById('levelup-num');
    if (!o) return;
    if (n) n.textContent = level;
    o.classList.add('show');
  }

  function renderXPBar(xp) {
    const pct = XPSystem.xpPercent(xp);
    ['xp-bar', 'xp-bar-glow', 'prof-xp-bar', 'prof-xp-glow'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.width = pct + '%';
    });
    const lvl   = XPSystem.calcLevel(xp);
    const inLvl = XPSystem.xpInLevel(xp);
    const toNext = XPSystem.XP_PER_LEVEL - inLvl;

    setTextById('xp-level-display', lvl);
    setTextById('xp-current', inLvl);
    setTextById('xp-next', XPSystem.XP_PER_LEVEL);
    setTextById('xp-to-next', toNext);
    setTextById('prof-xp', xp);
  }

  function setTextById(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ─── DASHBOARD PAGE ─── */
  function initDashboard() {
    if (!document.getElementById('stat-xp')) return;

    API.requireAuth();
    XPSystem.initState();
    loadDashboard();
  }

  async function loadDashboard() {
    try {
      const user = await API.getMe();
      XPSystem.seedFromUser(user);
      renderDashboard();
    } catch (e) {
      renderDashboard();
    }
  }

  function renderDashboard() {
    const s = XPSystem.getState();
    setTextById('welcome-name', s.username);
    setTextById('stat-xp', s.xp);
    setTextById('stat-level', s.level);
    setTextById('stat-streak', s.streak);
    setTextById('stat-quests', XPSystem.totalQuestsDone());
    renderXPBar(s.xp);
    NavUtils.updateTopbar();

    ['html', 'css', 'js'].forEach(w => {
      const ws = XPSystem.worldStats(w);
      setTextById(`${w}-done`, ws.done);
      setTextById(`${w}-pct`, ws.pct + '%');
      const bar = document.getElementById(`${w}-progress`);
      if (bar) bar.style.width = ws.pct + '%';
    });

    renderActivity(s.activity);
  }

  function renderActivity(activity) {
    const list = document.getElementById('activity-list');
    if (!list) return;
    if (!activity || !activity.length) {
      list.innerHTML = '<div class="activity-empty"><i class="bi bi-journal-x fs-3 d-block mb-2"></i>No quests completed yet. Start your adventure!</div>';
      return;
    }
    list.innerHTML = activity.slice(0, 8).map(a => `
      <div class="activity-item">
        <div class="activity-icon"><i class="bi bi-lightning-fill"></i></div>
        <div class="activity-info">
          <div class="activity-text">${a.text}</div>
          <div class="activity-time">${a.time}</div>
        </div>
        <div class="activity-xp">+${a.xp} XP</div>
      </div>
    `).join('');
  }

  /* ─── SUBJECTS / WORLDS PAGE ─── */
  let _currentWorld = 'html';
  let _currentQuestIdx = null;

  function initSubjects() {
    if (!document.getElementById('questList')) return;
    API.requireAuth();
    XPSystem.initState();

    const paramWorld = NavUtils.getParam('world');
    if (paramWorld && QUEST_DATA[paramWorld]) _currentWorld = paramWorld;

    loadSubjects();
  }

  async function loadSubjects() {
    try {
      const user = await API.getMe();
      XPSystem.seedFromUser(user);
    } catch(e) {}
    NavUtils.updateTopbar();
    renderQuestWorld(_currentWorld);
  }

  window.renderQuestWorld = function(world) {
    if (!QUEST_DATA[world]) return;
    _currentWorld = world;
    const data   = QUEST_DATA[world];
    const quests = XPSystem.getState().quests[world] || new Array(10).fill(false);
    const ws     = XPSystem.worldStats(world);

    setTextById('worldIcon', data.icon);
    setTextById('worldTitle', data.name);
    setTextById('worldSub', data.sub);
    setTextById('worldPct', ws.pct + '% Complete');
    setTextById('worldXPBadge', `${ws.xpEarned} / 100 XP`);

    const fill = document.getElementById('worldProgressFill');
    if (fill) fill.style.width = ws.pct + '%';

    const list = document.getElementById('questList');
    if (!list) return;
    list.innerHTML = data.quests.map((q, i) => `
      <div class="quest-card ${quests[i] ? 'completed' : ''}" id="qcard-${i}">
        <div class="qc-left">
          <div class="qc-num">${String(i + 1).padStart(2, '0')}</div>
          <div class="qc-body">
            <div class="qc-title" onclick="openTopicModal('${world}', ${i})" style="cursor:pointer">${q.title}</div>
            <div class="qc-desc">${q.desc}</div>
          </div>
        </div>
        <div class="qc-right">
          <span class="qc-xp">+10 XP</span>
          <button class="qc-btn ${quests[i] ? 'done' : ''}" id="qbtn-${i}" onclick="toggleQuest('${world}', ${i})">
            ${quests[i] ? '<i class="bi bi-check-circle-fill"></i> Done' : '<i class="bi bi-circle"></i> Mark Done'}
          </button>
        </div>
      </div>
    `).join('');
  };

  window.toggleQuest = async function(world, index) {
    const btn  = document.getElementById(`qbtn-${index}`);
    const card = document.getElementById(`qcard-${index}`);
    if (!btn || btn.disabled) return;

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';

    try {
      const result = await XPSystem.completeQuest(world, index, showLevelUp);
      NavUtils.updateTopbar();
      renderQuestWorld(world);
      if (result.toggled) {
        showXPPopup(XPSystem.XP_PER_QUEST);
        showToast('Quest complete! +10 XP ⚡');
      } else {
        showToast('Quest unmarked', 'info');
      }
      // Close modal if open
      closeTopicModal();
    } catch(e) {
      showToast('Failed to save. Try again.', 'error');
      renderQuestWorld(world);
    }
  };

  /* Topic modal */
  window.openTopicModal = function(world, index) {
    const data  = QUEST_DATA[world];
    if (!data) return;
    const quest = data.quests[index];
    if (!quest) return;
    _currentQuestIdx = index;

    setTextById('modalWorld', `${data.icon} ${data.name}`);
    setTextById('modalTitle', quest.title);
    setTextById('modalDesc', quest.desc);
    setTextById('modalInfo', quest.info);

    const quests = XPSystem.getState().quests[world] || [];
    const isDone = quests[index];
    const btn = document.getElementById('modalMarkDone');
    if (btn) {
      btn.textContent = isDone ? '✅ Already Done!' : '⚔️ Mark as Done';
      btn.disabled = !!isDone;
      btn.onclick = () => window.toggleQuest(world, index);
    }

    const overlay = document.getElementById('topicModal');
    if (overlay) overlay.classList.add('show');
  };

  window.closeTopicModal = function() {
    const overlay = document.getElementById('topicModal');
    if (overlay) overlay.classList.remove('show');
  };

  // Close modal on overlay click
  document.addEventListener('click', (e) => {
    const overlay = document.getElementById('topicModal');
    if (overlay && e.target === overlay) closeTopicModal();
  });

  /* ─── PROFILE PAGE ─── */
  function initProfile() {
    if (!document.getElementById('prof-username')) return;
    API.requireAuth();
    XPSystem.initState();
    loadProfile();
  }

  async function loadProfile() {
    try {
      const user = await API.getMe();
      XPSystem.seedFromUser(user);
    } catch(e) {}
    renderProfile();
  }

  function renderProfile() {
    const s = XPSystem.getState();
    NavUtils.updateTopbar();

    setTextById('prof-username', s.username);
    setTextById('prof-level', s.level);
    setTextById('prof-title', XPSystem.profileTitle(s.level));
    renderXPBar(s.xp);

    setTextById('p-stat-xp', s.xp);
    setTextById('p-stat-quests', XPSystem.totalQuestsDone());
    setTextById('p-stat-streak', s.streak);
    setTextById('p-stat-worlds', XPSystem.worldsActive());

    // Avatar
    document.querySelectorAll('.profile-avatar-big').forEach(el => {
      el.textContent = (s.username || 'H')[0].toUpperCase();
    });

    // World progress bars (only show 3 core on profile)
    ['html', 'css', 'js'].forEach(w => {
      const ws = XPSystem.worldStats(w);
      setTextById(`p-${w}-done`, ws.done);
      setTextById(`p-${w}-pct`, ws.pct + '%');
      setTextById(`p-${w}-xp`, ws.xpEarned);
      const bar = document.getElementById(`p-${w}-bar`);
      if (bar) bar.style.width = ws.pct + '%';
    });

    renderAchievements(s);
  }

  function renderAchievements(s) {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    const total = XPSystem.totalQuestsDone();
    const achievements = [
      { icon: '🌐', name: 'HTML Initiate',   desc: 'Complete first HTML quest',    earned: (s.quests.html||[]).some(Boolean) },
      { icon: '🎨', name: 'CSS Artisan',      desc: 'Complete first CSS quest',     earned: (s.quests.css||[]).some(Boolean) },
      { icon: '⚡', name: 'JS Spark',         desc: 'Complete first JS quest',      earned: (s.quests.js||[]).some(Boolean) },
      { icon: '🏆', name: 'Quest Hunter',     desc: 'Complete 5 quests total',      earned: total >= 5 },
      { icon: '💎', name: 'Dedicated Dev',    desc: 'Complete 15 quests total',     earned: total >= 15 },
      { icon: '🔥', name: 'On Fire',          desc: 'Reach a 3-day streak',         earned: s.streak >= 3 },
      { icon: '⚔️', name: 'Code Knight',      desc: 'Reach Level 5',               earned: s.level >= 5 },
      { icon: '🧙', name: 'Web Wizard',       desc: 'Reach Level 10',              earned: s.level >= 10 },
      { icon: '🌟', name: 'Century Club',     desc: 'Earn 100 XP',                 earned: s.xp >= 100 },
      { icon: '🚀', name: 'World Explorer',   desc: 'Complete quests in 3 worlds',  earned: XPSystem.worldsActive() >= 3 },
    ];

    grid.innerHTML = achievements.map(a => `
      <div class="achievement-card ${a.earned ? 'earned' : 'locked'}">
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
        ${!a.earned ? '<div class="ach-lock">🔒</div>' : ''}
      </div>
    `).join('');
  }

  window.resetProgress = async function() {
    if (!confirm('Reset all progress? This cannot be undone.')) return;
    try {
      await XPSystem.reset();
      showToast('Progress reset!');
      renderProfile();
      NavUtils.updateTopbar();
    } catch(e) {
      showToast('Reset failed', 'error');
    }
  };

  /* ─── INIT ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    initSubjects();
    initProfile();
  });
})();
