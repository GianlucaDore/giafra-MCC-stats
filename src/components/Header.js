import React from 'react';

export class Header extends React.Component  // esportazione non default, va importata con { }
{
    render()
    {
        return (
            <h1 id="welcome_header">WELCOME TO GIAFRA STATS</h1>
        );
    }

}