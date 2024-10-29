import ContactMethod from "./ContactMethod.tsx";
import MethodData from "./ContactMethodDatas.json";

const ContactMethodList = () => {
  return (
    <div>
      <ul>
        {MethodData.map((m) => (
          <li>
            <ContactMethod
              href={m.href}
              icon={m.icon}
              title={m.tilte}
              method={m.method}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMethodList;
