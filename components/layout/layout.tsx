import MainHeader from "./mainHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}

export default Layout;
