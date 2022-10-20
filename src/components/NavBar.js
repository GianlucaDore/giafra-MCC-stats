import React from "react";
import '../css/NavBar.css';
import { Link, NavLink } from 'react-router-dom';

export class NavBar extends React.Component
{
    render()
    {
        return (
            <div>
                <Link to="/">
                    <img src="https://i.postimg.cc/MGhrxJGF/1650732907213.png" id="giafra_emblem" alt="giafra_emblem" />
                </Link>
                <nav>
                    <ul id="navbar_list">
                        <NavLink to="/">Home</NavLink>    
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contacts">Contacts</NavLink>
                    </ul>
                </nav>
                <img id="MCC-logo" src="https://static.wikia.nocookie.net/logopedia/images/7/7f/Halo_MCC_Blazon.png" alt="MCC logo" />
            </div>
            
        );
    }
}