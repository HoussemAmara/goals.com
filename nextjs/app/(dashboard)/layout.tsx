import Topnav from '@/app/components/Topnav';
import Sidenav from '@/app/components/Sidenav';
import Header from '@/app/components/Header';


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div id="layoutDashboard" className="nav-fixed">
      <Topnav sidenav></Topnav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidenav></Sidenav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <Header/>
                <div className="container-xl px-4 mt-n10">
                  {children}
                </div>
            </main>
        </div>
      </div>
    </div>
  )
}
