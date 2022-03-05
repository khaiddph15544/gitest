import toastr from "toastr"
import "toastr/build/toastr.min.css"
import $ from "jquery"
import jquery from "jquery-validation"
import axios from "axios"
import List from "./List"
import reRender from "./reRender"

const Add = {
    async render(){
        const {data} = await axios.get("http://localhost:3001/categories")
        return `
        <form id="addForm">
        <div class="form-group">
          <label for="exampleInputEmail1">Product name</label>
          <input type="text" class="form-control" id="name" name="name">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Image</label>
          <input type="file" class="form-control" id="image" name="image">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Price</label>
          <input type="text" class="form-control" id="price" name="price">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Description</label>
          <input type="text" class="form-control" id="desc" name="desc">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Category id</label>
        <select name="cate_id" id ="cate_id" class="form-control">
            <option value="">Chọn category</option>
            ${data.map(cate => `
                <option value="${cate.id}">${cate.name}</option>
            `)}
        </select>
      </div>
        <button type="submit" class="btn btn-primary">Thêm mới</button>
      </form>
        `
    },
     afterRender(){
        $("#addForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                image: {
                    required: true,
                },
                price: {
                    required: true,
                    digits: true
                },
                desc: {
                    required: true,
                },
                cate_id : {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Bạn phải nhập tên sản phẩm!",
                    minlength: "Tên sản phẩm không được nhỏ hơn 5 kí tự!"
                },
                image: {
                    required: "Bạn phải chọn ảnh sản phẩm!",
                },
                price: {
                    required: "Bạn phải nhập giá sản phẩm!",
                    digits: "Giá sản phẩm phải là số dương!"
                },
                desc: {
                    required: "Bạn phải nhập mô tả sản phẩm!",
                },
                cate_id : {
                    required: "Bạn phải chọn category!"
                }
            },
            submitHandler(form, e){
                e.preventDefault()
                const product = {
                    name: document.querySelector("#name").value,
                    img: document.querySelector("#image").files[0].name,
                    price: Number(document.querySelector("#price").value),
                    desc: document.querySelector("#desc").value,
                    categoryId: Number(document.querySelector("#cate_id").value),
                }

                axios.post("http://localhost:3001/products", product)
                .then(() => toastr.success("Thêm mới sản phẩm thành công!"))
                .then(() => reRender("#app", List))
            }
        })
    }
}
export default Add