import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import NuevoUsuario from '../views/NuevoUsuario.svelte';
import { render } from 'svelte/server'

export const nuevoUsuario = async (email: string, name: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'localhost',
            port: 1025
        });

        const rendered = await render(NuevoUsuario, { props: { firstName: name } })
        const { html } = rendered || {}

        const options = {
            from: 'no-reply@maytorena.xyz',
            to: email,
            subject: 'Nuevo Usuario',
            html: html
        };
        await transporter.sendMail(options);
        console.log('Email sent successfully!');
        return json({ message: 'Email sent', success: true });
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to send email' }, { status: 500 });
    }
}