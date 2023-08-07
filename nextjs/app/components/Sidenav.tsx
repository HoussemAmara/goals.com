import Link from 'next/link';
import * as ReactFeather from 'react-feather';

const Sidenav = () => {
  return (
    <nav className="sidenav shadow-right sidenav-light"  aria-label="sidenav">
      <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
              <div className="sidenav-menu-heading d-sm-none">Account</div>
              <a className="nav-link d-sm-none" href="#!">
                  <div className="nav-link-icon"><ReactFeather.Bell/></div>
                  Notifications
                  <span className="badge bg-warning-soft text-warning ms-auto">4 New!</span>
              </a>
              <div className="sidenav-menu-heading">Main Dashboard</div>
              <Link className="nav-link" href="/">
                  <div className="nav-link-icon"><ReactFeather.Layout/></div>
                  Dashboard
              </Link>
              <Link className="nav-link collapsed active" href="/prospects" data-bs-target="#collapseProspects" aria-expanded="false" aria-controls="collapseProspects">
                  <div className="nav-link-icon"><ReactFeather.Database/></div>
                  Prospects
                  <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
              </Link>
              <div className="collapse show" id="collapseProspects" data-bs-parent="#accordionSidenav">
                  <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavProspectsMenu" aria-label="prospectsnav">
                      <a className="nav-link" data-bs-toggle="collapse" data-bs-target="#prospectsCollapseCustomer" aria-expanded="false" aria-controls="prospectsCollapseCustomer">
                          Customer (B2C)
                          <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
                      </a>
                      <div className="collapse" id="prospectsCollapseCustomer" data-bs-parent="#accordionSidenavProspectsMenu">
                          <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesAuth" aria-label="customerprospectsnav">
                              <a className="nav-link" href="customerDatabase">
                                  Database
                              </a>
                              <a className="nav-link" data-bs-toggle="collapse" data-bs-target="#prospectsCustomerAdd" aria-expanded="false" aria-controls="prospectsCustomerAdd">
                                  Add Database
                                  <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
                              </a>
                              <div className="collapse" id="prospectsCustomerAdd" data-bs-parent="#accordionSidenavPagesAuth">
                                  <nav className="sidenav-menu-nested nav" aria-label="adddbcustomerprospectsnav">
                                      <a className="nav-link" href="customerAddDatabaseIqualif">Iqualif</a>
                                      <a className="nav-link" href="customerAddDatabasePhoneExtractor">Phone Extractor</a>
                                  </nav>
                              </div>
                          </nav>
                      </div>
                      <Link className="nav-link collapsed active" href="/prospects/business" data-bs-target="#prospectsCollapseBusiness" aria-expanded="false" aria-controls="prospectsCollapseBusiness">
                          Business (B2B)
                          <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
                      </Link>
                      <div className="collapse show" id="prospectsCollapseBusiness" data-bs-parent="#accordionSidenavProspectsMenu">
                          <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesAuth" aria-label="businessprospectsnav">
                              <a className="nav-link" data-bs-toggle="collapse" data-bs-target="#prospectsBusinessAdd" aria-expanded="false" aria-controls="prospectsBusinessAdd">
                                  Add Database
                                  <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
                              </a>
                              <div className="collapse" id="prospectsBusinessAdd" data-bs-parent="#accordionSidenavPagesAuth">
                                  <nav className="sidenav-menu-nested nav" aria-label="adddbbusinessprospectsnav">
                                      <a className="nav-link" href="businessAddDatabaseAdhoc">Ad Hoc</a>
                                      <a className="nav-link" href="businessAddDatabaseIqualif">Iqualif</a>
                                      <a className="nav-link" href="businessAddDatabasePhoneExtractor">Phone Extractor</a>
                                  </nav>
                              </div>
                          </nav>
                      </div>
                      <Link className="nav-link" href="/prospects/do_not_call">Do Not Call</Link>
                  </nav>
              </div>
              <a className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapseOrders" aria-expanded="false" aria-controls="collapseOrders">
                  <div className="nav-link-icon"><ReactFeather.Clipboard/></div>
                  Orders
                  <span className="badge bg-primary-soft text-primary ms-auto">5 New!</span>
                  <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
              </a>
              <div className="collapse" id="collapseOrders" data-bs-parent="#accordionSidenav">
                  <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavOrdersMenu" aria-label="ordersnav">
                      <Link className="nav-link" href="/orders">Orders</Link>
                      <Link className="nav-link" href="/orders/clients">Clients</Link>
                      <Link className="nav-link" href="/orders/salesman">Salesmen</Link>
                  </nav>
              </div>
              <a className="nav-link" href="agents">
                  <div className="nav-link-icon"><ReactFeather.Users/></div>
                  Agents
              </a>
              <a className="nav-link" href="human_resources">
                  <div className="nav-link-icon"><ReactFeather.Award/></div>
                  Human Resources
              </a>
              <a className="nav-link" href="campaigns">
                  <div className="nav-link-icon"><ReactFeather.PhoneCall/></div>
                  Campaigns
              </a>
              <div className="sidenav-menu-heading">System</div>
              <a className="nav-link" href="admin:index"  target="_blank">
                  <div className="nav-link-icon"><ReactFeather.Lock/></div>
                  Super admin
              </a>
              <a className="nav-link" href="http://127.0.0.1:3000" target="_blank">
                  <div className="nav-link-icon"><ReactFeather.Activity/></div>
                  Monitoring
              </a>
              <a className="nav-link" href="settings">
                  <div className="nav-link-icon"><ReactFeather.Settings/></div>
                  Settings
              </a>
              <div className="sidenav-menu-heading">User</div>
              <a className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapseFlows" aria-expanded="false" aria-controls="collapseFlows">
                  <div className="nav-link-icon"><ReactFeather.User/></div>
                  User
                  <div className="sidenav-collapse-arrow"><ReactFeather.ChevronDown/></div>
              </a>
              <div className="collapse" id="collapseFlows" data-bs-parent="#accordionSidenav">
                  <nav className="sidenav-menu-nested nav" aria-label="usernav">
                      <a className="nav-link" href="user">Profile</a>
                      <a className="nav-link" href="userNotifications">Notifications</a>
                  </nav>
              </div>
          </div>
      </div>
  </nav>
  );
};

export default Sidenav;