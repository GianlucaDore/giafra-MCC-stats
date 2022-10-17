import React from "react";

export class MatchTable extends React.Component
{
    constructor(props)
    {
        super(props);

        this.arrayCells = [];  // vettore di righe di tabella, ciascuna riga avrà le data cells con le info dei match; 1 riga = 1 match.

        this.fillTableFromProps = this.fillTableFromProps.bind(this);
    }

    fillTableFromProps()
    {
        this.arrayCells = [];  // a ogni chiamata della funzione, bisogna rinizializzare il vettore dei dati perché ci possono essere dei 
                               // leftovers delle precedenti ricerche.
        for (let i=0; i < this.props.recentMatches.gameArray.length; i++)  // creiamo ciascuna riga della tabella con una informazione da ciascun vettore di statistiche passato come props
        {
            this.arrayCells[i] = <tr key={i}>  
                                    <td>{this.props.recentMatches.gameArray[i]}</td>
                                    <td>{this.props.recentMatches.categoryArray[i]}</td>
                                    <td>{this.props.recentMatches.victoryArray[i] ? "Yes" : "No" }</td>
                                    <td>{this.props.recentMatches.mapArray[i]}</td>
                                    <td>{this.props.recentMatches.killsArray[i]}</td>
                                    <td>{this.props.recentMatches.deathsArray[i]}</td>
                              </tr> ;
        }
        
        if (this.arrayCells[0] === undefined)   // se non abbiamo fetchato i dati, arrayCells non viene riempito.
            return 0;            // se non abbiamo fetchato i dati, la tabella non deve essere generata.
        
        else
            return 1;
    }

    render()
    {
        if (this.fillTableFromProps()  === 0)
            return null;
            //return (<img id="giafra_sniping_pg" src="https://live.staticflickr.com/65535/52024377948_dbdefceecf_o.png" alt="giafra_sniping" />);  // se non abbiamo fetchato i dati, la tabella non deve essere generata

        else
        {
            return(

                <table id="recent_matches_table">
                    <thead>
                    <tr>
                        <th>Game</th>
                        <th>Variant</th>
                        <th>Victory</th>
                        <th>Map</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.arrayCells }
                    </tbody>
                </table>

            );
            }
    }
}