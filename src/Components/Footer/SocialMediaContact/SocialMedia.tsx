import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  icon: string;
  href: string;
}

const SocialMedia = (props: Props) => {
  return (
    <>
      <a href={props.href} className="h-full w-full block">
        <Icon
          icon={props.icon}
          className="h-full w-full block m-auto"
          width="2em"
          height="2em"
        />
      </a>
    </>
  );
};

export default SocialMedia;
