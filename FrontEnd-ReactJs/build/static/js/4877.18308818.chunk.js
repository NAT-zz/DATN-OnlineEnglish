"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[4877],{37903:function(e,a,r){r.d(a,{Z:function(){return Z}});var n=r(1413),t=r(45987),i=r(9506),o=r(35898),l=r(61113),s=r(3404),c=r(90891),d=r(2135),u=r(46417);function x(e){var a=e.link,r=e.activeLast,t=e.disabled,o=a.name,l=a.href,s=a.icon,x=(0,n.Z)({typography:"body2",alignItems:"center",color:"text.primary",display:"inline-flex"},t&&!r&&{cursor:"default",pointerEvents:"none",color:"text.disabled"}),m=(0,u.jsxs)(u.Fragment,{children:[s&&(0,u.jsx)(i.Z,{component:"span",sx:{mr:1,display:"inherit","& svg":{width:20,height:20}},children:s}),o]});return l?(0,u.jsx)(c.Z,{component:d.rU,to:l,sx:x,children:m}):(0,u.jsxs)(i.Z,{sx:x,children:[" ",m," "]})}var m=["links","action","heading","moreLink","activeLast","sx"];function Z(e){var a=e.links,r=e.action,d=e.heading,Z=e.moreLink,v=e.activeLast,f=e.sx,p=(0,t.Z)(e,m),j=a[a.length-1].name;return(0,u.jsxs)(i.Z,{sx:(0,n.Z)({mb:5},f),children:[(0,u.jsxs)(o.Z,{direction:"row",alignItems:"center",children:[(0,u.jsxs)(i.Z,{sx:{flexGrow:1},children:[d&&(0,u.jsx)(l.Z,{variant:"h4",gutterBottom:!0,children:d}),!!a.length&&(0,u.jsx)(s.Z,(0,n.Z)((0,n.Z)({separator:(0,u.jsx)(h,{})},p),{},{children:a.map((function(e){return(0,u.jsx)(x,{link:e,activeLast:v,disabled:e.name===j},e.name||"")}))}))]}),r&&(0,u.jsxs)(i.Z,{sx:{flexShrink:0},children:[" ",r," "]})]}),!!Z&&(0,u.jsx)(i.Z,{sx:{mt:2},children:Z.map((function(e){return(0,u.jsx)(c.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}function h(){return(0,u.jsx)(i.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})}},54877:function(e,a,r){r.r(a),r.d(a,{default:function(){return g}});var n=r(65964),t=r(9506),i=r(47825),o=r(73428),l=r(54641),s=r(93405),c=r(76025),d=r(37903),u=r(35898),x=r(70501),m=r(66212),Z=r(63585),h=r(65630),v=r(16335),f=r(14461),p=r(46417),j={p:2,display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap","& > *":{m:"8px !important"}};function b(e){var a=e.variant,r=void 0===a?"filled":a,n=function(){console.info("You clicked the delete icon.")};return(0,p.jsxs)(u.Z,{spacing:3,children:[(0,p.jsxs)(x.Z,{variant:"outlined",sx:j,children:[(0,p.jsx)(m.Z,{variant:r,label:"Default deletable",avatar:(0,p.jsx)(Z.Z,{children:"M"}),onDelete:n}),(0,p.jsx)(m.Z,{variant:r,clickable:!0,label:"Default clickable",avatar:(0,p.jsx)(Z.Z,{children:"M"})}),(0,p.jsx)(m.Z,{variant:r,label:"Primary deletable",avatar:(0,p.jsx)(Z.Z,{alt:"Natacha",src:h.ZP.image.avatar(1)}),color:"primary",onDelete:n}),(0,p.jsx)(m.Z,{variant:r,clickable:!0,label:"Primary clickable",avatar:(0,p.jsx)(Z.Z,{alt:"Natacha",src:h.ZP.image.avatar(1)}),color:"primary"}),(0,p.jsx)(m.Z,{variant:r,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Secondary deletable",onDelete:n,color:"secondary"}),(0,p.jsx)(m.Z,{variant:r,clickable:!0,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Secondary clickable",color:"secondary"}),(0,p.jsx)(m.Z,{variant:r,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Info deletable",onDelete:n,color:"info"}),(0,p.jsx)(m.Z,{variant:r,clickable:!0,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Info clickable",color:"info"}),(0,p.jsx)(m.Z,{variant:r,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Success deletable",onDelete:n,color:"success"}),(0,p.jsx)(m.Z,{variant:r,clickable:!0,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Success clickable",color:"success"}),(0,p.jsx)(m.Z,{variant:r,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Warning deletable",onDelete:n,color:"warning"}),(0,p.jsx)(m.Z,{variant:r,clickable:!0,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Warning clickable",color:"warning"}),(0,p.jsx)(m.Z,{variant:r,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Error deletable",onDelete:n,color:"error"}),(0,p.jsx)(m.Z,{clickable:!0,variant:r,icon:(0,p.jsx)(v.Z,{width:24,icon:"eva:smiling-face-fill"}),label:"Error clickable",color:"error"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(f._,{title:"Custom icon"}),(0,p.jsxs)(x.Z,{variant:"outlined",sx:j,children:[(0,p.jsx)(m.Z,{variant:r,avatar:(0,p.jsx)(Z.Z,{children:"M"}),label:"Custom icon",onDelete:n,deleteIcon:(0,p.jsx)(v.Z,{width:24,icon:"eva:checkmark-fill"})}),(0,p.jsx)(m.Z,{variant:r,avatar:(0,p.jsx)(Z.Z,{children:"M"}),label:"Custom icon",onDelete:n,deleteIcon:(0,p.jsx)(v.Z,{width:24,icon:"eva:checkmark-fill"}),color:"info"})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(f._,{title:"Disabled"}),(0,p.jsxs)(x.Z,{variant:"outlined",sx:j,children:[(0,p.jsx)(m.Z,{disabled:!0,variant:r,avatar:(0,p.jsx)(Z.Z,{children:"M"}),label:"Disabled",onDelete:n}),(0,p.jsx)(m.Z,{disabled:!0,variant:r,avatar:(0,p.jsx)(Z.Z,{children:"M"}),label:"Disabled",onDelete:n,color:"info"})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(f._,{title:"Size"}),(0,p.jsxs)(x.Z,{variant:"outlined",sx:j,children:[(0,p.jsx)(m.Z,{variant:r,avatar:(0,p.jsx)(Z.Z,{children:"M"}),label:"Normal",onDelete:n,color:"info"}),(0,p.jsx)(m.Z,{variant:r,size:"small",avatar:(0,p.jsx)(Z.Z,{children:"M"}),label:"Small",onDelete:n,color:"info"})]})]})]})}function g(){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(n.ql,{children:(0,p.jsx)("title",{children:" MUI Components: Chip "})}),(0,p.jsx)(t.Z,{sx:{pt:6,pb:1,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:(0,p.jsx)(i.Z,{children:(0,p.jsx)(d.Z,{heading:"Chip",links:[{name:"Components",href:c.ko.components},{name:"Chip"}],moreLink:["https://mui.com/components/chips"]})})}),(0,p.jsx)(i.Z,{sx:{my:10},children:(0,p.jsxs)(t.Z,{gap:3,display:"grid",gridTemplateColumns:{xs:"repeat(1, 1fr)",md:"repeat(3, 1fr)"},children:[(0,p.jsxs)(o.Z,{children:[(0,p.jsx)(l.Z,{title:"Filled"}),(0,p.jsx)(s.Z,{children:(0,p.jsx)(b,{})})]}),(0,p.jsxs)(o.Z,{children:[(0,p.jsx)(l.Z,{title:"Outlined"}),(0,p.jsx)(s.Z,{children:(0,p.jsx)(b,{variant:"outlined"})})]}),(0,p.jsxs)(o.Z,{children:[(0,p.jsx)(l.Z,{title:"Soft"}),(0,p.jsx)(s.Z,{children:(0,p.jsx)(b,{variant:"soft"})})]})]})})]})}},14461:function(e,a,r){r.d(a,{_:function(){return u},g:function(){return d}});var n=r(1413),t=r(17551),i=r(70501),o=r(54641),l=r(9506),s=r(61113),c=r(46417);function d(e){var a=e.title,r=e.sx,s=e.children;return(0,c.jsxs)(i.Z,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return(0,t.Fq)(e.palette.grey[500],.04)}},children:[a&&(0,c.jsx)(o.Z,{title:a}),(0,c.jsx)(l.Z,{sx:(0,n.Z)({p:5,minHeight:180},r),children:s})]})}function u(e){var a=e.title;return(0,c.jsx)(s.Z,{variant:"overline",component:"p",gutterBottom:!0,sx:{color:"text.secondary"},children:a})}},3404:function(e,a,r){r.d(a,{Z:function(){return D}});var n=r(93433),t=r(29439),i=r(4942),o=r(87462),l=r(63366),s=r(47313),c=(r(96214),r(83061)),d=r(21921),u=r(17592),x=r(77342),m=r(61113),Z=r(17551),h=r(54750),v=r(46417),f=(0,h.Z)((0,v.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),p=r(38743),j=(0,u.ZP)(p.Z)((function(e){var a=e.theme;return(0,o.Z)({display:"flex",marginLeft:"calc(".concat(a.spacing(1)," * 0.5)"),marginRight:"calc(".concat(a.spacing(1)," * 0.5)")},"light"===a.palette.mode?{backgroundColor:a.palette.grey[100],color:a.palette.grey[700]}:{backgroundColor:a.palette.grey[700],color:a.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,o.Z)({},"light"===a.palette.mode?{backgroundColor:a.palette.grey[200]}:{backgroundColor:a.palette.grey[600]}),"&:active":(0,o.Z)({boxShadow:a.shadows[0]},"light"===a.palette.mode?{backgroundColor:(0,Z._4)(a.palette.grey[200],.12)}:{backgroundColor:(0,Z._4)(a.palette.grey[600],.12)})})})),b=(0,u.ZP)(f)({width:24,height:16});var g=function(e){var a=e;return(0,v.jsx)("li",{children:(0,v.jsx)(j,(0,o.Z)({focusRipple:!0},e,{ownerState:a,children:(0,v.jsx)(b,{ownerState:a})}))})},y=r(77430),C=r(32298);function k(e){return(0,C.Z)("MuiBreadcrumbs",e)}var w=(0,y.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),M=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],S=(0,u.ZP)(m.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,a){return[(0,i.Z)({},"& .".concat(w.li),a.li),a.root]}})({}),R=(0,u.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,a){return a.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),N=(0,u.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,a){return a.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function P(e,a,r,n){return e.reduce((function(t,i,o){return o<e.length-1?t=t.concat(i,(0,v.jsx)(N,{"aria-hidden":!0,className:a,ownerState:n,children:r},"separator-".concat(o))):t.push(i),t}),[])}var D=s.forwardRef((function(e,a){var r=(0,x.Z)({props:e,name:"MuiBreadcrumbs"}),i=r.children,u=r.className,m=r.component,Z=void 0===m?"nav":m,h=r.expandText,f=void 0===h?"Show path":h,p=r.itemsAfterCollapse,j=void 0===p?1:p,b=r.itemsBeforeCollapse,y=void 0===b?1:b,C=r.maxItems,w=void 0===C?8:C,N=r.separator,D=void 0===N?"/":N,_=(0,l.Z)(r,M),B=s.useState(!1),I=(0,t.Z)(B,2),T=I[0],H=I[1],L=(0,o.Z)({},r,{component:Z,expanded:T,expandText:f,itemsAfterCollapse:j,itemsBeforeCollapse:y,maxItems:w,separator:D}),z=function(e){var a=e.classes;return(0,d.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},k,a)}(L),A=s.useRef(null),W=s.Children.toArray(i).filter((function(e){return s.isValidElement(e)})).map((function(e,a){return(0,v.jsx)("li",{className:z.li,children:e},"child-".concat(a))}));return(0,v.jsx)(S,(0,o.Z)({ref:a,component:Z,color:"text.secondary",className:(0,c.Z)(z.root,u),ownerState:L},_,{children:(0,v.jsx)(R,{className:z.ol,ref:A,ownerState:L,children:P(T||w&&W.length<=w?W:function(e){return y+j>=e.length?e:[].concat((0,n.Z)(e.slice(0,y)),[(0,v.jsx)(g,{"aria-label":f,onClick:function(){H(!0);var e=A.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,n.Z)(e.slice(e.length-j,e.length)))}(W),z.separator,D,L)})}))}))},93405:function(e,a,r){r.d(a,{Z:function(){return v}});var n=r(87462),t=r(63366),i=r(47313),o=r(83061),l=r(21921),s=r(17592),c=r(77342),d=r(77430),u=r(32298);function x(e){return(0,u.Z)("MuiCardContent",e)}(0,d.Z)("MuiCardContent",["root"]);var m=r(46417),Z=["className","component"],h=(0,s.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:function(e,a){return a.root}})((function(){return{padding:16,"&:last-child":{paddingBottom:24}}})),v=i.forwardRef((function(e,a){var r=(0,c.Z)({props:e,name:"MuiCardContent"}),i=r.className,s=r.component,d=void 0===s?"div":s,u=(0,t.Z)(r,Z),v=(0,n.Z)({},r,{component:d}),f=function(e){var a=e.classes;return(0,l.Z)({root:["root"]},x,a)}(v);return(0,m.jsx)(h,(0,n.Z)({as:d,className:(0,o.Z)(f.root,i),ownerState:v,ref:a},u))}))},54641:function(e,a,r){r.d(a,{Z:function(){return y}});var n=r(4942),t=r(63366),i=r(87462),o=r(47313),l=r(83061),s=r(21921),c=r(61113),d=r(77342),u=r(17592),x=r(77430),m=r(32298);function Z(e){return(0,m.Z)("MuiCardHeader",e)}var h=(0,x.Z)("MuiCardHeader",["root","avatar","action","content","title","subheader"]),v=r(46417),f=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],p=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:function(e,a){var r;return(0,i.Z)((r={},(0,n.Z)(r,"& .".concat(h.title),a.title),(0,n.Z)(r,"& .".concat(h.subheader),a.subheader),r),a.root)}})({display:"flex",alignItems:"center",padding:16}),j=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:function(e,a){return a.avatar}})({display:"flex",flex:"0 0 auto",marginRight:16}),b=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:function(e,a){return a.action}})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),g=(0,u.ZP)("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:function(e,a){return a.content}})({flex:"1 1 auto"}),y=o.forwardRef((function(e,a){var r=(0,d.Z)({props:e,name:"MuiCardHeader"}),n=r.action,o=r.avatar,u=r.className,x=r.component,m=void 0===x?"div":x,h=r.disableTypography,y=void 0!==h&&h,C=r.subheader,k=r.subheaderTypographyProps,w=r.title,M=r.titleTypographyProps,S=(0,t.Z)(r,f),R=(0,i.Z)({},r,{component:m,disableTypography:y}),N=function(e){var a=e.classes;return(0,s.Z)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},Z,a)}(R),P=w;null==P||P.type===c.Z||y||(P=(0,v.jsx)(c.Z,(0,i.Z)({variant:o?"body2":"h5",className:N.title,component:"span",display:"block"},M,{children:P})));var D=C;return null==D||D.type===c.Z||y||(D=(0,v.jsx)(c.Z,(0,i.Z)({variant:o?"body2":"body1",className:N.subheader,color:"text.secondary",component:"span",display:"block"},k,{children:D}))),(0,v.jsxs)(p,(0,i.Z)({className:(0,l.Z)(N.root,u),as:m,ref:a,ownerState:R},S,{children:[o&&(0,v.jsx)(j,{className:N.avatar,ownerState:R,children:o}),(0,v.jsxs)(g,{className:N.content,ownerState:R,children:[P,D]}),n&&(0,v.jsx)(b,{className:N.action,ownerState:R,children:n})]}))}))},73428:function(e,a,r){r.d(a,{Z:function(){return f}});var n=r(87462),t=r(63366),i=r(47313),o=r(83061),l=r(21921),s=r(17592),c=r(77342),d=r(70501),u=r(77430),x=r(32298);function m(e){return(0,x.Z)("MuiCard",e)}(0,u.Z)("MuiCard",["root"]);var Z=r(46417),h=["className","raised"],v=(0,s.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,a){return a.root}})((function(){return{overflow:"hidden"}})),f=i.forwardRef((function(e,a){var r=(0,c.Z)({props:e,name:"MuiCard"}),i=r.className,s=r.raised,d=void 0!==s&&s,u=(0,t.Z)(r,h),x=(0,n.Z)({},r,{raised:d}),f=function(e){var a=e.classes;return(0,l.Z)({root:["root"]},m,a)}(x);return(0,Z.jsx)(v,(0,n.Z)({className:(0,o.Z)(f.root,i),elevation:d?8:void 0,ref:a,ownerState:x},u))}))}}]);