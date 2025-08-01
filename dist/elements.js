function createGemkitElement(elName, props) {
    const el = document.createElement(elName);
    if (props.onClick)
        el.onclick = props.onClick;
    if (props.className) {
        const splitted = props.className.split(' ');
        splitted.forEach((className) => el.classList.add(className));
    }
    if (props.htmlType)
        el.setAttribute('type', props.htmlType);
    if (props.setReference)
        props.setReference(el);
    Object.entries(props).forEach(([key, value]) => {
        const illegalProps = ['onClick', 'className', 'htmlType', 'setReference'];
        if (!illegalProps.includes(key))
            el.setAttribute(key, value);
    });
    props.children?.forEach((child) => {
        const isText = typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean';
        el.appendChild(isText ? document.createTextNode(child) : child);
    });
    return el;
}
const Div = (props) => createGemkitElement('div', props);
const Button = (props) => createGemkitElement('button', props);
const Input = (props) => createGemkitElement('input', props);
const H1 = (props) => createGemkitElement('h1', props);
const H2 = (props) => createGemkitElement('h2', props);
const H3 = (props) => createGemkitElement('h3', props);
const H4 = (props) => createGemkitElement('h4', props);
const H5 = (props) => createGemkitElement('h5', props);
const H6 = (props) => createGemkitElement('h6', props);
const P = (props) => createGemkitElement('p', props);
const Span = (props) => createGemkitElement('span', props);
const Img = (props) => createGemkitElement('img', props);
const A = (props) => createGemkitElement('a', props);
const Link = (props) => {
    const { to, ...rest } = props;
    return createGemkitElement('a', { ...rest, href: `${window.location.origin}/#${to}` });
};
const Ul = (props) => createGemkitElement('ul', props);
const Ol = (props) => createGemkitElement('ol', props);
const Li = (props) => createGemkitElement('li', props);
const List = (props) => {
    const { list, fn, ...rest } = props;
    const ul = createGemkitElement('ul', { ...rest });
    list.forEach((item, i) => {
        const modified = fn(item, i);
        ul.appendChild(createGemkitElement('li', {
            children: [modified]
        }));
    });
    return ul;
};

export { A, Button, Div, H1, H2, H3, H4, H5, H6, Img, Input, Li, Link, List, Ol, P, Span, Ul };
//# sourceMappingURL=elements.js.map
