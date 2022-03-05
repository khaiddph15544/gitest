import axios from "axios"

const Index = {
    async render(){
        const {data} = await axios.get("http://localhost:3001/categories")
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Trang chủ</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/products">Danh sách sản phẩm <span class="sr-only">(current)</span></a>
            </li>
            ${data.map(e => `
                <li class="nav-item active">
                <a class="nav-link" href="/cate/${e.id}">${e.name} <span class="sr-only">(current)</span></a>
            </li>
            `).join("")}
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <h3 class="text-center mt-40">HOMEPAGE</h3>
        `
    }
}
export default Index