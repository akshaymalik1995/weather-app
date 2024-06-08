import { FiSun } from "react-icons/fi";
import { useContext } from "react";
import StoreContext from "../app/store";
import { IoMdMoon } from "react-icons/io";
import { toggleDarkMode } from "../app/actions";

export default function DarkModeSwitch() {
    const [globalState, dispatch] = useContext(StoreContext)
    return (
      <div
        onClick={(e) => dispatch(toggleDarkMode())}
        className="bg-blue-50 dark:text-white dark:bg-gray-800  p-2 cursor-pointer rounded "
      >
        {globalState.darkModeOn ? <IoMdMoon /> : <FiSun />}
      </div>
    );
}
