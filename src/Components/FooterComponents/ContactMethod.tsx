import { Icon } from "@iconify/react";

interface Props {
  icon: string;
  title: string;
  method: string;
  href: string;
}

const ContactMethod = (props: Props) => {
  return (
    <div className="flex">
      <div className="">
        <a href={props.href} className="block w-full h-full">
          <Icon
            icon={props.icon}
            className="block w-full h-full m-auto"
            width="2em"
            height="2em"
          />
        </a>
      </div>
      <div className="ml-3">
        <ul className="text-[#ccc]">
          <li>
            <a href={props.href}>{props.title}</a>
          </li>
          <li>
            <a href={props.href}>{props.method}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactMethod;
