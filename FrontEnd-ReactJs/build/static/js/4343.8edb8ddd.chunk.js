"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[4343],{37903:function(e,n,t){t.d(n,{Z:function(){return f}});var i=t(1413),r=t(45987),a=t(9506),s=t(35898),o=t(61113),c=t(3404),l=t(90891),d=t(2135),u=t(46417);function h(e){var n=e.link,t=e.activeLast,r=e.disabled,s=n.name,o=n.href,c=n.icon,h=(0,i.Z)({typography:"body2",alignItems:"center",color:"text.primary",display:"inline-flex"},r&&!t&&{cursor:"default",pointerEvents:"none",color:"text.disabled"}),x=(0,u.jsxs)(u.Fragment,{children:[c&&(0,u.jsx)(a.Z,{component:"span",sx:{mr:1,display:"inherit","& svg":{width:20,height:20}},children:c}),s]});return o?(0,u.jsx)(l.Z,{component:d.rU,to:o,sx:h,children:x}):(0,u.jsxs)(a.Z,{sx:h,children:[" ",x," "]})}var x=["links","action","heading","moreLink","activeLast","sx"];function f(e){var n=e.links,t=e.action,d=e.heading,f=e.moreLink,g=e.activeLast,m=e.sx,v=(0,r.Z)(e,x),p=n[n.length-1].name;return(0,u.jsxs)(a.Z,{sx:(0,i.Z)({mb:5},m),children:[(0,u.jsxs)(s.Z,{direction:"row",alignItems:"center",children:[(0,u.jsxs)(a.Z,{sx:{flexGrow:1},children:[d&&(0,u.jsx)(o.Z,{variant:"h4",gutterBottom:!0,children:d}),!!n.length&&(0,u.jsx)(c.Z,(0,i.Z)((0,i.Z)({separator:(0,u.jsx)(Z,{})},v),{},{children:n.map((function(e){return(0,u.jsx)(h,{link:e,activeLast:g,disabled:e.name===p},e.name||"")}))}))]}),t&&(0,u.jsxs)(a.Z,{sx:{flexShrink:0},children:[" ",t," "]})]}),!!f&&(0,u.jsx)(a.Z,{sx:{mt:2},children:f.map((function(e){return(0,u.jsx)(l.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}function Z(){return(0,u.jsx)(a.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})}},38618:function(e,n,t){t.d(n,{Z:function(){return d}});var i=t(1413),r=t(45987),a=t(35898),s=t(61113),o=t(9651),c=t(46417),l=["title","description","img","sx"];function d(e){var n=e.title,t=e.description,d=e.img,u=e.sx,h=(0,r.Z)(e,l);return(0,c.jsxs)(a.Z,(0,i.Z)((0,i.Z)({alignItems:"center",justifyContent:"center",sx:(0,i.Z)({height:1,textAlign:"center",p:function(e){return e.spacing(8,2)}},u)},h),{},{children:[(0,c.jsx)(o.Z,{disabledEffect:!0,alt:"empty content",src:d||"/assets/illustrations/illustration_empty_content.svg",sx:{height:240,mb:3}}),(0,c.jsx)(s.Z,{variant:"h5",gutterBottom:!0,children:n}),t&&(0,c.jsx)(s.Z,{variant:"body2",sx:{color:"text.secondary"},children:t})]}))}},31126:function(e,n,t){function i(e,n,t){return e>0?Math.max(0,(1+e)*n-t):0}function r(e,n,t){return n[t]<e[t]?-1:n[t]>e[t]?1:0}function a(e,n){return"desc"===e?function(e,t){return r(e,t,n)}:function(e,t){return-r(e,t,n)}}t.d(n,{$W:function(){return p},K:function(){return C},et:function(){return x},S_:function(){return L},Z4:function(){return _},hM:function(){return v},fQ:function(){return i},sQ:function(){return a},x6:function(){return c}});var s=t(29439),o=t(47313);function c(e){var n=(0,o.useState)(!(null===e||void 0===e||!e.defaultDense)),t=(0,s.Z)(n,2),i=t[0],r=t[1],a=(0,o.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),c=(0,s.Z)(a,2),l=c[0],d=c[1],u=(0,o.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),h=(0,s.Z)(u,2),x=h[0],f=h[1],Z=(0,o.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),g=(0,s.Z)(Z,2),m=g[0],v=g[1],p=(0,o.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),j=(0,s.Z)(p,2),w=j[0],b=j[1],k=(0,o.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]),S=(0,s.Z)(k,2),C=S[0],y=S[1],P=(0,o.useCallback)((function(e){""!==e&&(f(l===e&&"asc"===x?"desc":"asc"),d(e))}),[x,l]),D=(0,o.useCallback)((function(e){var n=C.indexOf(e),t=[];-1===n?t=t.concat(C,e):0===n?t=t.concat(C.slice(1)):n===C.length-1?t=t.concat(C.slice(0,-1)):n>0&&(t=t.concat(C.slice(0,n),C.slice(n+1))),y(t)}),[C]),_=(0,o.useCallback)((function(e,n){y(e?n:[])}),[]),R=(0,o.useCallback)((function(e,n){v(n)}),[]),I=(0,o.useCallback)((function(e){v(0),b(parseInt(e.target.value,10))}),[]),N=(0,o.useCallback)((function(e){r(e.target.checked)}),[]);return{dense:i,order:x,page:m,orderBy:l,rowsPerPage:w,selected:C,onSelectRow:D,onSelectAllRows:_,onSort:P,onChangePage:R,onChangeDense:N,onChangeRowsPerPage:I,setPage:v,setDense:r,setOrder:f,setOrderBy:d,setSelected:y,setRowsPerPage:b}}var l=t(24076),d=t(67478),u=t(38618),h=t(46417);function x(e){var n=e.isNotFound;return(0,h.jsx)(l.Z,{children:n?(0,h.jsx)(d.Z,{colSpan:12,children:(0,h.jsx)(u.Z,{title:"No Data",sx:{"& span.MuiBox-root":{height:160}}})}):(0,h.jsx)(d.Z,{colSpan:12,sx:{p:0}})})}var f=t(1413),Z=t(36459),g=t(35898),m=t(84488);function v(e){var n=Object.assign({},((0,Z.Z)(e),e));return(0,h.jsx)(l.Z,(0,f.Z)((0,f.Z)({},n),{},{children:(0,h.jsx)(d.Z,{colSpan:12,children:(0,h.jsxs)(g.Z,{spacing:3,direction:"row",alignItems:"center",children:[(0,h.jsx)(m.Z,{variant:"rectangular",width:40,height:40,sx:{borderRadius:1,flexShrink:0}}),(0,h.jsx)(m.Z,{variant:"text",width:"100%",height:20}),(0,h.jsx)(m.Z,{variant:"text",width:160,height:20}),(0,h.jsx)(m.Z,{variant:"text",width:160,height:20}),(0,h.jsx)(m.Z,{variant:"text",width:160,height:20}),(0,h.jsx)(m.Z,{variant:"text",width:160,height:20})]})})}))}function p(e){var n=e.emptyRows,t=e.height;return n?(0,h.jsx)(l.Z,{sx:(0,f.Z)({},t&&{height:t*n}),children:(0,h.jsx)(d.Z,{colSpan:9})}):null}var j=t(23477),w=t(44758),b=t(82558),k=t(9506),S={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function C(e){var n=e.order,t=e.orderBy,i=e.rowCount,r=void 0===i?0:i,a=e.headLabel,s=e.numSelected,o=void 0===s?0:s,c=e.onSort,u=e.onSelectAllRows,x=e.sx;return(0,h.jsx)(j.Z,{sx:x,children:(0,h.jsxs)(l.Z,{children:[u&&(0,h.jsx)(d.Z,{padding:"checkbox",children:(0,h.jsx)(w.Z,{indeterminate:o>0&&o<r,checked:r>0&&o===r,onChange:function(e){return u(e.target.checked)}})}),a.map((function(e){return(0,h.jsx)(d.Z,{align:e.align||"left",sortDirection:t===e.id&&n,sx:{width:e.width,minWidth:e.minWidth},children:c?(0,h.jsxs)(b.Z,{hideSortIcon:!0,active:t===e.id,direction:t===e.id?n:"asc",onClick:function(){return c(e.id)},sx:{textTransform:"capitalize"},children:[e.label,t===e.id?(0,h.jsx)(k.Z,{sx:(0,f.Z)({},S),children:"desc"===n?"sorted descending":"sorted ascending"}):null]}):e.label},e.id)}))]})})}var y=t(45987),P=t(61113),D=["dense","action","rowCount","numSelected","onSelectAllRows","sx"];function _(e){var n=e.dense,t=e.action,i=e.rowCount,r=e.numSelected,a=e.onSelectAllRows,s=e.sx,o=(0,y.Z)(e,D);return r?(0,h.jsxs)(g.Z,(0,f.Z)((0,f.Z)({direction:"row",alignItems:"center",sx:(0,f.Z)((0,f.Z)({pl:1,pr:2,top:0,left:0,width:1,zIndex:9,height:58,position:"absolute",bgcolor:"primary.lighter"},n&&{height:38}),s)},o),{},{children:[(0,h.jsx)(w.Z,{indeterminate:r>0&&r<i,checked:i>0&&r===i,onChange:function(e){return a(e.target.checked)}}),(0,h.jsxs)(P.Z,{variant:"subtitle1",sx:(0,f.Z)({ml:2,flexGrow:1,color:"primary.main"},n&&{ml:3}),children:[r," selected"]}),t&&t]})):null}var R=t(41493),I=t(83929),N=t(67426),B=["dense","onChangeDense","rowsPerPageOptions","sx"];function L(e){var n=e.dense,t=e.onChangeDense,i=e.rowsPerPageOptions,r=void 0===i?[5,10,25]:i,a=e.sx,s=(0,y.Z)(e,B);return(0,h.jsxs)(k.Z,{sx:(0,f.Z)({position:"relative"},a),children:[(0,h.jsx)(R.Z,(0,f.Z)({rowsPerPageOptions:r,component:"div"},s)),t&&(0,h.jsx)(I.Z,{label:"Dense",control:(0,h.jsx)(N.Z,{checked:n,onChange:t}),sx:{pl:2,py:1.5,top:0,position:{sm:"absolute"}}})]})}},24343:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var i=t(65964),r=t(47825),a=t(73428),s=t(76025),o=t(37903),c=t(59519),l=t(15743),d=t(1857),u=t(46417);function h(){var e=(0,c.K$)().themeStretch;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.ql,{children:(0,u.jsx)("title",{children:" List Test "})}),(0,u.jsxs)(r.Z,{maxWidth:!e&&"lg",children:[(0,u.jsx)(o.Z,{heading:"List test",links:[{name:"Dashboard",href:s.vB.root},{name:"Test",href:s.vB.test.root}]}),(0,u.jsx)(a.Z,{children:(0,u.jsx)(l.Z,{sx:{height:590},children:(0,u.jsx)(d.Z,{})})})]})]})}},1857:function(e,n,t){t.d(n,{Z:function(){return f}});var i=t(1413),r=t(29439),a=t(47313),s=t(68492),o=t(31126),c=t(45987),l=t(63130),d=t(46417),u=["data"],h=[{field:"id",headerName:"ID",width:80},{field:"name",headerName:"Name",width:160},{field:"tasks",headerName:"Tasks ID",flex:1,valueGetter:function(e){return e.row.tasks.join(",")}},{field:"publicDate",headerName:"Public Date",width:100},{field:"endDate",headerName:"End Date",width:100},{field:"time",headerName:"Time (minutes)",width:100},{field:"action",headerName:" ",width:80,align:"right",sortable:!1,disableColumnMenu:!0}];function x(e){var n=e.data,t=(0,c.Z)(e,u);return(0,d.jsx)(l._,(0,i.Z)((0,i.Z)({},t),{},{columns:h,rows:n}))}var f=function(e){var n=e.gridProps,t=(0,a.useState)([]),c=(0,r.Z)(t,2),l=c[0],u=c[1];return(0,a.useEffect)((function(){(0,s.sp)().then((function(e){u(e.data)}))}),[]),l.length<1?(0,d.jsx)(o.hM,{}):(0,d.jsx)(x,(0,i.Z)({data:l},n))}},15743:function(e,n,t){var i=(0,t(14156).Z)();n.Z=i}}]);