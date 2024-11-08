interface Props {
  name: string;
  navigate: string;
}

const Navigation: React.FC<Props> = ({ name, navigate }: Props) => {
  return (
    <div className=" relative ">
      <a className="px-4 py-2 flex" href={navigate}>
        {name}
      </a>
    </div>
  );
};

export default Navigation;
