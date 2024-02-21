import { Metadata } from "next";

export const nameDefault = 'James Dow';
export const roleDefault = 'Designer and Developer';
export const skillsDefault = ['HTML', 'CSS', 'Javascript', 'Design Thinking']
export const titleBase = `| ${roleDefault}`;
export const descriptionBase = `James Dow works at the intersection of design and development for companies like Peacock and IBM. James Dow pushes ideas from conception to their existence. James Dow collaborates using ${skillsDefault}.`;
export const images = `/james-dow-experiences.png`;

export function metaDataObj (
    title: string = nameDefault,
    description: string = '',
    image: string = images
): Metadata {
    const _title = `${title} ${titleBase}`;
    const _description = `${description}${descriptionBase}`;

    return {
        metadataBase: new URL('https://jamesdow.me/'),
        title: _title,
        description: _description,
        openGraph: {
            type: 'website',
            title: _title,
            description: _description,
            images: image,
            url: '/'
        },
        twitter: {
            card: 'summary_large_image',
            title: _title,
            description: _description,
            images: image
        }
    }
}

export function clientMetaData (role?: string) {
    if (!role) {
        return;
    }

    const titleElem = document.querySelector('title');
    const metaElems = document.querySelectorAll('[name="description"], [property="og:title"], [property="og:description"], [name="twitter:title"], [name="twitter:description"]');

    if (titleElem) {
        titleElem.innerHTML = titleElem?.innerHTML.replaceAll(roleDefault, role)
    }

    if (metaElems.length) {
        metaElems.forEach(metaItem => {
            const text = metaItem.getAttribute('content') || '';
            metaItem.setAttribute('content', text.replaceAll(roleDefault, role));
        });
    }
}