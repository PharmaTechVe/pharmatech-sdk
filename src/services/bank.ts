import type { Client } from '@/client'

export class BankService {
  constructor() {
    this.findAll = this.findAll.bind(this)
  }

  findAll(): string[] {
    return [
      'Banco de Venezuela',
      'Banco Venezolano de Crédito',
      'Banco Mercantil',
      'Banco Provincial',
      'Banco del Caribe',
      'Banco Exterior',
      'Banco Caroní',
      'Banesco',
      'Banco Sofitasa',
      'Banco Plaza',
      'Banco de la Gente Emprendedora ',
      'Banco Fondo Común',
      '100% Banco',
      'Banco DelSur',
      'Banco del Tesoro',
      'Banco Agrícola de Venezuela',
      'Bancrecer',
      'Mi Banco',
      'Banco Activo',
      'Bancamiga',
      'Banco Internacional de Desarrollo',
      'Banplus Banco Universal',
      'Banco Bicentenario del Pueblo ',
      'Banco de la Fuerza Armada Nacional Bolivariana',
      'N58 Banco Digital',
      'Banco Nacional de Crédito',
      'Instituto Municipal de Crédito Popular',
    ]
  }
}
