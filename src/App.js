import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import i18n from './i18n';
import ClaimBox from './ClaimBox';

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
      <div>
        <Route path="/claimbox/:affiliateId" render={(obj)=>(
            <ClaimBox 
              location={window.location}
              embedded={true}
              affiliate={obj.match.params.affiliateId}/>
          )} />
        <Route exact path="/" render={()=>(
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
                <div className="col l6 m6 s12 claimbox-wrapper">
                  <ClaimBox lang={lang}/>
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
                  <div className='features'>
                    {i18n.features[lang].map((f)=>(
                      <p className='feature'>
                        <span className='feature-title'>
                          {f.title}
                        </span>
                        <span className='feature-desc'>
                          {f.desc}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className='col l2 m1 justify'>
                  <div id='about-picture' className='z-depth-1 hide-on-med-and-down'>
                  </div>
                </div>
              </div>       
            </section>
            <section id="feature-cards">
              {i18n.featureCards[lang].map((f)=>(
                <div className='feature-card'>
                  <i className='material-icons'>{f.icon}</i>
                  {f.desc}
                </div>            
              ))}        
            </section>
            {/*
            <a href="#claim-form" className={`btn btn-large`}>{i18n.btnsend[lang]}</a>
          */}
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
        )}/>
      </div>
    );
  }
}

export default App;
