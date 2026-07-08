const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'One number', test: (v: string) => /[0-9]/.test(v) },
  { label: 'One special character', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export function PasswordStrength({ value }: { value: string }) {
  const passed = PASSWORD_RULES.filter((r) => r.test(value)).length;
  const strength = value.length === 0 ? 0 : passed / PASSWORD_RULES.length;

  const barColor =
    strength === 0 ? 'bg-slate-200' :
    strength <= 0.4 ? 'bg-red-400' :
    strength <= 0.8 ? 'bg-amber-400' :
    'bg-[#ccd5ae]';

  const strengthLabel =
    strength === 0 ? '' :
    strength <= 0.4 ? 'Weak' :
    strength <= 0.8 ? 'Fair' :
    'Strong';

  return (
    <div className="mt-2 space-y-2">
      {value.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${(passed / PASSWORD_RULES.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-slate-400 min-w-10 text-right">{strengthLabel}</span>
        </div>
      )}
      <div className="grid grid-cols-1 gap-1">
        {PASSWORD_RULES.map((rule, i) => {
          const met = rule.test(value);
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={`shrink-0 transition-colors duration-200 ${value.length === 0 ? 'text-slate-300' : met ? 'text-green-600' : 'text-red-400'}`}>
                {value.length === 0 ? '○' : met ? '✓' : '✗'}
              </span>
              <span className={`transition-colors duration-200 ${value.length === 0 ? 'text-slate-400' : met ? 'text-slate-600' : 'text-slate-400'}`}>
                {rule.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
