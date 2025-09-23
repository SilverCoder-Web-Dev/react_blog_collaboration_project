import './Navbar.css';






const Navbar: React.FC = () => {


    return (


        <>


            <nav className="navbar-container">


                <div className="navbar-content">


                    <span className="navbar-title">


                        The Digital Frontier


                    </span>


                    <div>


                        <button className='primary-btn btn'>Login</button>


                        <button className='secondary-btn btn'>Signup</button>


                    </div>


                </div>


            </nav>


        </>


    );


};





export default Navbar;