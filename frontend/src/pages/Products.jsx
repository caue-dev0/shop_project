import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { CardProducts } from "../components/CardProducts/CardProducts";

export function Products() {
  return (
    <>
      <NavBar />
      <CardProducts />;
    </>
  );
}
