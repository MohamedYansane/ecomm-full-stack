//this file gonna reflet to all  my (auth) or (routes) files
//as it describes in next js route group how to well structured
export default function AuthLayout({
  //it accept the children and the props of those children
  //are reactNode type
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}
