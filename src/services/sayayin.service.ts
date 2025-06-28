// src/services/SayayinService.ts
// src/services/SayayinService.ts

import SayayinRepository from '../repositories/SayayinRepository';
import { Sayayin } from '../models/sayayin.model';

class SayayinService {
  async getAll(): Promise<Sayayin[]> {
    return SayayinRepository.findAll();
  }

  async getById(id: number): Promise<Sayayin | null> {
    const sayayin = await SayayinRepository.findById(id);
    if (!sayayin) {
      throw new Error('Sayayin no encontrado');
    }
    return sayayin;
  }

  async create(data: Partial<Sayayin>): Promise<Sayayin> {
    const exists = await SayayinRepository.existsByName(data.name!);
    if (exists) {
      throw new Error('Ya existe un Sayayin con ese nombre');
    }
    return SayayinRepository.create(data);
  }

  async update(id: number, data: Partial<Sayayin>): Promise<Sayayin | null> {
    await this.getById(id); // validación previa
    return SayayinRepository.update(id, data);
  }

  async softDelete(id: number): Promise<Sayayin | null> {
    await this.getById(id); // validación previa
    return SayayinRepository.softDelete(id);
  }
}

export default new SayayinService();