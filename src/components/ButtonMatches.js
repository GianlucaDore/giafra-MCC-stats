import React from 'react';
import reactDom from 'react-dom';
// import { MapList } from './MapList';
import { MatchList } from './MatchList';
import { MatchTable } from './MatchTable';

export class ButtonMatches extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = { gamertag: "" };

        this.data = {   // creo un oggetto che salvi tutti i dati presi dalla fetch, da passare agilmente come props per essere renderizzati.

            gameArray : [],
            categoryArray : [],
            mapArray : [],
            victoryArray : [],
            killsArray : [],
            deathsArray : [],
            gamertag : ""
        };

        this.pageCounter = 0;   // variabile che segna che segmento delle stats prelevare (prima pagina = ultime 25 partite recenti...)
                                // Se è a 0, deve displayare solo il form senza il button more (@126)

        this.totalKills = 0; this.totalDeaths = 0; this.totalVictories = 0; this.totalLosses = 0;
        this.totalKD = 0; this.totalWL = 0;

        this.fetchHaloMatches = this.fetchHaloMatches.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.initializeVariablesAndCounters = this.initializeVariablesAndCounters.bind(this);
        this.onClickNewSearch = this.onClickNewSearch.bind(this);

    }

    onClickNewSearch()
    {
        this.pageCounter = 1;
        this.initializeVariablesAndCounters();
        this.fetchHaloMatches();
    }

    initializeVariablesAndCounters()
    {
        const init = {
            gameArray : [],
            categoryArray : [],
            mapArray : [],
            victoryArray : [],
            killsArray : [],
            deathsArray : [],
            gamertag : ""
        }
        this.data = init;

        this.totalKills = 0; this.totalDeaths = 0; this.totalVictories = 0; this.totalLosses = 0;
        this.totalKD = 0; this.totalWL = 0;
    }

    loadNextPage()
    {
        this.pageCounter++;
        this.fetchHaloMatches();
    }

    async fetchHaloMatches()  // v2: stavolta anziché un button che fetcha le mie stats, proponiamo una gamertag qualsiasi da fetchare, tramite un form.
    {
        if (this.pageCounter == 1)  // Inizializziamo la struttura dati locale solo se viene chiesta la prima pagina di stats.
        {
            this.initializeVariablesAndCounters();
        }

        const gamertag = document.getElementById("search-recent-matches").value;  // la funzione viene invocata quando si clicca submit dopo aver inserito un valore nel form, il quale sarà inserito nel DOM value dell'elemento <input> che ha id "search-recent-matches"
        this.data.gamertag = gamertag; 
    
        const url1 = 'https://cryptum.halodotapi.com/games/hmcc/stats/players/'   // fetchiamo all'URL di HaloDotAPI che varia a seconda del giocatore di cui vogliamo le stats. 
        const url2 = url1 + gamertag;                                             // il giocatore di cui fetchare le stats è dato in input dall'utente nel form.
        const url3 = `${url2}/recent-matches?page=` + this.pageCounter.toString();

        fetch(url3, {
            "method": 'GET',
            "headers": {
                        'Content-Type': 'application/json',
                        'Cryptum-API-Version': '2.3-alpha',
                        'Authorization': 'Cryptum-Token HOePLO1QYGIbelnxcQSq9y6ZXbX6MWahQZlQq1zaXQqHXEd4mWyOZ6YgaijjdCyB'
                     }
        })
        .then(response =>      // il metodo .json() è un metodo della classe Response che prende in input un Response stream e lo legge fino alla fine, ritornando una promise che si risolve in
            response.json())   // un oggetto generico JavaScript ottenuto parsificando la response come se fosse un JSON. Non produce direttamente un JSON, bensì un oggetto! 
        .then(res => {   // la promise di .json() si risolve in un oggetto costruito interpretando response come un JSON, quindi qua abbiamo l'oggetto in input che dobbiamo esplorare.
                    
            
            for (let i=0; i< res.data.length; i++)   // salviamo tutti i dati del json di risposta.
            {
                
                this.data.victoryArray.push(res.data[i].victory);
                this.data.victoryArray[this.data.victoryArray.length-1] ? this.totalVictories++ : this.totalLosses++  // Se l'elemento appena inserito nell'array delle partite è true, aumentiamo il counter di vittorie, altrimenti......

                this.data.killsArray.push(res.data[i].stats.kills);
                this.totalKills += this.data.killsArray[this.data.killsArray.length-1];

                this.data.deathsArray.push(res.data[i].stats.deaths);
                this.totalDeaths += this.data.deathsArray[this.data.deathsArray.length-1];

                this.data.mapArray.push(res.data[i].details.map.name);
                this.data.categoryArray.push(res.data[i].details.category.name);
                this.data.gameArray.push(res.data[i].details.engine.name);

            }

            this.totalKD = (this.totalKills / this.totalDeaths);
            this.totalWL = (this.totalVictories / this.totalLosses);

            this.setState(({     // lo stato di ButtonMatches può essere ora settato.
                gamertag: gamertag
            })); 

        })  
        .catch(error => {   // catturiamo eventuali errori nella catena di promises e visualizziamoli a video.
            console.log("There was an error: " + error);
        });
    }

    render() // Renderizziamo sempre il form di inserimento gamertag. se non è stato inserito nulla nel form, la render del componente
    {        // <MatchTable> ritorna null e la tabella non viene generata, quindi non appare nella UI (poiché vuota, fetch dei dati non eseguita). 
        let more;
        let WLKDcounter = null;
        if (this.pageCounter > 0 && this.pageCounter < 4)  // il button more per far vedere più stats non va renderizzato oltre la terza pagina, perché l'API non ci arriva.
        {
            if (this.data.gameArray.length % 25 == 0)
                more = <button id="More" onClick={ this.loadNextPage }>More...</button>;
            else
                more = null;
        }
            
        if (this.pageCounter == 0)
        {
            more = null;
            this.pageCounter++;
        }
        if (this.pageCounter >= 4)
            more = null;

        if (this.state.gamertag != "")  // la info sul KD e sulle WL va visualizzata solo se è stata effettuata una ricerca per gamertag.
            WLKDcounter = <h3 id="search_result_counters">Showing last { this.data.gameArray.length } matches for { this.state.gamertag }. Total K/D: { this.totalKD }. Total W/L: { this.totalWL }</h3>
        
        return (
                <div>
                  <div>
                    <form className="PlayerSearch" onSubmit={(event) => { event.preventDefault(); } }>
                        <input type="search" id="search-recent-matches" name="Gamertag" placeholder="Enter a Gamertag..."></input>
                        <button type="submit" onClick={ this.onClickNewSearch } >Search</button>
                    </form>
                  </div>
                  { WLKDcounter }
                  <MatchTable recentMatches={ this.data }/>
                  { more }
                </div> 
            );    
    }

}