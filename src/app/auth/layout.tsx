const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="h-screen w-screen bg-[#121212] flex">{children}</main>;
};

export default AuthLayout;
