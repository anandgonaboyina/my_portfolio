import FloatingNavbar from "@/components/FloatingNavbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FloatingNavbar />
    </>
  );
}
