import { Component, ViewChild, ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  grafico:Chart;
  @ViewChild("myChart") chartCanvas;
  context:CanvasRenderingContext2D;

  rectW:number = 184;
  rectH:number = 143; //210
  posX:number = 164;
  posY:number = 215;

  segundosInciales:number = 30;
  tempTiempo:number=0;
  radioOrificio:number=100;
  radioTanque:number=400;
  gravedad:number=9.8;

  simular:boolean;
  ticks:number = 0;
  private timer;

  constructor(){
    this.simular = false;
    console.log("despues");
    this.setearValores();
  }

  ngOnInit(){
      
      
  }

  tickerFunc(tick){
    

      this.ticks = tick;
      console.log("segundo :" +tick + " altura:" + this.rectH);
      let calculo = (this.radioOrificio/this.radioTanque) * (this.radioOrificio/this.radioTanque) * Math.sqrt(2*this.gravedad*this.rectH);
      if (this.rectH - calculo>0){
        this.rectH = this.rectH - calculo;
      }
      else{
          this.rectH =0;        
          this.simular = false;
          this.timer.unsubscribe();
      }
      this.dibujarAgua();
  }

  ngAfterViewInit() {
    this.dibujarAgua();
  }

  ngOnDestroy(){
        console.log("Destroy timer");
    }

  setearValores(){
    this.rectW = 184;
    this.rectH = 143;
    this.posX = 164;
    this.posY = 215;
  }

  onIniciar() {
    //this.setearValores();
    this.simular = true;
    this.timer = Observable.timer(2000,1000);
    this.timer.subscribe(t => this.tickerFunc(t));
  }

  private dibujarAgua(){
    this.context = CanvasRenderingContext2D = this.chartCanvas.nativeElement.getContext("2d");
    var ctx = this.context;
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = "Blue";
    ctx.fillRect(this.posX, this.posY, this.rectW, -1*this.rectH);
  }
}
