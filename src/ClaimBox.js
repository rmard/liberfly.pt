import React from 'react';
import i18n from './i18n';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class ClaimBox extends React.Component {
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
    affiliate: '',
  }  
  componentDidMount = () => {
    if(this.props.match && this.props.match.params.affiliateId) {
      this.setState({affiliate: this.props.match.params.affiliateId});
    }
    if(this.props.lang)
      this.setState({lang: this.props.lang});
    else {
      let browserLang = navigator.language || navigator.userLanguage;
      browserLang = browserLang.toUpperCase().substring(0,2);
      if(browserLang==='PT')
        this.setState({lang: 'PT'});
    }
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
    formdata.append('affiliate', this.state.affiliate);
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
      <div className="card-panel" id="claim-form">
        <p className="center-align titulo">{i18n.formtitle[lang]}</p>
        <div className="form-wrapper">
          <form autoComplete="off" id="form-contato" className={this.state.success?'hide':''} onSubmit={this.handleSubmit}>
            <div className="center-align">
              {(this.state.name==='' && this.state.email==='')?(
              <FacebookLogin
                appId="262052264452670"
                autoLoad={true}
                fields="name,email,picture"
                onClick=''
                callback={(response)=>{this.fbCallback(response)}} 
                render={renderProps => (
                  <img className='pointer' alt='Continue with Facebook' onClick={renderProps.onClick} src='/fbbutton.png'/>
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
    )
  }
}

export default ClaimBox;              