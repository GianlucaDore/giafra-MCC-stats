import React from 'react';

export class CustomFooter extends React.Component
{
    
    render()
    {
        return (
            <div>
                <footer className={ this.props.position }>
                    <hr />
                    <p className='copyright'>Copyright: giafra, FairuzaVostok. 2022.</p>
                    <p className='copyright'>Halo is a brand of a videogames and books serie. All rights are reserved by Microsoft and 343 Industries.<br />
                    The Halo: The Master Chief Collection logo is intellectual property of Microsoft and 343i, as well as the entire Halo related logos.</p>
                    <p className='copyright'>The API used to fetch the player data is property of HaloDOTApi, and it's intended not to have a commercial use.</p>
                </footer>   
            </div>
        )
    }
}