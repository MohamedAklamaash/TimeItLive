
import SearchBar from './SearchBar';
import Actions from './Actions';
import NavLogo from './NavLogo';



function Navbar() {
  
  return (
    <nav className=' flex w-full bg-[#252731] z-50 fixed top-0 justify-between items-center h-20 px-3 lg:px-4 shadow-sm '>
        <NavLogo/>
        <SearchBar/>
        <Actions/>
    </nav>
  )
}

export default Navbar