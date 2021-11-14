import Link from "next/link";

export const ConsoleNavBar = ({

}) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid">
        <Link href=""><a className="navbar-brand">MinimalDesk</a></Link>
        <button 
          className="navbar-toggler" 
          type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <Link href="/overview"><a className="nav-link">Overview</a></Link>
            <Link href="/guides"><a className="nav-link">Guides <i className="bi bi-box-arrow-up-right"></i></a></Link>
          </div>
        </div>
        
      </div>
    </nav>
  );
}
