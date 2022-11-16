import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whatsappservice';

  socket:any;
  qr:any
  status:any=false;

  contactos:any
  ngOnInit()
  {

    this.socket = io('http://localhost:8080', {transports: ['websocket']});
    
    this.socket.emit('getConnection');

    this.socket.on('respuesta1', (args:any)=>
    {
      alert(args)
    });

    this.socket.on('notificate', (args:any)=>
    {
      alert(args)
    });

    this.socket.on('qr', (qr:any)=>
    {
      // console.log(qr);
      this.status= false;
      this.qr = qr
    })

    this.socket.on('waStatus', (state:any)=>
    {
      this.status = state;
    })

    this.socket.on('MisContactos', async (args:any)=>
    {
      this.contactos = args.contactos;
      console.log(args);
    });

  }

  clicked(number:any)
  {
    let args=
    {
      orden: 20,
      telefono: number
    }
    console.log('Im in clicked');
    this.socket.emit('sendNewOrdenFile', args)
  }

  getConnection()
  {
    // this.socket.emit('setConnection');
    this.socket.emit('getConnection');
  }


  setConnection()
  {
    this.socket.emit('setConnection');
  }

  close()
  {
    this.socket.emit('closeClient');
  }


}
