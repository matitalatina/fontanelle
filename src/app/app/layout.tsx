export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app-transition-wrapper" className="flex h-dvh w-full">
      {children}
    </div>
  );
}

