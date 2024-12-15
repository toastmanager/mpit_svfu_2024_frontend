const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="h-screen w-screen bg-card flex">{children}</main>;
};

export default AuthLayout;
