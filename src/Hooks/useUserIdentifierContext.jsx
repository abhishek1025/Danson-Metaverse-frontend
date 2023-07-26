import { useContext } from "react"
import { UserIdentifierContext } from "../context/UserIdentifier.context";


export const useUserIdentifierContext = () => {

    const context = useContext(UserIdentifierContext);

    if (!context) {
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

    return context
}