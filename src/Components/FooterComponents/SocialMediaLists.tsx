import Icons from "./SocialMedias.json";
import SocialMediaLink from "./SocialMediaLink";

const SocialMediaLists = () => {
  return (
    <div className="mt-12">
      <ul className="flex items-center">
        {Icons.map((icon) => (
          <li className="p-2">
            <SocialMediaLink icon={icon.icon} href={icon.href} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaLists;
