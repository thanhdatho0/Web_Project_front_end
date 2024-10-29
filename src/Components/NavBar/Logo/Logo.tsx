
interface Props {
    logo_src: string;
}

const Logo = ({logo_src}: Props) => {
  return (
    <div className='logo-image'>
        <img src={logo_src} alt="" height={24}/>
    </div>
  )
}

export default Logo