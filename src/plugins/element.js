import Vue from 'vue'
import { Aside,Button,Breadcrumb,BreadcrumbItem,
    Card,Col,Carousel,CarouselItem,Container,Dialog,Divider,Dropdown,DropdownItem,
    DropdownMenu, Form, FormItem,Header,Input,Image,
    InputNumber,Main,Menu,MenuItem,Option,Pagination,
    Popconfirm,Row,Select,Switch,Submenu,TableColumn,
    Table,Tag, Upload, Message,MessageBox} from 'element-ui'

Vue.component(Button.name,Button)
Vue.component(Breadcrumb.name,Breadcrumb)
Vue.component(BreadcrumbItem.name,BreadcrumbItem)
Vue.component(Carousel.name,Carousel)
Vue.component(CarouselItem.name,CarouselItem)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(Input.name,Input)
Vue.component(Container.name,Container)
Vue.component(Header.name,Header)
Vue.component(Aside.name,Aside)
Vue.component(Main.name,Main)
Vue.component(Menu.name,Menu)
Vue.component(Submenu.name,Submenu)
Vue.component(MenuItem.name,MenuItem)
Vue.component(Card.name,Card)
Vue.component(Row.name,Row)
Vue.component(Col.name,Col)
Vue.component(Image.name,Image)
Vue.component(InputNumber.name,InputNumber)
Vue.component(Dropdown.name,Dropdown)
Vue.component(DropdownItem.name,DropdownItem)
Vue.component(DropdownMenu.name,DropdownMenu)
Vue.component(Divider.name,Divider)
Vue.component(Table.name,Table)
Vue.component(TableColumn.name,TableColumn)
Vue.component(Switch.name,Switch)
Vue.component(Pagination.name,Pagination)
Vue.component(Popconfirm.name,Popconfirm)
Vue.component(Dialog.name,Dialog)
Vue.component(Tag.name,Tag)
Vue.component(Select.name,Select)
Vue.component(Option.name,Option)
Vue.component(Upload.name,Upload)

// 这个特殊的是message, 需要全局挂载 弹窗
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
