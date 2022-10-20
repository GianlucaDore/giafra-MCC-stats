import React from "react";
import { NavBar } from "./NavBar";
import '../css/NotFound.css'

export const NotFound = () => 
{
    return(
        <div className="NotFound">
            <NavBar />
            <h1 id="not_found_header">404 Not Found  :( </h1>
            <p id="not_found_explanation">The URL you typed or the player you requested was not found on this server. Please double-check the URL or the player's Gamertag you're searching for.</p>
        </div>
    )
}