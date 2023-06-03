import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import "./GroupEight.css";

function GroupEight(){

    const gruppmedlemar =[{
        'id': 0,
        'img':'/images/houssein.jpg',
        'name': 'Houssein Khodr',
        'titel': 'Projektägare',
        'mail': 'houssein.khodr@iths.se',
        'linkedin': '#'
    },
    {
        'id': 1,
        'img':'/images/linda.jpg',
        'name': 'Linda Saxenhag',
        'titel': 'Scrummaster',
        'mail': 'linda.saxenhag@iths.se',
        'linkedin': 'https://www.linkedin.com/in/linda-saxenhag-b29031252/'
    },
    {
        'id': 2,
        'img':'/images/joseph.jpg',
        'name': 'Joseph',
        'lastname': 'Dominguez-Marrero',
        'titel': 'Utvecklare',
        'mail': 'joseph.dominguez.marrero@iths.se',
        'linkedin': 'https://www.linkedin.com/in/joseph-dm/'
    },
    {
        'id': 3,
        'img':'/images/rasmus.jpg',
        'name': 'Rasmus Gullbrandsson',
        'titel': 'Utvecklare',
        'mail': 'rasmus.gullbrandsson@iths.se',
        'linkedin': 'https://www.linkedin.com/in/rasmus-gullbrandsson-13a318138/'
    },
    {
        'id': 4,
        'img':'/images/mikael.jpg',
        'name': 'Mikael Issa',
        'titel': 'Utvecklare',
        'mail': 'mikael.issa@iths.se',
        'linkedin': 'https://www.linkedin.com/in/mikael-issa-498a52233/'
    },
    {
        'id': 5,
        'img':'/images/johanna.jpg',
        'name': 'Johanna',
        'lastname':'Jakobsson Ekberg',
        'titel': 'Utvecklare',
        'mail': 'johanna.jakobsson.ekberg@iths.se',
        'linkedin': 'https://www.linkedin.com/in/johanna-jakobsson-ekberg-408156162/'
    },
    {
        'id': 6,
        'img':'/images/gilbert.jpg',
        'name': 'Gilbert',
        'lastname': 'Lundberg Rydbäck',
        'titel': 'Utvecklare',
        'mail': 'gilbert.lundberg.rydback@iths.se',
        'linkedin': 'https://www.linkedin.com/in/gilbert-lundberg/'
    },
    {
        'id': 7,
        'img':'/images/filip-2.jpg',
        'name': 'Filip Pivré',
        'titel': 'Utvecklare',
        'mail': 'filip.pivre@iths.se',
        'linkedin': 'https://www.linkedin.com/in/filip-pivr%C3%A9-2257b2159/'
    },
    {
        'id': 8,
        'img':'/images/nicole.jpg',
        'name': 'Nicole Walter',
        'titel': 'Utvecklare',
        'mail': 'nicole.walter@iths.se',
        'linkedin': 'https://www.linkedin.com/in/nicole-walter-50471b99/'
    },
    {
        'id': 9,
        'img':'/images/koosha.jpg',
        'name': 'Koosha Yousefi',
        'titel': 'Utvecklare',
        'mail': 'koosha.yousefi@iths.se',
        'linkedin': 'https://www.linkedin.com/in/koosha-yousefi/'
    },
    
    ];



    return(
        
        <div className="group">
            <h1 className="weAre">We are group 8</h1>
            <div className="wrapper">
            { gruppmedlemar.map(medlem =>(
                <div key={medlem.id} className="groupCard member" >
                    <img src={medlem.img} className="profilepic"/>
                    <h5>{medlem.name}</h5>
                    <h5>{medlem.lastname}</h5>
                    <h6>{medlem.titel}</h6>
                    <p>{medlem.mail}</p>
                    <a rel="stylesheet" href={medlem.linkedin} target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" className="mr-10" style={{ color: '#3F4E29' }} />
                    </a>
                </div>
            ))}
            </div>
        </div>
        
        
        
    );
}

export default GroupEight;