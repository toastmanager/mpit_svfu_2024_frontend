import AppBar from "./(components)/appbar";
import Footer from "./(components)/footer";

const WrapperLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};

export default WrapperLayout;
