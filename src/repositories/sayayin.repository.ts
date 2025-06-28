// src/repositories/SayayinRepository.ts

import {Sayayin} from '../models/sayayin.model';
import { ICharacter } from '../types/Sayayin';

const SayayinRepository = {
  async findAll() {
    return Sayayin.find({ deletedAt: null });
  },

  async findById(id: number) {
    return Sayayin.findOne({ id, deletedAt: null });
  },

  async create(data: Partial<Sayayin>) {
    const nuevoSayayin = new Sayayin(data);
    return nuevoSayayin.save();
  },

  async update(id: number, data: Partial<Sayayin>) {
    return Sayayin.findOneAndUpdate({ id }, data, { new: true });
  },

  async softDelete(id: number) {
    return Sayayin.findOneAndUpdate({ id }, { deletedAt: new Date() }, { new: true });
  },

  async existsByName(name: string) {
    return Sayayin.exists({ name });
  },
};

export default SayayinRepository;
