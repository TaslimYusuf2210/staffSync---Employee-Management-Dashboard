# 🏆 Brag Document

A daily log of things I've learned while building StaffSync.

---

## 2026-07-08

### Axios Wrappers vs Raw Axios

Learned the difference between using a pre-configured Axios wrapper vs raw Axios calls.

- **`axios.create()`** lets you pre-configure an instance with a base URL and default headers — every request through it inherits those settings.
- **Interceptors** sit between your code and the network. A _request interceptor_ can auto-attach auth tokens; a _response interceptor_ can normalize errors into a consistent shape.
- A thin wrapper like `request<T>(endpoint, options)` strips out repetition (base URL, headers, token management, error parsing) so each API call is one line.
- Trade-off: less boilerplate vs. more abstraction. Wrappers = consistency across large codebases; raw Axios = more control per call.

---

### `as const` (Const Assertion) in TypeScript

`as const` tells TypeScript to infer the narrowest possible literal type instead of a generic one.

- **Without `as const`**: `['Admin', 'Manager']` is inferred as `string[]` — loose, mutable, no specific value tracking.
- **With `as const`**: `['Admin', 'Manager'] as const` is inferred as `readonly ["Admin", "Manager"]` — frozen tuple with exact values.
- **Practical use**: Define a single source of truth for both runtime values and compile-time types:
  ```ts
  const ROLES = ["Admin", "Manager", "Employee"] as const;
  type Role = (typeof ROLES)[number]; // 'Admin' | 'Manager' | 'Employee'
  ```
- **Why it matters**: Prevents typos, eliminates magic strings, and keeps types in sync with data — no need to maintain a separate `type` and a separate array.

---

## 2026-07-09

### TanStack Query (React Query) — `useMutation`

Learned how to manage server-side mutations with TanStack Query in a multi-step registration flow.

- **`useMutation`** is for creating/updating/deleting data (POST, PUT, DELETE). Different from `useQuery` which is for fetching data (GET).
- **Destructuring**: `const { mutateAsync, isPending } = useMutation({...})` gives you:
  - `mutateAsync` — call this to trigger the mutation (returns a promise you can `await`)
  - `isPending` — boolean that's `true` while the request is in flight, perfect for loading states
- **`mutationFn`** receives exactly **one argument** — whatever you pass to `mutateAsync()`. If your API function takes multiple params, you need a wrapper:
  ```ts
  // ❌ verifyOtp(email, otp) — two args won't work
  // ✅ ({ email, otp }) => verifyOtp(email, otp) — wrapper
  ```
- **`onSuccess` / `onError`** — callbacks that fire after the mutation settles. Used for toasts, step advancement, etc.
- **Multiple mutations** can coexist in the same component, each with their own `isPending` state. Combine them with `||` for a shared loading state.
- **Pattern learned**: Validate form → call `mutateAsync` → on success, advance to next step. This keeps each step's logic clean and separated.

---

## 2026-07-10

### `@` Path Alias in Vite + TypeScript

Learned how to set up and use the `@` import alias to avoid messy relative paths.

- **Configured in two places** — Vite (for the bundler) and `tsconfig.json` (for TypeScript):
  ```ts
  // vite.config.ts
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }

  // tsconfig.app.json
  { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } }
  ```
- **How it works**: `@/components/Button` → Vite resolves to `./src/components/Button` — no more `../../../../components/Button`.
- **Why it's useful**: Relative paths break when you move files. `@/` paths are always relative to `src/`, so they work from any file at any depth. Saves time counting `../` dots and prevents silent import failures.
- **Not Next.js specific** — any Vite project can use it. The alias is just a bundler-level path replacement.

---

## 2026-07-12

### `z.infer` — Extracting Types from Zod Schemas

Learned how `z.infer<typeof schema>` automatically derives TypeScript types from Zod runtime schemas.

- **`z.infer<typeof schema>`** extracts the inferred TypeScript type from any Zod schema — no need to maintain a separate interface alongside the schema.
- **Keeps types in sync**: If you add a field, change validation (e.g. `.min(2)` → `.min(5)`), or make something optional in the schema, the inferred type updates automatically.
- **Pattern**:
  ```ts
  const userSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
  });
  type User = z.infer<typeof userSchema>;
  // { name: string; email: string }
  ```
- **Handles optionals**: `z.string().optional()` → `string | undefined` in the inferred type. `z.string().default("hi")` → `string` (not `undefined`), since the default fills in.
- **Practical benefit**: Single source of truth — change the Zod schema and both runtime validation _and_ TypeScript types update together. No more mismatched interfaces.

---
