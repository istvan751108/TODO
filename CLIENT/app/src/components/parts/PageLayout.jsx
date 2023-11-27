import React from 'react';

const PageLayout = ({ title, children }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8" style={{ marginTop: '50px' }}>
          <div className="card">
            <div className="card-header text-center display-4">
              <b>{title}</b>
            </div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;