interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
        Coming Soon
      </div>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-3 max-w-md text-sm text-gray-500">
        {description ||
          "This section is under development. Check back soon for full management features."}
      </p>
    </div>
  );
}
