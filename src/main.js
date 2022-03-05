import Navigo from "navigo";
import Add from "./Add";
import Cate from "./Cate";
import Index from "./Index";
import List from "./List";
import Update from "./Update";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (component, id) => {
  document.querySelector("#app").innerHTML = await component.render(id);
  if (component.afterRender) await component.afterRender(id);
};

router.on({
  "/": () => {
    print(Index)
  },
  "/products":() => {
    print(List)
  },
  "/product/add":() => {
    print(Add)
  },
  "/product/:id/edit":({data}) => {
    print(Update, data.id)
  },
  "/cate/:id":({data}) => {
    print(Cate, data.id)
  }
});

router.resolve();
