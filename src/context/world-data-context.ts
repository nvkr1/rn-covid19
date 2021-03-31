import React from 'react';

type WorldDataContextType = {
    data: IWorldData[],
}
const WorldDataContext = React.createContext<WorldDataContextType>({data: [],});

export default WorldDataContext;