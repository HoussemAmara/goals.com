export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="layoutAuthentication" className="bg-primary">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
