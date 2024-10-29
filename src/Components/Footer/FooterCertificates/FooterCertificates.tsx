import info from "../PoliciesAndMore/FooterPagesData.json";
import AdditionInfo from "../PoliciesAndMore/AdditionInfo.tsx";

const FooterCertificates = () => {
  return (
    <div className="grid grid-cols-4 pt-6">
      <div className="col-span-1">
        <AdditionInfo
          title={info[4].title}
          navigateItems={info[4].navigateItems}
        />
      </div>
      <div className="col-span-1"></div>
      <ul className="col-span-2 inline-flex items-center gap-8">
        <li>
          <a href="http://online.gov.vn/(X(1)S(3cind015idpwtett2lzw5aix))/Home/WebDetails/44085?AspxAutoDetectCookieSupport=1">
            <img
              src="https://yody.vn/images/identity-badge/bct_v1.png"
              alt=""
              className="w-auto h-12"
            />
          </a>
        </li>
        <li>
          <a href="https://www.dmca.com/Protection/Status.aspx?ID=d3a2c2c5-a581-451b-b7ff-ff08fee58d6a&refurl=https://yody.vn">
            <img
              src="https://yody.vn/images/identity-badge/dmca_v1.png"
              alt=""
              className="w-auto h-12"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterCertificates;
