"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[2560],{52560:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var r=n(65964),i=n(47825),s=n(76025),a=n(37903),c=n(59519),u=n(47609),l=n(46417);function d(){var e=(0,c.K$)().themeStretch;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.ql,{children:(0,l.jsx)("title",{children:" Create New Task "})}),(0,l.jsxs)(i.Z,{maxWidth:!e&&"lg",children:[(0,l.jsx)(a.Z,{heading:"Create a new task",links:[{name:"Dashboard",href:s.vB.root},{name:"Task",href:s.vB.task.root},{name:"Create"}]}),(0,l.jsx)(u.t,{})]})]})}},74248:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(1413),i=n(29439),s=n(47313),a=n(68492),c=n(31126),u=n(45987),l=n(63130),d=n(46417),o=["data"],h=[{field:"id",headerName:"ID",width:80},{field:"task",headerName:"Task",width:160},{field:"topic",headerName:"Topic",width:160},{field:"taskType",headerName:"Task Type",width:100},{field:"questions",headerName:"Questions ID",flex:1,valueGetter:function(e){return e.row.questions.map((function(e){return e.id})).join(",")}},{field:"action",headerName:" ",width:80,align:"right",sortable:!1,disableColumnMenu:!0}];function f(e){var t=e.data,n=(0,u.Z)(e,o);return(0,d.jsx)(l._,(0,r.Z)((0,r.Z)({},n),{},{columns:h,rows:t}))}var p=function(e){var t=e.gridProps,n=(0,s.useState)([]),u=(0,i.Z)(n,2),l=u[0],o=u[1];return(0,s.useEffect)((function(){(0,a.Ak)().then((function(e){o(e.data)}))}),[]),l.length<1?(0,d.jsx)(c.hM,{}):(0,d.jsx)(f,(0,r.Z)({data:l},t))}},47609:function(e,t,n){n.d(t,{t:function(){return T},a:function(){return y.Z}});var r=n(74165),i=n(15861),s=n(21933),a=n(58467),c=(n(47313),n(62563)),u=n(75627),l=n(32703),d=n(73428),o=n(35898),h=n(61113),f=n(66212),p=n(9506),x=n(9019),m=n(51405),k=n(68492),Z=n(76025),j=n(68986),v=n(54308),g=n(46694),b=n(46417),w={task:"",questions:[],topic:"",taskType:"MULTIPLE_CHOICE"};function T(){var e=(0,a.s0)(),t=(0,j.Ds)().enqueueSnackbar,n=s.Ry().shape({task:s.Z_().required("task is required"),topic:s.Z_().required("topic is required"),taskType:s.Z_().required("taskType is required")}),T=w,y=(0,u.cI)({resolver:(0,c.X)(n),defaultValues:T}),C=(y.reset,y.watch),_=y.setValue,q=y.handleSubmit,S=y.formState.isSubmitting,P=C("questions"),E=function(){var n=(0,i.Z)((0,r.Z)().mark((function n(i){return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,k.vr)(i);case 3:t("Create success!"),e(Z.vB.task.list),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),console.error(n.t0),t(n.t0.message||JSON.stringify(n.t0),{variant:"error"});case 11:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(e){return n.apply(this,arguments)}}(),I=function(e){var t=P;t.includes(e.id)?t=t.filter((function(t){return t!==e.id})):t.push(e.id),_("questions",t)};return(0,b.jsx)(v.ZP,{methods:y,onSubmit:q(E),children:(0,b.jsxs)(x.ZP,{container:!0,spacing:3,children:[(0,b.jsxs)(x.ZP,{item:!0,xs:12,md:8,marginTop:-3,children:[(0,b.jsx)(d.Z,{sx:{p:3,my:3},children:(0,b.jsxs)(o.Z,{spacing:3,children:[(0,b.jsx)(v.au,{name:"task",label:"Enter task"}),(0,b.jsx)(v.au,{name:"topic",label:"Enter topic"})]})}),(0,b.jsx)(d.Z,{sx:{p:3,my:2},children:(0,b.jsx)(o.Z,{spacing:3,children:(0,b.jsxs)(o.Z,{spacing:1,children:[(0,b.jsx)(h.Z,{variant:"subtitle2",sx:{color:"text.secondary"},children:"List Question"}),(0,b.jsx)(o.Z,{direction:"row",spacing:3,children:P.map((function(e){return(0,b.jsx)(f.Z,{clickable:!0,variant:"filled",label:e,color:"success"},e)}))}),(0,b.jsx)(p.Z,{sx:{height:590},children:(0,b.jsx)(g.o,{gridProps:{onRowClick:I}})})]})})})]}),(0,b.jsxs)(x.ZP,{item:!0,xs:12,md:4,children:[(0,b.jsx)(d.Z,{sx:{p:3},children:(0,b.jsx)(o.Z,{spacing:3,children:(0,b.jsx)(v.Cc,{fullWidth:!0,name:"taskType",label:"Task type",InputLabelProps:{shrink:!0},children:["MULTIPLE_CHOICE","ESSAY"].map((function(e){return(0,b.jsx)(m.Z,{value:e,children:e},e)}))})})}),(0,b.jsx)(o.Z,{direction:"row",spacing:1.5,sx:{mt:3},children:(0,b.jsx)(l.Z,{fullWidth:!0,type:"submit",variant:"contained",size:"large",loading:S,children:"Create task"})})]})]})})}var y=n(74248)}}]);