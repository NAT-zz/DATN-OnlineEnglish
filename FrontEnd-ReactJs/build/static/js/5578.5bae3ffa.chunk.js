"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[5578],{37903:function(e,n,r){r.d(n,{Z:function(){return h}});var t=r(1413),i=r(45987),l=r(9506),a=r(35898),o=r(61113),s=r(3404),c=r(90891),d=r(2135),u=r(46417);function m(e){var n=e.link,r=e.activeLast,i=e.disabled,a=n.name,o=n.href,s=n.icon,m=(0,t.Z)({typography:"body2",alignItems:"center",color:"text.primary",display:"inline-flex"},i&&!r&&{cursor:"default",pointerEvents:"none",color:"text.disabled"}),p=(0,u.jsxs)(u.Fragment,{children:[s&&(0,u.jsx)(l.Z,{component:"span",sx:{mr:1,display:"inherit","& svg":{width:20,height:20}},children:s}),a]});return o?(0,u.jsx)(c.Z,{component:d.rU,to:o,sx:m,children:p}):(0,u.jsxs)(l.Z,{sx:m,children:[" ",p," "]})}var p=["links","action","heading","moreLink","activeLast","sx"];function h(e){var n=e.links,r=e.action,d=e.heading,h=e.moreLink,f=e.activeLast,g=e.sx,b=(0,i.Z)(e,p),j=n[n.length-1].name;return(0,u.jsxs)(l.Z,{sx:(0,t.Z)({mb:5},g),children:[(0,u.jsxs)(a.Z,{direction:"row",alignItems:"center",children:[(0,u.jsxs)(l.Z,{sx:{flexGrow:1},children:[d&&(0,u.jsx)(o.Z,{variant:"h4",gutterBottom:!0,children:d}),!!n.length&&(0,u.jsx)(s.Z,(0,t.Z)((0,t.Z)({separator:(0,u.jsx)(x,{})},b),{},{children:n.map((function(e){return(0,u.jsx)(m,{link:e,activeLast:f,disabled:e.name===j},e.name||"")}))}))]}),r&&(0,u.jsxs)(l.Z,{sx:{flexShrink:0},children:[" ",r," "]})]}),!!h&&(0,u.jsx)(l.Z,{sx:{mt:2},children:h.map((function(e){return(0,u.jsx)(c.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}function x(){return(0,u.jsx)(l.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})}},45578:function(e,n,r){r.r(n),r.d(n,{default:function(){return G}});var t=r(29439),i=r(47313),l=r(65964),a=r(9506),o=r(47825),s=r(35898),c=r(61113),d=r(83929),u=r(67426),m=r(19536),p=r(76025),h=r(37903),x=r(1413),f=r(93433),g=r(74165),b=r(15861),j=r(62563),Z=r(75627),v=r(91554),w=r(85281),y=r(9019),k=r(24631),S=r(41727),R=r(47131),C=r(51405),q=r(32703),U=r(63686),O=r(16335),F=r(54308),M=r(21933),P=M.Ry().shape({fullName:M.Z_().required("Full name is required").min(6,"Mininum 6 characters").max(32,"Maximum 32 characters"),email:M.Z_().required("Email is required").email("Email must be a valid email address"),age:M.Rx().required("Age is required").moreThan(18,"Age must be between 18 and 100").lessThan(100,"Age must be between 18 and 100"),endDate:M.hT().min(M.iH("startDate"),"End date must be later than start date").required("End date is required"),password:M.Z_().required("Password is required").min(6,"Password should be of minimum 6 characters length"),confirmPassword:M.Z_().required("Confirm password is required").oneOf([M.iH("password")],"Password's not match"),slider:M.Rx().required("Slider is required").min(10,"Mininum value is >= 10"),sliderRange:M.nK().required("Slider range is is required").test("min","Range must be between 20 and 80",(function(e){return e[0]>=20})).test("max","Range must be between 20 and 80",(function(e){return e[1]<=80})),singleUpload:M.nK().required("Single upload is required"),multiUpload:M.IX().min(2,"Must have at least 2 items"),checkbox:M.O7().oneOf([!0],"Checkbox is required"),multiCheckbox:M.IX().min(1,"Choose at least one option"),singleSelect:M.Z_().required("Single select is required"),multiSelect:M.IX().min(2,"Must have at least 2 items"),switch:M.O7().oneOf([!0],"Switch is required"),radioGroup:M.Z_().required("Choose at least one option"),editor:M.Z_().required("Editor is required"),autocomplete:M.nK().required("Autocomplete is required")}),I=r(19860),A=r(12871),_=r(18551),H=r(22868),L=r(9209),N=r(46417);function V(){var e=(0,I.Z)(),n=(0,H.Z)("up","md"),r=(0,Z.Gc)(),t=r.watch,i=r.formState.errors,l=t();return n?(0,N.jsx)(A.Z,{children:(0,N.jsxs)(s.Z,{sx:(0,x.Z)({p:3,top:0,right:0,height:1,width:280,position:"fixed",overflowX:"auto",color:"common.white",zIndex:e.zIndex.drawer},(0,_.Ls)({color:e.palette.grey[900]})),children:[(0,N.jsx)(c.Z,{variant:"overline",sx:{mb:2,color:"success.light"},children:"Values"}),Object.keys(l).map((function(e){return(0,N.jsxs)(s.Z,{sx:{typography:"caption",mt:.5},children:[(0,N.jsxs)(c.Z,{variant:"body2",sx:{color:"warning.main"},children:[e," :"]}),D(l,e)]},e)})),(0,N.jsx)(m.Z,{sx:{my:2}}),(0,N.jsx)(c.Z,{variant:"overline",sx:{mb:2,color:"error.light"},children:"Errors"}),(0,N.jsx)(c.Z,{variant:"caption",sx:{color:"error.light"},children:JSON.stringify(Object.keys(i),null,2)})]})}):null}function D(e,n){return"singleUpload"===n?JSON.stringify(e.singleUpload&&(0,L.ht)(e.singleUpload)):"multiUpload"===n?JSON.stringify(e.multiUpload.map((function(e){return(0,L.ht)(e)}))):JSON.stringify(e[n])||"---"}var E=[{value:"option 1",label:"Option 1"},{value:"option 2",label:"Option 2"},{value:"option 3",label:"Option 3"},{value:"option 4",label:"Option 4"},{value:"option 5",label:"Option 5"},{value:"option 6",label:"Option 6"},{value:"option 7",label:"Option 7"},{value:"option 8",label:"Option 8"}],T={age:0,email:"",fullName:"",editor:"",switch:!1,radioGroup:"",autocomplete:null,password:"",confirmPassword:"",startDate:new Date,endDate:null,singleUpload:null,multiUpload:[],singleSelect:"",multiSelect:[],checkbox:!1,multiCheckbox:[],slider:8,sliderRange:[15,80]};function z(e){var n=e.debug,r=(0,i.useState)(!1),l=(0,t.Z)(r,2),a=l[0],o=l[1],c=(0,Z.cI)({resolver:(0,j.X)(P),defaultValues:T}),d=c.watch,u=c.reset,p=c.control,h=c.setValue,M=c.handleSubmit,I=c.formState.isSubmitting,A=d(),_=function(){var e=(0,b.Z)((0,g.Z)().mark((function e(n){return(0,g.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,3e3)}));case 2:console.log("DATA",n),u();case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),H=(0,i.useCallback)((function(e){var n=e[0],r=Object.assign(n,{preview:URL.createObjectURL(n)});r&&h("singleUpload",r,{shouldValidate:!0})}),[h]),L=(0,i.useCallback)((function(e){var n=A.multiUpload||[],r=e.map((function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})}));h("multiUpload",[].concat((0,f.Z)(n),(0,f.Z)(r)),{shouldValidate:!0})}),[h,A.multiUpload]);return(0,N.jsxs)(N.Fragment,{children:[I&&(0,N.jsx)(v.Z,{open:!0,sx:{zIndex:function(e){return e.zIndex.modal+1}},children:(0,N.jsx)(w.Z,{color:"primary"})}),(0,N.jsxs)(F.ZP,{methods:c,onSubmit:M(_),children:[(0,N.jsxs)(y.ZP,{container:!0,spacing:5,children:[(0,N.jsx)(y.ZP,{item:!0,xs:12,md:6,children:(0,N.jsxs)(s.Z,{spacing:2,children:[(0,N.jsx)(B,{children:(0,N.jsx)(F.au,{name:"fullName",label:"Full Name"})}),(0,N.jsx)(B,{children:(0,N.jsx)(F.au,{name:"email",label:"Email address"})}),(0,N.jsx)(B,{children:(0,N.jsx)(F.au,{name:"age",label:"Age",onChange:function(e){return h("age",Number(e.target.value),{shouldValidate:!0})},InputProps:{type:"number"}})}),(0,N.jsxs)(s.Z,{spacing:2,direction:{xs:"column",sm:"row"},children:[(0,N.jsx)(Z.Qr,{name:"startDate",control:p,render:function(e){var n=e.field,r=e.fieldState.error;return(0,N.jsx)(U.M,(0,x.Z)((0,x.Z)({},n),{},{label:"Start date",inputFormat:"dd/MM/yyyy",renderInput:function(e){return(0,N.jsx)(k.Z,(0,x.Z)((0,x.Z)({fullWidth:!0},e),{},{error:!!r,helperText:null===r||void 0===r?void 0:r.message}))}}))}}),(0,N.jsx)(Z.Qr,{name:"endDate",control:p,render:function(e){var n=e.field,r=e.fieldState.error;return(0,N.jsx)(U.M,(0,x.Z)((0,x.Z)({},n),{},{label:"End date",inputFormat:"dd/MM/yyyy",renderInput:function(e){return(0,N.jsx)(k.Z,(0,x.Z)((0,x.Z)({fullWidth:!0},e),{},{error:!!r,helperText:null===r||void 0===r?void 0:r.message}))}}))}})]}),(0,N.jsxs)(s.Z,{spacing:2,direction:{xs:"column",sm:"row"},children:[(0,N.jsx)(B,{children:(0,N.jsx)(F.au,{name:"password",label:"Password",type:a?"text":"password",InputProps:{endAdornment:(0,N.jsx)(S.Z,{position:"end",children:(0,N.jsx)(R.Z,{onClick:function(){return o(!a)},edge:"end",children:(0,N.jsx)(O.Z,{icon:a?"eva:eye-fill":"eva:eye-off-fill"})})})}})}),(0,N.jsx)(B,{children:(0,N.jsx)(F.au,{name:"confirmPassword",label:"Confirm Password",type:a?"text":"password",InputProps:{endAdornment:(0,N.jsx)(S.Z,{position:"end",children:(0,N.jsx)(R.Z,{onClick:function(){return o(!a)},edge:"end",children:(0,N.jsx)(O.Z,{icon:a?"eva:eye-fill":"eva:eye-off-fill"})})})}})})]}),(0,N.jsx)(B,{label:"RHFAutocomplete",children:(0,N.jsx)(F.Fl,{name:"autocomplete",label:"Autocomplete",options:E,getOptionLabel:function(e){return e.label},isOptionEqualToValue:function(e,n){return e.value===n.value}})}),(0,N.jsx)(B,{label:"RHFSelect",children:(0,N.jsxs)(F.Cc,{name:"singleSelect",label:"Single select",children:[(0,N.jsx)(C.Z,{value:"",children:"None"}),(0,N.jsx)(m.Z,{sx:{borderStyle:"dashed"}}),E.map((function(e){return(0,N.jsx)(C.Z,{value:e.label,children:e.label},e.value)}))]})}),(0,N.jsx)(B,{label:"RHFMultiSelect",children:(0,N.jsx)(F.vA,{chip:!0,checkbox:!0,name:"multiSelect",label:"Multi select",options:E})}),(0,N.jsx)(B,{label:"RHFEditor",children:(0,N.jsx)(F.LM,{simple:!0,name:"editor",sx:{height:200}})})]})}),(0,N.jsx)(y.ZP,{item:!0,xs:12,md:6,children:(0,N.jsxs)(s.Z,{spacing:2,children:[(0,N.jsx)(B,{label:"RHFUpload",children:(0,N.jsx)(F.rd,{name:"singleUpload",maxSize:3145728,onDrop:H,onDelete:function(){return h("singleUpload",null,{shouldValidate:!0})}})}),(0,N.jsx)(B,{label:"RHFUpload",children:(0,N.jsx)(F.rd,{multiple:!0,thumbnail:!0,name:"multiUpload",maxSize:3145728,onDrop:L,onRemove:function(e){var n;return h("multiUpload",A.multiUpload&&(null===(n=A.multiUpload)||void 0===n?void 0:n.filter((function(n){return n!==e}))),{shouldValidate:!0})},onRemoveAll:function(){return h("multiUpload",[],{shouldValidate:!0})},onUpload:function(){return console.log("ON UPLOAD")}})}),(0,N.jsx)(F.jb,{name:"checkbox",label:"RHFCheckbox"}),(0,N.jsx)(F._e,{name:"switch",label:"RHFSwitch"}),(0,N.jsx)(F.km,{row:!0,name:"radioGroup",label:"RHFRadioGroup",spacing:4,options:[{value:"option 1",label:"Radio 1"},{value:"option 2",label:"Radio 2"},{value:"option 3",label:"Radio 3"}]}),(0,N.jsx)(F.s2,{row:!0,name:"multiCheckbox",label:"RHFMultiCheckbox",spacing:4,options:[{value:"option 1",label:"Checkbox 1"},{value:"option 2",label:"Checkbox 2"},{value:"option 3",label:"Checkbox 3"}]}),(0,N.jsx)(B,{label:"RHFSlider",children:(0,N.jsx)(F.kk,{name:"slider"})}),(0,N.jsx)(B,{label:"RHFSlider",children:(0,N.jsx)(F.kk,{name:"sliderRange"})}),(0,N.jsx)(q.Z,{fullWidth:!0,color:"info",size:"large",type:"submit",variant:"contained",loading:I,children:"Submit to check"})]})})]}),n&&(0,N.jsx)(V,{})]})]})}function B(e){var n=e.label,r=void 0===n?"RHFTextField":n,t=e.sx,i=e.children;return(0,N.jsxs)(s.Z,{spacing:1,sx:(0,x.Z)({width:1},t),children:[(0,N.jsx)(c.Z,{variant:"caption",sx:{textAlign:"right",fontStyle:"italic",color:"text.disabled"},children:r}),i]})}function G(){var e=(0,i.useState)(!0),n=(0,t.Z)(e,2),r=n[0],x=n[1];return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(l.ql,{children:(0,N.jsx)("title",{children:" Extra Components: Form Validation "})}),(0,N.jsx)(a.Z,{sx:{pt:6,pb:1,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:(0,N.jsx)(o.Z,{children:(0,N.jsx)(h.Z,{heading:"Form Validation",links:[{name:"Components",href:p.ko.components},{name:"Form Validation"}],moreLink:["https://react-hook-form.com/","https://github.com/jquense/yup"]})})}),(0,N.jsxs)(o.Z,{sx:{my:10},children:[(0,N.jsxs)(s.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,N.jsx)(c.Z,{variant:"h4",children:" React Hook Form + Yup "}),(0,N.jsx)(d.Z,{control:(0,N.jsx)(u.Z,{checked:r,onChange:function(e){x(e.target.checked)}}),label:"Show Debug",labelPlacement:"start"})]}),(0,N.jsx)(m.Z,{sx:{my:5}}),(0,N.jsx)(z,{debug:r})]})]})}},3404:function(e,n,r){r.d(n,{Z:function(){return F}});var t=r(93433),i=r(29439),l=r(4942),a=r(87462),o=r(63366),s=r(47313),c=(r(96214),r(83061)),d=r(21921),u=r(17592),m=r(77342),p=r(61113),h=r(17551),x=r(54750),f=r(46417),g=(0,x.Z)((0,f.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),b=r(38743),j=(0,u.ZP)(b.Z)((function(e){var n=e.theme;return(0,a.Z)({display:"flex",marginLeft:"calc(".concat(n.spacing(1)," * 0.5)"),marginRight:"calc(".concat(n.spacing(1)," * 0.5)")},"light"===n.palette.mode?{backgroundColor:n.palette.grey[100],color:n.palette.grey[700]}:{backgroundColor:n.palette.grey[700],color:n.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,a.Z)({},"light"===n.palette.mode?{backgroundColor:n.palette.grey[200]}:{backgroundColor:n.palette.grey[600]}),"&:active":(0,a.Z)({boxShadow:n.shadows[0]},"light"===n.palette.mode?{backgroundColor:(0,h._4)(n.palette.grey[200],.12)}:{backgroundColor:(0,h._4)(n.palette.grey[600],.12)})})})),Z=(0,u.ZP)(g)({width:24,height:16});var v=function(e){var n=e;return(0,f.jsx)("li",{children:(0,f.jsx)(j,(0,a.Z)({focusRipple:!0},e,{ownerState:n,children:(0,f.jsx)(Z,{ownerState:n})}))})},w=r(77430),y=r(32298);function k(e){return(0,y.Z)("MuiBreadcrumbs",e)}var S=(0,w.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),R=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],C=(0,u.ZP)(p.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,n){return[(0,l.Z)({},"& .".concat(S.li),n.li),n.root]}})({}),q=(0,u.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,n){return n.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),U=(0,u.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,n){return n.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function O(e,n,r,t){return e.reduce((function(i,l,a){return a<e.length-1?i=i.concat(l,(0,f.jsx)(U,{"aria-hidden":!0,className:n,ownerState:t,children:r},"separator-".concat(a))):i.push(l),i}),[])}var F=s.forwardRef((function(e,n){var r=(0,m.Z)({props:e,name:"MuiBreadcrumbs"}),l=r.children,u=r.className,p=r.component,h=void 0===p?"nav":p,x=r.expandText,g=void 0===x?"Show path":x,b=r.itemsAfterCollapse,j=void 0===b?1:b,Z=r.itemsBeforeCollapse,w=void 0===Z?1:Z,y=r.maxItems,S=void 0===y?8:y,U=r.separator,F=void 0===U?"/":U,M=(0,o.Z)(r,R),P=s.useState(!1),I=(0,i.Z)(P,2),A=I[0],_=I[1],H=(0,a.Z)({},r,{component:h,expanded:A,expandText:g,itemsAfterCollapse:j,itemsBeforeCollapse:w,maxItems:S,separator:F}),L=function(e){var n=e.classes;return(0,d.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},k,n)}(H),N=s.useRef(null),V=s.Children.toArray(l).filter((function(e){return s.isValidElement(e)})).map((function(e,n){return(0,f.jsx)("li",{className:L.li,children:e},"child-".concat(n))}));return(0,f.jsx)(C,(0,a.Z)({ref:n,component:h,color:"text.secondary",className:(0,c.Z)(L.root,u),ownerState:H},M,{children:(0,f.jsx)(q,{className:L.ol,ref:N,ownerState:H,children:O(A||S&&V.length<=S?V:function(e){return w+j>=e.length?e:[].concat((0,t.Z)(e.slice(0,w)),[(0,f.jsx)(v,{"aria-label":g,onClick:function(){_(!0);var e=N.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,t.Z)(e.slice(e.length-j,e.length)))}(V),L.separator,F,H)})}))}))}}]);