import React from "react";
import { useNavigate } from "react-router-dom";

export const ButtonSearch = (props) =>
{
    const navigate = useNavigate();

    return (
        <form className="search-form" onSubmit={(event) => { event.preventDefault(); 
                                                      navigate("/profile/" + event.target[0].value ); } }>
            <input type="search" id={ props.type } name="Gamertag" placeholder="Enter a Gamertag..."></input>
            <button type="submit">Search</button>
        </form>
    );
}