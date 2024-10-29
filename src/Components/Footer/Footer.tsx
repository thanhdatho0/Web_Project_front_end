import AdditionInfoLayout from "./PoliciesAndMore/AdditionInfoLayout.tsx";
import FooterCertificates from "./FooterCertificates/FooterCertificates.tsx";

const Footer = () => {
  return (
    <footer className="w-full pt-6 pb-6 bg-[#1c2430] text-[#fff]">
      <div className="footer-content lg:w-[85%] mx-auto pt-3">
        <AdditionInfoLayout />
        <hr />
        <FooterCertificates />
      </div>
    </footer>
  );
};

export default Footer;
