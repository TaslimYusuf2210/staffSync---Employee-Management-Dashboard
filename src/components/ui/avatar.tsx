interface AvatarProps {
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-2xl',
};

export function Avatar({ firstName, lastName, photoUrl, size = 'sm' }: AvatarProps) {
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`;
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`rounded-full bg-neutral-100 text-neutral-950 font-bold flex items-center justify-center overflow-hidden shrink-0 ${sizeClass}`}
    >
      {photoUrl ? (
        <img className="w-full h-full object-cover grayscale" src={photoUrl} alt="" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
