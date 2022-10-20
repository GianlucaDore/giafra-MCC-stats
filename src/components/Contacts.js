import React from 'react';
import { useState } from 'react';
import { send } from 'emailjs-com';
import { NavBar } from './NavBar';
import { CustomFooter } from './CustomFooter';
import '../css/Contacts.css'
import { ClipLoader } from 'react-spinners';


export default function Contacts() 
{
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateAndSend = async (event) => {
        event.preventDefault(); // previene il reload della pagina.

        setIsLoading(true);

        const formData = new FormData(event.target); // creo un nuovo oggetto FormData ausiliario che rispecchi il form sottomesso.
        for (const value of formData.values()) {  // controllo FormData per verificare non vi siano campi vuoti.
            if (value === '') 
            {
                alert("You must fill every field of the form!");
                return ; // Stop the function.
            }
        }

        // Convert iterable object to actual object.
        const toSend = Object.fromEntries([...formData]);

        try 
        {
            const response = await send (  // Metodo della libreria emailjs. Chiede come parametri i seguenti:
            'service_zu60gc9', /* SERVICE ID del servizio su EmailJS.com */
            'template_dn3t8e9', /* TEMPLATE ID del template in uso su EmailJS.com */
            toSend,
            'a3QcYGeL8g7dVtfDT' /*  USER ID su EmailJS.com */
            );

            console.log("EmailJS server response:", response.status, response.text);
            setIsConfirmed(true);  // Vogliamo il messaggio di conferma di avvenuto invio del form.
            setIsLoading(false);  // togliamo l'anello di caricamento quando va renderizzato il messaggio di conferma
        } 
        
        catch (err) {
            console.log('Error sending email: ', err);
        }
    };

    return (

        <div className="Contacts">
            <NavBar />
            <h1 id="contacts-header">CONTACT US</h1>

            {isConfirmed && (
                <p id="confirm_message">Message sent successfully to website's administrator. You will be contacted at the email address you've just provided.</p>
            )}

            <ClipLoader color={"#ffffff"} loading={isLoading} size={150} />
            { isLoading === false && isConfirmed === false && (

                <form id="contacts-form" onSubmit={ validateAndSend } >
                    <div className="form-row" >
                        <input className="contacts_input" type="text" name="from_name" placeholder="Your name..." />
                    </div>
                    <div className="form-row" >
                        <input className="contacts_input" type="text" name="to_name" placeholder="to name" />    
                    </div>
                    <div className="form-row" >
                        <textarea id="your-message" type="text" name="message" placeholder="Your message..." />    
                    </div>
                    <div className="form-row" >
                        <input className="contacts_input" type="text" name="reply_to" placeholder="Your email..." />  
                    </div>

                    <button type='submit' disabled={ isConfirmed ? true : false } >Send</button>
                </form>

            )}
            <CustomFooter position="stay_fixed" />
        </div>
    );
}