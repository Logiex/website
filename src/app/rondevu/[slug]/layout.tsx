export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#EAE2B7] min-h-screen">{children}</div>;
}
