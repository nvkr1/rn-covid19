import React from 'react';

type CountryDataContextType = {
    data: IStatsRecord[] | null,
    refresh: () => Promise<void>;
}

const CountryDataContext = React.createContext<CountryDataContextType>({data: [], refresh: async () => {}});

export default CountryDataContext;