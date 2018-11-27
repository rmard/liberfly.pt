import React, { Component } from 'react';
import './App.css';
import i18n from './i18n';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class App extends Component {
  state = {
    step: 1,
    lang: 'EN',
    name: '',
    email: '',
    socials: '',
    phone: '',
    details: '',
    sending: false,
    success: false,
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
  fbCallback = (response) => {
    console.log("statusChangeCallback", response);
    if(response.name)
    {     
      this.setState({
        name: response.name,
        email: response.email      
      });
    }
  }

  handleKeyPress = (e) => {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.step===1)
    {
      setTimeout(()=>document.getElementById('details').focus(), 500);
      return this.setState({step: 2});
    }
    this.setState({sending: true});
    let formdata = new FormData();
    formdata.append('nome', this.state.name);
    formdata.append('celular', this.state.socials + " " + this.state.phone);
    formdata.append('email', this.state.email);
    formdata.append('details', this.state.details);
    fetch("/processa.php", {
      method: "POST",
      body: formdata
    })
    .then((res)=>{
      this.setState({sending: false});
      if(res.status===200)
        this.setState({success: true});
      else
        alert(i18n.posterror[this.state.lang]);
    })
    .catch((res)=>{
      this.setState({sending: false});
    })
  }

  render() {
    var lang = this.state.lang;
    return (
      <div className="App">
        <section id="sec1">
          <div id="div-main-logo" className="center-align">
            <img id="mainlogo" src="logo-liberfly.png" alt='LiberFly'/>
            <div className='flag-wrapper z-depth-1' onClick={this.toggleLang}>
              <div className='flags-with-desc'>
                <img src={`flag-uk.png`} title='Switch language' alt="Switch language"/>
                <div className={`flag-desc ${lang==='EN' && 'flag-selected'}`}>
                  EN
                </div>
              </div>
              &nbsp;
              <div className='flags-with-desc'>
                <img src={`flag-pt.png`} title='Switch language' alt="Switch language"/>
                <div className={`flag-desc ${lang==='PT' && 'flag-selected'}`}>
                  PT
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <h1 className="center-align">{i18n.title[lang]}</h1>
            <div className="col l6 m6 s12" id="left-description">
              <p>{i18n.maintext[lang]}</p>
              <ul>
                <li>{i18n.issue1[lang]}</li>
                <li>{i18n.issue2[lang]}</li>
                <li>{i18n.issue3[lang]}</li>
              </ul>
              <p className="frasedestaque">{i18n.highlighttext[lang]}</p>
            </div>
            <div className="col l6 m6 s12">
              <div className="card-panel" id="card-form1">
                <p className="center-align titulo">{i18n.formtitle[lang]}</p>
                <div className="form-wrapper">
                  <form autoComplete="off" id="form-contato" className={this.state.success?'hide':''} onSubmit={this.handleSubmit}>
                    <div className="center-align">
                      {(this.state.name==='' && this.state.email==='')?(
                      <FacebookLogin
                        appId="262052264452670"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={''}
                        callback={this.fbCallback} 
                        render={renderProps => (
                          <img className='pointer' alt='Continue with Facebook' onClick={renderProps.onClick} src='./fbbutton.png'/>
                        )}/>    
                      ):''}
                    </div>
                    <div className="row">
                      <div id='formstep1' className={this.state.step!==1 && 'hide'}>
                        <div className="input-field col s12">
                          <input id="name" type="text" className="validate" required value={this.state.name} onChange={this.handleKeyPress}/>
                          <label htmlFor="name" class={this.state.name!=="" && 'active'}>{i18n.labelname[lang]}</label>
                        </div>
                        <div className="input-field col s6">
                          <input id="socials" type="text" className="validate" required value={this.state.socials} onChange={this.handleKeyPress}/>
                          <label htmlFor="socials">{i18n.labelsocials[lang]}</label>
                        </div>                        
                        <div className="input-field col s6">
                          <input id="phone" type="text" className="validate" required value={this.state.phone} onChange={this.handleKeyPress}/>
                          <label htmlFor="phone">{i18n.labelphone[lang]}</label>
                        </div>                    
                        <div className="input-field col s12">
                          <input id="email" type="email" className="validate" required value={this.state.email} onChange={this.handleKeyPress}/>
                          <label htmlFor="email" class={this.state.email!=="" && 'active'}>{i18n.labelemail[lang]}</label>
                        </div>
                      </div>
                      <div id='formstep2' className={this.state.step!==2 && 'hide'}>
                        <div className="col s12 grey-text text-darken-1 center-align">
                          {i18n.askfordetails[lang]}
                        </div>
                        <div className="input-field col s12">
                          <textarea id="details" class="materialize-textarea" placeholder={i18n.labeldetails[lang]} value={this.state.details} onChange={this.handleKeyPress}></textarea>
                        </div>
                      </div>
                    </div>    
                    <div className="center-align">
                      <button id="btn-enviar" className={`btn btn-large ${this.state.sending?'disabled':''}`}>{i18n.btnsend[lang]}</button>
                    </div>          
                  </form>
                  <div id="sucesso-form-submit" className={this.state.success?'':'hide'}>
                    <div className="green lighten-2 z-depth-1">
                      <i className="material-icons" aria-hidden="true">check</i>
                      <strong>{i18n.donetitle[lang]}</strong>
                      <br/>
                      {i18n.donetext[lang]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sec2">
          <div className="row">
            <div className="col s6 m6 l3 center-align">
              <i className="material-icons" aria-hidden="true">send</i>
              <p>{i18n.step1[lang][0]}</p>
              <p>{i18n.step1[lang][1]}</p>
            </div>
            <div className="col s6 m6 l3 center-align">
              <i className="material-icons" aria-hidden="true">gavel</i>
              <p>{i18n.step2[lang][0]}</p>
              <p>{i18n.step2[lang][1]}</p>
            </div>  
            <div className="col s6 m6 l3 center-align">
              <i className="material-icons" aria-hidden="true">schedule</i>
              <p>{i18n.step3[lang][0]}</p>
              <p>{i18n.step3[lang][1]}</p>
            </div>                  
            <div className="col s6 m6 l3 center-align">
              <i className="material-icons" aria-hidden="true">attach_money</i>
              <p>{i18n.step4[lang][0]}</p>
              <p>{i18n.step4[lang][1]}</p>
            </div>
          </div>
        </section>
        <section id="about">
          <div className='row'>
            <div className='col l6 m9 offset-m1 offset-l2 justify'>
              <h2><i className='material-icons rotateplane'>airplanemode_active</i> {i18n.about[lang]}</h2>
              <div id='about-picture' className='right z-depth-1 hide-on-large-only'>
              </div>                 
              <p>
                {i18n.abouttext[lang][0]}              
              </p>
              <p>
                <strong>
                {i18n.abouttext[lang][1]}
                </strong>
              </p>             
            </div>
            <div className='col l2 m1 justify'>
              <div id='about-picture' className='z-depth-1 hide-on-med-and-down'>
              </div>
            </div>
          </div>       
        </section>
        <footer>
          {i18n.siteconstruction[lang]}  
           • <a href="https://liberfly.com.br" target="_blank" rel='noopener noreferrer'>{i18n.braziliansite[lang]} <i className="material-icons">open_in_new</i></a>
          <br/><br/>
          {//https://ivansugerman.com/soc.js/
          }    
          <div className="soc" data-buttoncolor="#174274" data-iconcolor="#EEE">
            <a href="https://facebook.com/liberflypt" className="soc-facebook" title="Facebook"></a>
            <a href="https://instagram.com/liberflypt" className="soc-instagram" title="Instagram"></a>
            {//<a href="https://pt.linkedin.com/company/liberfly" className="soc-linkedin" title="Linkedin"></a>
            } 
          </div>
          <br/>
          LiberFly - Mediando soluções &copy; 2018
          <div id="badges">
            <a target="_blank" rel='noopener noreferrer' href="http://www.google.com/safebrowsing/diagnostic?site=https://liberfly.pt/"><img src="logo-safebrowsing.png"/></a>
            <a target="_blank" rel='noopener noreferrer' href="https://safeweb.norton.com/report/show?url=https://liberfly.pt/"><img src="logo-norton.png"/></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
