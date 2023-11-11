import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
          <nav className="navbar navbar-expand-lg bg-dark mb-5" data-bs-theme="dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">NAVIGÁCIÓ:</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Kezdőoldal</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/todoup">Felvitel</Link>
                  </li> 
                </ul>
              </div>
            </div>
          </nav> 
        </>
    );
}

export default Navbar;
