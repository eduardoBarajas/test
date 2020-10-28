import React from 'react';
import { IconBlock, RouterButton } from '../../components/components';

const Home = () => {
    return (






        
        <div> 
            <div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <br/><br/>
                    <h1 className="header center orange-text">Starter Template</h1>
                    <div className="row center">
                        <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
                    </div>
                    <div className="row center">
                        <RouterButton to="/Clientes" label="Clientes"/>
                    </div>
                    <div className="row center">
                        <RouterButton to="/Tiendas" label="Tiendas"/>
                    </div>
                    <br/><br/>
                </div>
            </div>
            <div className="container">
                <div className="section">
                    <div className="row">
                        <IconBlock subtitle="Esto es una prueba"/>
                        <IconBlock icon="group" subtitle="User Experience Focused" text="By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience."/>
                        <IconBlock icon="settings" subtitle="Easy to work with" text="We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize."/>
                    </div>
                </div>
                <br/><br/>
            </div>
        </div>
    );
}

export default Home;