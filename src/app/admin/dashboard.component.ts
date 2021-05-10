import { Component, OnInit } from '@angular/core';
import { Card } from '@app/_models/card';
import { AlertService } from '@app/_services';

const PAGE_SIZE = 24; // default 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
   // pagination vars
   totalRegister!: number;
   actualpage = 0;
   base = 0;
   arrayvalueitemsperpage!: string[];
   pagesize!: number;
 
  cardsCollection!: Card[];
  cards = [
    {
      title: 'Usuarios',
      image: 'assets/images/card_usuarios.jpg',
      text: 'Altas, bajas y modificaciones de usuarios. Ponga a un molesto del foro en pausa desactivandolo.',
      buttontext: 'Editar Usuarios',
      route: '/users/list'
    },
    {
      title: 'Tours',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de recorridos. Tu publico merece la mejor info actualizada.',
      buttontext: 'Editar Tours',
      route: '/tours'
    },
    {
      title: 'Atracciones',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de atracciones. Tu publico merece la mejor info actualizada.',
      buttontext: 'Editar Atracciones',
      route: '/attractions'
    },
    {
      title: 'Ciudades',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de ciudades. Tu publico merece la mejor info actualizada.',
      buttontext: 'Editar Ciudades',
      route: '/cities'
    },
    {
      title: 'Galería',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de fotos. Tu publico merece la mejores imagenes.',
      buttontext: 'Editar Galería',
      route: '/photos'
    },
    {
      title: 'Roles',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de roles del sistema. El orden primero.',
      buttontext: 'Editar Roles',
      route: '/roles'
    },
    {
      title: 'Locaciones',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de locaciones. Tu publico merece la mejor info actualizada.',
      buttontext: 'Editar Locaciones',
      route: '/locations'
    },
    {
      title: 'Chat',
      image: 'assets/images/card_tours.jpg',
      text: 'Altas bajas y modificaciones de chats. Tu publico merece la mejor info actualizada.',
      buttontext: 'Editar Chats',
      route: '/chats'
    },
    {
      title: 'Clima',
      image: 'assets/images/card_clima.jpg',
      text: 'Ajusta tus historicos de consultas automaticas del servicio de clima.',
      buttontext: 'Editar Climas',
      route: '/weathers'
    },
  ];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.initPaginated();
    this.getPage(1);
  }

  initPaginated() {
    this.pagesize = PAGE_SIZE;
    this.actualpage = 1;
    this.arrayvalueitemsperpage = ['1', '3', '6', '12', '24'];
  }

  calculatePage() {
    this.base = (this.actualpage - 1) * this.pagesize;
  }

  getPage(pageNumber: number) {
    this.cardsCollection = [];
    try {
      this.actualpage = pageNumber;
      this.calculatePage();
      this.cards.forEach((card, index) => {
        if (index >= this.base && index < this.base + this.pagesize) {
          this.cardsCollection.push(card);
        }
      });
      this.totalRegister = this.cards.length;
    } catch (error) {
      this.alertService.error(error.message);
    }
  }
}
