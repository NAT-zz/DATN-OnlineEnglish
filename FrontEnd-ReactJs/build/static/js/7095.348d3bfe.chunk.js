"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[7095],{37903:function(e,r,t){t.d(r,{Z:function(){return m}});var n=t(1413),a=t(45987),o=t(9506),i=t(35898),l=t(61113),c=t(3404),s=t(90891),d=t(2135),u=t(46417);function p(e){var r=e.link,t=e.activeLast,a=e.disabled,i=r.name,l=r.href,c=r.icon,p=(0,n.Z)({typography:"body2",alignItems:"center",color:"text.primary",display:"inline-flex"},a&&!t&&{cursor:"default",pointerEvents:"none",color:"text.disabled"}),h=(0,u.jsxs)(u.Fragment,{children:[c&&(0,u.jsx)(o.Z,{component:"span",sx:{mr:1,display:"inherit","& svg":{width:20,height:20}},children:c}),i]});return l?(0,u.jsx)(s.Z,{component:d.rU,to:l,sx:p,children:h}):(0,u.jsxs)(o.Z,{sx:p,children:[" ",h," "]})}var h=["links","action","heading","moreLink","activeLast","sx"];function m(e){var r=e.links,t=e.action,d=e.heading,m=e.moreLink,f=e.activeLast,Z=e.sx,g=(0,a.Z)(e,h),v=r[r.length-1].name;return(0,u.jsxs)(o.Z,{sx:(0,n.Z)({mb:5},Z),children:[(0,u.jsxs)(i.Z,{direction:"row",alignItems:"center",children:[(0,u.jsxs)(o.Z,{sx:{flexGrow:1},children:[d&&(0,u.jsx)(l.Z,{variant:"h4",gutterBottom:!0,children:d}),!!r.length&&(0,u.jsx)(c.Z,(0,n.Z)((0,n.Z)({separator:(0,u.jsx)(x,{})},g),{},{children:r.map((function(e){return(0,u.jsx)(p,{link:e,activeLast:f,disabled:e.name===v},e.name||"")}))}))]}),t&&(0,u.jsxs)(o.Z,{sx:{flexShrink:0},children:[" ",t," "]})]}),!!m&&(0,u.jsx)(o.Z,{sx:{mt:2},children:m.map((function(e){return(0,u.jsx)(s.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}function x(){return(0,u.jsx)(o.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})}},68378:function(e,r,t){t.d(r,{Z:function(){return h}});var n=t(1413),a=t(45987),o=t(47313),i=t(19860),l=t(9506),c=t(17592),s=t(17551),d=(0,c.ZP)(l.Z)((function(e){var r=e.theme,t=e.ownerState,a="light"===r.palette.mode,o="filled"===t.variant,i="outlined"===t.variant,l="soft"===t.variant,c=(0,n.Z)({},"default"===t.color&&(0,n.Z)((0,n.Z)({},i&&{backgroundColor:"transparent",color:r.palette.text.primary,border:"1px solid ".concat((0,s.Fq)(r.palette.grey[500],.32))}),l&&{color:a?r.palette.text.primary:r.palette.common.white,backgroundColor:(0,s.Fq)(r.palette.grey[500],.16)})),d=(0,n.Z)({},"default"!==t.color&&(0,n.Z)((0,n.Z)((0,n.Z)({},o&&{color:r.palette[t.color].contrastText,backgroundColor:r.palette[t.color].main}),i&&{backgroundColor:"transparent",color:r.palette[t.color].main,border:"1px solid ".concat(r.palette[t.color].main)}),l&&{color:r.palette[t.color][a?"dark":"light"],backgroundColor:(0,s.Fq)(r.palette[t.color].main,.16)}));return(0,n.Z)((0,n.Z)({height:24,minWidth:22,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:r.spacing(0,1),color:r.palette.grey[800],fontSize:r.typography.pxToRem(12),fontFamily:r.typography.fontFamily,backgroundColor:r.palette.grey[300],fontWeight:r.typography.fontWeightBold},d),c)})),u=t(46417),p=["children","color","variant","startIcon","endIcon","sx"],h=(0,o.forwardRef)((function(e,r){var t=e.children,o=e.color,c=void 0===o?"default":o,s=e.variant,h=void 0===s?"soft":s,m=e.startIcon,x=e.endIcon,f=e.sx,Z=(0,a.Z)(e,p),g=(0,i.Z)(),v={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return(0,u.jsxs)(d,(0,n.Z)((0,n.Z)({ref:r,component:"span",ownerState:{color:c,variant:h},sx:(0,n.Z)((0,n.Z)((0,n.Z)({},m&&{pl:.75}),x&&{pr:.75}),f),theme:g},Z),{},{children:[m&&(0,u.jsxs)(l.Z,{sx:(0,n.Z)({mr:.75},v),children:[" ",m," "]}),t,x&&(0,u.jsxs)(l.Z,{sx:(0,n.Z)({ml:.75},v),children:[" ",x," "]})]}))}))},16528:function(e,r,t){t.d(r,{Z:function(){return n.Z}});var n=t(68378)},67095:function(e,r,t){t.r(r),t.d(r,{Block:function(){return g},default:function(){return Z}});var n=t(65964),a=t(17551),o=t(9506),i=t(47825),l=t(35898),c=t(61689),s=t(70501),d=t(54641),u=t(76025),p=t(16528),h=t(16335),m=t(37903),x=t(46417),f=["default","primary","secondary","info","success","warning","error"];function Z(){return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(n.ql,{children:(0,x.jsx)("title",{children:" Extra Components: Label "})}),(0,x.jsx)(o.Z,{sx:{pt:6,pb:1,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:(0,x.jsx)(i.Z,{children:(0,x.jsx)(m.Z,{heading:"Label",links:[{name:"Components",href:u.ko.components},{name:"Label"}]})})}),(0,x.jsx)(i.Z,{sx:{my:10},children:(0,x.jsxs)(l.Z,{spacing:3,children:[(0,x.jsx)(g,{title:"Filled",children:f.map((function(e){return(0,x.jsx)(c.Z,{title:e,children:(0,x.jsx)(p.Z,{color:e,variant:"filled",children:e})},e)}))}),(0,x.jsx)(g,{title:"Outlined",children:f.map((function(e){return(0,x.jsx)(p.Z,{color:e,variant:"outlined",children:e},e)}))}),(0,x.jsx)(g,{title:"Soft",children:f.map((function(e){return(0,x.jsx)(p.Z,{color:e,variant:"soft",children:e},e)}))}),(0,x.jsxs)(g,{title:"With Icon",children:[(0,x.jsx)(p.Z,{variant:"filled",color:"primary",startIcon:(0,x.jsx)(h.Z,{icon:"eva:email-fill"}),children:"Start Icon"}),(0,x.jsx)(p.Z,{variant:"filled",color:"primary",endIcon:(0,x.jsx)(h.Z,{icon:"eva:email-fill"}),children:"End Icon"}),(0,x.jsx)(p.Z,{variant:"outlined",color:"primary",startIcon:(0,x.jsx)(h.Z,{icon:"eva:email-fill"}),children:"Start Icon"}),(0,x.jsx)(p.Z,{variant:"outlined",color:"primary",endIcon:(0,x.jsx)(h.Z,{icon:"eva:email-fill"}),children:"End Icon"}),(0,x.jsx)(p.Z,{color:"primary",startIcon:(0,x.jsx)(h.Z,{icon:"eva:email-fill"}),children:"Start Icon"}),(0,x.jsx)(p.Z,{color:"primary",endIcon:(0,x.jsx)(h.Z,{icon:"eva:email-fill"}),children:"End Icon"})]})]})})]})}function g(e){var r=e.title,t=e.children;return(0,x.jsxs)(s.Z,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return(0,a.Fq)(e.palette.grey[500],.04)}},children:[r&&(0,x.jsx)(d.Z,{title:r}),(0,x.jsx)(o.Z,{sx:{p:5,minHeight:180,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center","& > *":{mx:1}},children:t})]})}},3404:function(e,r,t){t.d(r,{Z:function(){return P}});var n=t(93433),a=t(29439),o=t(4942),i=t(87462),l=t(63366),c=t(47313),s=(t(96214),t(83061)),d=t(21921),u=t(17592),p=t(77342),h=t(61113),m=t(17551),x=t(54750),f=t(46417),Z=(0,x.Z)((0,f.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),g=t(38743),v=(0,u.ZP)(g.Z)((function(e){var r=e.theme;return(0,i.Z)({display:"flex",marginLeft:"calc(".concat(r.spacing(1)," * 0.5)"),marginRight:"calc(".concat(r.spacing(1)," * 0.5)")},"light"===r.palette.mode?{backgroundColor:r.palette.grey[100],color:r.palette.grey[700]}:{backgroundColor:r.palette.grey[700],color:r.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,i.Z)({},"light"===r.palette.mode?{backgroundColor:r.palette.grey[200]}:{backgroundColor:r.palette.grey[600]}),"&:active":(0,i.Z)({boxShadow:r.shadows[0]},"light"===r.palette.mode?{backgroundColor:(0,m._4)(r.palette.grey[200],.12)}:{backgroundColor:(0,m._4)(r.palette.grey[600],.12)})})})),y=(0,u.ZP)(Z)({width:24,height:16});var j=function(e){var r=e;return(0,f.jsx)("li",{children:(0,f.jsx)(v,(0,i.Z)({focusRipple:!0},e,{ownerState:r,children:(0,f.jsx)(y,{ownerState:r})}))})},b=t(77430),C=t(32298);function k(e){return(0,C.Z)("MuiBreadcrumbs",e)}var w=(0,b.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),I=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],S=(0,u.ZP)(h.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,r){return[(0,o.Z)({},"& .".concat(w.li),r.li),r.root]}})({}),R=(0,u.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,r){return r.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),M=(0,u.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,r){return r.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function N(e,r,t,n){return e.reduce((function(a,o,i){return i<e.length-1?a=a.concat(o,(0,f.jsx)(M,{"aria-hidden":!0,className:r,ownerState:n,children:t},"separator-".concat(i))):a.push(o),a}),[])}var P=c.forwardRef((function(e,r){var t=(0,p.Z)({props:e,name:"MuiBreadcrumbs"}),o=t.children,u=t.className,h=t.component,m=void 0===h?"nav":h,x=t.expandText,Z=void 0===x?"Show path":x,g=t.itemsAfterCollapse,v=void 0===g?1:g,y=t.itemsBeforeCollapse,b=void 0===y?1:y,C=t.maxItems,w=void 0===C?8:C,M=t.separator,P=void 0===M?"/":M,T=(0,l.Z)(t,I),B=c.useState(!1),L=(0,a.Z)(B,2),_=L[0],F=L[1],H=(0,i.Z)({},t,{component:m,expanded:_,expandText:Z,itemsAfterCollapse:v,itemsBeforeCollapse:b,maxItems:w,separator:P}),W=function(e){var r=e.classes;return(0,d.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},k,r)}(H),q=c.useRef(null),z=c.Children.toArray(o).filter((function(e){return c.isValidElement(e)})).map((function(e,r){return(0,f.jsx)("li",{className:W.li,children:e},"child-".concat(r))}));return(0,f.jsx)(S,(0,i.Z)({ref:r,component:m,color:"text.secondary",className:(0,s.Z)(W.root,u),ownerState:H},T,{children:(0,f.jsx)(R,{className:W.ol,ref:q,ownerState:H,children:N(_||w&&z.length<=w?z:function(e){return b+v>=e.length?e:[].concat((0,n.Z)(e.slice(0,b)),[(0,f.jsx)(j,{"aria-label":Z,onClick:function(){F(!0);var e=q.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,n.Z)(e.slice(e.length-v,e.length)))}(z),W.separator,P,H)})}))}))},54641:function(e,r,t){t.d(r,{Z:function(){return b}});var n=t(4942),a=t(63366),o=t(87462),i=t(47313),l=t(83061),c=t(21921),s=t(61113),d=t(77342),u=t(17592),p=t(77430),h=t(32298);function m(e){return(0,h.Z)("MuiCardHeader",e)}var x=(0,p.Z)("MuiCardHeader",["root","avatar","action","content","title","subheader"]),f=t(46417),Z=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],g=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:function(e,r){var t;return(0,o.Z)((t={},(0,n.Z)(t,"& .".concat(x.title),r.title),(0,n.Z)(t,"& .".concat(x.subheader),r.subheader),t),r.root)}})({display:"flex",alignItems:"center",padding:16}),v=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:function(e,r){return r.avatar}})({display:"flex",flex:"0 0 auto",marginRight:16}),y=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:function(e,r){return r.action}})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),j=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:function(e,r){return r.content}})({flex:"1 1 auto"}),b=i.forwardRef((function(e,r){var t=(0,d.Z)({props:e,name:"MuiCardHeader"}),n=t.action,i=t.avatar,u=t.className,p=t.component,h=void 0===p?"div":p,x=t.disableTypography,b=void 0!==x&&x,C=t.subheader,k=t.subheaderTypographyProps,w=t.title,I=t.titleTypographyProps,S=(0,a.Z)(t,Z),R=(0,o.Z)({},t,{component:h,disableTypography:b}),M=function(e){var r=e.classes;return(0,c.Z)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},m,r)}(R),N=w;null==N||N.type===s.Z||b||(N=(0,f.jsx)(s.Z,(0,o.Z)({variant:i?"body2":"h5",className:M.title,component:"span",display:"block"},I,{children:N})));var P=C;return null==P||P.type===s.Z||b||(P=(0,f.jsx)(s.Z,(0,o.Z)({variant:i?"body2":"body1",className:M.subheader,color:"text.secondary",component:"span",display:"block"},k,{children:P}))),(0,f.jsxs)(g,(0,o.Z)({className:(0,l.Z)(M.root,u),as:h,ref:r,ownerState:R},S,{children:[i&&(0,f.jsx)(v,{className:M.avatar,ownerState:R,children:i}),(0,f.jsxs)(j,{className:M.content,ownerState:R,children:[N,P]}),n&&(0,f.jsx)(y,{className:M.action,ownerState:R,children:n})]}))}))}}]);