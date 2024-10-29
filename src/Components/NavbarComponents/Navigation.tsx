interface item{
    name: string,
    navigate: string,
}


interface Props {
    items: item[],
}

const Navigation = ({items}: Props) => {
  return (
    <ul className="flex flex-row gap-5">
        {items.map((item) => <li key={item.name}><a href={item.navigate}>{item.name}</a></li>)}
    </ul>
  )
}

export default Navigation