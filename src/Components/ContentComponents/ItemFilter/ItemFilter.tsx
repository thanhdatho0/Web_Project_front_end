interface ItemFilterProps {
  selectedFilter: { id: string }[];
  onDeleteItem: (filterId: string) => void;
}

const ItemFilter: React.FC<ItemFilterProps> = ({
  selectedFilter,
  onDeleteItem,
}) => {
  return (
    <ul className="flex flex-wrap gap-2 p-0 list-none">
      {selectedFilter.map((filter) => (
        <li key={filter.id} className="inline-block border-dashed">
          <span className="pr-2">{filter.id}</span>
          <button onClick={() => onDeleteItem(filter.id)} className="mr-4">
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ItemFilter;
