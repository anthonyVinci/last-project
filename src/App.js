/* ROOT Component of your App Courillon Anthony  */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'



const APP_TITLE = 'Awesome App'
//update document title (displayed in the opened browser tab)
document.title = APP_TITLE

//web api utils
import { get, ENDPOINTS } from './utils/api'

//components
import AnimalCard from './components/AnimalCard'

//Pout définir le tableau pets partout 


class App extends Component {

    /* React state initialization DOCUMENTATION :  */

    constructor( props ) {
        super( props )
        this.state = {
            animal: undefined,
            selectedSexe: '',
            type: '',
            location: ''
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={ logo } className="App-logo" alt="logo" />
                    &nbsp;
                    &nbsp;
                    <h1>{ APP_TITLE }</h1>
                    &nbsp;
                    &nbsp;
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>

                <div className="App-content">
                    <h2>
                        SEARCH
                    </h2>
                    {/* button onClick event calls the fetchanimal method */ }

                    <div className="row">
                        <div className="col m8">



                            <select className="browser-default" value={ this.state.type } onChange={ this.handleChange }>
                                <option value="">type</option>
                                <option value="cat">Cat</option>
                            </select>




                            <select className="browser-default" value={ this.state.location } onChange={ this.handleChange2 }>
                               <option value="">location</option>
							   <option value="New York">New York</option>
                               <option value="LA">Los Angeles</option>
							   </select>





                            <select className="browser-default" value={ this.state.selectedSexe } onChange={ this.saveSelectedSexe }>
                                <option value="">Sex</option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </select>
                        </div>



                        <div className="col x4">
                            <button onClick={ this.fetchanimal } className="btn-floating btn-large">
                                GO
                            </button>
                        </div>

                    </div>

                </div>



                <div className="row" style={ { marginTop: 20 } } >
                    <div className="col s12 m6 offset-m3">
                        { this.displayPetsInfo() }
                    </div>
                </div>
                <div className="page-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12">
                                <h5 className="white-text">Pet !</h5>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copyright">
                    </div>
                </div>

            </div >
        )
    }

    handleChange = ( event ) => {
        this.setState( {
            type: event.target.value
        })
    }

    handleChange2 = ( event ) => {
        this.setState( {
            location: event.target.value
        })
    }



    /* Arrow function syntax used for Autobinding, see details here : https://facebook.github.io/react/docs/react-without-es6.html#autobinding */
    fetchanimal = async () => {

        /* ASYNC - AWAIT DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await */

        try {
            const animal = await get( ENDPOINTS.PET_URL, {
                //YOU NEED TO PROVIDE YOUR API KEY HERE
                key: '6fbb9b3851b538371ab211567a3c30fd',
                animal: this.state.type,
                location: this.state.location,
                format: "json"
            })

            console.log( animal );
            console.log( this.state.type );


            this.setState( {
                animal
            })
        }
        catch ( error ) {
            console.log( 'Failed fetching data: ', error )
        }

    }

    saveSelectedSexe = ( event ) => {
        this.setState( {
            selectedSexe: event.target.value
        })
    }


    //handle display of the received animal object
    displayPetsInfo = () => {
        const animal = this.state.animal

        if ( animal ) {
            //animal.petfinder.pets.pet[ i ].name.$t
            var pets = animal.petfinder.pets.pet;
            var petsCard = pets.filter(
                pet => {
                    return pet.sex.$t === this.state.selectedSexe
                }
            ).map(( pet, idx ) => {
                return ( <AnimalCard name={ pet.name.$t }
                    sexe={ pet.sex.$t }
                    key={ idx }
                    description={ pet.description.$t }

                /> )
            })
            return petsCard;

        }

        return []
    }

}

export default App