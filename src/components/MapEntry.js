import React from "react";

export class MapEntry extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const entry = <li>{this.props.name}</li>
        return entry;
    }

}