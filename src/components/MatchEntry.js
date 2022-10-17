import React from "react";

export class MatchEntry extends React.Component
{
    constructor(props)
    {
        super(props);

        this.game = this.props.game;
        this.category = this.props.category;
        this.map = this.props.map;
        this.victory = this.props.victory;
        this.kills = this.props.kills;
        this.deaths = this.props.deaths;
        
    }

    render()
    {
        return (  // sebbene l'attributo HTML si chiami "class", nel JSX che si intreccia col javascript, si chiama "className" per evitare confusione con la keyword class di JS.
            <div>
                <li className="MatchEntry">
                    { this.game } 
                    { this.category } 
                    { this.map } 
                    { this.victory } 
                    { this.kills } 
                    { this.deaths }
                </li>    
            </div>
        );
    }

}