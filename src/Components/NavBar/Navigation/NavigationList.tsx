import WideDropdownMenu from "../../ContentComponents/WideDropdownMenu/WideDropdownMenu";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { targerCustomer } from "../../../api";
import { TargerCustomer } from "../../../Interface";

const NavigationList = () => {
  const [targetcustomers, setTargetcustomers] = useState<TargerCustomer[]>([]); // Store categories
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const response = await targerCustomer();
      if (typeof response === "string") {
        // Handle API returning a string error
        setError(response);
        console.log(error);
      } else {
        // response là mảng Category[], lưu vào state
        setTargetcustomers(response);
      }
      setLoading(false);
    };

    fetchCategory();
  }, []);

  const items = [
    { name: "SALE", navigate: "#" },
    { name: "Mới về", navigate: "#" },
    { name: "Bán chạy", navigate: "/collection" },
    {
      id: targetcustomers[0]?.targetCustomerId,
      name: targetcustomers[0]?.targetCustomerName,
      items: targetcustomers[0]?.categories,
      img: { url: targetcustomers[0]?.url, alt: targetcustomers[0]?.alt },
    },
    {
      id: targetcustomers[1]?.targetCustomerId,
      name: targetcustomers[1]?.targetCustomerName,
      items: targetcustomers[1]?.categories,
      img: { url: targetcustomers[1]?.url, alt: targetcustomers[1]?.alt },
    },
    {
      id: targetcustomers[2]?.targetCustomerId,
      name: targetcustomers[2]?.targetCustomerName,
      items: targetcustomers[2]?.categories,
      img: { url: targetcustomers[2]?.url, alt: targetcustomers[2]?.alt },
    },
    { name: "Bộ sưu tập", navigate: "#" },
    { name: "Đồng phục", navigate: "#" },
    { name: "Tin hot", navigate: "#" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative flex flex-row font-semibold">
        {items.map((item, index) =>
          item.items ? (
            <WideDropdownMenu
              key={index}
              name={item.name}
              items={item.items}
              img={item.img}
              targetId={item.id}
            />
          ) : (
            <Navigation key={index} name={item.name} navigate={item.navigate} />
          )
        )}
      </div>
    </div>
  );
};

export default NavigationList;
