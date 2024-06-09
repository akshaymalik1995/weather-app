import { createContext } from "react"
import { IStore } from "./types"


const StoreContext = createContext<[IStore, React.Dispatch<any> ] | []>([])
export default StoreContext


