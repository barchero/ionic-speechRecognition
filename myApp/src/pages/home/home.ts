import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recognition:String = "";

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {

  }

  startRecognition(){
    this.speechRecognition.isRecognitionAvailable()
        .then((available: boolean) => {
          if(available){
            this.speechRecognition.hasPermission()
                .then((hasPermission: boolean)=>{
                  if(hasPermission){
                    this.speechRecognition.startListening()
                        .subscribe(
                            (matches: Array<String>)=> this.recognition = matches.join(''),
                            (error)=> console.error(error)
                        )
                    setTimeout(() => {
                      this.speechRecognition.stopListening();
                    },10000)
                  }else{
                    console.log('Requesting permission');
                    this.speechRecognition.requestPermission()
                        .then(this.startRecognition,()=>{
                          console.error('Permission denied');
                        })
                  }
                })
          }else{
            console.error('Not available');
          }
        })
  }

}
