(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[992],{3404:function(e,r,o){"use strict";o.d(r,{Z:function(){return B}});var t=o(93433),a=o(29439),n=o(4942),i=o(87462),s=o(63366),l=o(47313),c=(o(96214),o(83061)),u=o(21921),d=o(17592),p=o(77342),m=o(61113),f=o(17551),Z=o(54750),v=o(46417),g=(0,Z.Z)((0,v.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),h=o(38743),b=(0,d.ZP)(h.Z)((function(e){var r=e.theme;return(0,i.Z)({display:"flex",marginLeft:"calc(".concat(r.spacing(1)," * 0.5)"),marginRight:"calc(".concat(r.spacing(1)," * 0.5)")},"light"===r.palette.mode?{backgroundColor:r.palette.grey[100],color:r.palette.grey[700]}:{backgroundColor:r.palette.grey[700],color:r.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,i.Z)({},"light"===r.palette.mode?{backgroundColor:r.palette.grey[200]}:{backgroundColor:r.palette.grey[600]}),"&:active":(0,i.Z)({boxShadow:r.shadows[0]},"light"===r.palette.mode?{backgroundColor:(0,f._4)(r.palette.grey[200],.12)}:{backgroundColor:(0,f._4)(r.palette.grey[600],.12)})})})),x=(0,d.ZP)(g)({width:24,height:16});var y=function(e){var r=e;return(0,v.jsx)("li",{children:(0,v.jsx)(b,(0,i.Z)({focusRipple:!0},e,{ownerState:r,children:(0,v.jsx)(x,{ownerState:r})}))})},w=o(77430),k=o(32298);function C(e){return(0,k.Z)("MuiBreadcrumbs",e)}var M=(0,w.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),R=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],S=(0,d.ZP)(m.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,r){return[(0,n.Z)({},"& .".concat(M.li),r.li),r.root]}})({}),N=(0,d.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,r){return r.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),T=(0,d.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,r){return r.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function j(e,r,o,t){return e.reduce((function(a,n,i){return i<e.length-1?a=a.concat(n,(0,v.jsx)(T,{"aria-hidden":!0,className:r,ownerState:t,children:o},"separator-".concat(i))):a.push(n),a}),[])}var B=l.forwardRef((function(e,r){var o=(0,p.Z)({props:e,name:"MuiBreadcrumbs"}),n=o.children,d=o.className,m=o.component,f=void 0===m?"nav":m,Z=o.expandText,g=void 0===Z?"Show path":Z,h=o.itemsAfterCollapse,b=void 0===h?1:h,x=o.itemsBeforeCollapse,w=void 0===x?1:x,k=o.maxItems,M=void 0===k?8:k,T=o.separator,B=void 0===T?"/":T,H=(0,s.Z)(o,R),P=l.useState(!1),_=(0,a.Z)(P,2),z=_[0],A=_[1],I=(0,i.Z)({},o,{component:f,expanded:z,expandText:g,itemsAfterCollapse:b,itemsBeforeCollapse:w,maxItems:M,separator:B}),D=function(e){var r=e.classes;return(0,u.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},C,r)}(I),L=l.useRef(null),q=l.Children.toArray(n).filter((function(e){return l.isValidElement(e)})).map((function(e,r){return(0,v.jsx)("li",{className:D.li,children:e},"child-".concat(r))}));return(0,v.jsx)(S,(0,i.Z)({ref:r,component:f,color:"text.secondary",className:(0,c.Z)(D.root,d),ownerState:I},H,{children:(0,v.jsx)(N,{className:D.ol,ref:L,ownerState:I,children:j(z||M&&q.length<=M?q:function(e){return w+b>=e.length?e:[].concat((0,t.Z)(e.slice(0,w)),[(0,v.jsx)(y,{"aria-label":g,onClick:function(){A(!0);var e=L.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,t.Z)(e.slice(e.length-b,e.length)))}(q),D.separator,B,I)})}))}))},33604:function(e,r,o){"use strict";var t=o(87462),a=o(63366),n=o(47313),i=o(83061),s=o(21921),l=o(61113),c=o(17592),u=o(77342),d=o(93174),p=o(63909),m=o(46417),f=["className","id"],Z=(0,c.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,r){return r.root}})({padding:"16px 24px",flex:"0 0 auto"}),v=n.forwardRef((function(e,r){var o=(0,u.Z)({props:e,name:"MuiDialogTitle"}),l=o.className,c=o.id,v=(0,a.Z)(o,f),g=o,h=function(e){var r=e.classes;return(0,s.Z)({root:["root"]},d.a,r)}(g),b=n.useContext(p.Z).titleId,x=void 0===b?c:b;return(0,m.jsx)(Z,(0,t.Z)({component:"h2",className:(0,i.Z)(h.root,l),ownerState:g,ref:r,variant:"h6",id:x},v))}));r.Z=v},57861:function(e,r,o){"use strict";o.d(r,{Z:function(){return b}});var t=o(87462),a=o(63366),n=o(47313),i=o(83061),s=o(21921),l=o(56062),c=o(77342),u=o(17592),d=o(77430),p=o(32298);function m(e){return(0,p.Z)("MuiTableBody",e)}(0,d.Z)("MuiTableBody",["root"]);var f=o(46417),Z=["className","component"],v=(0,u.ZP)("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:function(e,r){return r.root}})({display:"table-row-group"}),g={variant:"body"},h="tbody",b=n.forwardRef((function(e,r){var o=(0,c.Z)({props:e,name:"MuiTableBody"}),n=o.className,u=o.component,d=void 0===u?h:u,p=(0,a.Z)(o,Z),b=(0,t.Z)({},o,{component:d}),x=function(e){var r=e.classes;return(0,s.Z)({root:["root"]},m,r)}(b);return(0,f.jsx)(l.Z.Provider,{value:g,children:(0,f.jsx)(v,(0,t.Z)({className:(0,i.Z)(x.root,n),as:d,ref:r,role:d===h?null:"rowgroup",ownerState:b},p))})}))},51629:function(e,r,o){"use strict";o.d(r,{Z:function(){return v}});var t=o(87462),a=o(63366),n=o(47313),i=o(83061),s=o(21921),l=o(77342),c=o(17592),u=o(77430),d=o(32298);function p(e){return(0,d.Z)("MuiTableContainer",e)}(0,u.Z)("MuiTableContainer",["root"]);var m=o(46417),f=["className","component"],Z=(0,c.ZP)("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:function(e,r){return r.root}})({width:"100%",overflowX:"auto"}),v=n.forwardRef((function(e,r){var o=(0,l.Z)({props:e,name:"MuiTableContainer"}),n=o.className,c=o.component,u=void 0===c?"div":c,d=(0,a.Z)(o,f),v=(0,t.Z)({},o,{component:u}),g=function(e){var r=e.classes;return(0,s.Z)({root:["root"]},p,r)}(v);return(0,m.jsx)(Z,(0,t.Z)({ref:r,as:u,className:(0,i.Z)(g.root,n),ownerState:v},d))}))},66835:function(e,r,o){"use strict";o.d(r,{Z:function(){return h}});var t=o(63366),a=o(87462),n=o(47313),i=o(83061),s=o(21921),l=o(27416),c=o(77342),u=o(17592),d=o(77430),p=o(32298);function m(e){return(0,p.Z)("MuiTable",e)}(0,d.Z)("MuiTable",["root","stickyHeader"]);var f=o(46417),Z=["className","component","padding","size","stickyHeader"],v=(0,u.ZP)("table",{name:"MuiTable",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,o.stickyHeader&&r.stickyHeader]}})((function(e){var r=e.theme,o=e.ownerState;return(0,a.Z)({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":(0,a.Z)({},r.typography.body2,{padding:r.spacing(2),color:(r.vars||r).palette.text.secondary,textAlign:"left",captionSide:"bottom"})},o.stickyHeader&&{borderCollapse:"separate"})})),g="table",h=n.forwardRef((function(e,r){var o=(0,c.Z)({props:e,name:"MuiTable"}),u=o.className,d=o.component,p=void 0===d?g:d,h=o.padding,b=void 0===h?"normal":h,x=o.size,y=void 0===x?"medium":x,w=o.stickyHeader,k=void 0!==w&&w,C=(0,t.Z)(o,Z),M=(0,a.Z)({},o,{component:p,padding:b,size:y,stickyHeader:k}),R=function(e){var r=e.classes,o={root:["root",e.stickyHeader&&"stickyHeader"]};return(0,s.Z)(o,m,r)}(M),S=n.useMemo((function(){return{padding:b,size:y,stickyHeader:k}}),[b,y,k]);return(0,f.jsx)(l.Z.Provider,{value:S,children:(0,f.jsx)(v,(0,a.Z)({as:p,role:p===g?null:"table",ref:r,className:(0,i.Z)(R.root,u),ownerState:M},C))})}))},88718:function(e,r,o){var t=o(81186),a=o(41790);e.exports=function(e,r){return e&&e.length?a(e,t(r,2)):0}}}]);