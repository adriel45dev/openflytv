import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-800 text-white text-center text-sm p-4">
      <div className="container mx-auto">
        <p>
          © {new Date().getFullYear()} OpenFlyTV. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
