import AppBar from './(components)/appbar';
import Footer from './(components)/footer';

const WrapperLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppBar />
      <main className="min-h-[calc(100vh-50px)]">{children}</main>
      <Footer />
    </>
  );
};

export default WrapperLayout;
