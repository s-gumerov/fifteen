import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState
} from "react";
import type {LeadersContextProps} from "./types";
import {useAppSelector} from '../hooks/useAppDispatch';
import type {TLeaderboard} from '../api/leaderbord';

export const LeadersContext = createContext<LeadersContextProps>(null)
export const useLeaders = () => useContext(LeadersContext);

export const LeadersProvider = ({children}: PropsWithChildren) => {
    const {leaderboard} = useAppSelector(state => state.leaderboard);
    const [leaders, setLeaders] = useState<TLeaderboard | null>(null);

    useEffect(() => {
        if (leaderboard) {
            /* если есть данные для отрисовки тогда сортировка по количеству ходов */
            const unfrozenLeaderboard = [...leaderboard]
                .sort((a, b) => a.data.moves > b.data.moves ? 1 : -1);

            setLeaders(unfrozenLeaderboard);
        }
    }, [leaderboard]);

    return (
        <LeadersContext.Provider value={{leaders, setLeaders}}>
            {children}
        </LeadersContext.Provider>
    )
};
