"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[9655],{37903:function(e,t,n){n.d(t,{Z:function(){return m}});var r=n(1413),a=n(45987),o=n(9506),i=n(35898),s=n(61113),l=n(3404),c=n(90891),d=n(2135),x=n(46417);function h(e){var t=e.link,n=e.activeLast,a=e.disabled,i=t.name,s=t.href,l=t.icon,h=(0,r.Z)({typography:"body2",alignItems:"center",color:"text.primary",display:"inline-flex"},a&&!n&&{cursor:"default",pointerEvents:"none",color:"text.disabled"}),u=(0,x.jsxs)(x.Fragment,{children:[l&&(0,x.jsx)(o.Z,{component:"span",sx:{mr:1,display:"inherit","& svg":{width:20,height:20}},children:l}),i]});return s?(0,x.jsx)(c.Z,{component:d.rU,to:s,sx:h,children:u}):(0,x.jsxs)(o.Z,{sx:h,children:[" ",u," "]})}var u=["links","action","heading","moreLink","activeLast","sx"];function m(e){var t=e.links,n=e.action,d=e.heading,m=e.moreLink,p=e.activeLast,j=e.sx,f=(0,a.Z)(e,u),b=t[t.length-1].name;return(0,x.jsxs)(o.Z,{sx:(0,r.Z)({mb:5},j),children:[(0,x.jsxs)(i.Z,{direction:"row",alignItems:"center",children:[(0,x.jsxs)(o.Z,{sx:{flexGrow:1},children:[d&&(0,x.jsx)(s.Z,{variant:"h4",gutterBottom:!0,children:d}),!!t.length&&(0,x.jsx)(l.Z,(0,r.Z)((0,r.Z)({separator:(0,x.jsx)(Z,{})},f),{},{children:t.map((function(e){return(0,x.jsx)(h,{link:e,activeLast:p,disabled:e.name===b},e.name||"")}))}))]}),n&&(0,x.jsxs)(o.Z,{sx:{flexShrink:0},children:[" ",n," "]})]}),!!m&&(0,x.jsx)(o.Z,{sx:{mt:2},children:m.map((function(e){return(0,x.jsx)(c.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}function Z(){return(0,x.jsx)(o.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})}},39655:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(29439),a=n(47313),o=n(65964),i=n(9506),s=n(47825),l=n(44758),c=n(83929),d=n(1550),x=n(16429),h=n(82403),u=n(76025),m=n(16335),Z=n(37903),p=n(14461),j=n(46417),f=["default","primary","secondary","info","success","warning","error"],b=["top","start","bottom","end"],v={display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap","& > *":{m:"8px !important"}};function g(){var e=(0,a.useState)([!0,!1]),t=(0,r.Z)(e,2),n=t[0],g=t[1];return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(o.ql,{children:(0,j.jsx)("title",{children:" MUI Components: Checkbox "})}),(0,j.jsx)(i.Z,{sx:{pt:6,pb:1,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:(0,j.jsx)(s.Z,{children:(0,j.jsx)(Z.Z,{heading:"Checkboxes",links:[{name:"Components",href:u.ko.components},{name:"Checkboxes"}],moreLink:["https://mui.com/components/checkboxes"]})})}),(0,j.jsx)(s.Z,{sx:{my:10},children:(0,j.jsxs)(h.ZP,{columns:{xs:1,md:2},spacing:3,children:[(0,j.jsxs)(p.g,{title:"Basic",sx:v,children:[(0,j.jsx)(l.Z,{}),(0,j.jsx)(l.Z,{defaultChecked:!0}),(0,j.jsx)(l.Z,{defaultChecked:!0,indeterminate:!0}),(0,j.jsx)(l.Z,{disabled:!0}),(0,j.jsx)(l.Z,{disabled:!0,defaultChecked:!0}),(0,j.jsx)(l.Z,{disabled:!0,indeterminate:!0})]}),(0,j.jsxs)(p.g,{title:"Size & Custom Icon",sx:v,children:[(0,j.jsx)(c.Z,{label:"Normal",control:(0,j.jsx)(l.Z,{defaultChecked:!0})}),(0,j.jsx)(c.Z,{label:"Small",control:(0,j.jsx)(l.Z,{defaultChecked:!0,size:"small"})}),(0,j.jsx)(c.Z,{control:(0,j.jsx)(l.Z,{color:"info",size:"small",icon:(0,j.jsx)(m.Z,{icon:"eva:heart-fill"}),checkedIcon:(0,j.jsx)(m.Z,{icon:"eva:heart-fill"})}),label:"Custom icon"}),(0,j.jsx)(c.Z,{control:(0,j.jsx)(l.Z,{color:"error",icon:(0,j.jsx)(m.Z,{icon:"eva:award-fill"}),checkedIcon:(0,j.jsx)(m.Z,{icon:"eva:award-fill"})}),label:"Custom icon"})]}),(0,j.jsx)(p.g,{title:"Placement",sx:v,children:(0,j.jsx)(d.Z,{component:"fieldset",children:(0,j.jsx)(x.Z,{"aria-label":"position",row:!0,children:b.map((function(e){return(0,j.jsx)(c.Z,{value:e,label:e,labelPlacement:e,control:(0,j.jsx)(l.Z,{}),sx:{textTransform:"capitalize"}},e)}))})})}),(0,j.jsxs)(p.g,{title:"Colors",children:[(0,j.jsxs)(x.Z,{children:[f.map((function(e){return(0,j.jsx)(c.Z,{control:(0,j.jsx)(l.Z,{defaultChecked:!0,color:e}),label:e,sx:{textTransform:"capitalize"}},e)})),(0,j.jsx)(c.Z,{disabled:!0,control:(0,j.jsx)(l.Z,{defaultChecked:!0,color:"error"}),label:"Disabled"})]}),(0,j.jsx)(d.Z,{component:"fieldset",children:(0,j.jsxs)(x.Z,{children:[f.map((function(e){return(0,j.jsx)(c.Z,{control:(0,j.jsx)(l.Z,{defaultChecked:!0,indeterminate:!0,color:e}),label:e,sx:{textTransform:"capitalize"}},e)})),(0,j.jsx)(c.Z,{disabled:!0,control:(0,j.jsx)(l.Z,{defaultChecked:!0,indeterminate:!0,color:"error"}),label:"Disabled"})]})})]}),(0,j.jsx)(p.g,{title:"Indeterminate",sx:v,children:(0,j.jsxs)("div",{children:[(0,j.jsx)(c.Z,{label:"Parent",control:(0,j.jsx)(l.Z,{checked:n[0]&&n[1],indeterminate:n[0]!==n[1],onChange:function(e){g([e.target.checked,e.target.checked])}})}),(0,j.jsxs)("div",{children:[(0,j.jsx)(c.Z,{label:"Child 1",control:(0,j.jsx)(l.Z,{checked:n[0],onChange:function(e){g([e.target.checked,n[1]])}})}),(0,j.jsx)(c.Z,{label:"Child 2",control:(0,j.jsx)(l.Z,{checked:n[1],onChange:function(e){g([n[0],e.target.checked])}})})]})]})})]})})]})}},14461:function(e,t,n){n.d(t,{_:function(){return x},g:function(){return d}});var r=n(1413),a=n(17551),o=n(70501),i=n(54641),s=n(9506),l=n(61113),c=n(46417);function d(e){var t=e.title,n=e.sx,l=e.children;return(0,c.jsxs)(o.Z,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return(0,a.Fq)(e.palette.grey[500],.04)}},children:[t&&(0,c.jsx)(i.Z,{title:t}),(0,c.jsx)(s.Z,{sx:(0,r.Z)({p:5,minHeight:180},n),children:l})]})}function x(e){var t=e.title;return(0,c.jsx)(l.Z,{variant:"overline",component:"p",gutterBottom:!0,sx:{color:"text.secondary"},children:t})}},54641:function(e,t,n){n.d(t,{Z:function(){return k}});var r=n(4942),a=n(63366),o=n(87462),i=n(47313),s=n(83061),l=n(21921),c=n(61113),d=n(77342),x=n(17592),h=n(77430),u=n(32298);function m(e){return(0,u.Z)("MuiCardHeader",e)}var Z=(0,h.Z)("MuiCardHeader",["root","avatar","action","content","title","subheader"]),p=n(46417),j=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],f=(0,x.ZP)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:function(e,t){var n;return(0,o.Z)((n={},(0,r.Z)(n,"& .".concat(Z.title),t.title),(0,r.Z)(n,"& .".concat(Z.subheader),t.subheader),n),t.root)}})({display:"flex",alignItems:"center",padding:16}),b=(0,x.ZP)("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:function(e,t){return t.avatar}})({display:"flex",flex:"0 0 auto",marginRight:16}),v=(0,x.ZP)("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:function(e,t){return t.action}})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),g=(0,x.ZP)("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:function(e,t){return t.content}})({flex:"1 1 auto"}),k=i.forwardRef((function(e,t){var n=(0,d.Z)({props:e,name:"MuiCardHeader"}),r=n.action,i=n.avatar,x=n.className,h=n.component,u=void 0===h?"div":h,Z=n.disableTypography,k=void 0!==Z&&Z,y=n.subheader,C=n.subheaderTypographyProps,w=n.title,P=n.titleTypographyProps,T=(0,a.Z)(n,j),R=(0,o.Z)({},n,{component:u,disableTypography:k}),_=function(e){var t=e.classes;return(0,l.Z)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},m,t)}(R),I=w;null==I||I.type===c.Z||k||(I=(0,p.jsx)(c.Z,(0,o.Z)({variant:i?"body2":"h5",className:_.title,component:"span",display:"block"},P,{children:I})));var N=y;return null==N||N.type===c.Z||k||(N=(0,p.jsx)(c.Z,(0,o.Z)({variant:i?"body2":"body1",className:_.subheader,color:"text.secondary",component:"span",display:"block"},C,{children:N}))),(0,p.jsxs)(f,(0,o.Z)({className:(0,s.Z)(_.root,x),as:u,ref:t,ownerState:R},T,{children:[i&&(0,p.jsx)(b,{className:_.avatar,ownerState:R,children:i}),(0,p.jsxs)(g,{className:_.content,ownerState:R,children:[I,N]}),r&&(0,p.jsx)(v,{className:_.action,ownerState:R,children:r})]}))}))}}]);