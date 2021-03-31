import React from 'react';

type CountryDataContextType = {
    data: IStatsRecord[]
}

const CountryDataContext = React.createContext<CountryDataContextType>({data: []});

export default CountryDataContext;