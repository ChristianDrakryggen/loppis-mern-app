(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{34:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n(1),c=n.n(s),i=n(22),o=n.n(i),u=n(2),a=function(e){return fetch("/users/user/register",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return e}))},d=function(e){return fetch("/users/user/login",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{isAuthenticated:!1,user:{_id:null,username:""},message:{msgBody:"Unauthorized",msgError:!0}}}))},j=function(){return fetch("/users/user/logout").then((function(e){return e.json()})).then((function(e){return e}))},l=function(){return fetch("/users/user/authenticated").then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{isAuthenticated:!1,user:{_id:null,username:""},message:{msgBody:"Unauthorized",msgError:!0}}}))},h=Object(s.createContext)(),b=function(e){var t=e.children,n=Object(s.useState)(null),c=Object(u.a)(n,2),i=c[0],o=c[1],a=Object(s.useState)(!1),d=Object(u.a)(a,2),j=d[0],b=d[1],p=Object(s.useState)(!1),O=Object(u.a)(p,2),x=O[0],f=O[1];return Object(s.useEffect)((function(){l().then((function(e){o(e.user),b(e.isAuthenticated),f(!0)}))}),[]),Object(r.jsx)("div",{children:x?Object(r.jsx)(h.Provider,{value:{user:i,setUser:o,isAuthenticated:j,setIsAuthenticated:b},children:t}):Object(r.jsx)("h1",{children:"Loading..."})})},p=Object(s.createContext)(),O=function(e){var t=e.children,n=Object(s.useState)([]),c=Object(u.a)(n,2),i=c[0],o=c[1],a=Object(s.useState)(!1),d=Object(u.a)(a,2),j=d[0],l=d[1];return Object(r.jsx)("div",{children:Object(r.jsx)(p.Provider,{value:{basket:i,setBasket:o,showBasket:j,setShowBasket:l},children:t})})},x=n(6),f=n(4),m=function(){var e=Object(s.useContext)(p);return Object(r.jsx)(r.Fragment,{children:e.showBasket&&Object(r.jsxs)("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",borderBottom:"1px solid black",padding:"10px 10px 10px 20px"},children:[e.basket.length>0?Object(r.jsx)("div",{children:e.basket.slice().filter((function(e,t,n){return n.findIndex((function(t){return t._id===e._id}))===t})).map((function(t){return Object(r.jsxs)("div",{style:{display:"flex",padding:"10px",borderBottom:"1px solid #e1e1e1"},children:[Object(r.jsx)("p",{style:{paddingRight:"10px"},children:"".concat(t.name," ").concat(t.count," st - ").concat(t.price*t.count," kr")}),Object(r.jsx)("button",{onClick:function(){return function(t){e.setBasket(e.basket.filter((function(e){return e._id!==t._id})))}(t)},children:"Remove"})]},t.id)}))}):Object(r.jsx)("div",{style:{paddingRight:"19px"},children:Object(r.jsx)("p",{children:"No items..."})}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)("p",{style:{paddingRight:"10px"},children:"Total: ".concat(e.basket.map((function(e){return e.price})).reduce((function(e,t){return e+t}),0))}),Object(r.jsx)("button",{onClick:function(){return e.setShowBasket(!1)},children:"Close"})]})]})})},g=function(){var e=Object(s.useContext)(h),t=Object(s.useContext)(p),n=Object(f.f)(),c=function(){j().then((function(t){t.success&&(e.setUser(t.user),e.setIsAuthenticated(!1),n.push("/login"))}))};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(m,{}),Object(r.jsx)("div",{style:{display:"flex",justifyContent:"space-between",borderBottom:"1px solid black",padding:"10px 20px 0px 20px"},children:e.isAuthenticated?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)(x.b,{to:"/",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Loppis"})}),Object(r.jsx)(x.b,{to:"/account",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Account"})})]}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsxs)("p",{style:{fontWeight:"bold"},children:["Items in cart: ",Object(r.jsx)("span",{children:t.basket.length})]}),t.showBasket?Object(r.jsx)("button",{style:{margin:"10px"},onClick:function(){return t.setShowBasket(!1)},children:"Hide basket"}):Object(r.jsx)("button",{style:{margin:"10px"},onClick:function(){return t.setShowBasket(!0)},children:"Show basket"})]}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)(x.b,{to:"/checkout",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Checkout"})}),Object(r.jsx)("button",{style:{margin:"10px"},onClick:c,children:"Logout"})]})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)(x.b,{to:"/",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Loppis"})}),Object(r.jsx)(x.b,{to:"/login",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Login"})}),Object(r.jsx)(x.b,{to:"/register",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Register"})})]}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsxs)("p",{style:{fontWeight:"bold"},children:["Items in cart: ",Object(r.jsx)("span",{children:t.basket.length})]}),t.showBasket?Object(r.jsx)("button",{style:{margin:"10px"},onClick:function(){return t.setShowBasket(!1)},children:"Hide basket"}):Object(r.jsx)("button",{style:{margin:"10px"},onClick:function(){return t.setShowBasket(!0)},children:"Show basket"})]}),Object(r.jsx)("div",{children:Object(r.jsx)(x.b,{to:"/checkout",children:Object(r.jsx)("p",{style:{margin:"10px"},children:"Checkout"})})})]})})]})},y=function(e){var t=Object(f.f)(),n=e.store,s=n.username,c=n._id;return Object(r.jsxs)("div",{style:{marginRight:"10px",border:"2px solid black",padding:"0px 20px 20px"},children:[Object(r.jsx)("h1",{children:s}),Object(r.jsx)("button",{onClick:function(){return e=c,void t.push("/insidestore/".concat(e));var e},children:"To store"})]})},v=function(){return fetch("/users/getallusers").then((function(e){return e.json().then((function(e){return e}))}))},C=function(e){return fetch("/users/user/updateuser",{method:"put",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},k=function(){var e=Object(s.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(s.useEffect)((function(){v().then((function(e){c(e.users)}))}),[]),console.log(n),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{children:"Loppis"}),Object(r.jsx)("div",{style:{display:"flex"},children:n.map((function(e){return Object(r.jsx)(y,{store:e},e._id)}))})]})},S=n(7),w=n(3),B=function(){var e=Object(s.useContext)(h),t=Object(f.f)(),n=Object(s.useState)({username:"",password:""}),c=Object(u.a)(n,2),i=c[0],o=c[1],a=function(e){o(Object(w.a)(Object(w.a)({},i),{},Object(S.a)({},e.target.name,e.target.value)))};return console.log(e.isAuthenticated),Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Login"}),Object(r.jsxs)("form",{onSubmit:function(n){n.preventDefault(),d(i).then((function(n){var r=n.isAuthenticated,s=n.user;r&&(e.setUser(s),e.setIsAuthenticated(r),t.push("/account"))}))},children:[Object(r.jsx)("input",{name:"username",value:i.username,onChange:a,required:!0,placeholder:"Username"}),Object(r.jsx)("input",{name:"password",type:"password",value:i.password,onChange:a,required:!0,placeholder:"Password"}),Object(r.jsx)("button",{type:"submit",children:"Login"})]})]})},E=function(){var e=Object(f.f)(),t=Object(s.useState)({username:"",password:""}),n=Object(u.a)(t,2),c=n[0],i=n[1],o=Object(s.useState)(null),d=Object(u.a)(o,2),j=(d[0],d[1]),l=function(e){i(Object(w.a)(Object(w.a)({},c),{},Object(S.a)({},e.target.name,e.target.value)))};return console.log(c),Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Register"}),Object(r.jsxs)("form",{onSubmit:function(t){t.preventDefault(),a(c).then((function(t){var n=t.message;j(n),n.msgError||e.push("/login")}))},children:[Object(r.jsx)("input",{name:"username",value:c.username,onChange:l,required:!0,placeholder:"Username"}),Object(r.jsx)("input",{name:"password",type:"password",value:c.password,onChange:l,required:!0,placeholder:"Password"}),Object(r.jsx)("button",{type:"submit",children:"Register"})]})]})},z=n(14),_=function(e){return fetch("/users/user/neworder",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},U=function(e){return fetch("/users/user/neworderhistoryitem",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unautorized",msgError:!0}}}))},A=function(){return fetch("users/user/getorders").then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},I=function(){return fetch("users/user/getorderhistory").then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},q=function(e){return fetch("/users/user/removeorder",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},T=function(e){return fetch("/users/user/newaddress",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},P=function(e){return fetch("/users/user/updateaddress",{method:"put",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},N=function(){return fetch("users/user/getaddress").then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},R=function(e){var t=e.store,n=e.setMessage,c=Object(s.useContext)(p),i=Object(s.useContext)(h),o=Object(s.useState)({firstname:"",lastname:"",email:"",phone:"",street:"",zipCode:"",town:"",country:"",products:[],storeOwnerId:""}),a=Object(u.a)(o,2),d=a[0],j=a[1],l=function(e){j(Object(w.a)(Object(w.a)({},d),{},Object(S.a)({},e.target.name,e.target.value)))};return Object(s.useEffect)((function(){""!==d.storeOwnerId&&(_(d).then((function(e){e&&e.message&&n(e.message)})).then((function(){U(d).then((function(e){e&&e.message&&n(e.message)}))})),c.setBasket(Object(z.a)(c.basket).filter((function(e){return!d.products.includes(e)}))))}),[d.products]),Object(s.useEffect)((function(){i.isAuthenticated&&N().then((function(e){e&&e.address&&j(Object(w.a)(Object(w.a)({},d),{},{firstname:i.user.firstname,lastname:i.user.lastname,email:i.user.email,phone:i.user.phone,street:e.address.street,zipCode:e.address.zipCode,town:e.address.town,country:e.address.country}))}))}),[i.isAuthenticated]),Object(r.jsxs)("div",{style:{borderBottom:"2px solid black",padding:"20px"},children:[Object(r.jsx)("h3",{children:t.username}),Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)("div",{style:{width:"50%",marginRight:"2%"},children:c.basket.filter((function(e){return t.products.some((function(t){return t===e._id}))})).slice().filter((function(e,t,n){return n.findIndex((function(t){return t._id===e._id}))===t})).map((function(e){return Object(r.jsxs)("div",{style:{display:"flex",padding:"10px",borderBottom:"1px solid #e1e1e1"},children:[Object(r.jsx)("p",{style:{paddingRight:"10px"},children:"".concat(e.name," ").concat(e.count," - ").concat(e.price*e.count," kr")}),Object(r.jsx)("button",{onClick:function(){!function(e){c.setBasket(Object(z.a)(c.basket).filter((function(t){return t._id!==e._id})))}(e)},children:"Remove"})]},e._id)}))}),Object(r.jsxs)("form",{onSubmit:function(e){return function(e,t,n){n.preventDefault();var r=e.filter((function(e,t,n){return n.findIndex((function(t){return t._id===e._id}))===t})),s=t._id;j(Object(w.a)(Object(w.a)({},d),{},{products:r,storeOwnerId:s}))}(c.basket.filter((function(e){return t.products.some((function(t){return t===e._id}))})),t,e)},children:[Object(r.jsx)("h3",{children:"Delivery/invoicing address"}),Object(r.jsx)("input",{name:"firstname",value:d.firstname,onChange:l,required:!0,placeholder:"Firstname"}),Object(r.jsx)("input",{name:"lastname",value:d.lastname,onChange:l,required:!0,placeholder:"Lastname"}),Object(r.jsx)("input",{name:"email",value:d.email,onChange:l,required:!0,placeholder:"Email"}),Object(r.jsx)("input",{name:"phone",value:d.phone,onChange:l,required:!0,placeholder:"Phone"}),Object(r.jsx)("input",{name:"street",value:d.street,onChange:l,required:!0,placeholder:"Street"}),Object(r.jsx)("input",{name:"zipCode",value:d.zipCode,onChange:l,required:!0,placeholder:"Zipcode"}),Object(r.jsx)("input",{name:"town",value:d.town,onChange:l,required:!0,placeholder:"Town"}),Object(r.jsx)("input",{name:"country",value:d.country,onChange:l,required:!0,placeholder:"Country"}),Object(r.jsx)("p",{children:"Total: ".concat(c.basket.filter((function(e){return t.products.some((function(t){return t===e._id}))})).map((function(e){return e.price})).reduce((function(e,t){return e+t}),0)," kr")}),Object(r.jsx)("button",{style:{marginTop:"10px"},type:"submit",children:"Checkout"})]})]})]})},D=function(){var e=Object(s.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],i=Object(s.useState)(null),o=Object(u.a)(i,2),a=o[0],d=o[1],j=Object(s.useContext)(p),l=Object(f.f)();return Object(s.useEffect)((function(){v().then((function(e){e&&c(e.users)}))}),[]),Object(s.useEffect)((function(){setTimeout((function(){d(null)}),2e3)}),[a]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{children:"Checkout"}),null!==a&&Object(r.jsx)("p",{children:a.msgBody}),j.basket.length>0?Object(r.jsx)("div",{children:n.map((function(e){return e.products.some((function(e){return j.basket.some((function(t){return e===t._id}))}))?Object(r.jsx)(R,{store:e,setMessage:d},e._id):null}))}):Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"No items..."}),Object(r.jsx)("button",{onClick:function(){return l.push("/")},children:"Back to market"})]})]})},J=function(e){return fetch("/users/user/getproducts",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json().then((function(e){return e}))}))},F=function(){return fetch("/users/user/getmyproducts").then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},W=function(e){return fetch("users/user/newproduct",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},L=function(e){return fetch("/users/user/removeproduct",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){return 401!==e.status?e.json().then((function(e){return e})):{message:{msgBody:"Unauthorized",msgError:!0}}}))},M=function(e){var t=e.order,n=e.removeOrder,c=e.orderHistory,i=void 0!==c&&c,o=Object(s.useState)(!1),a=Object(u.a)(o,2),d=a[0],j=a[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{style:{display:"flex",marginBottom:"10px",borderBottom:"1px solid #e1e1e1",padding:"5px"},children:[!i&&Object(r.jsx)("p",{style:{marginRight:"5px"},children:"".concat(t.firstname," ").concat(t.lastname," | ").concat(t.email)}),i&&Object(r.jsx)("p",{style:{marginRight:"5px"},children:"# ".concat(t._id)}),!d&&Object(r.jsx)("button",{onClick:function(){return j(!0)},children:"Show info"}),d&&Object(r.jsx)("button",{onClick:function(){return j(!1)},children:"Hide info"}),!i&&Object(r.jsx)("button",{onClick:function(){return n(t)},children:"Remove"})]}),d&&Object(r.jsxs)("div",{style:{display:"flex",borderBottom:"1px solid #e1e1e1",padding:"0px"},children:[!i&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{style:{padding:"0px 10px"},children:[Object(r.jsx)("p",{children:"Order number: ".concat(t._id)}),Object(r.jsx)("p",{children:"Name: ".concat(t.firstname," ").concat(t.lastname)}),Object(r.jsx)("p",{children:"Phone: ".concat(t.phone)}),Object(r.jsx)("p",{children:"Email: ".concat(t.email)})]}),Object(r.jsxs)("div",{style:{padding:"0px 10px"},children:[Object(r.jsx)("p",{style:{fontWeight:"bold"},children:"Adress"}),Object(r.jsx)("p",{children:"".concat(t.street)}),Object(r.jsx)("p",{children:"".concat(t.zipCode,", ").concat(t.town)}),Object(r.jsx)("p",{children:"".concat(t.country)})]}),Object(r.jsxs)("div",{style:{padding:"0px 10px"},children:[Object(r.jsx)("p",{style:{fontWeight:"bold"},children:"Products"}),t.products.map((function(e){return Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:e.name}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"ID: ".concat(e._id)}),Object(r.jsx)("li",{children:"Qty: ".concat(e.count)}),Object(r.jsx)("li",{children:"Price: ".concat(e.price)})]})]},e._id)}))]})]}),i&&Object(r.jsxs)("div",{style:{padding:"0px 10px"},children:[Object(r.jsx)("p",{children:"Order number: ".concat(t._id)}),Object(r.jsx)("p",{style:{fontWeight:"bold"},children:"Products"}),t.products.map((function(e){return Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:e.name}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"ID: ".concat(e._id)}),Object(r.jsx)("li",{children:"Qty: ".concat(e.count)}),Object(r.jsx)("li",{children:"Price: ".concat(e.price)})]})]},e._id)}))]})]})]})},H=function(e){var t=e.authContext,n=e.setMessage,c=Object(s.useState)({firstname:"",lastname:"",email:"",phone:""}),i=Object(u.a)(c,2),o=i[0],a=i[1],d=Object(s.useState)(!1),j=Object(u.a)(d,2),l=j[0],h=j[1],b=function(e){a(Object(w.a)(Object(w.a)({},o),{},Object(S.a)({},e.target.name,e.target.value)))};return Object(s.useEffect)((function(){l&&a(Object(w.a)(Object(w.a)({},o),{},{firstname:t.user.firstname,lastname:t.user.lastname,email:t.user.email,phone:t.user.phone}))}),[l]),Object(r.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",margin:"10px 0px",padding:"10px 0px",borderBottom:"1px solid #e1e1e1"},children:[Object(r.jsx)("p",{style:{margin:"0px 5px 0px 0px"},children:"Welcome ".concat(t.user.username)}),!l&&Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)("button",{onClick:function(){return h(!0)},children:"Add/change personal info"}),Object(r.jsx)("p",{style:{margin:"0px 5px 0px 5px"},children:t.user.firstname}),Object(r.jsx)("p",{style:{margin:"0px 5px 0px 5px"},children:t.user.lastname}),Object(r.jsx)("p",{style:{margin:"0px 5px 0px 5px"},children:t.user.email}),Object(r.jsx)("p",{style:{margin:"0px 5px 0px 5px"},children:t.user.phone})]}),l&&Object(r.jsxs)("form",{style:{display:"flex"},onSubmit:function(e){e.preventDefault(),C(o).then((function(e){var r=e.message;r.msgError?"Unauthorized"===r.msgBody?(n(r),t.setUser({username:""}),t.setIsAuthenticated(!1)):n(r):(t.setUser(Object(w.a)(Object(w.a)({},t.user),{},{firstname:o.firstname,lastname:o.lastname,email:o.email,phone:o.phone})),n(r),h(!1))}))},children:[Object(r.jsx)("input",{name:"firstname",value:o.firstname,onChange:b,placeholder:"Firstname"}),Object(r.jsx)("input",{name:"lastname",value:o.lastname,onChange:b,placeholder:"Lastname"}),Object(r.jsx)("input",{name:"email",value:o.email,onChange:b,placeholder:"Email"}),Object(r.jsx)("input",{name:"phone",value:o.phone,onChange:b,placeholder:"Phone"}),Object(r.jsx)("button",{type:"submit",children:"Add"}),Object(r.jsx)("button",{onClick:function(){return h(!1)},children:"Cancel"})]})]})},Z=function(e){var t=e.authContext,n=e.setMessage,c=e.products,i=e.setProducts,o=e.removeProduct,a=Object(s.useState)({id:null,name:"",description:"",price:""}),d=Object(u.a)(a,2),j=d[0],l=d[1],h=Object(s.useState)(!1),b=Object(u.a)(h,2),p=b[0],O=b[1],x=function(e){l(Object(w.a)(Object(w.a)({},j),{},Object(S.a)({},e.target.name,e.target.value)))},f=function(){l({name:"",description:"",price:""})};return Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{style:{fontWeight:"bold"},children:"Products"}),!p&&Object(r.jsx)("button",{onClick:function(){return O(!0)},children:"Add product"}),p&&Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),W(j).then((function(e){var r=e.message;f(),r.msgError?"Unauthorized"===r.msgBody?(n(r),t.setUser({username:""}),t.setIsAuthenticated(!1)):n(r):F().then((function(e){e&&(i(e.products),n(r))}))}))},style:{display:"flex",flexDirection:"column"},children:[Object(r.jsx)("input",{name:"name",value:j.name,onChange:x,required:!0,placeholder:"Name"}),Object(r.jsx)("input",{name:"description",value:j.description,onChange:x,placeholder:"Description"}),Object(r.jsx)("input",{name:"price",value:j.price,onChange:x,required:!0,placeholder:"Price"}),Object(r.jsx)("button",{type:"submit",children:"Save"}),Object(r.jsx)("button",{onClick:function(){return O(!1)},children:"Close"})]}),Object(r.jsx)("div",{children:c.map((function(e){return Object(r.jsxs)("div",{style:{padding:"10px 0px",borderBottom:"1px solid #e1e1e1"},children:[Object(r.jsx)("p",{style:{fontWeight:"bold"},children:e.name}),Object(r.jsx)("p",{children:"".concat(e.price," kr")}),Object(r.jsx)("p",{children:e.description}),Object(r.jsx)("button",{onClick:function(){return o(e)},children:"Remove"})]},e._id)}))})]})},Q=function(e){var t=e.authContext,n=e.setMessage,c=Object(s.useState)({id:null,street:"",zipCode:"",town:"",country:""}),i=Object(u.a)(c,2),o=i[0],a=i[1],d=Object(s.useState)(!1),j=Object(u.a)(d,2),l=j[0],h=j[1],b=Object(s.useState)(!1),p=Object(u.a)(b,2),O=p[0],x=p[1],f=function(e){a(Object(w.a)(Object(w.a)({},o),{},Object(S.a)({},e.target.name,e.target.value)))};return Object(s.useEffect)((function(){""!==t.user.username&&N().then((function(e){e&&e.address&&a(e.address)}))}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{style:{fontWeight:"bold"},children:"Address"}),!l&&""===o.street&&""===o.zipCode&&""===o.town&&""===o.country&&Object(r.jsx)("button",{onClick:function(){return h(!0)},children:"Add address"}),!O&&(""!==o.street||""!==o.zipCode||""!==o.town||""!==o.country)&&Object(r.jsx)("button",{onClick:function(){return x(!0)},children:"Change address"}),l&&Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),T(o).then((function(e){var r=e.message;r.msgError?"Unauthorized"===r.msgBody?(n(r),t.setUser({username:""}),t.setIsAuthenticated(!1)):n(r):N().then((function(e){a(e.address),n(r)}))}))},style:{display:"flex",flexDirection:"column"},children:[Object(r.jsx)("input",{name:"street",value:o.street,onChange:f,required:!0,placeholder:"Street"}),Object(r.jsx)("input",{name:"zipCode",value:o.zipCode,onChange:f,required:!0,placeholder:"Zipcode"}),Object(r.jsx)("input",{name:"town",value:o.town,onChange:f,required:!0,placeholder:"Town"}),Object(r.jsx)("input",{name:"country",value:o.country,onChange:f,required:!0,placeholder:"country"}),Object(r.jsx)("button",{type:"submit",children:"Save"}),Object(r.jsx)("button",{onClick:function(){return h(!1)},children:"Close"})]}),O&&Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),P(o).then((function(e){var r=e.message;r.msgError?"Unauthorized"===r.msgBody?(n(r),t.setUser({username:""}),t.setIsAuthenticated(!1)):n(r):N().then((function(e){a(e.address),n(r),x(!1)}))}))},style:{display:"flex",flexDirection:"column"},children:[Object(r.jsx)("input",{name:"street",value:o.street,onChange:f,required:!0,placeholder:"Street"}),Object(r.jsx)("input",{name:"zipCode",value:o.zipCode,onChange:f,required:!0,placeholder:"Zipcode"}),Object(r.jsx)("input",{name:"town",value:o.town,onChange:f,required:!0,placeholder:"Town"}),Object(r.jsx)("input",{name:"country",value:o.country,onChange:f,required:!0,placeholder:"country"}),Object(r.jsx)("button",{type:"submit",children:"Save"}),Object(r.jsx)("button",{onClick:function(){return x(!1)},children:"Close"})]}),Object(r.jsx)("p",{children:o.street}),Object(r.jsx)("p",{children:o.zipCode}),Object(r.jsx)("p",{children:o.town}),Object(r.jsx)("p",{children:o.country})]})},G=function(){var e=Object(s.useContext)(h),t=Object(s.useState)([]),n=Object(u.a)(t,2),c=n[0],i=n[1],o=Object(s.useState)([]),a=Object(u.a)(o,2),d=a[0],j=a[1],l=Object(s.useState)([]),b=Object(u.a)(l,2),p=b[0],O=b[1],x=Object(s.useState)(null),f=Object(u.a)(x,2),m=(f[0],f[1]),g=function(t){q(t).then((function(t){var n=t.message;n.msgError?"Unauthorized"===n.msgBody?(m(n),e.setUser({username:""}),e.setIsAuthenticated(!1)):m(n):A().then((function(e){j(e.orders),m(n)}))}))};return Object(s.useEffect)((function(){""!==e.user.username&&(F().then((function(e){e&&e.products&&i(e.products)})),A().then((function(e){e&&e.orders&&j(e.orders)})),I().then((function(e){O(e.orderHistory)})))}),[]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{children:"Account"}),Object(r.jsx)(H,{authContext:e,setMessage:m}),Object(r.jsxs)("div",{style:{display:"flex",margin:"10px 0px",justifyContent:"space-between"},children:[Object(r.jsx)(Z,{authContext:e,setMessage:m,products:c,setProducts:i,removeProduct:function(t){L(t).then((function(t){var n=t.message;n.msgError?"Unauthorized"===n.msgBody?(m(n),e.setUser({username:""}),e.setIsAuthenticated(!1)):m(n):F().then((function(e){i(e.products),m(n)}))}))}}),Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{style:{fontWeight:"bold"},children:"Incoming orders"}),d.slice().reverse().map((function(e){return Object(r.jsx)(M,{order:e,removeOrder:g},e._id)}))]}),Object(r.jsx)(Q,{authContext:e,setMessage:m})]}),Object(r.jsxs)("div",{style:{padding:"20px 20px 0px 0px",width:"33%"},children:[Object(r.jsx)("p",{style:{fontWeight:"bold",marginTop:"0px"},children:"Order history"}),p.map((function(e){return Object(r.jsx)(M,{order:e,removeOrder:g,orderHistory:!0},e._id)}))]})]})},K=function(e){var t=Object(s.useContext)(p),n=e.match.params.id,c=Object(s.useState)(""),i=Object(u.a)(c,2),o=i[0],a=i[1],d=Object(s.useState)([]),j=Object(u.a)(d,2),l=j[0],h=j[1];Object(s.useEffect)((function(){J({_id:n}).then((function(e){e&&(h(e.products),a(e.username))}))}),[n]);return console.log(t.basket),Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:o}),Object(r.jsx)("h3",{children:"Products"}),Object(r.jsx)("div",{children:l.map((function(e){return Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"".concat(e.name," - ").concat(e.price," kr")}),Object(r.jsx)("button",{onClick:function(){return function(e){var n=t.basket.filter((function(t){return t===e}));Object.assign(e,{count:n.length+1,price:parseInt(e.price)}),t.setBasket([].concat(Object(z.a)(t.basket),[e]))}(e)},children:"Add to cart"})]},e._id)}))})]})},V=n(16),X=function(e){var t=e.component,n=Object(V.a)(e,["component"]),c=Object(s.useContext)(h);return Object(r.jsx)(f.b,Object(w.a)(Object(w.a)({},n),{},{render:function(e){return c.isAuthenticated?Object(r.jsx)(t,Object(w.a)({},e)):Object(r.jsx)(f.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},Y=function(e){var t=e.component,n=Object(V.a)(e,["component"]),c=Object(s.useContext)(h);return Object(r.jsx)(f.b,Object(w.a)(Object(w.a)({},n),{},{render:function(e){return c.isAuthenticated?Object(r.jsx)(f.a,{to:{pathname:"/account",state:{from:e.location}}}):Object(r.jsx)(t,Object(w.a)({},e))}}))};var $=function(){var e=Object(s.useContext)(h),t=Object(s.useContext)(p);return console.log(e.isAuthenticated),console.log(t),Object(r.jsxs)(x.a,{children:[Object(r.jsx)(g,{}),Object(r.jsx)(f.b,{exact:!0,path:"/",component:k}),Object(r.jsx)(X,{path:"/account",component:G}),Object(r.jsx)(Y,{path:"/login",component:B}),Object(r.jsx)(Y,{path:"/register",component:E}),Object(r.jsx)(f.b,{path:"/checkout",component:D}),Object(r.jsx)(f.b,{path:"/insidestore/:id",component:K})]})};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(b,{children:Object(r.jsx)(O,{children:Object(r.jsx)($,{})})})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.32e25647.chunk.js.map