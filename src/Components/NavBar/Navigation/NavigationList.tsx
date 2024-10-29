import {NavBarCategoryTitle} from "../../../Category";
import Navigation from "./Navigation.tsx";

interface Props {
    items: NavBarCategoryTitle[],
}

const NavigationList = ({items}: Props) => {
    return (
        <ul className="flex flex-row gap-5">
            {items && items.map((item) => <Navigation data={item}/>)}
        </ul>
    )
}

export default NavigationList;