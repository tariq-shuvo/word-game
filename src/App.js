import React, { Component } from 'react';
import alphabetData from './alphabets.json';
import ClassNames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      allAlphabet:alphabetData,
      currentAlphabetIndex:0,
      currentSateOfNextBtn:0,
      randomAlphabet:false,
      applicationSound:true
    };

    this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
    this.next=this.next.bind(this);
    this.prev=this.prev.bind(this);
    this.playAgain=this.playAgain.bind(this);
    this.changeRandomAlphabetStatus=this.changeRandomAlphabetStatus.bind(this);
    this.changeApplicationSoundStatus=this.changeApplicationSoundStatus.bind(this);
  }

    changeRandomAlphabetStatus(){
        this.setState({
            randomAlphabet: !this.state.randomAlphabet
        });
    }

  changeApplicationSoundStatus(){
      this.setState({
          applicationSound: !this.state.applicationSound
      });
  }

  randomAlphabet(min, max){
      if(this.state.randomAlphabet)
      {
          let randomIndex=Math.floor(Math.random() * (max - min) + min);

          if(this.state.currentAlphabetIndex<25)
          {
              this.setState({
                  currentAlphabetIndex:randomIndex,
                  currentSateOfNextBtn:0
              },()=>{
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
              });
          }else{
              this.setState({
                  currentAlphabetIndex:randomIndex,
                  currentSateOfNextBtn:0
              },()=>{
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
              });
          }
      }else{
          if(this.state.currentAlphabetIndex<25)
          {
              this.setState({
                  currentAlphabetIndex:this.state.currentAlphabetIndex+1,
                  currentSateOfNextBtn:0
              },()=>{
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
              });
          }else{
              this.setState({
                  currentAlphabetIndex:0,
                  currentSateOfNextBtn:0
              },()=>{
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
              });
          }
      }
  }

  next(){
    if(this.state.currentSateOfNextBtn===2)
    {
        this.randomAlphabet(0,25);
    }else{
        this.setState({
            currentSateOfNextBtn:this.state.currentSateOfNextBtn+1
        },()=>{
            if(this.state.currentSateOfNextBtn===1)
            {
                this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].wordSound);
            }
    });
    }

  }

  playAudio(audioFile){
      if(this.state.applicationSound) {
          let letterSound = new Audio(audioFile);
          letterSound.play();
      }
  }

  playAgain(){

    if(this.state.currentSateOfNextBtn<1)
    {
        this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
    }else{
        this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].wordSound);
    }

  }

  prev(){
      if(this.state.currentSateOfNextBtn===0)
      {
          if(this.state.currentAlphabetIndex===0)
          {
              this.setState({
                  currentAlphabetIndex:25,
                  currentSateOfNextBtn:0
              },()=>{
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
              });
          }else{
              this.setState({
                  currentAlphabetIndex:this.state.currentAlphabetIndex-1,
                  currentSateOfNextBtn:0
              },()=>{
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].letterSound);
              });
          }
      }else{
          this.setState({
              currentSateOfNextBtn:this.state.currentSateOfNextBtn-1
          },()=>{
              if(this.state.currentSateOfNextBtn===1)
              {
                  this.playAudio(this.state.allAlphabet[this.state.currentAlphabetIndex].wordSound);
              }
          });
      }

  }
  render() {
    let showImage=(this.state.currentSateOfNextBtn>0 && this.state.currentSateOfNextBtn<=2)?true:false;
    let showWord=this.state.currentSateOfNextBtn===2?true:false;

    return (
      <div className="App">
        <div className="game">
            <div className="image">
                <img src="logo.png" alt="Logo"/>
            </div>
            <div className="random-label">
                <span>Random Alphabet</span> &nbsp;
                <label htmlFor="" className="switch">
                    <input type="checkbox" defaultValue={this.state.randomAlphabet} checked={this.state.randomAlphabet}/>
                    <div className="slider round" onClick={this.changeRandomAlphabetStatus}></div>
                </label> &nbsp;
                <span>Sound</span> &nbsp;
                <label htmlFor="" className="switch">
                    <input type="checkbox" defaultValue={this.state.applicationSound} checked={this.state.applicationSound}/>
                    <div className="slider round" onClick={this.changeApplicationSoundStatus}></div>
                </label>
            </div>
          <div className="fields">
            <div className="field-block" onClick={this.next}>{this.state.allAlphabet[this.state.currentAlphabetIndex].letter}</div>
            <div className="buttons">
              <button className="button prev" onClick={this.prev}>Previous</button>
              <button className="button sound" onClick={this.playAgain}>Play Sound Again</button>
              <button className="button next" onClick={this.next}>Next</button>
            </div>
            <div className="fields">
              <div className="field-block" onClick={this.next}>
                <div className="left-field">
                  <div className="letter-image">
                    <p className={ClassNames("placeholder-span", {hide: showImage})}>Click next to view image</p>
                    <img className={ClassNames("placeholder-span", {hide: !showImage})} src={this.state.allAlphabet[this.state.currentAlphabetIndex].image} alt={this.state.allAlphabet[this.state.currentAlphabetIndex].letter}/>
                  </div>
                </div>
                <div className="right-field">
                  <div className="word">
                    <p className={ClassNames("placeholder-span", {hide: showWord})}>Click next to view spelling</p>
                      <h4 className={ClassNames({hide: !showWord})}>{this.state.allAlphabet[this.state.currentAlphabetIndex].word.toUpperCase()}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
