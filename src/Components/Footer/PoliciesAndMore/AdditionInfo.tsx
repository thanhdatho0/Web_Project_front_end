interface navigateItem {
  caption: string;
  href?: string;
}

type Props = {
  title: string;
  navigateItems: navigateItem[];
};

const AdditionInfo = (info: Props) => {
  return (
    <div>
      <h4 className="footer-title font-bold">{info.title}</h4>
      <ul className="mt-6 mb-3">
        {info.navigateItems.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a href={item.href}>
                <p className="pt-2 text-gray-400">{item.caption}</p>
              </a>
            ) : (
              <p className="pt-2 text-white">{item.caption}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionInfo;
