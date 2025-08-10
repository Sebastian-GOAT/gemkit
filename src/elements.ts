function createGemkitElement(elName: string, props: Record<string, any>): HTMLElement {

    const el = document.createElement(elName);

    if (props.onClick)
        el.onclick = props.onClick;

    if (props.className) {
        const splitted = props.className.split(' ');
        splitted.forEach((className: string) => el.classList.add(className));
    }

    if (props.ref)
        props.ref.current = el;

    if (props.style) {
        for (const key of props.style) {
            el.style[key] = props.style[key];
        }
    }

    Object.entries(props).forEach(([key, value]) => {
        const illegalProps = ['onClick', 'className', 'ref', 'style'];
        if (!illegalProps.includes(key))
            el.setAttribute(key, value);
    });

    props.children?.forEach((child: string | number | boolean | HTMLElement) => {
        const isText = typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean';
        el.appendChild(isText ? document.createTextNode(child as string) : child);
    });

    return el;
}

export const Div = (props: Record<string, any>) => createGemkitElement('div', props);

export const Button = (props: Record<string, any>) => createGemkitElement('button', props);

export const Input = (props: Record<string, any>) => createGemkitElement('input', props);

export const H1 = (props: Record<string, any>) => createGemkitElement('h1', props);
export const H2 = (props: Record<string, any>) => createGemkitElement('h2', props);
export const H3 = (props: Record<string, any>) => createGemkitElement('h3', props);
export const H4 = (props: Record<string, any>) => createGemkitElement('h4', props);
export const H5 = (props: Record<string, any>) => createGemkitElement('h5', props);
export const H6 = (props: Record<string, any>) => createGemkitElement('h6', props);

export const P = (props: Record<string, any>) => createGemkitElement('p', props);

export const Span = (props: Record<string, any>) => createGemkitElement('span', props);

export const Img = (props: Record<string, any>) => createGemkitElement('img', props);

export const A = (props: Record<string, any>) => createGemkitElement('a', props);
export const Link = (props: Record<string, any>) => {
    const { to, ...rest } = props;
    return createGemkitElement('a', { ...rest, href: `${window.location.origin}/#${to}` });
};

export const Ul = (props: Record<string, any>) => createGemkitElement('ul', props);
export const Ol = (props: Record<string, any>) => createGemkitElement('ol', props);

export const Li = (props: Record<string, any>) => createGemkitElement('li', props);

export const List = (props: Record<string, any>) => {
    const { list, fn, ...rest } = props;

    const ul = createGemkitElement('ul', { ...rest });

    list.forEach((item: any, i: number) => {
        const modified = fn(item, i);
        ul.appendChild(createGemkitElement('li', {
            children: [modified]
        }));
    });

    return ul;
};