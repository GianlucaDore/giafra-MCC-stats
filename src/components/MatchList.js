import React from "react";
import { MatchEntry } from './MatchEntry';

export class MatchList extends React.Component  // MatchList è il componente che deve renderizzare l'elenco di partite, fa da wrapper per MatchEntry.
{
    constructor(props)
    {
        super(props);

        this.state = {
                         statsDisplayed : false
                     };
    }


    render()
    {   
        let rend = [];  // MatchList è un wrapper, si occupa di prendere i dati delle partite (oggetto di arrays passato come props). 
        rend[0] = <h3 id="search_review">Displaying last { this.props.recentMatches.gameArray.length } matches for {this.props.recentMatches.gamertag} </h3>

        for (let i=1; i<(this.props.recentMatches.gameArray.length + 1); i++)  // Si crea un vettore di elementi <MatchEntry> a partire da una struct (oggetto) di vettori diversi.
        {
            rend[i] = <MatchEntry game={this.props.recentMatches.gameArray[i-1]}  
                                    category={this.props.recentMatches.categoryArray[i-1]} 
                                    map={this.props.recentMatches.mapArray[i-1]}
                                    victory={this.props.recentMatches.victoryArray[i-1]} 
                                    kills={this.props.recentMatches.killsArray[i-1]} 
                                    deaths={this.props.recentMatches.deathsArray[i-1]} 
                        />;

        }

        return rend;

    }

}