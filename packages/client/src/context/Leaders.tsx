import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {tempUsers} from "../pages/LeadersPage/const";
import {TPlayers} from "../pages/LeadersPage/types";
import {LeadersContextProps} from "./types";

export const LeadersContext = createContext<LeadersContextProps>(null)
export const useLeaders = () => useContext(LeadersContext);

export const LeadersProvider = ({children}: PropsWithChildren) => {
    const [leaders, setLeaders] = useState<TPlayers>(tempUsers)

    return (
        <LeadersContext.Provider value={{leaders, setLeaders}}>
            {children}
        </LeadersContext.Provider>
    )
};
