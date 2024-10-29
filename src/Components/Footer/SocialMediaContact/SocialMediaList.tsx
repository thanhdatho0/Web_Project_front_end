import Icons from "./SocialMedias.json";
import SocialMedia from "./SocialMedia.tsx";

const SocialMediaList = () => {
  return (
    <div className="mt-12">
      <ul className="flex items-center">
        {Icons.map((icon) => (
          <li className="p-2">
            <SocialMedia icon={icon.icon} href={icon.href} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaList;
