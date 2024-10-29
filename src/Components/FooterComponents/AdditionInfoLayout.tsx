import pages from "./FooterPagesData.json";
import AdditionInfo from "./AdditionInfo";
import ContactMethods from "./ContactMethods";
import SocialMediaLists from "./SocialMediaLists";

const AdditionInfoLayout = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="row-span-2">
        <AdditionInfo
          title={pages[0].title}
          navigateItems={pages[0].navigateItems}
        />
      </div>
      <div className="row-span-1">
        <AdditionInfo
          title={pages[1].title}
          navigateItems={pages[1].navigateItems}
        />
        <AdditionInfo
          title={pages[2].title}
          navigateItems={pages[2].navigateItems}
        />
      </div>
      <div className="row-span-2 col-span-2">
        <AdditionInfo
          title={pages[3].title}
          navigateItems={pages[3].navigateItems}
        />
        <ContactMethods />
        <SocialMediaLists />
      </div>
    </div>
  );
};

export default AdditionInfoLayout;
