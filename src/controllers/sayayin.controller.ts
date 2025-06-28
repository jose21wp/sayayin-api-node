import { Request, Response } from 'express';
import { SayayinService } from '../services/sayayin.service';

export class SayayinController {
    static async create(req: Request, res: Response) {
        try {            
            const created = await SayayinService.create(req.body);
            res.status(201).json({ created });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el sayayin', error });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const all = await SayayinService.findAll();
            res.status(200).json({ all });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener sayayins', error });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const sayayin = await SayayinService.findOne(Number(req.params.id));
            if (!sayayin) res.status(404).json({ message: 'Sayayin no encontrado' });
            res.status(200).json({ sayayin });
        } catch (error) {
            res.status(500).json({ message: 'Error al buscar el sayayin', error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const updated = await SayayinService.update(Number(req.params.id), req.body);
            if (!updated) res.status(404).json({ message: 'Sayayin no encontrado' });
            res.status(200).json({ updated });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el sayayin', error });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const removed = await SayayinService.remove(Number(req.params.id));
            if (!removed) res.status(404).json({ message: 'Sayayin no encontrado' });
            res.status(200).json({ message: 'Sayayin eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el sayayin', error });
        }
    }
}