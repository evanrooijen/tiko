type LayoutProps = {
  sidebar: React.ReactNode;
  main: React.ReactNode;
};

const Layout = ({ sidebar, main }: LayoutProps) => {
  return (
    <div className="py-10 px-2 sm:px-6 lg:px-8">
      <main className="container mx-auto flex flex-col gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Locations
        </h1>
        <div className="max-w-xl grid grid-cols-2 gap-4">
          {sidebar}
          {main}
        </div>
      </main>
    </div>
  );
};
export default Layout;
