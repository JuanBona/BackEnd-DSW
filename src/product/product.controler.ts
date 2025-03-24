import { Request, Response, NextFunction } from "express";
import { Product } from "./product.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

function sanitizeProductInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        productBrand: req.body.productBrand,
        productClass: req.body.productClass
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
}

async function findAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    try {
        const [products, count] = await em.findAndCount(
            Product,
            {},
            {
                limit,
                offset,
                orderBy: { id: 'ASC' },
                populate: ['productClass', 'productBrand']
            }
        );

        res.status(200).json({
            data: products,
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const product = await em.findOneOrFail(
            Product,
            { id },
            { populate: ['productClass', 'productBrand'] }
        );
        res.status(201).json({ message: 'found product', data: product });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function add(req: Request, res: Response) {
    try {
        const product = em.create(Product, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Product created', data: product });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const productToUpdate = await em.findOneOrFail(Product, { id });
        em.assign(productToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Product updated', data: productToUpdate });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const product = em.getReference(Product, id);
        await em.removeAndFlush(product);
        res.status(201).json({ message: 'Product deleted', data: product });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { sanitizeProductInput, findAll, findOne, add, update, remove };