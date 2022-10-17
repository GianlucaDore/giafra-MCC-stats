import React from 'react';
import { MapEntry } from './MapEntry';

export class MapList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = { mapNames : this.props.mapNames };
    }

    render()
    {
        const listMaps = this.state.mapNames.map( mapname => {
                return <MapEntry name={mapname} />
        });

        return listMaps;
    }


}
