import React, { useEffect, useState } from "react";
import PageLayout from "./parts/PageLayout";

function Homepage() {
  return (
    <PageLayout title={"Üdvözlő oldal"}>
      <div className="col-12 col-lg-6">Kedves felhasználó!</div>
      <div className="col-12 col-lg-6">
        Köszöntelek a Teendő listát készítő oldalamon!
      </div>
    </PageLayout>
  );
}

export default Homepage;
