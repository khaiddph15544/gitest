import toastr from "toastr"
import "toastr/build/toastr.min.css"
import $ from "jquery"
import jquery from "jquery-validation"
import axios from "axios"
import List from "./List"
import reRender from "./reRender"

const Update = {
    async render(id){
        const {data} = await axios.get("http://localhost:3001/categories")
        const pr = await axios.get("http://localhost:3001/products/"+id)
        return `
        <form id="addForm">
        <div class="form-group">
          <label for="exampleInputEmail1">Product name</label>
          <input type="text" class="form-control" id="name" name="name" value="${pr.data.name}">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Image</label>
          <input type="text" class="form-control" id="old_img" name="name" value="${pr.data.img}" hidden>
          <input type="file" class="form-control" id="image" name="image">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Price</label>
          <input type="text" class="form-control" id="price" name="price" value="${pr.data.price}">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Description</label>
          <input type="text" class="form-control" id="desc" name="desc" value="${pr.data.desc}">
        </div>
        <div class="form-group">
        <label for="exampleInputEmail1">Category id</label>
        <select name="cate_id" id ="cate_id" class="form-control">
            <option value="">Category cũ</option>
            ${data.map(cate => `
                <option value="${cate.id}">${cate.name}</option>
            `)}
        </select>
        <input type="text" class="form-control" id="old_cate" name="name" value="${pr.data.categoryId}" hidden>
      </div>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
      </form>
        `
    },
    afterRender(id){
        $("#addForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                price: {
                    required: true,
                    digits: true
                },
                desc: {
                    required: true,
                },
               
            },
            messages: {
                name: {
                    required: "Bạn phải nhập tên sản phẩm!",
                    minlength: "Tên sản phẩm phải lớn hơn 5 kí tự!"
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
              
            },
            submitHandler(form, e){
                e.preventDefault()
                const img = document.querySelector("#image").files[0]
                let image = ""
                if(img == undefined){
                    image = document.querySelector("#old_img").value
                }else{
                    image = img.name
                }

                const cate_id = document.querySelector("#cate_id").value
                let cate = ""
                if(cate_id == ""){
                    cate = document.querySelector("#old_cate").value 
                }else{
                    cate = cate_id
                }
                const product = {
                    name: document.querySelector("#name").value,
                    img: image,
                    price: Number(document.querySelector("#price").value),
                    desc: document.querySelector("#desc").value,
                    categoryId: Number(cate)
                }

                axios.put("http://localhost:3001/products/"+id, product)
                .then(() => toastr.success("Cập nhật sản phẩm thành công!"))
                .then(() => reRender("#app", List))
            }
        })
    }
}
export default Update