import Vue from 'vue'
import { Aside,Button,Breadcrumb,BreadcrumbItem,
    Card,Col,Carousel,CarouselItem,Container,Dialog,Divider,Dropdown,DropdownItem,
    DropdownMenu, Form, FormItem,Header,Input,Image,
    InputNumber,Main,Menu,MenuItem,Option,Pagination,
    Popconfirm,Row,Select,Switch,Submenu,TableColumn,
    Table,Tag, Upload, Message,MessageBox} from 'element-ui'

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Image)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)

// 这个特殊的是message, 需要全局挂载 弹窗
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm