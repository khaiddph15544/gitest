const reRender = async (dom, component, id="") => {
    document.querySelector(dom).innerHTML = await component.render(id);
    if (component.afterRender) await component.afterRender(id);
}
export default reRender