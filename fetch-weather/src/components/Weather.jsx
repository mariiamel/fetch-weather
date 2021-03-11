//import axios from 'axios';
import {Component} from 'react'


export default class Weather extends Component{
    state = {
        zipcode: '',
        name: '',
        temp: '',
        description: '',
        errorMessage: ''
    }
    
      handleChange = (event) => {
        this.setState({ zipcode: event.target.value }, () => {
          console.log('Your zip code is', this.state.zipcode);
        });
      }
    
      handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=052f26926ae9784c2d677ca7bc5dec98&units=metric`)
            const json = await response.json()
            if(json.cod === 200) {
                this.setState({
                    name: json.name,
                    temp: json.main.temp,
                    description: json.weather[0].description
                })
            } else {
                this.setState({ errorMessage: json.message})
            }
        } catch(err) {
            console.log(err)
        }
      }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="zipcode">Please enter your zip code for the weather:</label>
              <input 
                id="zipcode" 
                type="text" 
                value={this.state.zipcode}
                onChange={this.handleChange} 
              />
              <input type="submit" value="Get my forecast!" />
            </form>
            <p>{this.state.errorMessage}</p>
            <div className="weather">
                <p>{this.state.name}</p>
                <p>{this.state.temp}</p>
                <p>{this.state.description}</p>
            </div>
          </div>
        )
    }
}