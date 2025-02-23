import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { render } from 'svelte/server'

import NuevaSession from '../views/NuevaSession.svelte';
import NuevoUsuario from '../views/NuevoUsuario.svelte';
import type { Usuario } from '$lib/types';

export const nuevoUsuario = async (email: string, usuario: Usuario) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'localhost',
            port: 1025
        });

        const rendered = await render(NuevoUsuario, { props: { usuario } })
        const { html } = rendered || {}

        const options = {
            from: 'no-reply@maytorena.xyz',
            to: email,
            subject: 'Nuevo Usuario',
            html: html
        };
        await transporter.sendMail(options);
        return { message: 'Correo "Nuevo Usuario" enviado', success: true };
    } catch (error) {
        console.error(error);
        return { message: 'Hubo un error al enviar el correo "Nuevo Usuario"', success: false };
    }
}

export const nuevaSession = async (email: string, usuario: { nombre: string }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'localhost',
            port: 1025
        });

        const rendered = await render(NuevaSession, { props: { usuario } })
        const { html } = rendered || {}

        const options = {
            from: 'no-reply@maytorena.xyz',
            to: email,
            subject: 'Nueva Sesion',
            html: html
        };
        await transporter.sendMail(options);        

        return { message: 'Correo "Nueva Sesion" enviado', success: true };
    } catch (error) {
        console.error(error);
        return { message: 'Hubo un error al enviar el correo "Nueva Sesion"', success: false };
    }
}