"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[9431],{89902:function(e,r,n){n.d(r,{Z:function(){return c}});var t=n(1413),i=n(45987),o=n(70501),s=n(61113),a=n(46417),l=["query","sx"];function c(e){var r=e.query,n=e.sx,c=(0,i.Z)(e,l);return r?(0,a.jsxs)(o.Z,(0,t.Z)((0,t.Z)({sx:(0,t.Z)({textAlign:"center"},n)},c),{},{children:[(0,a.jsx)(s.Z,{variant:"h6",paragraph:!0,children:"Not found"}),(0,a.jsxs)(s.Z,{variant:"body2",children:["No results found for \xa0",(0,a.jsxs)("strong",{children:['"',r,'"']}),".",(0,a.jsx)("br",{})," Try checking for typos or using complete words."]})]})):(0,a.jsx)(s.Z,{variant:"body2",sx:n,children:"Please enter keywords"})}},99431:function(e,r,n){n.r(r),n.d(r,{default:function(){return Fe}});var t=n(29439),i=n(65964),o=n(47313),s=n(68520),a=n.n(s),l=n(75627),c=n(47825),u=n(35898),d=n(61113),p=n(1738),x=n(3880),h=n(76025),f=n(54308),g=n(37903),m=n(59519),j=n(1413),v=n(46725),Z=n(19860),b=n(66212),y=n(9506),w=n(24193),C=n(16335),k=n(46417);function F(e){var r=e.isFiltered,n=e.onResetFilter,t=(0,Z.Z)(),i=(0,l.Gc)(),o=i.watch,s=i.setValue,a=o(),c=a.gender,d=a.category,p=a.colors,x=a.priceRange,h=a.rating,f=x[0],g=x[1];return(0,k.jsxs)(u.Z,{flexGrow:1,direction:"row",flexWrap:"wrap",alignItems:"center",children:[!!c.length&&(0,k.jsx)(R,{label:"Gender:",children:c.map((function(e){return(0,k.jsx)(b.Z,{label:e,size:"small",onDelete:function(){return function(e){var r=c.filter((function(r){return r!==e}));s("gender",r)}(e)},sx:{m:.5}},e)}))}),"All"!==d&&(0,k.jsx)(R,{label:"Category:",children:(0,k.jsx)(b.Z,{size:"small",label:d,onDelete:function(){s("category","All")},sx:{m:.5}})}),!!p.length&&(0,k.jsx)(R,{label:"Colors:",children:p.map((function(e){return(0,k.jsx)(b.Z,{size:"small",label:(0,k.jsx)(y.Z,{sx:{width:20,height:20,bgcolor:e,borderRadius:"50%",border:"solid 1px ".concat(t.palette.divider)}}),onDelete:function(){return function(e){var r=p.filter((function(r){return r!==e}));s("colors",r)}(e)},sx:{m:.5,color:t.palette.getContrastText(e),"& .MuiChip-label":{pl:.25}}},e)}))}),(0!==f||200!==g)&&(0,k.jsx)(R,{label:"Price:",children:(0,k.jsx)(b.Z,{size:"small",label:"$".concat(f," - ").concat(g),onDelete:function(){s("priceRange",[0,200])},sx:{m:.5}})}),!!h&&(0,k.jsx)(R,{label:"Rating:",children:(0,k.jsx)(b.Z,{size:"small",label:(0,v.G)(h),onDelete:function(){s("rating","")},sx:{m:.5}})}),r&&(0,k.jsx)(w.Z,{color:"error",size:"small",onClick:n,startIcon:(0,k.jsx)(C.Z,{icon:"eva:trash-2-outline"}),children:"Clear"})]})}function R(e){var r=e.label,n=e.children,t=e.sx;return(0,k.jsxs)(u.Z,{direction:"row",alignItems:"stretch",sx:(0,j.Z)({m:.5,borderRadius:1,overflow:"hidden",border:function(e){return"solid 1px ".concat(e.palette.divider)}},t),children:[(0,k.jsx)(u.Z,{component:"span",direction:"row",alignItems:"center",sx:{px:1,typography:"subtitle2",color:"text.secondary",bgcolor:"background.neutral",borderRight:function(e){return"solid 1px ".concat(e.palette.divider)}},children:r}),(0,k.jsx)(u.Z,{direction:"row",flexWrap:"wrap",sx:{p:.75},children:n})]})}var I=n(74165),S=n(15861),A=n(73709),P=n(2135),z=n(73428),B=n(42420),D=n(90891),W=n(48148),_=n(16528),O=n(9651),q=n(86121);function G(e){var r=e.product,n=r.id,t=r.name,i=r.cover,o=r.price,s=r.colors,a=r.status,l=r.available,c=r.sizes,d=r.priceSale,f=(0,p.I0)(),g=h.vB.eCommerce.view((0,A.o)(t)),m=function(){var e=(0,S.Z)((0,I.Z)().mark((function e(){var r;return(0,I.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r={id:n,name:t,cover:i,available:l,price:o,colors:[s[0]],size:c[0],quantity:1};try{f((0,x.Xq)(r))}catch(a){console.error(a)}case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,k.jsxs)(z.Z,{sx:{"&:hover .add-cart-btn":{opacity:1}},children:[(0,k.jsxs)(y.Z,{sx:{position:"relative",p:1},children:[a&&(0,k.jsx)(_.Z,{variant:"filled",color:"sale"===a?"error":"info",sx:{top:16,right:16,zIndex:9,position:"absolute",textTransform:"uppercase"},children:a}),(0,k.jsx)(B.Z,{color:"warning",size:"medium",className:"add-cart-btn",onClick:m,sx:{right:16,bottom:16,zIndex:9,opacity:0,position:"absolute",transition:function(e){return e.transitions.create("all",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.shorter})}},children:(0,k.jsx)(C.Z,{icon:"ic:round-add-shopping-cart"})}),(0,k.jsx)(O.Z,{alt:t,src:i,ratio:"1/1",sx:{borderRadius:1.5}})]}),(0,k.jsxs)(u.Z,{spacing:2.5,sx:{p:3},children:[(0,k.jsx)(D.Z,{component:P.rU,to:g,color:"inherit",variant:"subtitle2",noWrap:!0,children:t}),(0,k.jsxs)(u.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,k.jsx)(q.ZQ,{colors:s}),(0,k.jsxs)(u.Z,{direction:"row",spacing:.5,sx:{typography:"subtitle1"},children:[d&&(0,k.jsx)(y.Z,{component:"span",sx:{color:"text.disabled",textDecoration:"line-through"},children:(0,W.e_)(d)}),(0,k.jsx)(y.Z,{component:"span",children:(0,W.e_)(o)})]})]})]})]})}var T=n(93433),M=n(45987),N=n(75944),$=["products","loading"];function E(e){var r=e.products,n=e.loading,t=(0,M.Z)(e,$);return(0,k.jsx)(y.Z,(0,j.Z)((0,j.Z)({gap:3,display:"grid",gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(2, 1fr)",md:"repeat(3, 1fr)",lg:"repeat(4, 1fr)"}},t),{},{children:(n?(0,T.Z)(Array(12)):r).map((function(e,r){return e?(0,k.jsx)(G,{product:e},e.id):(0,k.jsx)(N.JJ,{},r)}))}))}var L=n(51405),V=n(90121),H=[{value:"featured",label:"Featured"},{value:"newest",label:"Newest"},{value:"priceDesc",label:"Price: High - Low"},{value:"priceAsc",label:"Price: Low - High"}];function Q(e){return{featured:"Featured",newest:"Newest",priceDesc:"Price: High - Low",priceAsc:"Price: Low - High"}[e]}function K(){var e=(0,l.Gc)().control,r=(0,o.useState)(null),n=(0,t.Z)(r,2),i=n[0],s=n[1],a=function(e){s(e.currentTarget)},c=function(){s(null)};return(0,k.jsx)(l.Qr,{name:"sortBy",control:e,render:function(e){var r=e.field;return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(w.Z,{disableRipple:!0,color:"inherit",onClick:a,endIcon:(0,k.jsx)(C.Z,{icon:i?"eva:chevron-up-fill":"eva:chevron-down-fill"}),sx:{fontWeight:"fontWeightMedium"},children:["Sort By:",(0,k.jsx)(y.Z,{component:"span",sx:{color:"text.secondary",ml:.5},children:Q(r.value)})]}),(0,k.jsx)(V.Z,{open:i,onClose:c,children:H.map((function(e){return(0,k.jsx)(L.Z,{selected:e.value===r.value,onClick:function(){c(),r.onChange(e.value)},children:e.label},e.value)}))})]})}})}var U=n(17551),J=n(46923),X=n(47131),Y=n(19536),ee=n(54299),re=n(83929),ne=n(33827),te=n(55942),ie=n(84513),oe=n(56605),se=n(30404),ae=n(59743),le=[{label:"Men",value:"Men"},{label:"Women",value:"Women"},{label:"Kids",value:"Kids"}],ce=[{label:"All",value:"All"},{label:"Shose",value:"Shose"},{label:"Apparel",value:"Apparel"},{label:"Accessories",value:"Accessories"}],ue=["up4Star","up3Star","up2Star","up1Star"],de=["#00AB55","#000000","#FFFFFF","#FFC0CB","#FF4842","#1890FF","#94D82D","#FFC107"];function pe(e){var r=e.open,n=e.onOpen,t=e.onClose,i=e.isDefault,o=e.onResetFilter,s=(0,l.Gc)().control,a=(0,T.Z)(Array(21)).map((function(e,r){var n=10*r,t=0===r?"$".concat(n):"".concat(n);return{value:n,label:r%4?"":t}}));return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(w.Z,{disableRipple:!0,color:"inherit",endIcon:(0,k.jsx)(C.Z,{icon:"ic:round-filter-list"}),onClick:n,children:"Filters"}),(0,k.jsxs)(J.ZP,{anchor:"right",open:r,onClose:t,BackdropProps:{invisible:!0},PaperProps:{sx:{width:se.w$.W_BASE}},children:[(0,k.jsxs)(u.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",sx:{pl:2,pr:1,py:2},children:[(0,k.jsx)(d.Z,{variant:"subtitle1",children:"Filters"}),(0,k.jsx)(X.Z,{onClick:t,children:(0,k.jsx)(C.Z,{icon:"eva:close-fill"})})]}),(0,k.jsx)(Y.Z,{}),(0,k.jsx)(ae.Z,{children:(0,k.jsxs)(u.Z,{spacing:3,sx:{p:2.5},children:[(0,k.jsxs)(u.Z,{spacing:1,children:[(0,k.jsx)(d.Z,{variant:"subtitle1",children:" Gender "}),(0,k.jsx)(f.s2,{name:"gender",options:le,sx:{width:1}})]}),(0,k.jsxs)(u.Z,{spacing:1,children:[(0,k.jsx)(d.Z,{variant:"subtitle1",children:" Category "}),(0,k.jsx)(f.km,{name:"category",options:ce})]}),(0,k.jsxs)(u.Z,{spacing:1,children:[(0,k.jsx)(d.Z,{variant:"subtitle1",children:" Color "}),(0,k.jsx)(l.Qr,{name:"colors",control:s,render:function(e){var r=e.field;return(0,k.jsx)(q.b8,{selected:r.value,colors:de,onChangeColor:function(e){return r.onChange((n=r.value,t=e,n.includes(t)?n.filter((function(e){return e!==t})):[].concat((0,T.Z)(n),[t])));var n,t},sx:{maxWidth:144}})}})]}),(0,k.jsxs)(u.Z,{spacing:1,sx:{pb:2},children:[(0,k.jsx)(d.Z,{variant:"subtitle1",sx:{flexGrow:1},children:"Price"}),(0,k.jsxs)(u.Z,{direction:"row",spacing:2,children:[(0,k.jsx)(xe,{type:"min"}),(0,k.jsx)(xe,{type:"max"})]}),(0,k.jsx)(f.kk,{name:"priceRange",step:10,min:0,max:200,marks:a,getAriaValueText:function(e){return"$".concat(e)},valueLabelFormat:function(e){return"$".concat(e)},sx:{alignSelf:"center",width:"calc(100% - 20px)"}})]}),(0,k.jsxs)(u.Z,{spacing:1,children:[(0,k.jsx)(d.Z,{variant:"subtitle1",children:"Rating"}),(0,k.jsx)(l.Qr,{name:"rating",control:s,render:function(e){var r=e.field;return(0,k.jsx)(ee.Z,(0,j.Z)((0,j.Z)({},r),{},{children:ue.map((function(e,n){return(0,k.jsx)(re.Z,{value:e,control:(0,k.jsx)(ne.Z,{disableRipple:!0,color:"default",icon:(0,k.jsx)(te.Z,{readOnly:!0,value:4-n}),checkedIcon:(0,k.jsx)(te.Z,{readOnly:!0,value:4-n}),sx:{"&:hover":{bgcolor:"transparent"}}}),label:"& Up",sx:(0,j.Z)({my:.5,borderRadius:1,"&:hover":{opacity:.48}},r.value.includes(e)&&{bgcolor:"action.selected"})},e)}))}))}})]})]})}),(0,k.jsx)(y.Z,{sx:{p:2.5},children:(0,k.jsx)(ie.Z,{color:"error",variant:"dot",anchorOrigin:{vertical:"top",horizontal:"left"},invisible:i,sx:{width:1},children:(0,k.jsx)(w.Z,{fullWidth:!0,size:"large",type:"submit",color:"inherit",variant:"outlined",onClick:o,startIcon:(0,k.jsx)(C.Z,{icon:"eva:trash-2-outline"}),children:"Clear"})})})]})]})}function xe(e){var r=e.type,n=(0,l.Gc)(),t=n.control,i=n.setValue;return(0,k.jsx)(l.Qr,{name:"priceRange",control:t,render:function(e){var n=e.field,t="min"===r,o=n.value[0],s=n.value[1];return(0,k.jsxs)(u.Z,{direction:"row",spacing:.5,alignItems:"center",sx:{width:1},children:[(0,k.jsx)(d.Z,{variant:"caption",sx:{flexShrink:0,color:"text.disabled",textTransform:"capitalize",fontWeight:"fontWeightBold"},children:"".concat(r," ($)")}),(0,k.jsx)(oe.Z,{disableUnderline:!0,fullWidth:!0,size:"small",value:t?o:s,onChange:function(e){return t?n.onChange([Number(e.target.value),s]):n.onChange([o,Number(e.target.value)])},onBlur:function(){return function(e){var r=e[0],n=e[1];r<0&&i("priceRange",[0,n]),r>200&&i("priceRange",[200,n]),n<0&&i("priceRange",[r,0]),n>200&&i("priceRange",[r,200])}(n.value)},inputProps:{step:10,min:0,max:200,type:"number","aria-labelledby":"input-slider"},sx:{pr:1,py:.5,borderRadius:.75,typography:"body2",bgcolor:function(e){return(0,U.Fq)(e.palette.grey[500],.12)},"& .MuiInput-input":{p:0,textAlign:"right"}}})]})}})}var he=n(83870),fe=n.n(he),ge=n(46642),me=n.n(ge),je=n(58467),ve=n(19065),Ze=n(41727),be=n(59864),ye=n(2943),we=n(89902);function Ce(){var e=(0,je.s0)(),r=(0,o.useState)(""),n=(0,t.Z)(r,2),i=n[0],s=n[1],a=(0,o.useState)([]),l=(0,t.Z)(a,2),c=l[0],u=l[1],p=function(){var e=(0,S.Z)((0,I.Z)().mark((function e(r){var n;return(0,I.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s(r),!r){e.next=7;break}return e.next=5,be.Z.get("/api/products/search",{params:{query:r}});case 5:n=e.sent,u(n.data.results);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(r){return e.apply(this,arguments)}}(),x=function(r){e(h.vB.eCommerce.view((0,A.o)(r)))},f=function(e){"Enter"===e.key&&x(i)};return(0,k.jsx)(ve.Z,{size:"small",autoHighlight:!0,popupIcon:null,options:c,onInputChange:function(e,r){return p(r)},getOptionLabel:function(e){return e.name},noOptionsText:(0,k.jsx)(we.Z,{query:i}),isOptionEqualToValue:function(e,r){return e.id===r.id},componentsProps:{popper:{sx:{width:"280px !important"}},paper:{sx:{"& .MuiAutocomplete-option":{px:"8px !important"}}}},renderInput:function(e){return(0,k.jsx)(ye.yM,(0,j.Z)((0,j.Z)({},e),{},{width:220,placeholder:"Search...",onKeyUp:f,InputProps:(0,j.Z)((0,j.Z)({},e.InputProps),{},{startAdornment:(0,k.jsx)(Ze.Z,{position:"start",children:(0,k.jsx)(C.Z,{icon:"eva:search-fill",sx:{ml:1,color:"text.disabled"}})})})}))},renderOption:function(e,r,n){var t=n.inputValue,i=r.name,o=r.cover,s=me()(i,t),a=fe()(i,s);return(0,k.jsxs)("li",(0,j.Z)((0,j.Z)({},e),{},{children:[(0,k.jsx)(O.Z,{alt:o,src:o,sx:{width:48,height:48,borderRadius:1,flexShrink:0,mr:1.5}}),(0,k.jsx)(D.Z,{underline:"none",onClick:function(){return x(i)},children:a.map((function(e,r){return(0,k.jsx)(d.Z,{component:"span",variant:"subtitle2",color:e.highlight?"primary":"textPrimary",children:e.text},r)}))})]}))}})}var ke=n(63786);function Fe(){var e=(0,m.K$)().themeStretch,r=(0,p.I0)(),n=(0,p.v9)((function(e){return e.product})),s=n.products,j=n.checkout,v=(0,o.useState)(!1),Z=(0,t.Z)(v,2),b=Z[0],y=Z[1],w=(0,l.cI)({defaultValues:{gender:[],category:"All",colors:[],priceRange:[0,200],rating:"",sortBy:"featured"}}),C=w.reset,R=w.watch,I=w.formState.dirtyFields,S=!I.gender&&!I.category&&!I.colors&&!I.priceRange&&!I.rating||!1,A=function(e,r){var n=r.gender,t=r.category,i=r.colors,o=r.priceRange,s=r.rating,l=r.sortBy,c=o[0],u=o[1];"featured"===l&&(e=a()(e,["sold"],["desc"]));"newest"===l&&(e=a()(e,["createdAt"],["desc"]));"priceDesc"===l&&(e=a()(e,["price"],["desc"]));"priceAsc"===l&&(e=a()(e,["price"],["asc"]));n.length&&(e=e.filter((function(e){return n.includes(e.gender)})));"All"!==t&&(e=e.filter((function(e){return e.category===t})));i.length&&(e=e.filter((function(e){return e.colors.some((function(e){return i.includes(e)}))})));0===c&&200===u||(e=e.filter((function(e){return e.price>=c&&e.price<=u})));s&&(e=e.filter((function(e){var r=function(e){return"up4Star"===e?4:"up3Star"===e?3:"up2Star"===e?2:1};return e.totalRating>r(s)})));return e}(s,R());(0,o.useEffect)((function(){r((0,x.Xp)())}),[r]);var P=function(){C()};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(i.ql,{children:(0,k.jsx)("title",{children:" Ecommerce: Shop "})}),(0,k.jsx)(f.ZP,{methods:w,children:(0,k.jsxs)(c.Z,{maxWidth:!e&&"lg",children:[(0,k.jsx)(g.Z,{heading:"Shop",links:[{name:"Dashboard",href:h.vB.root},{name:"E-Commerce",href:h.vB.eCommerce.root},{name:"Shop"}]}),(0,k.jsxs)(u.Z,{spacing:2,direction:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:"space-between",sx:{mb:2},children:[(0,k.jsx)(Ce,{}),(0,k.jsxs)(u.Z,{direction:"row",spacing:1,flexShrink:0,sx:{my:1},children:[(0,k.jsx)(pe,{isDefault:S,open:b,onOpen:function(){y(!0)},onClose:function(){y(!1)},onResetFilter:P}),(0,k.jsx)(K,{})]})]}),(0,k.jsx)(u.Z,{sx:{mb:3},children:!S&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(d.Z,{variant:"body2",gutterBottom:!0,children:[(0,k.jsx)("strong",{children:A.length}),"\xa0Products found"]}),(0,k.jsx)(F,{isFiltered:!S,onResetFilter:P})]})}),(0,k.jsx)(E,{products:A,loading:!s.length&&S}),(0,k.jsx)(ke.Z,{totalItems:j.totalItems})]})})]})}}}]);