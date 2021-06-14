Để sử dụng Menu cần thư viện Tech5s
Nếu sử dụng HTML mẫu trong file index.html thì không cần cài đặt hay khởi tạo
Sử dụng
Tech5sMenu.Tech5sMenu.quickCreate()
là có thể chạy
Hàm này mặc định có 2 tham số, tham số 1: isDebug, tham số 2 là Object
{
fixedMenu:{
hideOnScrollDown : true,
delayShowOnScrollTop: 35, /_ Delay hiển thị khi scroll top. Áp dụng khi hideOnScrollDown = true _/
classMenuInShow : 'in-menu-show',
classMenuInHide : 'in-menu-hide',
classHeader:'.header'
},
searchMenu:{
fullContent: true, /_ có 2 kiểu hiển thị, 1 là full style nếu true, và dạng poup nếu false_/
contentTagertSelector: '.header-content',
buttonShowSearch:'.btn-show-search',
buttonDoSearch:'.btn-do-search',
buttonCloseSearch:'.btn-close-search',
formSearch:'.form-search-header',
inputSearch:'input[type=text]',
typeShowSearch:'overlay'
},
menuMobile:{
mainMenu:'.main-menu',
menuMobile:'.sp-menu',
menuMobileContent:'nav.sp-menu-content',
buttonShowMenu:'.btn-sp-menu',
overLayMenu:'.over-lay-menu',
animateIconMenu:'.animated-icon-menu',
buttonDropDown:'.btn-dropdown-menu'
}
}

Trong Tech5s Menu có 3 phần

FixedMenu
MenuMobile
và SearchMenu

Có thể gọi var menu= new Tech5sMenu.Tech5sMenu(false)
menu.createFixedMenu({});
menu.createMenuMobile({});
menu.createSearchMenu({});
