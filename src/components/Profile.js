import React from 'react';
//import { MatchList } from './MatchList';
import { MatchTable } from './MatchTable';
import { ButtonSearch } from './ButtonSearch';
import { NavBar } from './NavBar';
import { CustomFooter } from './CustomFooter';
import { ClipLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Profile.css';

export const Profile = () =>
{
    const navigate = useNavigate(); // Per poter indirizzare a un URL imperativamente.

    const { id } = useParams(); // useParams permette di leggere l'URL e estrae il frammento dopo /profile/ definito come ":id" nella Route corrispondente.

    var footerPosition = "stay_fixed";  // Alla prima render, ci sarà il caricamento delle stats e il cerchio che gira: il footer deve stare fixed in basso.

    const [state, setState] = useState(
        { arrays : 
        {
            gameArray : [],
            categoryArray : [],
            mapArray : [],
            victoryArray : [],
            killsArray : [],
            deathsArray : [],
        },
         counters :
        {
            totalKills : 0, 
            totalDeaths : 0, 
            totalVictories : 0, 
            totalLosses : 0,
            totalKD : 0, 
            totalWL : 0
        },
         pageCounter : 0,
         loading: false }
    );

    useEffect(() => {
        setState((prevState) => { return {...prevState, loading: true, pageCounter : prevState.pageCounter + 1 }});
    }, []);  //dopo la prima renderizzazione, facciamo variare il pagecounter per triggerare la seconda useEffect che tiene d'occhio il valore di pageCounter.

    useEffect(() => {  // la fetchHaloMatches è una API call e come tale va messa in un hook useEffect.

        if (state.pageCounter > 0)
        {
            const fetchHaloData = async () => 
            {
                const url1 = 'https://cryptum.halodotapi.com/games/hmcc/stats/players/' ;  // fetchiamo all'URL di HaloDotAPI che varia a seconda del giocatore di cui vogliamo le stats. 
                const url2 = url1 + id;                                             // il giocatore di cui fetchare le stats è stato estratto dall'URL da useParams.
                const url3 = `${url2}/recent-matches?page=` + state.pageCounter.toString();

                const response = await fetch(url3, {
                    "method": 'GET',
                    "headers": {
                                'Content-Type': 'application/json',
                                'Cryptum-API-Version': '2.3-alpha',
                                'Authorization': 'Cryptum-Token HOePLO1QYGIbelnxcQSq9y6ZXbX6MWahQZlQq1zaXQqHXEd4mWyOZ6YgaijjdCyB'
                            }
                });

                if (!response.ok)
                {
                    console.log("Response not okay!");
                    navigate("/error");  // se la risposta non è ok, navighiamo alla pagina errore (che per ora è 404 / 400).
                }
                    
                else
                {
                    const res = await response.json();  // interpretiamo il body della response come un json, 

                    if (res.count === 0)
                    {
                        alert("Can't access this player's stats ! Please try again or search for a different Gamertag.");
                        navigate("/");
                    }

                    let data = {
                        gameArray : [],
                        categoryArray : [],
                        mapArray : [],
                        victoryArray : [],
                        killsArray : [],
                        deathsArray : [],
                    };

                    let stats = {
                        totalKills : 0, 
                        totalDeaths : 0, 
                        totalVictories : 0, 
                        totalLosses : 0,
                        totalKD : 0, 
                        totalWL : 0
                    };

                    if (state.arrays.gameArray[0] !== undefined)
                    {
                        data = state.arrays; 
                        stats = state.counters;
                    }

                    for (let i=0; i< res.data.length; i++)   // salviamo tutti i dati del json di risposta.
                        {
                            data.victoryArray.push(res.data[i].victory);
                            data.victoryArray[data.victoryArray.length-1] ? stats.totalVictories++ : stats.totalLosses++  // Se l'elemento appena inserito nell'array delle partite è true, aumentiamo il counter di vittorie, altrimenti......

                            data.killsArray.push(res.data[i].stats.kills);
                            stats.totalKills += data.killsArray[data.killsArray.length-1];

                            data.deathsArray.push(res.data[i].stats.deaths);
                            stats.totalDeaths += data.deathsArray[data.deathsArray.length-1];

                            data.mapArray.push(res.data[i].details.map.name);
                            data.categoryArray.push(res.data[i].details.category.name);
                            data.gameArray.push(res.data[i].details.engine.name);
                        }

                    stats.totalKD = (stats.totalKills / stats.totalDeaths);
                    stats.totalWL = (stats.totalVictories / stats.totalLosses);       

                    setState((prevState) => { return {...prevState, loading: false, arrays : data, counters : stats}});
                
                }
            }

            fetchHaloData().catch((error) => { console.log("There was an error:" + error)});
        }
        
        
        /*
        .then(response =>      // il metodo .json() è un metodo della classe Response che prende in input un Response stream e lo legge fino alla fine, ritornando una promise che si risolve in
            response.json())   // un oggetto generico JavaScript ottenuto parsificando la response come se fosse un JSON. Non produce direttamente un JSON, bensì un oggetto! 
        .then(res => {   // la promise di .json() si risolve in un oggetto costruito interpretando response come un JSON, quindi qua abbiamo l'oggetto in input che dobbiamo esplorare.
                              
            let data = {
                gameArray : [],
                categoryArray : [],
                mapArray : [],
                victoryArray : [],
                killsArray : [],
                deathsArray : [],
            };

            let stats = {
                totalKills : 0, 
                totalDeaths : 0, 
                totalVictories : 0, 
                totalLosses : 0,
                totalKD : 0, 
                totalWL : 0
            };

            if (state.arrays.gameArray[0] != undefined)
            {
                data = state.arrays; 
                stats = state.counters;
            }

            for (let i=0; i< res.data.length; i++)   // salviamo tutti i dati del json di risposta.
                {
                    data.victoryArray.push(res.data[i].victory);
                    data.victoryArray[data.victoryArray.length-1] ? stats.totalVictories++ : stats.totalLosses++  // Se l'elemento appena inserito nell'array delle partite è true, aumentiamo il counter di vittorie, altrimenti......

                    data.killsArray.push(res.data[i].stats.kills);
                    stats.totalKills += data.killsArray[data.killsArray.length-1];

                    data.deathsArray.push(res.data[i].stats.deaths);
                    stats.totalDeaths += data.deathsArray[data.deathsArray.length-1];

                    data.mapArray.push(res.data[i].details.map.name);
                    data.categoryArray.push(res.data[i].details.category.name);
                    data.gameArray.push(res.data[i].details.engine.name);
                }

            stats.totalKD = (stats.totalKills / stats.totalDeaths);
            stats.totalWL = (stats.totalVictories / stats.totalLosses);       

            setState((prevState) => { return {...state, arrays : data, counters : stats}});
        
        })  
        .catch(error => {   // catturiamo eventuali errori nella catena di promises e visualizziamoli a video.
            console.log("There was an error: " + error);
        }); */

    
    }, [id, state.pageCounter]); 
        
         
    let more;  // variabile che dice se il tasto "more" per pigliare le successive pagine di statistiche debba esserci o no.

    if (state.loading === true)  // se la pagina è in caricamento col cerchio che gira, non dobbiamo visualizzare il bottone "more".
            more = null;
    else 
    {
        footerPosition = "stay_sticky";  // se la pagina non è in caricamento, il footer va sticky sotto la tabella che è renderizzata.

        if (state.pageCounter > 0 && state.pageCounter < 4)  // il button more per far vedere più stats non va renderizzato oltre la terza pagina, perché l'API non ci arriva.
        {
            if (state.arrays.gameArray.length % 25 === 0)  // Se le partite sono un multiplo di 25, il button more deve esserci.
                more = <button id="More" onClick={ () => { setState((prevState) => { return {...prevState, pageCounter : prevState.pageCounter + 1}})}}>More...</button>;
                
            else  // se le partite non sono un multiplo di 25, probabilmente non ce ne sono altre da fetchare, e il footer torna fixed a fondo pagina dato che la pagina non si riempie.
            {
                more = null;
                footerPosition = "stay_fixed";
            }
        }

        if (state.pageCounter >= 4)  // non andiamo comunque oltre la terza pagina.
            more = null; 
    }    
        
    let counters;  // variabile che decreta se i contatori debbano essere visualizzati o meno.

    if (state.loading === true)  // se la pagina è in caricamento col simbolino, i contatori non devono essere visualizzati, altrimenti sì.
        counters = null;
    else
        counters = <h3 id="search_result_counters">Showing last { state.arrays.gameArray.length } matches for "{ id }". Total K/D: { state.counters.totalKD }. Total W/L: { state.counters.totalWL }</h3>;


    return (
            <div className="Profile">
                <NavBar />
                <ButtonSearch type="search-input-results" />
                <ClipLoader color={"#ffffff"} loading={state.loading} size={150} />
                { counters }
                <MatchTable recentMatches={ state.arrays }/>
                { more }
                <CustomFooter position={ footerPosition } />
            </div> 
    ); 

}