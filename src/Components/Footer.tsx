import AdditionInfoLayout from "./FooterComponents/AdditionInfoLayout";
import FooterCertificates from "./FooterComponents/FooterCertificates";

const Footer = () => {
  return (
    <footer className="w-full pt-6 pb-6 bg-[#1c2430] text-[#fff]">
      <div className="footer-content w-10/12 mx-auto pt-3">
        <AdditionInfoLayout />
        <hr />
        <FooterCertificates />
      </div>
    </footer>
  );
};

export default Footer;
