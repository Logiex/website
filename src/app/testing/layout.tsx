export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#FF9D14] min-h-screen text-black ">{children}</div>;
}
