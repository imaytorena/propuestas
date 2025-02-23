import type { PageServerLoad } from '../$types';
import { convert } from "html-to-text";
import { render } from 'svelte/server';
import NuevoUsuario from '$lib/emails/views/NuevoUsuario.svelte';
import NuevaSession from '$lib/emails/views/NuevaSession.svelte';

const renderAsPlainText = (markup: string) => {
    return convert(markup, {
        selectors: [
            { selector: "img", format: "skip" },
            { selector: "#__svelte-email-preview", format: "skip" },
        ],
    });
};

export const load: PageServerLoad = async ({ params }) => {

    let component = null
    switch (params?.email) {
        case 'nuevo-usuario':
            component = NuevoUsuario
            break;
        case 'nueva-session':
            component = NuevaSession
            break;
        default:
            component = NuevoUsuario
            break;
    }
    const rendered = await render(component, { props: { usuario: { nombre: 'Juan' } } });
    const doctype =
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

    const html = `${doctype}${rendered.body}`;

    const text = renderAsPlainText(rendered.body); 
    return {
        html: `${html}`,
        text: text,
        emails: ['nuevo-usuario', 'nueva-session']
    }
}