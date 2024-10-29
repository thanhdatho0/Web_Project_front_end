import {NavBarCategoryTitle} from "../../../Category";

interface Props {
    data: NavBarCategoryTitle;
}

const Navigation = ({data}: Props) => {
  return (
    <li><a href={"#"}>{data.name}</a></li>
  )
}

export default Navigation