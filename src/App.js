import logo from './logo.svg';
import './App.css';
import { config } from './config';
import { PublicClientApplication } from '@azure/msal-browser';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isAuthenticted: false,
      user: {}
    };

    this.login = this.login.bind(this)

    this.publicClientApplication = new PublicClientApplication({

      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },

      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
      }
    });
  }

  async login(){
    try{
      await this.publicClientApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        });
        this.setState({isAuthenticted:true})
    }catch(error){
        this.setState({
          isAuthenticted:false,
          user:{},
          error : error
        });
    }
  }

  logout(){
    this.publicClientApplication.loginPopup();
  }

  render(){
    return(

      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.isAuthenticted ?<p>
            Successfully logged In
          </p>:
          <p>
            <button onClick={() => this.login()} >Log In</button>
          </p>
          }
        </header>
      </div>

    );  
  }
}
export default App;
