
const { createContext, useState } = require("react");

export const UserIdentifierContext = createContext({
    userIdentifier: null,
    setUserIdentifier: () => null
});

export const UserIdentifierContextProvider = ({ children }) => {

    const [userIdentifier, setUserIdentifier] = useState(null)

    const value = { userIdentifier, setUserIdentifier }

    return <UserIdentifierContext.Provider value={value}>{children}</UserIdentifierContext.Provider>
}