import toastr from "toastr"
import "toastr/build/toastr.min.css"
import axios from "axios"
import reRender from "./reRender"

const List = {
    async render(){
        const {data} = await axios.get("http://localhost:3001/products")
        return `
        <a href="/product/add">Thêm mới</a>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Desc</th>
            <th scope="col">Category id</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        ${data.map(e => `
            <tr>
                <th scope="row">${e.id}</th>
                <td>${e.name}</td>
                <td>${e.img}</td>
                <td>${e.price}</td>
                <td class="w-96">${e.desc}</td>
                <td>${e.categoryId}</td>
                <td>
                    <a href="/product/${e.id}/edit">Sửa</a>
                    <button data-id="${e.id}" class="btn">Xóa</button>
                </td>
            </tr>
        `).join("")}
          
        </tbody>
      </table>
        `
    },
    afterRender(){
        const btns = document.querySelectorAll(".btn")
        btns.forEach(btn => {
            const id = btn.dataset.id
            btn.addEventListener("click", () => {
                const confirm = window.confirm("Bạn có muốn xóa không?")
                if(confirm){
                    axios.delete("http://localhost:3001/products/"+id)
                    .then(() => toastr.success("Xóa sản phẩm thành công!"))
                    .then(() => reRender("#app", List))
                }
            })
        })
    }
}
export default List