import axios from "axios"

const Cate = {
    async render(id){
        const {data} = await axios.get("http://localhost:3001/products")
        const arrPrByCate = []
        data.forEach(pr => {
            if(pr.categoryId == id){
                arrPrByCate.push(pr)
            }
        });
        arrPrByCate.sort((a, b) => a.price < b.price ? 1 : (b.price < a.price ? -1 : 0))
        return `
        <h2 class="text-center mb-10">Sản phẩm theo danh mục</h2>
        ${arrPrByCate.map(e => `
            <h3>${e.name}</h3>
            <p>${e.img}</p>
            <p>${e.price}</p>
            <p>${e.desc}</p>
            <hr>
        `).join("")}
            
        `
    }
}
export default Cate