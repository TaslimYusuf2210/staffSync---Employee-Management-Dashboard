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

## 2026-07-13

### Query Parameters in GET Requests

Learned the role of `params` in GET requests and how they map to URL query strings.

- **Query parameters** are key-value pairs appended to the URL after `?` (e.g. `GET /employees?search=Brook&department=Design&page=1&limit=10`).
- They are used to **filter, paginate, sort, and search** data without creating separate endpoints for each combination.
- The Axios `params` option automatically serializes an object into a query string — no manual string concatenation needed.
- **Example with typed params:**

  ```ts
  interface EmployeeQueryParams {
    search?: string;
    department?: string;
    page?: number;
    limit?: number;
    sortBy?: "name" | "dept" | "joined";
    sortOrder?: "asc" | "desc";
  }

  getEmployees({ search: "Brook", department: "Design" });
  // → GET /employees?search=Brook&department=Design
  ```

- All params are **optional** — the endpoint works with zero params (returns defaults) or any combination.
- The `request` helper accepts `params` in its options and passes them directly to Axios.

### `placeholderData` in TanStack Query

Learned how `placeholderData` provides fallback data while a query is loading.

- **`placeholderData`** is shown immediately — it's not cached, not persisted, just a temporary stand-in while the real fetch happens.
- Unlike `initialData` (which is treated as cached/real data), `placeholderData` is replaced the moment the actual response arrives.
- **Common use case — keeping previous data while fetching next page:**
  ```ts
  useQuery({
    queryKey: ["employees", { page: 2 }],
    queryFn: () => getEmployees({ page: 2 }),
    placeholderData: (previousData) => previousData,
  });
  ```
  This keeps the page 1 results visible while page 2 loads, avoiding a flash of empty content.
- **Also useful for providing a default shape when data might be undefined:**
  ```ts
  useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardData,
    placeholderData: { totalEmployees: 0, activeEmployees: 0, ... },
  });
  ```

---

## 2026-07-13

### Extracted all `useMutation` calls into dedicated hooks

Every mutation (login, sendOtp, verifyOtp, register, updateSettings, changePassword, createDepartment) now lives in its own hook under `src/hooks/useMutation/`. Hooks handle common logic (toasts, query invalidation) and expose `onSuccess` callbacks for component-specific behavior.

### Built a search-as-you-type employee dropdown

Used `useGetEmployees({ search, limit: 10 })` with a debounce-less text input to power a live dropdown in the department creation dialog. Learned that `{...register()}` spreads contain an `onChange` — custom handlers must go inside `register('field', { onChange: ... })`.

### Separated add/edit dialogs from inline forms

Created a reusable `Dialog` component and split a shared add/edit department form into two independent dialog components with their own state and form instances, replacing an inline form that caused layout shifts.

### Added query invalidation on mutation success

Used `queryClient.invalidateQueries({ queryKey: ['departments'] })` inside `useCreateDepartment` so the department list auto-refreshes after a new department is created — no manual refetch needed.

---

## 2026-07-14

### `unknown` vs `any` in TypeScript

`unknown` is the type-safe counterpart of `any`. Both accept any value, but `unknown` forces you to narrow the type before using it, while `any` disables all checks. Prefer `unknown` over `any` for API responses, user input, or any data you don't control.

```ts
let value: unknown;
value = "hello";
value.toUpperCase(); // ❌ Error — must narrow first

if (typeof value === "string") {
  value.toUpperCase(); // ✅ OK — narrowed to string
}
```

---

### `{...register()}` Spread Overwrites Manual `onChange`

Learned that `{...register('fieldName')}` already contains an `onChange` handler that react-hook-form needs to track the input value. If you add a separate `onChange` prop after the spread, it **overwrites** RHF's onChange — the form field stops updating.

```tsx
// ❌ RHF's onChange is overwritten — form field won't update
<input {...register('head')} onChange={(e) => setHeadSearch(e.target.value)} />

// ✅ Pass custom onChange inside register's options — both run
<input {...register('head', { onChange: (e) => setHeadSearch(e.target.value) })} />
```

The spread (`{...register('head')}`) expands to `{ onChange, onBlur, ref, name }`. Any prop placed **after** the spread with the same name replaces the spread's version. Moving the custom logic into `register()`'s second argument lets RHF wrap its own handler around yours so both execute.

---

### Project Progress — Feature Implementation

Rebuilt the **Add Employee flow** from a simple form into a **multi-step dialog**, then got the full employee lifecycle wired up:

- **Multi-step employee creation** — Replaced the single-form add employee with a multi-step dialog (`3a1998f`), now successfully creating employees end-to-end (`648ef66`).
- **Employees table integrated** — Wired up the employees list page with real backend data via the `getEmployees` service (`ae8486d`).
- **Dropdown click-outside fix** — Added a `menuRef` to the `DropdownMenu` component so clicking inside the menu doesn't close it — only clicks outside both the trigger button and the menu panel dismiss it.
- **Department dialog enhancements** — Added more functionality to the create department dialog (`2ab50e0`).
- **Employee details (in progress)** — Currently building out the individual employee view: added `getEmployeeById` to the employee service, created a new `useGetOneEmployee` hook, and wiring up the "View" action in the employees list table to navigate to employee details.

---
