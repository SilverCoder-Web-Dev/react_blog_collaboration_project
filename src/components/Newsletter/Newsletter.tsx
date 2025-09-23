import React, { useState, type ChangeEvent, type FormEvent } from 'react';



import './NewsLetter.css';





const NewsLetter: React.FC = () => {


    const [email, setEmail] = useState('');





    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {


        setEmail(e.target.value);


    };





    const handleSubmit = (e: FormEvent) => {


        e.preventDefault();


        console.log('Newsletter signup with email:', email);


        alert('Thank you for subscribing!');


        setEmail('')


    };





    return (


        <>


            <div className="newsletter-container">


                <h2 className="newsletter-title">Subscribe to our Newsletter</h2>


                <p className="newsletter-subtitle">Stay up to date with the latest posts and content from our community.</p>





                <form onSubmit={handleSubmit} className="newsletter-form">


                    <input type="email" value={email} onChange={handleInputChange} className='newsletter-input' placeholder='Enter your email' required/>


                    <button type='submit' className="newsletter-button">Subscribe</button>


                </form>


            </div>


        </>


    );


};





export default NewsLetter;