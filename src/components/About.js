import React from "react";
import { NavBar } from "./NavBar";
import { CustomFooter } from "./CustomFooter";
import { SocialIcon } from "react-social-icons";
import '../About.css';

export class About extends React.Component 
{
    render()
    {
        return (
            <div className="About">
                 <NavBar />
                 <h1 id="about-header">THE PROJECT "GIAFRA STATS"</h1>
                 <div id="about-container">
                    <p className="about-paragraph">
                        During the Covid-19 pandemic and the related global lockdown in early 2020, some members of the Halo 3 community decided to build a webapp to
                        provide in-depth and well-organized game statistics, modeled on the old bungie.net site (which is now history). The Halo MCC ranking system, which followed
                        the Halo 2's original one, had been missing numerous features regarding the charts, Most of them were actual features of Halo 3, such as
                        military ranks and the concept of EXP alongside Highest Skill. After finding an API that provided each player's data from the developer's database,
                        and also ignoring custom/private games for greater accuracy and non-fixability of the stats themselves, MCCstats.com was set up. The home page, in addition to presenting the site,
                        showcased global rankings, divided by playlists, ranks or specific stats. There was obviously a player search system aswell,
                        which differed substantially from the "official" webapp of the game developers, and was instead much more similar, for graphics and stats settings, to the old
                        Bungie records. Through simple calculations, the EXP system was reintroduced according to the assumption "1 game won = 1 EXP point for each player of the winning team":
                        in fact, to bring back virtually the concept of XPs, it was enough to count as EXP the number of games won by the player (provided by the API), and, from there, reconstruct his "military rank" as it was that of Halo 3,
                        combining EXP and Personal Skill, as it can be seen from the following table:
                    </p>
                    <img id="OG_h3_ranks" src="https://live.staticflickr.com/65535/52373982419_9bdb7095f3_o.png" alt="Halo 3 Ranking System" />
                    <p className="about-paragraph">
                        Unfortunately, after providing a very efficient service for almost two years, MCCstats was hit hard by the "renovatio imperii" of the application network services of
                        343i, which, at the time of the release of the new Halo Infinite chapter, in addition to all the front-end part (webapp, site) of its website, revultionized the entire
                        back-end part aswell. In fact, APIs that were previously provided to third parties (such as MCCstats) went deprecated and therefore unusable. With the company's ever-increasing focus on
                        Infinite, the MCC API were neglected, and for many months the stats of this game could be consulted only from the official halo.xbox.com website. Given the silence and closure
                        by 343i to external services, MCCstats was forced to close during the month of February 2022, as some of the site could no longer offer service due to
                        lack of an API that could provide stats at a "competitive" level, that is, without information about the players' customized games (which could therefore be used
                        to exploit the system and "inflate" player's statistics by playing fictitious local organized games). One of the few official APIs - which however does not solve the problem of "competitiveness" just mentioned, was
                        HaloDotAPI, which, alongside Infinite, it was able to support MCC aswell.
                    </p>

                    <a href="https://www.autocode.com/halo" >
                        <img id="saveHaloDotAPI" src="https://live.staticflickr.com/65535/52373899563_0b0d9ccd54_o.png" alt="Halo Dot API"/>
                    </a>

                    <p className="about-paragraph">
                        However, problems began to appear when 343i couldn't fund or support in any way this 3rd-party project. The development of HaloDotAPI needed a steady financement, and 
                        Microsoft refused to do such a thing. Developers at HaloDotAPI began to panic and threatened to close their useful services, which was already used by thousands of people 
                        everyday. They started a campaign on social media, with the hashtag "#SaveHaloDotAPI", asking people to share their campaign, hoping to cause a backlash of the users against
                        343i, to finally get a funding or even job applications. But such things actually never happened, so HaloDotAPI was forced to "close" in August 2022. And when everybody started
                        to lose their hope, a system of crowdfunding was introduced, and the developers were able to work again on the project, before deciding that all services of the API would be kept
                        active indefinitely (until the developers could), in the hope of enrich their developer careers and CV. As of now, HaloDotAPI is still quite in danger, but developers are trying 
                        to make use of the crowdfunding and grinding their teeth to improve it despite the lack of official support, just to have such a big project to put in their developers portfolio.
                    </p>

                    <p className="about-paragraph">
                        And here comes giafrastats.com. It saw the light after I witnessed the huge effort made by HaloDotAPI's developers and MCCstats.com above all. Always having a big passion for coding and
                        for the "www" world in general, I began studying React, hoping to have one day a stats site of my own or just being able to help some developers in the world. This is my very first 
                        React project, which really helped me while learning the library. From class components, to state, to hooks and 3rd party libraries, I've learnt all I know when coding this app! I'd
                        love one day to be able to look back on this project and see all the passion and dedication I put in this "educational" project and think "Wow, this paid off so amazingly over time!"
                    </p>.

                    <div id="social-container">
                        <SocialIcon className="social-icons" url="https://www.twitch.tv/giafrashows" />
                        <SocialIcon className="social-icons" url="https://www.youtube.com/user/giafra95" />
                    </div>
                
                 </div>
                 <CustomFooter position="stay_sticky" />
            </div>
           
        )


    }


}