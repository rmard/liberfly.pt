import React, { Component } from 'react';
import './App.css';
import i18n from './i18n';

class App extends Component {
  state = {
    lang: 'EN',
  }
  componentDidMount = () => {
    let browserLang = navigator.language || navigator.userLanguage;
    browserLang = browserLang.toUpperCase().substring(0,2);
    if(browserLang==='PT')
      this.setState({lang: 'PT'});
  }
  toggleLang = () => {
    this.setState((prevState)=>({
      lang: (prevState.lang==='EN')?'PT':'EN'
    }));
  }
  render() {
    var lang = this.state.lang;
    return (
      <div className="App">
        <section id="sec1">
          <div id="div-main-logo" class="center-align">
            <img id="mainlogo" src="logo-liberfly.png"/>
            <div class='flag-wrapper z-depth-1' onClick={this.toggleLang}>
              <img src={`flag-${lang==='EN'?'pt':'uk'}.png`} title='Switch language' alt="Switch language"/>
            </div>
          </div>
          <div class="row">
            <h1 class="center-align">{i18n.title[lang]}</h1>
            <div class="col l6 m6 s12" id="left-description">
              <p>{i18n.maintext[lang]}</p>
              <ul>
                <li>{i18n.issue1[lang]}</li>
                <li>{i18n.issue2[lang]}</li>
                <li>{i18n.issue3[lang]}</li>
              </ul>
              <p class="frasedestaque">{i18n.highlighttext[lang]}</p>
            </div>
            <div class="col l6 m6 s12">
              <div class="card-panel" id="card-form1">
                <p class="center-align titulo">{i18n.formtitle[lang]}</p>
                <div class="form-wrapper">
                    <form autocomplete="off" id="form-contato" class="">
                      <div class="center-align">
                      {/*
                      <fb:login-button 
                        data-button-type="continue_with"
                        data-use-continue-as="true"
                        scope="public_profile,email"
                        onlogin="checkLoginState();">
                      </fb:login-button>
                      */
                    }
                    </div>
                        <div class="row">
                          <div class="input-field col s12">
                              <input id="nome" type="text" class="validate" required/>
                              <label for="nome">{i18n.labelname[lang]}</label>
                          </div>
                          <div class="input-field col s12">
                              <input id="celular" type="text" class="validate"/>
                              <label for="celular">{i18n.labelphone[lang]}</label>
                          </div>                    
                          <div class="input-field col s12">
                              <input id="email" type="email" class="validate" required/>
                              <label for="email">{i18n.labelemail[lang]}</label>
                          </div>
                    </div>    
                    <div class="center-align">
                      <button id="btn-enviar" class="btn btn-large">{i18n.btnsend[lang]}</button>
                    </div>          
                  </form>
                  <div id="sucesso-form-submit" class="hide">
                    <div class="green lighten-2 z-depth-1">
                      <i class="material-icons" aria-hidden="true">check</i>
                      <strong>PRONTO!</strong>
                      <br/>
                      Em até 48 horas nossa equipa entrará em contato.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sec2">
          <div class="row">
            <div class="col s6 m6 l3 center-align">
              <i class="material-icons" aria-hidden="true">send</i>
              <p>{i18n.step1[lang][0]}</p>
              <p>{i18n.step1[lang][1]}</p>
            </div>
            <div class="col s6 m6 l3 center-align">
              <i class="material-icons" aria-hidden="true">gavel</i>
              <p>{i18n.step2[lang][0]}</p>
              <p>{i18n.step2[lang][1]}</p>
            </div>  
            <div class="col s6 m6 l3 center-align">
              <i class="material-icons" aria-hidden="true">schedule</i>
              <p>{i18n.step3[lang][0]}</p>
              <p>{i18n.step3[lang][1]}</p>
            </div>                  
            <div class="col s6 m6 l3 center-align">
              <i class="material-icons" aria-hidden="true">attach_money</i>
              <p>{i18n.step4[lang][0]}</p>
              <p>{i18n.step4[lang][1]}</p>
            </div>
          </div>
        </section>
        <footer>
          {i18n.siteconstruction[lang]}  
           • <a href="https://liberfly.com.br" target="_blank">{i18n.braziliansite[lang]} <i class="material-icons">open_in_new</i></a>
          <br/><br/>
          {//https://ivansugerman.com/soc.js/
          }    
          <div class="soc" data-buttoncolor="#174274" data-iconcolor="#EEE">
            <a href="https://facebook.com/liberflypt" class="soc-facebook" title="Facebook"></a>
            <a href="https://instagram.com/liberflypt" class="soc-instagram" title="Instagram"></a>
            <a href="https://pt.linkedin.com/company/liberfly" class="soc-linkedin" title="Linkedin"></a>
          </div>
          <br/>
          LiberFly - Mediando soluções &copy; 2018
          <div id="badges">
            <a target="_blank" href="http://www.google.com/safebrowsing/diagnostic?site=https://liberfly.pt/"><img src="logo-safebrowsing.png"/></a>
            <a target="_blank" href="https://safeweb.norton.com/report/show?url=https://liberfly.pt/"><img src="logo-norton.png"/></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
