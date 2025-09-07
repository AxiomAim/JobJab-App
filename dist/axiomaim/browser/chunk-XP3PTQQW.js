import{a as y}from"./chunk-77XXYMUI.js";import{a as st}from"./chunk-YDW5WFOF.js";import{a as lt}from"./chunk-SWFJCUMO.js";import{a as mt}from"./chunk-EY53FSYS.js";import{a as V,c as N,d as P,e as B}from"./chunk-JTEBXXUR.js";import{a as nt,b as at,c as ot,d as rt}from"./chunk-4NQDTH66.js";import{a as Qe,c as Ge}from"./chunk-WGU4N357.js";import{a as Ke,d as Ze}from"./chunk-GV2HNOPZ.js";import{a as et,b as tt}from"./chunk-2N6A2T3N.js";import"./chunk-WO7XMYCS.js";import"./chunk-TKBKLS4N.js";import{c as ce}from"./chunk-5VKE73FD.js";import"./chunk-YCUPTL4E.js";import"./chunk-EMSJVJHN.js";import"./chunk-7XX3TVDI.js";import"./chunk-SSJR24MO.js";import"./chunk-6UHTTYRU.js";import{a as it,b as q}from"./chunk-DBA2BWCJ.js";import"./chunk-ACTZOGXT.js";import"./chunk-EDL6DMK5.js";import{a as Je}from"./chunk-WRLPWSZF.js";import{a as L,c as f,e as _}from"./chunk-22IZ7S6Q.js";import{b,c as S}from"./chunk-ZDVCYR6D.js";import{B as qe,H as Xe,I as fe,J as Ye,K as _e,L as $e,a as je}from"./chunk-25LMPTPI.js";import{a as de,r as ze}from"./chunk-AUKJIIL4.js";import"./chunk-A6M2SCBY.js";import"./chunk-SVUIAZ5I.js";import{c as He}from"./chunk-IKG45PLY.js";import{c as We}from"./chunk-OYH67EY7.js";import"./chunk-DBYYYE4O.js";import{Ac as Le,Bb as he,Bc as Fe,Cb as g,Cc as me,Da as ie,Dc as ge,Ea as ne,Ia as ae,Jb as De,Kb as l,Lb as Re,Mb as Ve,N as we,Oa as Te,Ob as xe,Pc as ve,Rb as W,Sb as Ne,Tb as J,Ub as Y,Uc as se,Vb as $,Wb as i,Xb as t,Xc as G,Yb as s,Yc as F,Z as te,Zb as oe,_b as re,ac as M,ba as Ce,da as ke,f as Q,fa as Z,gc as c,hb as r,ia as T,ib as x,ic as E,jc as Pe,kc as Be,lc as ue,mb as pe,mc as H,nc as U,oc as O,pb as Ie,sc as j,ta as w,tc as e,ua as C,uc as le,vc as z,wb as u,xb as Ae,xc as Ue,yb as Me,zc as Oe}from"./chunk-Q34RPHHW.js";import"./chunk-WWX6BADO.js";var Nt=["matDrawer"],v=(()=>{class o{constructor(n){this._axiomaimMediaWatcherService=n,this._unsubscribeAll=new Q,this.menuData=[{id:"axiomaim-components.libraries",title:"Libraries",type:"group",children:[{id:"axiomaim-components.libraries.mock-api",title:"MockAPI",type:"basic",link:"/ui/axiomaim-components/libraries/mock-api"}]},{id:"axiomaim-components.components",title:"Components",type:"group",children:[{id:"axiomaim-components.components.alert",title:"Alert",type:"basic",link:"/ui/axiomaim-components/components/alert"},{id:"axiomaim-components.components.card",title:"Card",type:"basic",link:"/ui/axiomaim-components/components/card"},{id:"axiomaim-components.components.drawer",title:"Drawer",type:"basic",link:"/ui/axiomaim-components/components/drawer"},{id:"axiomaim-components.components.fullscreen",title:"Fullscreen",type:"basic",link:"/ui/axiomaim-components/components/fullscreen"},{id:"axiomaim-components.components.highlight",title:"Highlight",type:"basic",link:"/ui/axiomaim-components/components/highlight"},{id:"axiomaim-components.components.loading-bar",title:"Loading Bar",type:"basic",link:"/ui/axiomaim-components/components/loading-bar"},{id:"axiomaim-components.components.masonry",title:"Masonry",type:"basic",link:"/ui/axiomaim-components/components/masonry"},{id:"axiomaim-components.components.navigation",title:"Navigation",type:"basic",link:"/ui/axiomaim-components/components/navigation"}]},{id:"axiomaim-components.directives",title:"Directives",type:"group",children:[{id:"axiomaim-components.directives.scrollbar",title:"Scrollbar",type:"basic",link:"/ui/axiomaim-components/directives/scrollbar"},{id:"axiomaim-components.directives.scroll-reset",title:"ScrollReset",type:"basic",link:"/ui/axiomaim-components/directives/scroll-reset"}]},{id:"axiomaim-components.services",title:"Services",type:"group",children:[{id:"axiomaim-components.services.config",title:"Config",type:"basic",link:"/ui/axiomaim-components/services/config"},{id:"axiomaim-components.services.confirmation",title:"Confirmation",type:"basic",link:"/ui/axiomaim-components/services/confirmation"},{id:"axiomaim-components.services.splash-screen",title:"SplashScreen",type:"basic",link:"/ui/axiomaim-components/services/splash-screen"},{id:"axiomaim-components.services.media-watcher",title:"MediaWatcher",type:"basic",link:"/ui/axiomaim-components/services/media-watcher"}]},{id:"axiomaim-components.pipes",title:"Pipes",type:"group",children:[{id:"axiomaim-components.pipes.find-by-key",title:"FindByKey",type:"basic",link:"/ui/axiomaim-components/pipes/find-by-key"}]},{id:"axiomaim-components.validators",title:"Validators",type:"group",children:[{id:"axiomaim-components.validators.must-match",title:"MustMatch",type:"basic",link:"/ui/axiomaim-components/validators/must-match"}]}]}ngOnInit(){this._axiomaimMediaWatcherService.onMediaChange$.pipe(te(this._unsubscribeAll)).subscribe(({matchingAliases:n})=>{n.includes("md")?(this.drawerMode="side",this.drawerOpened=!0):(this.drawerMode="over",this.drawerOpened=!1)})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}static{this.\u0275fac=function(a){return new(a||o)(x(ce))}}static{this.\u0275cmp=u({type:o,selectors:[["axiomaim-components"]],viewQuery:function(a,m){if(a&1&&H(Nt,7),a&2){let d;U(d=O())&&(m.matDrawer=d.first)}},decls:8,vars:8,consts:[["matDrawer",""],[1,"absolute","inset-0","flex","min-w-0","flex-col","overflow-hidden"],[1,"h-full","flex-auto"],[1,"flex","w-60","min-w-60","dark:bg-gray-900",3,"autoFocus","mode","opened"],[3,"navigation","inner","mode","name","opened"],["axiomaimScrollReset","",1,"flex","flex-col"],[1,"flex-auto"]],template:function(a,m){a&1&&(i(0,"div",1)(1,"mat-drawer-container",2)(2,"mat-drawer",3,0),s(4,"axiomaim-vertical-navigation",4),t(),i(5,"mat-drawer-content",5)(6,"div",6),s(7,"router-outlet"),t()()()()),a&2&&(r(2),l("autoFocus",!1)("mode",m.drawerMode)("opened",m.drawerOpened),r(2),l("navigation",m.menuData)("inner",!0)("mode","side")("name","docs-core-features-navigation")("opened",!0))},dependencies:[rt,at,ot,nt,Ze,lt,He],styles:[`axiomaim-components axiomaim-vertical-navigation .axiomaim-vertical-navigation-wrapper{box-shadow:none!important}
`],encapsulation:2})}}return o})();function Pt(o,h){o&1&&(i(0,"axiomaim-alert",28)(1,"span",29),e(2,"Primary alert"),t(),e(3," Thank you for joining our newsletter "),t(),i(4,"axiomaim-alert",28)(5,"span",29),e(6,"Accent alert"),t(),e(7," Your changes has been saved "),t(),i(8,"axiomaim-alert",28)(9,"span",29),e(10,"Warn alert"),t(),e(11," Fill all required fields to proceed next step "),t(),i(12,"axiomaim-alert",28)(13,"span",29),e(14,"Basic alert"),t(),e(15," You have 3 new notifications "),t(),i(16,"axiomaim-alert",28)(17,"span",29),e(18,"Info alert"),t(),e(19," This is a alert with an 'info' level severity "),t(),i(20,"axiomaim-alert",28)(21,"span",29),e(22,"Success alert"),t(),e(23," This is a alert with a 'success' level severity "),t(),i(24,"axiomaim-alert",28)(25,"span",29),e(26,"Warning alert"),t(),e(27," This is a alert with a 'warning' level severity "),t(),i(28,"axiomaim-alert",28)(29,"span",29),e(30,"Error alert"),t(),e(31," This is a alert with an 'error' level severity "),t()),o&2&&(l("type","primary"),r(4),l("type","accent"),r(4),l("type","warn"),r(4),l("type","basic"),r(4),l("type","info"),r(4),l("type","success"),r(4),l("type","warning"),r(4),l("type","error"))}function Bt(o,h){o&1&&(i(0,"axiomaim-alert",30)(1,"span",29),e(2,"Primary alert"),t(),e(3," Thank you for joining our newsletter "),t(),i(4,"axiomaim-alert",30)(5,"span",29),e(6,"Accent alert"),t(),e(7," Your changes has been saved "),t(),i(8,"axiomaim-alert",30)(9,"span",29),e(10,"Warn alert"),t(),e(11," Fill all required fields to proceed next step "),t(),i(12,"axiomaim-alert",30)(13,"span",29),e(14,"Basic alert"),t(),e(15," You have 3 new notifications "),t(),i(16,"axiomaim-alert",30)(17,"span",29),e(18,"Info alert"),t(),e(19," This is a alert with an 'info' level severity "),t(),i(20,"axiomaim-alert",30)(21,"span",29),e(22,"Success alert"),t(),e(23," This is a alert with a 'success' level severity "),t(),i(24,"axiomaim-alert",30)(25,"span",29),e(26,"Warning alert"),t(),e(27," This is a alert with a 'warning' level severity "),t(),i(28,"axiomaim-alert",30)(29,"span",29),e(30,"Error alert"),t(),e(31," This is a alert with an 'error' level severity "),t()),o&2&&(l("type","primary")("appearance","outline"),r(4),l("type","accent")("appearance","outline"),r(4),l("type","warn")("appearance","outline"),r(4),l("type","basic")("appearance","outline"),r(4),l("type","info")("appearance","outline"),r(4),l("type","success")("appearance","outline"),r(4),l("type","warning")("appearance","outline"),r(4),l("type","error")("appearance","outline"))}function Ut(o,h){o&1&&(i(0,"axiomaim-alert",30)(1,"span",29),e(2,"Primary alert"),t(),e(3," Thank you for joining our newsletter "),t(),i(4,"axiomaim-alert",30)(5,"span",29),e(6,"Accent alert"),t(),e(7," Your changes has been saved "),t(),i(8,"axiomaim-alert",30)(9,"span",29),e(10,"Warn alert"),t(),e(11," Fill all required fields to proceed next step "),t(),i(12,"axiomaim-alert",30)(13,"span",29),e(14,"Basic alert"),t(),e(15," You have 3 new notifications "),t(),i(16,"axiomaim-alert",30)(17,"span",29),e(18,"Info alert"),t(),e(19," This is a alert with an 'info' level severity "),t(),i(20,"axiomaim-alert",30)(21,"span",29),e(22,"Success alert"),t(),e(23," This is a alert with a 'success' level severity "),t(),i(24,"axiomaim-alert",30)(25,"span",29),e(26,"Warning alert"),t(),e(27," This is a alert with a 'warning' level severity "),t(),i(28,"axiomaim-alert",30)(29,"span",29),e(30,"Error alert"),t(),e(31," This is a alert with an 'error' level severity "),t()),o&2&&(l("type","primary")("appearance","fill"),r(4),l("type","accent")("appearance","fill"),r(4),l("type","warn")("appearance","fill"),r(4),l("type","basic")("appearance","fill"),r(4),l("type","info")("appearance","fill"),r(4),l("type","success")("appearance","fill"),r(4),l("type","warning")("appearance","fill"),r(4),l("type","error")("appearance","fill"))}function Ot(o,h){o&1&&(i(0,"axiomaim-alert",30)(1,"span",29),e(2,"Primary alert"),t(),e(3," Thank you for joining our newsletter "),t(),i(4,"axiomaim-alert",30)(5,"span",29),e(6,"Accent alert"),t(),e(7," Your changes has been saved "),t(),i(8,"axiomaim-alert",30)(9,"span",29),e(10,"Warn alert"),t(),e(11," Fill all required fields to proceed next step "),t(),i(12,"axiomaim-alert",30)(13,"span",29),e(14,"Basic alert"),t(),e(15," You have 3 new notifications "),t(),i(16,"axiomaim-alert",30)(17,"span",29),e(18,"Info alert"),t(),e(19," This is a alert with an 'info' level severity "),t(),i(20,"axiomaim-alert",30)(21,"span",29),e(22,"Success alert"),t(),e(23," This is a alert with a 'success' level severity "),t(),i(24,"axiomaim-alert",30)(25,"span",29),e(26,"Warning alert"),t(),e(27," This is a alert with a 'warning' level severity "),t(),i(28,"axiomaim-alert",30)(29,"span",29),e(30,"Error alert"),t(),e(31," This is a alert with an 'error' level severity "),t()),o&2&&(l("type","primary")("appearance","border"),r(4),l("type","accent")("appearance","border"),r(4),l("type","warn")("appearance","border"),r(4),l("type","basic")("appearance","border"),r(4),l("type","info")("appearance","border"),r(4),l("type","success")("appearance","border"),r(4),l("type","warning")("appearance","border"),r(4),l("type","error")("appearance","border"))}function Lt(o,h){o&1&&(i(0,"axiomaim-alert",31)(1,"span",29),e(2,"Alert title"),t(),e(3," This is the alert content "),t(),i(4,"axiomaim-alert",31)(5,"span",29),e(6,"Alert title without any content"),t()(),i(7,"axiomaim-alert",31),e(8," Simple alert without a title "),t()),o&2&&(l("appearance","soft")("type","info"),r(4),l("appearance","soft")("type","info"),r(3),l("appearance","soft")("type","info"))}function Ft(o,h){o&1&&(i(0,"axiomaim-alert",32),e(1," Success alert with no icon "),t()),o&2&&l("appearance","soft")("type","success")("showIcon",!1)}function Wt(o,h){o&1&&(i(0,"axiomaim-alert",31),s(1,"mat-icon",33),e(2," Info alert with a custom icon "),t()),o&2&&(l("appearance","soft")("type","info"),r(),l("svgIcon","heroicons_solid:lock-open"))}function Ht(o,h){o&1&&(i(0,"axiomaim-alert",34),e(1," Your subscription model is successfully upgraded to the "),i(2,"b"),e(3,"Lifetime Pro"),t(),e(4,". "),t(),i(5,"axiomaim-alert",34),e(6," This one has a lot of text so you can see how the text is going to be displayed. Also this is a dismissible alert box which can be dismissed by clicking the "),i(7,"b"),e(8,"dismiss"),t(),e(9," button. "),t()),o&2&&(l("appearance","soft")("dismissible",!0)("dismissed",!1)("name","alertBox1")("type","success"),r(5),l("appearance","soft")("dismissible",!0)("dismissed",!1)("name","alertBox2")("type","info"))}function jt(o,h){if(o&1){let n=M();i(0,"button",35),c("click",function(){w(n);let m=E();return m.show("alertBox3"),C(m.show("alertBox4"))}),e(1," Show alert boxes "),t(),i(2,"button",36),c("click",function(){w(n);let m=E();return m.dismiss("alertBox3"),C(m.dismiss("alertBox4"))}),e(3," Dismiss alert boxes "),t(),i(4,"axiomaim-alert",34),e(5," Your subscription model is successfully upgraded to the "),i(6,"b"),e(7,"Lifetime Pro"),t(),e(8,". "),t(),i(9,"axiomaim-alert",34),e(10," This one has a lot of text so you can see how the text is going to be displayed. Also this is a dismissible alert box which can be dismissed by clicking the "),i(11,"b"),e(12,"close"),t(),e(13," button. "),t()}o&2&&(l("color","primary"),r(2),l("color","primary"),r(2),l("appearance","soft")("dismissible",!0)("dismissed",!1)("name","alertBox3")("type","success"),r(5),l("appearance","soft")("dismissible",!0)("dismissed",!1)("name","alertBox4")("type","info"))}var dt=(()=>{class o{constructor(n,a){this._axiomaimAlertService=n,this._axiomaimComponentsComponent=a}dismiss(n){this._axiomaimAlertService.dismiss(n)}show(n){this._axiomaimAlertService.show(n)}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(it),x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["alert"]],decls:318,vars:23,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"whitespace-nowrap"],[1,"example-viewer"],[1,"title"],[3,"animationDuration"],["label","Preview",1,"bg-gray-200"],["matTabContent",""],["label","HTML"],["axiomaim-highlight","",3,"lang"],["label","Preview"],["mat-button","",3,"click","color"],["label","Typescript"],[3,"type"],["axiomaimAlertTitle",""],[3,"type","appearance"],[3,"appearance","type"],[3,"appearance","type","showIcon"],["axiomaimAlertIcon","",1,"icon-size-5",3,"svgIcon"],[3,"appearance","dismissible","dismissed","name","type"],["mat-flat-button","",1,"mr-3",3,"click","color"],["mat-flat-button","",3,"click","color"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Components"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Alert "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaim-alert"),t(),e(24," is a customizable component for displaying all kinds of alerts across your app. They can be controlled from your components as well as from the "),i(25,"code"),e(26,"AxiomaimAlertService"),t(),e(27,". "),t(),i(28,"p")(29,"strong"),e(30,"Exported as: "),t(),i(31,"code"),e(32,"axiomaimAlert"),t()(),i(33,"h2"),e(34,"Module"),t(),i(35,"textarea",14),e(36,`            import { AxiomaimAlertModule } from '@axiomaim/components/alert';
        `),t(),i(37,"h2"),e(38,"Properties"),t(),i(39,"div",15)(40,"table")(41,"thead")(42,"tr")(43,"th"),e(44,"Name"),t(),i(45,"th"),e(46,"Description"),t(),i(47,"th"),e(48,"Default"),t()()(),i(49,"tbody")(50,"tr")(51,"td",16)(52,"div"),e(53,"@Input()"),t(),i(54,"div"),e(55,"name: string"),t()(),i(56,"td"),e(57," A unique name for the alert box to access it from "),i(58,"code"),e(59,"AxiomaimAlertService"),t(),e(60,". "),t(),i(61,"td")(62,"code",17),e(63,"Auto generated"),t()()(),i(64,"tr")(65,"td",16)(66,"div"),e(67,"@Input()"),t(),i(68,"div"),e(69,"appearance: AxiomaimAlertAppearance"),t()(),i(70,"td"),e(71,"Appearance of the alert box."),t(),i(72,"td")(73,"code",17),e(74,"soft"),t()()(),i(75,"tr")(76,"td",16)(77,"div"),e(78,"@Input()"),t(),i(79,"div"),e(80,"dismissed: boolean"),t()(),i(81,"td"),e(82,"Whether the alert box is dismissed."),t(),i(83,"td")(84,"code",17),e(85,"false"),t()()(),i(86,"tr")(87,"td",16)(88,"div"),e(89,"@Input()"),t(),i(90,"div"),e(91,"dismissible: boolean"),t()(),i(92,"td"),e(93," Whether the alert box is dismissible. This must be "),i(94,"code"),e(95,"true"),t(),e(96," for "),i(97,"code"),e(98,"dismissed"),t(),e(99," to work. "),t(),i(100,"td")(101,"code",17),e(102,"false"),t()()(),i(103,"tr")(104,"td",16)(105,"div"),e(106,"@Input()"),t(),i(107,"div"),e(108,"showIcon: boolean"),t()(),i(109,"td"),e(110,"Whether the icon is shown."),t(),i(111,"td")(112,"code",17),e(113,"true"),t()()(),i(114,"tr")(115,"td",16)(116,"div"),e(117,"@Input()"),t(),i(118,"div"),e(119,"type: AxiomaimAlertType"),t()(),i(120,"td"),e(121,"The type of the alert box."),t(),i(122,"td")(123,"code",17),e(124,"primary"),t()()(),i(125,"tr")(126,"td",16)(127,"div"),e(128,"@Output()"),t(),i(129,"div"),e(130,"afterDismissed: true"),t()(),i(131,"td"),e(132,"An event emitted after the alert box dismissed."),t(),i(133,"td"),e(134,"-"),t()(),i(135,"tr")(136,"td",16)(137,"div"),e(138,"@Output()"),t(),i(139,"div"),e(140,"afterShown: true"),t()(),i(141,"td"),e(142,"An event emitted after the alert box shown."),t(),i(143,"td"),e(144,"-"),t()()()()(),i(145,"h2"),e(146,"Type aliases"),t(),i(147,"textarea",14),e(148,`            export type AxiomaimAlertAppearance =
                | 'border'
                | 'fill'
                | 'outline'
                | 'soft';
        `),t(),i(149,"textarea",14),e(150,`            export type AxiomaimAlertType =
                | 'primary'
                | 'accent'
                | 'warn'
                | 'basic'
                | 'info'
                | 'success'
                | 'warning'
                | 'error';
        `),t(),i(151,"h2"),e(152,"Appearance"),t(),i(153,"p"),e(154," Alert component comes with 3 different built-in appearances to choose from: "),t(),i(155,"div",18)(156,"div",19)(157,"h6"),e(158,"Soft (default)"),t()(),i(159,"mat-tab-group",20)(160,"mat-tab",21),g(161,Pt,32,8,"ng-template",22),t(),i(162,"mat-tab",23)(163,"textarea",24),e(164,`
                        <!-- Primary -->
                        <axiomaim-alert [type]="'primary'">
                            <span axiomaimAlertTitle>Primary alert</span>
                            Thank you for joining our newsletter
                        </axiomaim-alert>

                        <!-- Accent -->
                        <axiomaim-alert [type]="'accent'">
                            <span axiomaimAlertTitle>Accent alert</span>
                            Your changes has been saved
                        </axiomaim-alert>

                        <!-- Warn -->
                        <axiomaim-alert [type]="'warn'">
                            <span axiomaimAlertTitle>Warn alert</span>
                            Fill all required fields to proceed next step
                        </axiomaim-alert>

                        <!-- Basic -->
                        <axiomaim-alert [type]="'basic'">
                            <span axiomaimAlertTitle>Basic alert</span>
                            You have 3 new notifications
                        </axiomaim-alert>

                        <!-- Info -->
                        <axiomaim-alert [type]="'info'">
                            <span axiomaimAlertTitle>Info alert</span>
                            This is a alert with an 'info' level severity
                        </axiomaim-alert>

                        <!-- Success -->
                        <axiomaim-alert [type]="'success'">
                            <span axiomaimAlertTitle>Success alert</span>
                            This is a alert with a 'success' level severity
                        </axiomaim-alert>

                        <!-- Warning -->
                        <axiomaim-alert [type]="'warning'">
                            <span axiomaimAlertTitle>Warning alert</span>
                            This is a alert with a 'warning' level severity
                        </axiomaim-alert>

                        <!-- Error -->
                        <axiomaim-alert [type]="'error'">
                            <span axiomaimAlertTitle>Error alert</span>
                            This is a alert with an 'error' level severity
                        </axiomaim-alert>

                    `),t()()()(),i(165,"div",18)(166,"div",19)(167,"h6"),e(168,"Outline"),t()(),i(169,"mat-tab-group",20)(170,"mat-tab",25),g(171,Bt,32,16,"ng-template",22),t(),i(172,"mat-tab",23)(173,"textarea",24),e(174,`
                        <!-- Primary -->
                        <axiomaim-alert
                            [type]="'primary'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Primary alert</span>
                            Thank you for joining our newsletter
                        </axiomaim-alert>

                        <!-- Accent -->
                        <axiomaim-alert [type]="'accent'"
                                    [appearance]="'outline'">
                            <span axiomaimAlertTitle>Accent alert</span>
                            Your changes has been saved
                        </axiomaim-alert>

                        <!-- Warn -->
                        <axiomaim-alert
                            [type]="'warn'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Warn alert</span>
                            Fill all required fields to proceed next step
                        </axiomaim-alert>

                        <!-- Basic -->
                        <axiomaim-alert
                            [type]="'basic'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Basic alert</span>
                            You have 3 new notifications
                        </axiomaim-alert>

                        <!-- Info -->
                        <axiomaim-alert
                            [type]="'info'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Info alert</span>
                            This is a alert with an 'info' level severity
                        </axiomaim-alert>

                        <!-- Success -->
                        <axiomaim-alert
                            [type]="'success'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Success alert</span>
                            This is a alert with a 'success' level severity
                        </axiomaim-alert>

                        <!-- Warning -->
                        <axiomaim-alert
                            [type]="'warning'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Warning alert</span>
                            This is a alert with a 'warning' level severity
                        </axiomaim-alert>

                        <!-- Error -->
                        <axiomaim-alert
                            [type]="'error'"
                            [appearance]="'outline'">
                            <span axiomaimAlertTitle>Error alert</span>
                            This is a alert with an 'error' level severity
                        </axiomaim-alert>
                    `),t()()()(),i(175,"div",18)(176,"div",19)(177,"h6"),e(178,"Fill"),t()(),i(179,"mat-tab-group",20)(180,"mat-tab",25),g(181,Ut,32,16,"ng-template",22),t(),i(182,"mat-tab",23)(183,"textarea",24),e(184,`
                        <!-- Primary -->
                        <axiomaim-alert
                            [type]="'primary'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Primary alert</span>
                            Thank you for joining our newsletter
                        </axiomaim-alert>

                        <!-- Accent -->
                        <axiomaim-alert
                            [type]="'accent'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Accent alert</span>
                            Your changes has been saved
                        </axiomaim-alert>

                        <!-- Warn -->
                        <axiomaim-alert [type]="'warn'"
                        [appearance]="'fill'">
                        <span axiomaimAlertTitle>Warn alert</span>
                        Fill all required fields to proceed next step
                        </axiomaim-alert>

                        <!-- Basic -->
                        <axiomaim-alert
                            [type]="'basic'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Basic alert</span>
                            You have 3 new notifications
                        </axiomaim-alert>

                        <!-- Info -->
                        <axiomaim-alert
                            [type]="'info'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Info alert</span>
                            This is a alert with an 'info' level severity
                        </axiomaim-alert>

                        <!-- Success -->
                        <axiomaim-alert
                            [type]="'success'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Success alert</span>
                            This is a alert with a 'success' level severity
                        </axiomaim-alert>

                        <!-- Warning -->
                        <axiomaim-alert
                            [type]="'warning'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Warning alert</span>
                            This is a alert with a 'warning' level severity
                        </axiomaim-alert>

                        <!-- Error -->
                        <axiomaim-alert
                            [type]="'error'"
                            [appearance]="'fill'">
                            <span axiomaimAlertTitle>Error alert</span>
                            This is a alert with an 'error' level severity
                        </axiomaim-alert>
                    `),t()()()(),i(185,"div",18)(186,"div",19)(187,"h6"),e(188,"Border"),t()(),i(189,"mat-tab-group",20)(190,"mat-tab",25),g(191,Ot,32,16,"ng-template",22),t(),i(192,"mat-tab",23)(193,"textarea",24),e(194,`                        <!-- Primary -->
                        <axiomaim-alert
                            [type]="'primary'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Primary alert</span>
                            Thank you for joining our newsletter
                        </axiomaim-alert>

                        <!-- Accent -->
                        <axiomaim-alert
                            [type]="'accent'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Accent alert</span>
                            Your changes has been saved
                        </axiomaim-alert>

                        <!-- Warn -->
                        <axiomaim-alert
                            [type]="'warn'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Warn alert</span>
                            Fill all required fields to proceed next step
                        </axiomaim-alert>

                        <!-- Basic -->
                        <axiomaim-alert
                            [type]="'basic'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Basic alert</span>
                            You have 3 new notifications
                        </axiomaim-alert>

                        <!-- Info -->
                        <axiomaim-alert
                            [type]="'info'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Info alert</span>
                            This is a alert with an 'info' level severity
                        </axiomaim-alert>

                        <!-- Success -->
                        <axiomaim-alert
                            [type]="'success'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Success alert</span>
                            This is a alert with a 'success' level severity
                        </axiomaim-alert>

                        <!-- Warning -->
                        <axiomaim-alert
                            [type]="'warning'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Warning alert</span>
                            This is a alert with a 'warning' level severity
                        </axiomaim-alert>

                        <!-- Error -->
                        <axiomaim-alert
                            [type]="'error'"
                            [appearance]="'border'">
                            <span axiomaimAlertTitle>Error alert</span>
                            This is a alert with an 'error' level severity
                        </axiomaim-alert>
                    `),t()()()(),i(195,"h2"),e(196,"Title and alert"),t(),i(197,"p"),e(198," All alert boxes have "),i(199,"strong"),e(200,"title"),t(),e(201," and "),i(202,"strong"),e(203,"alert"),t(),e(204," content that can be customized. "),t(),i(205,"div",18)(206,"div",19)(207,"h6"),e(208,"Example"),t()(),i(209,"mat-tab-group",20)(210,"mat-tab",25),g(211,Lt,9,6,"ng-template",22),t(),i(212,"mat-tab",23)(213,"textarea",24),e(214,`                        <axiomaim-alert
                            [appearance]="'soft'"
                            [type]="'info'">
                            <span axiomaimAlertTitle>Alert title</span>
                            This is the alert content
                        </axiomaim-alert>

                        <axiomaim-alert
                            [appearance]="'soft'"
                            [type]="'info'">
                            <span axiomaimAlertTitle>Alert title without any content</span>
                        </axiomaim-alert>

                        <axiomaim-alert
                            [appearance]="'soft'"
                            [type]="'info'">
                            Simple alert without a title
                        </axiomaim-alert>
                    `),t()()()(),i(215,"h2"),e(216,"Icons"),t(),i(217,"p"),e(218," The "),i(219,"strong"),e(220,"info"),t(),e(221,", "),i(222,"strong"),e(223,"success"),t(),e(224,", "),i(225,"strong"),e(226,"warning"),t(),e(227," and "),i(228,"strong"),e(229,"error"),t(),e(230," type alert boxes have default icons and they are visible by default. If you wish to hide those icons, use the "),i(231,"code"),e(232,'[showIcon]="false"'),t(),e(233," input. "),t(),i(234,"div",18)(235,"div",19)(236,"h6"),e(237,"Example"),t()(),i(238,"mat-tab-group",20)(239,"mat-tab",25),g(240,Ft,2,3,"ng-template",22),t(),i(241,"mat-tab",23)(242,"textarea",24),e(243,`                        <axiomaim-alert
                            [appearance]="'soft'"
                            [type]="'success'"
                            [showIcon]="false">
                            Success alert with no icon
                        </axiomaim-alert>
                    `),t()()()(),i(244,"h2"),e(245,"Custom icons"),t(),i(246,"p"),e(247," All alert boxes come with custom icon support. To use a custom icon, simply use "),i(248,"code"),e(249,"axiomaimAlertIcon"),t(),e(250," attribute on an element you wish to use as the icon. If there is a default icon for the alert box, custom icon will override it. "),t(),i(251,"div",18)(252,"div",19)(253,"h6"),e(254,"Example"),t()(),i(255,"mat-tab-group",20)(256,"mat-tab",25),g(257,Wt,3,3,"ng-template",22),t(),i(258,"mat-tab",23)(259,"textarea",24),e(260,`                        <axiomaim-alert
                            [appearance]="'soft'"
                            [type]="'info'">
                            <mat-icon class="icon-size-5"
                                      axiomaimAlertIcon
                                      [svgIcon]="'heroicons_solid:lock-open'">
                            </mat-icon>
                            Info alert with a custom icon
                        </axiomaim-alert>
                    `),t()()()(),i(261,"h2"),e(262,"Dismissible alerts"),t(),i(263,"p"),e(264," Dismissible alerts can be removed from the view by clicking their "),i(265,"strong"),e(266,"dismiss (x)"),t(),e(267," button. In order to get the dismiss button visible, the "),i(268,"code"),e(269,"[dismissed]"),t(),e(270," input must be explicitly set either to "),i(271,"code"),e(272,"true"),t(),e(273," or "),i(274,"code"),e(275,"false"),t(),e(276,". Setting the "),i(277,"code"),e(278,"[dismissed]"),t(),e(279," input to "),i(280,"code"),e(281,"null"),t(),e(282," or simply removing it from the element will remove the "),i(283,"strong"),e(284,"dismiss"),t(),e(285," button. "),t(),i(286,"div",18)(287,"div",19)(288,"h6"),e(289,"Example"),t(),i(290,"button",26),c("click",function(){return m.show("alertBox1"),m.show("alertBox2")}),e(291," Reset "),t()(),i(292,"mat-tab-group",20)(293,"mat-tab",25),g(294,Ht,10,10,"ng-template",22),t(),i(295,"mat-tab",23)(296,"textarea",24),e(297,`                        <axiomaim-alert
                            [appearance]="'soft'"
                            [dismissible]="true"
                            [dismissed]="false"
                            [name]="'alertBox1'"
                            [type]="'success'">
                            Your subscription model is successfully upgraded to the <b>Lifetime Pro</b>.
                        </axiomaim-alert>

                        <axiomaim-alert
                            [appearance]="'soft'"
                            [dismissible]="true"
                            [dismissed]="false"
                            [name]="'alertBox2'"
                            [type]="'info'">
                            This one has a lot of text so you can see how the text is going to be displayed.
                            Also this is a dismissible alert box which can be dismissed by clicking the <b>dismiss</b> button.
                        </axiomaim-alert>
                    `),t()()()(),i(298,"h2"),e(299,"Dismissible alerts controlled from the service"),t(),i(300,"p"),e(301," Alerts can be shown and dismissed via "),i(302,"code"),e(303,"AxiomaimAlertService"),t(),e(304,". "),t(),i(305,"div",18)(306,"div",19)(307,"h6"),e(308,"Example"),t()(),i(309,"mat-tab-group",20)(310,"mat-tab",25),g(311,jt,14,12,"ng-template",22),t(),i(312,"mat-tab",23)(313,"textarea",24),e(314,`                        <button
                            class="mr-3"
                            mat-flat-button
                            [color]="'primary'"
                            (click)="show('alertBox3'); show('alertBox4')">
                            Show alert boxes
                        </button>

                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="dismiss('alertBox3'); dismiss('alertBox4')">
                            Dismiss alert boxes
                        </button>

                        <axiomaim-alert
                            [appearance]="'soft'"
                            [dismissible]="true"
                            [dismissed]="false"
                            [name]="'alertBox3'"
                            [type]="'success'">
                            Your subscription model is successfully upgraded to the <b>Lifetime Pro</b>.
                        </axiomaim-alert>

                        <axiomaim-alert
                            [appearance]="'soft'"
                            [dismissible]="true"
                            [dismissed]="false"
                            [name]="'alertBox4'"
                            [type]="'info'">
                            This one has a lot of text so you can see how the text is going to be displayed.
                            Also this is a dismissible alert box which can be dismissed by clicking the <b>close</b> button.
                        </axiomaim-alert>
                    `),t()(),i(315,"mat-tab",27)(316,"textarea",24),e(317,`
                        private _axiomaimAlertService = inject(AxiomaimAlertService);

                        /**
                         * Dismiss the alert via the service
                         *
                         * @param name
                         */
                        dismiss(name: string): void
                        {
                            this._axiomaimAlertService.dismiss(name);
                        }

                        /**
                         * Show the alert via the service
                         *
                         * @param name
                         */
                        show(name: string): void
                        {
                            this._axiomaimAlertService.show(name);
                        }

                    `),t()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(140),l("animationDuration","0ms"),r(4),l("lang","html"),r(6),l("animationDuration","0ms"),r(4),l("lang","html"),r(6),l("animationDuration","0ms"),r(4),l("lang","html"),r(6),l("animationDuration","0ms"),r(4),l("lang","html"),r(16),l("animationDuration","0ms"),r(4),l("lang","html"),r(25),l("animationDuration","0ms"),r(4),l("lang","html"),r(13),l("animationDuration","0ms"),r(4),l("lang","html"),r(31),l("color","primary"),r(2),l("animationDuration","0ms"),r(4),l("lang","html"),r(13),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","typescript"))},dependencies:[S,b,_,L,f,y,B,V,N,P,q],styles:["axiomaim-alert[_ngcontent-%COMP%]{margin:16px 0}"]})}}return o})();function zt(o,h){o&1&&(i(0,"div",29)(1,"div",30)(2,"axiomaim-card"),e(3," This content is in the card and it doesn't have any style applied to it! "),t()()())}function qt(o,h){o&1&&s(0,"mat-icon",36),o&2&&l("svgIcon","heroicons_solid:chevron-down")}function Xt(o,h){o&1&&s(0,"mat-icon",36),o&2&&l("svgIcon","heroicons_solid:chevron-up")}function Yt(o,h){if(o&1){let n=M();i(0,"div",29)(1,"div",30)(2,"axiomaim-card",31,0)(4,"div",32),e(5," Title of the card "),t(),i(6,"div",10),e(7," A paragraph, an image, a form or simply anything can go here to create the content of the card. "),t(),i(8,"div",33)(9,"button",34),c("click",function(){w(n);let m=j(3);return C(m.expanded=!m.expanded)}),i(10,"span",35),e(11,"Details"),t(),g(12,qt,1,1,"mat-icon",36)(13,Xt,1,1,"mat-icon",36),t()(),oe(14,37),i(15,"div",38),e(16," This is the expansion and holds an extra information! "),t(),re(),t()()()}if(o&2){let n=j(3);r(9),l("color","primary"),r(3),W(n.expanded?-1:12),r(),W(n.expanded?13:-1)}}function $t(o,h){if(o&1){let n=M();i(0,"div",29)(1,"div",30)(2,"axiomaim-card",39,0),oe(4,40),i(5,"div",41)(6,"div",32),e(7," Title of the card "),t(),i(8,"div",10),e(9," A paragraph, an image, a form or simply anything can go here to create the content of the card. "),t(),i(10,"div",42)(11,"button",43),c("click",function(){w(n);let m=j(3);return C(m.face="back")}),s(12,"mat-icon",36),t()()(),re(),oe(13,44),i(14,"div",45)(15,"div",46)(16,"button",43),c("click",function(){w(n);let m=j(3);return C(m.face="front")}),s(17,"mat-icon",36),t()(),i(18,"p",47),e(19," This is the back of the card and holds an extra information! "),t(),i(20,"p",47),e(21," Also, the "),i(22,"em"),e(23,"back"),t(),e(24," side of the card holds more information than the "),i(25,"em"),e(26,"front"),t(),e(27," of the card which causes scrollbars to appear. "),t()(),re(),t()()()}o&2&&(r(2),l("flippable",!0),r(9),l("color","primary"),r(),l("svgIcon","heroicons_outline:arrow-right"),r(4),l("color","primary"),r(),l("svgIcon","heroicons_outline:arrow-left"))}var ct=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["card"]],decls:140,vars:9,consts:[["axiomaimCard",""],[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"whitespace-nowrap"],[1,"bg-card","mt-4","rounded","shadow"],[1,"text-secondary","border-b","px-6","py-3","font-mono"],[1,"p-6"],[1,"example-viewer"],[1,"title"],[3,"animationDuration"],["label","Preview"],["matTabContent",""],["label","HTML"],["axiomaim-highlight","",3,"lang"],[1,"bg-gray-100","p-4"],[1,"mx-auto","max-w-80"],[1,"flex","flex-col","px-8","py-6","pb-4"],[1,"text-lg","font-bold"],[1,"-mx-3","mt-3"],["mat-button","",1,"px-3",3,"click","color"],[1,"mr-1"],[1,"icon-size-5",3,"svgIcon"],["axiomaimCardExpansion",""],[1,"my-2"],[1,"flex","flex-col",3,"flippable"],["axiomaimCardFront",""],[1,"flex","flex-col","px-8","py-6","pb-3"],[1,"-mx-3","mt-3","self-end"],["mat-icon-button","",3,"click","color"],["axiomaimCardBack",""],[1,"flex","flex-auto","flex-col","px-8","py-6","pt-3"],[1,"-mx-3","mb-2"],[1,"text-secondary"]],template:function(a,m){a&1&&(i(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div")(5,"a",5),e(6,"Documentation"),t()(),i(7,"div",6),s(8,"mat-icon",7),i(9,"a",8),e(10,"Axiomaim Components"),t()(),i(11,"div",6),s(12,"mat-icon",7),i(13,"span",9),e(14,"Components"),t()()(),i(15,"div",10)(16,"h2",11),e(17," Card "),t()()(),i(18,"button",12),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",13),t()(),i(20,"div",14)(21,"p")(22,"strong"),e(23,"axiomaim-card"),t(),e(24," is a basic card component to show any kind of information or content with features like flipping and expanding. "),t(),i(25,"p")(26,"strong"),e(27,"Exported as: "),t(),i(28,"code"),e(29,"axiomaimCard"),t()(),i(30,"h2"),e(31,"Module"),t(),i(32,"textarea",15),e(33,`            import { AxiomaimCardModule } from '@axiomaim/components/card';
        `),t(),i(34,"h2"),e(35,"Properties"),t(),i(36,"div",16)(37,"table")(38,"thead")(39,"tr")(40,"th"),e(41,"Name"),t(),i(42,"th"),e(43,"Description"),t(),i(44,"th"),e(45,"Default"),t()()(),i(46,"tbody")(47,"tr")(48,"td",17)(49,"div"),e(50,"@Input()"),t(),i(51,"div"),e(52,"flippable: boolean"),t()(),i(53,"td"),e(54,"Whether the card is flippable."),t(),i(55,"td")(56,"code",18),e(57,"false"),t()()()()()(),i(58,"h2"),e(59,"Methods"),t(),i(60,"div",19)(61,"div",20),e(62," expand(): void "),t(),i(63,"div",21),e(64,"Expands the expansion of the card."),t()(),i(65,"div",19)(66,"div",20),e(67," collapse(): void "),t(),i(68,"div",21),e(69,"Collapses the expansion of the card."),t()(),i(70,"div",19)(71,"div",20),e(72," toggleExpanded(): void "),t(),i(73,"div",21),e(74,"Toggles the expanded status of the expansion."),t()(),i(75,"div",19)(76,"div",20),e(77," flip(): void "),t(),i(78,"div",21),e(79,"Flip the card."),t()(),i(80,"h2"),e(81,"Usage"),t(),i(82,"p"),e(83," Just wrap the content or the information with "),i(84,"code"),e(85,"axiomaim-card"),t(),e(86," to show them within the card. "),i(87,"strong"),e(88,"axiomaim-card"),t(),e(89," doesn't apply any kind of style to its content to make customization simpler: "),t(),i(90,"div",22)(91,"div",23)(92,"h6"),e(93,"Example"),t()(),i(94,"mat-tab-group",24)(95,"mat-tab",25),g(96,zt,4,0,"ng-template",26),t(),i(97,"mat-tab",27)(98,"textarea",28),e(99,`                        <axiomaim-card>
                            This content is in the card and it doesn't have any style applied to it!
                        </axiomaim-card>
                    `),t()()()(),i(100,"h3"),e(101,"Expandable"),t(),i(102,"p"),e(103," Expandable "),i(104,"strong"),e(105,"axiomaim-card"),t(),e(106," holds an extra content or information hidden in its expandable area which can be toggled by accessing the component itself via a template reference: "),t(),i(107,"div",22)(108,"div",23)(109,"h6"),e(110,"Example"),t()(),i(111,"mat-tab-group",24)(112,"mat-tab",25),g(113,Yt,17,3,"ng-template",26),t(),i(114,"mat-tab",27)(115,"textarea",28),e(116,`                        <axiomaim-card
                            class="flex flex-col px-8 py-6 pb-4"
                            #axiomaimCard>
                            <div class="text-lg font-bold">Title of the card</div>
                            <div class="mt-2">
                                A paragraph, an image, a form or simply anything can go here to create the content of the card.
                            </div>
                            <div class="mt-3 -mx-3">
                                <button
                                    class="px-3"
                                    mat-button
                                    [color]="'primary'"
                                    (click)="axiomaimCard.expanded = !axiomaimCard.expanded">
                                    <span class="mr-1">Details</span>
                                    <mat-icon
                                        class="icon-size-5"
                                        *ngIf="!axiomaimCard.expanded"
                                        [svgIcon]="'heroicons_solid:chevron-down'"></mat-icon>
                                    <mat-icon
                                        class="icon-size-5"
                                        *ngIf="axiomaimCard.expanded"
                                        [svgIcon]="'heroicons_solid:chevron-up'"></mat-icon>
                                </button>
                            </div>

                            <!-- Expansion -->
                            <ng-container axiomaimCardExpansion>
                                <div class="my-2">
                                    This is the expansion and holds an extra information!
                                </div>
                            </ng-container>
                        </axiomaim-card>
                    `),t()()()(),i(117,"h3"),e(118,"Flippable"),t(),i(119,"p"),e(120," Flippable card holds content or information on both sides and can be flipped by accessing the component itself via a template reference. The only limitation with this type of cards is that the "),i(121,"em"),e(122,"back"),t(),e(123," of the card will share the same height as the "),i(124,"em"),e(125,"front"),t(),e(126," of the card. If the "),i(127,"em"),e(128,"back"),t(),e(129," side has more content, scrollbar will appear. "),t(),i(130,"div",22)(131,"div",23)(132,"h6"),e(133,"Example"),t()(),i(134,"mat-tab-group",24)(135,"mat-tab",25),g(136,$t,28,5,"ng-template",26),t(),i(137,"mat-tab",27)(138,"textarea",28),e(139,`                        <axiomaim-card
                            class="flex flex-col"
                            [flippable]="true"
                            #axiomaimCard>
                            <!-- Front -->
                            <ng-container axiomaimCardFront>
                                <div class="flex flex-col px-8 py-6 pb-3">
                                    <div class="text-lg font-bold">Title of the card</div>
                                    <div class="mt-2">
                                        A paragraph, an image, a form or simply anything can go here to create the content of the card.
                                    </div>
                                    <div class="mt-3 -mx-3 self-end">
                                        <button
                                            mat-icon-button
                                            [color]="'primary'"
                                            (click)="axiomaimCard.face = 'back'">
                                                <mat-icon
                                                    class="icon-size-5"
                                                    [svgIcon]="'heroicons_outline:arrow-right'"></mat-icon>
                                        </button>
                                    </div>
                                </div>
                            </ng-container>

                            <!-- Back -->
                            <ng-container axiomaimCardBack>
                                <div class="flex flex-col flex-auto px-8 py-6 pt-3">
                                    <div class="mb-2 -mx-3">
                                        <button
                                            mat-icon-button
                                            [color]="'primary'"
                                            (click)="axiomaimCard.face = 'front'">
                                            <mat-icon
                                                class="icon-size-5"
                                                [svgIcon]="'heroicons_outline:arrow-left'"></mat-icon>
                                        </button>
                                    </div>
                                    <p class="text-secondary">
                                        This is the back of the card and holds an extra information!
                                    </p>
                                    <p class="text-secondary">
                                        Also, the <em>back</em> side of the card holds more information than the <em>front</em> of the card
                                        which causes scrollbars to appear.
                                    </p>
                                </div>
                            </ng-container>
                        </axiomaim-card>
                    `),t()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(75),l("animationDuration","0ms"),r(4),l("lang","html"),r(13),l("animationDuration","0ms"),r(4),l("lang","html"),r(19),l("animationDuration","0ms"),r(4),l("lang","html"))},dependencies:[S,b,_,L,f,y,B,V,N,P,st],encapsulation:2})}}return o})();function Qt(o,h){if(o&1){let n=M();i(0,"button",30),c("click",function(){w(n);let m=E();return C(m.toggleDrawerMode())}),e(1," Toggle drawer mode "),t(),i(2,"button",31),c("click",function(){w(n);let m=E();return C(m.toggleDrawerOpen())}),e(3," Toggle drawer open "),t(),i(4,"div",32)(5,"axiomaim-drawer",33),c("openedChanged",function(m){w(n);let d=E();return C(d.drawerOpenedChanged(m))}),i(6,"div",34),e(7," Left drawer "),i(8,"div"),e(9),t()()(),i(10,"div",35),e(11," Some content "),t()()}if(o&2){let n=E();l("color","primary"),r(2),l("color","primary"),r(3),l("name","leftDrawer")("opened",n.drawerOpened)("mode",n.drawerMode),r(4),z("Current mode: ",n.drawerMode,"")}}var pt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n,this.drawerMode="side",this.drawerOpened=!0}toggleDrawerMode(){this.drawerMode=this.drawerMode==="side"?"over":"side"}toggleDrawerOpen(){this.drawerOpened=!this.drawerOpened}drawerOpenedChanged(n){this.drawerOpened=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["drawer"]],decls:220,vars:8,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],[3,"appearance","type"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"whitespace-nowrap"],[1,"mb-2"],[1,"text-xs","font-bold"],[1,"example-viewer"],[1,"title"],[3,"animationDuration"],["label","Preview"],["matTabContent",""],["label","HTML"],["axiomaim-highlight","",3,"lang"],["label","Typescript"],["mat-flat-button","",3,"click","color"],["mat-flat-button","",1,"ml-4",3,"click","color"],[1,"relative","mt-8","flex","min-h-80","overflow-hidden","border"],[3,"openedChanged","name","opened","mode"],[1,"p-4"],[1,"flex-auto","bg-gray-100","p-4"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Components"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Drawer "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaim-drawer"),t(),e(24," is a simple drawer component that can be programmed in various ways. The main difference between Angular Material's "),i(25,"strong"),e(26,"mat-drawer"),t(),e(27," component is that the "),i(28,"strong"),e(29,"axiomaim-drawer"),t(),e(30," can be placed anywhere on the DOM and it doesn't have to wrap the content like "),i(31,"strong"),e(32,"mat-drawer"),t(),e(33,". "),t(),i(34,"axiomaim-alert",14),e(35," Since axiomaim-drawer works with "),i(36,"em"),e(37,"absolute"),t(),e(38," positioning by default, the parent of the drawer must have "),i(39,"code"),e(40,"position: relative"),t(),e(41," and "),i(42,"code"),e(43,"overflow-x: hidden"),t(),e(44," properties otherwise the drawer won't be able to work correctly. "),t(),i(45,"p")(46,"strong"),e(47,"Exported as: "),t(),i(48,"code"),e(49,"axiomaimDrawer"),t()(),i(50,"h2"),e(51,"Module"),t(),i(52,"textarea",15),e(53,`            import { AxiomaimDrawerModule } from '@axiomaim/components/drawer';
        `),t(),i(54,"h2"),e(55,"Usage"),t(),i(56,"p"),e(57,"Here's the basic usage of the "),i(58,"code"),e(59,"axiomaim-drawer"),t(),e(60,":"),t(),i(61,"textarea",16),e(62,`            <axiomaim-drawer
                [fixed]="true"
                [mode]="isScreenSmall ? 'over' : 'side'"
                [name]="'rightDrawer'"
                [opened]="!isScreenSmall"
                [position]="'right'"
                [transparentOverlay]="false">
            </axiomaim-drawer>
        `),t(),i(63,"h2"),e(64,"Properties"),t(),i(65,"div",17)(66,"table")(67,"thead")(68,"tr")(69,"th"),e(70,"Name"),t(),i(71,"th"),e(72,"Description"),t(),i(73,"th"),e(74,"Default"),t()()(),i(75,"tbody")(76,"tr")(77,"td",18)(78,"div"),e(79,"@Input()"),t(),i(80,"div"),e(81,"fixed: boolean"),t()(),i(82,"td"),e(83," Whether the position of the drawer is "),i(84,"em"),e(85,"fixed"),t(),e(86," or "),i(87,"em"),e(88,"absolute"),t(),e(89,". "),t(),i(90,"td")(91,"code",19),e(92,"false"),t()()(),i(93,"tr")(94,"td",18)(95,"div"),e(96,"@Input()"),t(),i(97,"div"),e(98,"mode: AxiomaimDrawerMode"),t()(),i(99,"td")(100,"strong"),e(101,"over"),t(),e(102," mode can be used to place the drawer on top of the content and "),i(103,"strong"),e(104,"side"),t(),e(105," mode can be used to push the content and place the drawer next to it. "),t(),i(106,"td")(107,"code",19),e(108,"side"),t()()(),i(109,"tr")(110,"td",18)(111,"div",20)(112,"code",21),e(113,"REQUIRED"),t()(),i(114,"div"),e(115,"@Input()"),t(),i(116,"div"),e(117,"name: string"),t()(),i(118,"td"),e(119," Unique name of the drawer. Required for drawer to work correctly. "),t(),i(120,"td"),e(121,"-"),t()(),i(122,"tr")(123,"td",18)(124,"div"),e(125,"@Input()"),t(),i(126,"div"),e(127,"opened: boolean"),t()(),i(128,"td"),e(129," Whether the drawer is opened. Only works with "),i(130,"strong"),e(131,"over"),t(),e(132," mode. "),t(),i(133,"td")(134,"code",19),e(135,"false"),t()()(),i(136,"tr")(137,"td",18)(138,"div"),e(139,"@Input()"),t(),i(140,"div"),e(141,"position: AxiomaimDrawerPosition"),t()(),i(142,"td"),e(143,"Position of the drawer."),t(),i(144,"td")(145,"code",19),e(146,"left"),t()()(),i(147,"tr")(148,"td",18)(149,"div"),e(150,"@Input()"),t(),i(151,"div"),e(152,"transparentOverlay: boolean"),t()(),i(153,"td"),e(154," Whether the overlay of the drawer is transparent. Only works with "),i(155,"strong"),e(156,"over"),t(),e(157," mode. "),t(),i(158,"td")(159,"code",19),e(160,"false"),t()()(),i(161,"tr")(162,"td",18)(163,"div"),e(164,"@Output()"),t(),i(165,"div"),e(166,"modeChanged: AxiomaimNavigationMode"),t()(),i(167,"td"),e(168," An event emitted after the mode of the navigation changed. "),t(),i(169,"td"),e(170,"-"),t()(),i(171,"tr")(172,"td",18)(173,"div"),e(174,"@Output()"),t(),i(175,"div"),e(176,"openedChanged: boolean"),t()(),i(177,"td"),e(178," An event emitted after the opened status of the drawer changed. "),t(),i(179,"td"),e(180,"-"),t()(),i(181,"tr")(182,"td",18)(183,"div"),e(184,"@Output()"),t(),i(185,"div"),e(186,"positionChanged: AxiomaimNavigationPosition"),t()(),i(187,"td"),e(188," An event emitted after the position of the drawer changed. "),t(),i(189,"td"),e(190,"-"),t()()()()(),i(191,"h2"),e(192,"Type aliases"),t(),i(193,"textarea",15),e(194,`            export type AxiomaimDrawerMode =
                | 'over'
                | 'side';
        `),t(),i(195,"textarea",15),e(196,`            export type AxiomaimDrawerPosition =
                | 'left'
                | 'right';
        `),t(),i(197,"h2"),e(198,"Service"),t(),i(199,"p"),e(200," The "),i(201,"code"),e(202,"AxiomaimDrawerService"),t(),e(203," can be used to remotely accessing to drawers using their "),i(204,"strong"),e(205,"name"),t(),e(206," properties to control them: "),t(),i(207,"div",22)(208,"div",23)(209,"h6"),e(210,"Example"),t()(),i(211,"mat-tab-group",24)(212,"mat-tab",25),g(213,Qt,12,6,"ng-template",26),t(),i(214,"mat-tab",27)(215,"textarea",28),e(216,`                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="toggleDrawerMode();">
                                Toggle drawer mode
                        </button>

                        <button
                            class="ml-4"
                            mat-flat-button
                            [color]="'primary'"
                            (click)="toggleDrawerOpen();">
                            Toggle drawer open
                        </button>

                        <div class="relative flex overflow-hidden border mt-8 min-h-80">
                            <axiomaim-drawer
                                [name]="'leftDrawer'"
                                [opened]="drawerOpened"
                                [mode]="drawerMode">
                                <div class="p-4">
                                    Left drawer
                                </div>
                            </axiomaim-drawer>

                            <div class="flex-auto bg-gray-100 p-4">
                                Some content
                            </div>

                            <!-- Right drawer must be positioned after the content

                                <axiomaim-drawer
                                    [name]="'leftDrawer'"
                                    [opened]="true"
                                    [position]="'right'"
                                    [mode]="'side'">
                                    <div class="p-4">
                                        Right drawer
                                    </div>
                                </axiomaim-drawer>

                            -->
                        </div>
                    `),t()(),i(217,"mat-tab",29)(218,"textarea",28),e(219,`
                        // Set the defaults
                        this.drawerMode = 'side';
                        this.drawerOpened = true;

                        /**
                         * Toggle the drawer mode
                         */
                        toggleDrawerMode(): void
                        {
                            this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
                        }

                        /**
                         * Toggle the drawer open
                         */
                        toggleDrawerOpen(): void
                        {
                            this.drawerOpened = !this.drawerOpened;
                        }

                        /**
                         * Drawer opened changed
                         *
                         * @param opened
                         */
                        drawerOpenedChanged(opened: boolean): void
                        {
                            this.drawerOpened = opened;
                        }

                    `),t()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(15),l("appearance","border")("type","info"),r(177),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","typescript"))},dependencies:[S,b,_,L,f,q,y,B,V,N,P,Ge],encapsulation:2})}}return o})();var ht=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["fullscreen"]],decls:80,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Components"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Fullscreen "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaim-fullscreen"),t(),e(24," is a small component that toggles the fullscreen on and off. "),t(),i(25,"p")(26,"strong"),e(27,"Exported as: "),t(),i(28,"code"),e(29,"axiomaimFullscreen"),t()(),i(30,"h2"),e(31,"Module"),t(),i(32,"textarea",14),e(33,`            import { AxiomaimFullscreenModule } from '@axiomaim/components/fullscreen';
        `),t(),i(34,"h2"),e(35,"Usage"),t(),i(36,"p"),e(37,"Here's the basic usage of the "),i(38,"code"),e(39,"axiomaim-fullscreen"),t(),e(40,":"),t(),i(41,"textarea",15),e(42,"            <"),e(43,"axiomaim-fullscreen>"),e(44,"<"),e(45,"/axiomaim-fullscreen>"),e(46,`
        `),t(),i(47,"h2"),e(48,"Properties"),t(),i(49,"div",16)(50,"table")(51,"thead")(52,"tr")(53,"th"),e(54,"Name"),t(),i(55,"th"),e(56,"Description"),t(),i(57,"th"),e(58,"Default"),t()()(),i(59,"tbody")(60,"tr")(61,"td",17)(62,"div"),e(63,"@Input()"),t(),i(64,"div"),e(65,"iconTpl: TemplateRef<any>"),t()(),i(66,"td"),e(67,"Template reference for the icon."),t(),i(68,"td"),e(69,"-"),t()(),i(70,"tr")(71,"td",17)(72,"div"),e(73,"@Input()"),t(),i(74,"div"),e(75,"tooltip: string"),t()(),i(76,"td"),e(77,"Tooltip of the toggle button."),t(),i(78,"td"),e(79,"'Toggle Fullscreen'"),t()()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var xt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["highlight"]],decls:117,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],["href","https://highlightjs.org/usage/","rel","noreferrer","target","_blank"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Components"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Highlight "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaim-highlight"),t(),e(24," is a syntax highlighter component to display syntax highlighted codes within the content. Internally, it uses "),i(25,"em"),e(26,"highlight.js"),t(),e(27,". "),t(),i(28,"p")(29,"strong"),e(30,"Exported as: "),t(),i(31,"code"),e(32,"axiomaimHighlight"),t()(),i(33,"h2"),e(34,"Module"),t(),i(35,"textarea",14),e(36,`            import { AxiomaimHighlightModule } from '@axiomaim/components/highlight';
        `),t(),i(37,"h2"),e(38,"Usage"),t(),i(39,"p"),e(40,"Here's the basic usage of the "),i(41,"code"),e(42,"axiomaim-highlight"),t(),e(43,":"),t(),i(44,"textarea",15),e(45,"            <"),e(46,`textarea axiomaim-highlight
                      lang="html">`),e(47,`
                <`),e(48,"div>"),e(49,"Some HTML code to highlight<"),e(50,"/div>"),e(51,`
            <`),e(52,"/textarea>"),e(53,`
        `),t(),i(54,"p")(55,"code"),e(56,"axiomaim-highlight"),t(),e(57," doesn't have its own selector and cannot be used like any other components. It must be used with a "),i(58,"code"),e(59,"<textarea>"),t(),e(60,". "),t(),i(61,"p"),e(62," The main reason of this is that the Angular parses the templates before binding and running components. Because of this mechanic, anything you place into templates will be taken as a literal content and parsed by Angular. Only the contents of a "),i(63,"code"),e(64,"<textarea>"),t(),e(65," can be preserved as is. "),t(),i(66,"h2"),e(67,"Properties"),t(),i(68,"div",16)(69,"table")(70,"thead")(71,"tr")(72,"th"),e(73,"Name"),t(),i(74,"th"),e(75,"Description"),t(),i(76,"th"),e(77,"Default"),t()()(),i(78,"tbody")(79,"tr")(80,"td",17)(81,"div"),e(82,"@Input()"),t(),i(83,"div"),e(84,"code: string"),t()(),i(85,"td"),e(86," Piece of code to highlight. If "),i(87,"strong"),e(88,"code"),t(),e(89," input is not provided, the actual content of the "),i(90,"strong"),e(91,"textarea"),t(),e(92," will be used. "),t(),i(93,"td"),e(94,"-"),t()(),i(95,"tr")(96,"td",17)(97,"div"),e(98,"@Input()"),t(),i(99,"div"),e(100,"lang: string"),t()(),i(101,"td"),e(102," Which language to highlight the code. See: "),i(103,"a",18),e(104,"https://highlightjs.org/usage/ "),t(),e(105," for full list of supported languages. "),t(),i(106,"td"),e(107,"-"),t()()()()(),i(108,"h2"),e(109,"Service"),t(),i(110,"p"),e(111," The "),i(112,"code"),e(113,"AxiomaimHighlightService"),t(),e(114," can also be used to format and highlight code: "),t(),i(115,"textarea",14),e(116,`            private _axiomaimHighlightService = inject(AxiomaimHighlightService);

            code = '<div> Some code to highlight </div>'
            highlightedCode = this._axiomaimHighlightService.highlight(code, 'html');
        `),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var Gt=["knob"],Kt=["valueIndicatorContainer"];function Zt(o,h){if(o&1&&(i(0,"div",2,1)(2,"div",5)(3,"span",6),e(4),t()()()),o&2){let n=E();r(4),le(n.valueIndicatorText)}}var Jt=["trackActive"],ei=["*"];function ti(o,h){if(o&1&&s(0,"div"),o&2){let n=h.$implicit,a=h.$index,m=E(3);xe(n===0?"mdc-slider__tick-mark--active":"mdc-slider__tick-mark--inactive"),Re("transform",m._calcTickMarkTransform(a))}}function ii(o,h){if(o&1&&Y(0,ti,1,4,"div",8,Ne),o&2){let n=E(2);$(n._tickMarks)}}function ni(o,h){if(o&1&&(i(0,"div",6,1),g(2,ii,2,0),t()),o&2){let n=E();r(2),W(n._cachedWidth?2:-1)}}function ai(o,h){if(o&1&&s(0,"mat-slider-visual-thumb",7),o&2){let n=E();l("discrete",n.discrete)("thumbPosition",1)("valueIndicatorText",n.startValueIndicatorText)}}var p=function(o){return o[o.START=1]="START",o[o.END=2]="END",o}(p||{}),K=function(o){return o[o.ACTIVE=0]="ACTIVE",o[o.INACTIVE=1]="INACTIVE",o}(K||{}),be=new Z("_MatSlider"),ut=new Z("_MatSliderThumb"),oi=new Z("_MatSliderRangeThumb"),gt=new Z("_MatSliderVisualThumb");var ri=(()=>{class o{_cdr=T(se);_ngZone=T(ne);_slider=T(be);_renderer=T(pe);_listenerCleanups;discrete;thumbPosition;valueIndicatorText;_ripple;_knob;_valueIndicatorContainer;_sliderInput;_sliderInputEl;_hoverRippleRef;_focusRippleRef;_activeRippleRef;_isHovered=!1;_isActive=!1;_isValueIndicatorVisible=!1;_hostElement=T(ae).nativeElement;_platform=T(de);constructor(){}ngAfterViewInit(){let n=this._slider._getInput(this.thumbPosition);n&&(this._ripple.radius=24,this._sliderInput=n,this._sliderInputEl=this._sliderInput._hostElement,this._ngZone.runOutsideAngular(()=>{let a=this._sliderInputEl,m=this._renderer;this._listenerCleanups=[m.listen(a,"pointermove",this._onPointerMove),m.listen(a,"pointerdown",this._onDragStart),m.listen(a,"pointerup",this._onDragEnd),m.listen(a,"pointerleave",this._onMouseLeave),m.listen(a,"focus",this._onFocus),m.listen(a,"blur",this._onBlur)]}))}ngOnDestroy(){this._listenerCleanups?.forEach(n=>n())}_onPointerMove=n=>{if(this._sliderInput._isFocused)return;let a=this._hostElement.getBoundingClientRect(),m=this._slider._isCursorOnSliderThumb(n,a);this._isHovered=m,m?this._showHoverRipple():this._hideRipple(this._hoverRippleRef)};_onMouseLeave=()=>{this._isHovered=!1,this._hideRipple(this._hoverRippleRef)};_onFocus=()=>{this._hideRipple(this._hoverRippleRef),this._showFocusRipple(),this._hostElement.classList.add("mdc-slider__thumb--focused")};_onBlur=()=>{this._isActive||this._hideRipple(this._focusRippleRef),this._isHovered&&this._showHoverRipple(),this._hostElement.classList.remove("mdc-slider__thumb--focused")};_onDragStart=n=>{n.button===0&&(this._isActive=!0,this._showActiveRipple())};_onDragEnd=()=>{this._isActive=!1,this._hideRipple(this._activeRippleRef),this._sliderInput._isFocused||this._hideRipple(this._focusRippleRef),this._platform.SAFARI&&this._showHoverRipple()};_showHoverRipple(){this._isShowingRipple(this._hoverRippleRef)||(this._hoverRippleRef=this._showRipple({enterDuration:0,exitDuration:0}),this._hoverRippleRef?.element.classList.add("mat-mdc-slider-hover-ripple"))}_showFocusRipple(){this._isShowingRipple(this._focusRippleRef)||(this._focusRippleRef=this._showRipple({enterDuration:0,exitDuration:0},!0),this._focusRippleRef?.element.classList.add("mat-mdc-slider-focus-ripple"))}_showActiveRipple(){this._isShowingRipple(this._activeRippleRef)||(this._activeRippleRef=this._showRipple({enterDuration:225,exitDuration:400}),this._activeRippleRef?.element.classList.add("mat-mdc-slider-active-ripple"))}_isShowingRipple(n){return n?.state===fe.FADING_IN||n?.state===fe.VISIBLE}_showRipple(n,a){if(!this._slider.disabled&&(this._showValueIndicator(),this._slider._isRange&&this._slider._getThumb(this.thumbPosition===p.START?p.END:p.START)._showValueIndicator(),!(this._slider._globalRippleOptions?.disabled&&!a)))return this._ripple.launch({animation:this._slider._noopAnimations?{enterDuration:0,exitDuration:0}:n,centered:!0,persistent:!0})}_hideRipple(n){if(n?.fadeOut(),this._isShowingAnyRipple())return;this._slider._isRange||this._hideValueIndicator();let a=this._getSibling();a._isShowingAnyRipple()||(this._hideValueIndicator(),a._hideValueIndicator())}_showValueIndicator(){this._hostElement.classList.add("mdc-slider__thumb--with-indicator")}_hideValueIndicator(){this._hostElement.classList.remove("mdc-slider__thumb--with-indicator")}_getSibling(){return this._slider._getThumb(this.thumbPosition===p.START?p.END:p.START)}_getValueIndicatorContainer(){return this._valueIndicatorContainer?.nativeElement}_getKnob(){return this._knob.nativeElement}_isShowingAnyRipple(){return this._isShowingRipple(this._hoverRippleRef)||this._isShowingRipple(this._focusRippleRef)||this._isShowingRipple(this._activeRippleRef)}static \u0275fac=function(a){return new(a||o)};static \u0275cmp=u({type:o,selectors:[["mat-slider-visual-thumb"]],viewQuery:function(a,m){if(a&1&&(H(_e,5),H(Gt,5),H(Kt,5)),a&2){let d;U(d=O())&&(m._ripple=d.first),U(d=O())&&(m._knob=d.first),U(d=O())&&(m._valueIndicatorContainer=d.first)}},hostAttrs:[1,"mdc-slider__thumb","mat-mdc-slider-visual-thumb"],inputs:{discrete:"discrete",thumbPosition:"thumbPosition",valueIndicatorText:"valueIndicatorText"},features:[me([{provide:gt,useExisting:o}])],decls:4,vars:2,consts:[["knob",""],["valueIndicatorContainer",""],[1,"mdc-slider__value-indicator-container"],[1,"mdc-slider__thumb-knob"],["matRipple","",1,"mat-focus-indicator",3,"matRippleDisabled"],[1,"mdc-slider__value-indicator"],[1,"mdc-slider__value-indicator-text"]],template:function(a,m){a&1&&(g(0,Zt,5,1,"div",2),s(1,"div",3,0)(3,"div",4)),a&2&&(W(m.discrete?0:-1),r(3),l("matRippleDisabled",!0))},dependencies:[_e],styles:[".mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}.mat-mdc-slider .mdc-slider__tick-marks{justify-content:start}.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--inactive{position:absolute;left:2px}"],encapsulation:2,changeDetection:0})}return o})(),vt=(()=>{class o{_ngZone=T(ne);_cdr=T(se);_elementRef=T(ae);_dir=T(ze,{optional:!0});_globalRippleOptions=T(Ye,{optional:!0});_trackActive;_thumbs;_input;_inputs;get disabled(){return this._disabled}set disabled(n){this._disabled=n;let a=this._getInput(p.END),m=this._getInput(p.START);a&&(a.disabled=this._disabled),m&&(m.disabled=this._disabled)}_disabled=!1;get discrete(){return this._discrete}set discrete(n){this._discrete=n,this._updateValueIndicatorUIs()}_discrete=!1;showTickMarks=!1;get min(){return this._min}set min(n){let a=isNaN(n)?this._min:n;this._min!==a&&this._updateMin(a)}_min=0;color;disableRipple=!1;_updateMin(n){let a=this._min;this._min=n,this._isRange?this._updateMinRange({old:a,new:n}):this._updateMinNonRange(n),this._onMinMaxOrStepChange()}_updateMinRange(n){let a=this._getInput(p.END),m=this._getInput(p.START),d=a.value,k=m.value;m.min=n.new,a.min=Math.max(n.new,m.value),m.max=Math.min(a.max,a.value),m._updateWidthInactive(),a._updateWidthInactive(),n.new<n.old?this._onTranslateXChangeBySideEffect(a,m):this._onTranslateXChangeBySideEffect(m,a),d!==a.value&&this._onValueChange(a),k!==m.value&&this._onValueChange(m)}_updateMinNonRange(n){let a=this._getInput(p.END);if(a){let m=a.value;a.min=n,a._updateThumbUIByValue(),this._updateTrackUI(a),m!==a.value&&this._onValueChange(a)}}get max(){return this._max}set max(n){let a=isNaN(n)?this._max:n;this._max!==a&&this._updateMax(a)}_max=100;_updateMax(n){let a=this._max;this._max=n,this._isRange?this._updateMaxRange({old:a,new:n}):this._updateMaxNonRange(n),this._onMinMaxOrStepChange()}_updateMaxRange(n){let a=this._getInput(p.END),m=this._getInput(p.START),d=a.value,k=m.value;a.max=n.new,m.max=Math.min(n.new,a.value),a.min=m.value,a._updateWidthInactive(),m._updateWidthInactive(),n.new>n.old?this._onTranslateXChangeBySideEffect(m,a):this._onTranslateXChangeBySideEffect(a,m),d!==a.value&&this._onValueChange(a),k!==m.value&&this._onValueChange(m)}_updateMaxNonRange(n){let a=this._getInput(p.END);if(a){let m=a.value;a.max=n,a._updateThumbUIByValue(),this._updateTrackUI(a),m!==a.value&&this._onValueChange(a)}}get step(){return this._step}set step(n){let a=isNaN(n)?this._step:n;this._step!==a&&this._updateStep(a)}_step=1;_updateStep(n){this._step=n,this._isRange?this._updateStepRange():this._updateStepNonRange(),this._onMinMaxOrStepChange()}_updateStepRange(){let n=this._getInput(p.END),a=this._getInput(p.START),m=n.value,d=a.value,k=a.value;n.min=this._min,a.max=this._max,n.step=this._step,a.step=this._step,this._platform.SAFARI&&(n.value=n.value,a.value=a.value),n.min=Math.max(this._min,a.value),a.max=Math.min(this._max,n.value),a._updateWidthInactive(),n._updateWidthInactive(),n.value<k?this._onTranslateXChangeBySideEffect(a,n):this._onTranslateXChangeBySideEffect(n,a),m!==n.value&&this._onValueChange(n),d!==a.value&&this._onValueChange(a)}_updateStepNonRange(){let n=this._getInput(p.END);if(n){let a=n.value;n.step=this._step,this._platform.SAFARI&&(n.value=n.value),n._updateThumbUIByValue(),a!==n.value&&this._onValueChange(n)}}displayWith=n=>`${n}`;_tickMarks;_noopAnimations;_dirChangeSubscription;_resizeObserver;_cachedWidth;_cachedLeft;_rippleRadius=24;startValueIndicatorText="";endValueIndicatorText="";_endThumbTransform;_startThumbTransform;_isRange=!1;_isRtl=!1;_hasViewInitialized=!1;_tickMarkTrackWidth=0;_hasAnimation=!1;_resizeTimer=null;_platform=T(de);constructor(){T(je).load(Xe);let n=T(Te,{optional:!0});this._noopAnimations=n==="NoopAnimations",this._dir&&(this._dirChangeSubscription=this._dir.change.subscribe(()=>this._onDirChange()),this._isRtl=this._dir.value==="rtl")}_knobRadius=8;_inputPadding;ngAfterViewInit(){this._platform.isBrowser&&this._updateDimensions();let n=this._getInput(p.END),a=this._getInput(p.START);this._isRange=!!n&&!!a,this._cdr.detectChanges();let m=this._getThumb(p.END);this._rippleRadius=m._ripple.radius,this._inputPadding=this._rippleRadius-this._knobRadius,this._isRange?this._initUIRange(n,a):this._initUINonRange(n),this._updateTrackUI(n),this._updateTickMarkUI(),this._updateTickMarkTrackUI(),this._observeHostResize(),this._cdr.detectChanges()}_initUINonRange(n){n.initProps(),n.initUI(),this._updateValueIndicatorUI(n),this._hasViewInitialized=!0,n._updateThumbUIByValue()}_initUIRange(n,a){n.initProps(),n.initUI(),a.initProps(),a.initUI(),n._updateMinMax(),a._updateMinMax(),n._updateStaticStyles(),a._updateStaticStyles(),this._updateValueIndicatorUIs(),this._hasViewInitialized=!0,n._updateThumbUIByValue(),a._updateThumbUIByValue()}ngOnDestroy(){this._dirChangeSubscription.unsubscribe(),this._resizeObserver?.disconnect(),this._resizeObserver=null}_onDirChange(){this._isRtl=this._dir?.value==="rtl",this._isRange?this._onDirChangeRange():this._onDirChangeNonRange(),this._updateTickMarkUI()}_onDirChangeRange(){let n=this._getInput(p.END),a=this._getInput(p.START);n._setIsLeftThumb(),a._setIsLeftThumb(),n.translateX=n._calcTranslateXByValue(),a.translateX=a._calcTranslateXByValue(),n._updateStaticStyles(),a._updateStaticStyles(),n._updateWidthInactive(),a._updateWidthInactive(),n._updateThumbUIByValue(),a._updateThumbUIByValue()}_onDirChangeNonRange(){this._getInput(p.END)._updateThumbUIByValue()}_observeHostResize(){typeof ResizeObserver>"u"||!ResizeObserver||this._ngZone.runOutsideAngular(()=>{this._resizeObserver=new ResizeObserver(()=>{this._isActive()||(this._resizeTimer&&clearTimeout(this._resizeTimer),this._onResize())}),this._resizeObserver.observe(this._elementRef.nativeElement)})}_isActive(){return this._getThumb(p.START)._isActive||this._getThumb(p.END)._isActive}_getValue(n=p.END){let a=this._getInput(n);return a?a.value:this.min}_skipUpdate(){return!!(this._getInput(p.START)?._skipUIUpdate||this._getInput(p.END)?._skipUIUpdate)}_updateDimensions(){this._cachedWidth=this._elementRef.nativeElement.offsetWidth,this._cachedLeft=this._elementRef.nativeElement.getBoundingClientRect().left}_setTrackActiveStyles(n){let a=this._trackActive.nativeElement.style;a.left=n.left,a.right=n.right,a.transformOrigin=n.transformOrigin,a.transform=n.transform}_calcTickMarkTransform(n){return`translateX(${n*(this._tickMarkTrackWidth/(this._tickMarks.length-1))}px`}_onTranslateXChange(n){this._hasViewInitialized&&(this._updateThumbUI(n),this._updateTrackUI(n),this._updateOverlappingThumbUI(n))}_onTranslateXChangeBySideEffect(n,a){this._hasViewInitialized&&(n._updateThumbUIByValue(),a._updateThumbUIByValue())}_onValueChange(n){this._hasViewInitialized&&(this._updateValueIndicatorUI(n),this._updateTickMarkUI(),this._cdr.detectChanges())}_onMinMaxOrStepChange(){this._hasViewInitialized&&(this._updateTickMarkUI(),this._updateTickMarkTrackUI(),this._cdr.markForCheck())}_onResize(){if(this._hasViewInitialized){if(this._updateDimensions(),this._isRange){let n=this._getInput(p.END),a=this._getInput(p.START);n._updateThumbUIByValue(),a._updateThumbUIByValue(),n._updateStaticStyles(),a._updateStaticStyles(),n._updateMinMax(),a._updateMinMax(),n._updateWidthInactive(),a._updateWidthInactive()}else{let n=this._getInput(p.END);n&&n._updateThumbUIByValue()}this._updateTickMarkUI(),this._updateTickMarkTrackUI(),this._cdr.detectChanges()}}_thumbsOverlap=!1;_areThumbsOverlapping(){let n=this._getInput(p.START),a=this._getInput(p.END);return!n||!a?!1:a.translateX-n.translateX<20}_updateOverlappingThumbClassNames(n){let a=n.getSibling(),m=this._getThumb(n.thumbPosition);this._getThumb(a.thumbPosition)._hostElement.classList.remove("mdc-slider__thumb--top"),m._hostElement.classList.toggle("mdc-slider__thumb--top",this._thumbsOverlap)}_updateOverlappingThumbUI(n){!this._isRange||this._skipUpdate()||this._thumbsOverlap!==this._areThumbsOverlapping()&&(this._thumbsOverlap=!this._thumbsOverlap,this._updateOverlappingThumbClassNames(n))}_updateThumbUI(n){if(this._skipUpdate())return;let a=this._getThumb(n.thumbPosition===p.END?p.END:p.START);a._hostElement.style.transform=`translateX(${n.translateX}px)`}_updateValueIndicatorUI(n){if(this._skipUpdate())return;let a=this.displayWith(n.value);if(this._hasViewInitialized?n._valuetext.set(a):n._hostElement.setAttribute("aria-valuetext",a),this.discrete){n.thumbPosition===p.START?this.startValueIndicatorText=a:this.endValueIndicatorText=a;let m=this._getThumb(n.thumbPosition);a.length<3?m._hostElement.classList.add("mdc-slider__thumb--short-value"):m._hostElement.classList.remove("mdc-slider__thumb--short-value")}}_updateValueIndicatorUIs(){let n=this._getInput(p.END),a=this._getInput(p.START);n&&this._updateValueIndicatorUI(n),a&&this._updateValueIndicatorUI(a)}_updateTickMarkTrackUI(){if(!this.showTickMarks||this._skipUpdate())return;let n=this._step&&this._step>0?this._step:1,m=(Math.floor(this.max/n)*n-this.min)/(this.max-this.min);this._tickMarkTrackWidth=this._cachedWidth*m-6}_updateTrackUI(n){this._skipUpdate()||(this._isRange?this._updateTrackUIRange(n):this._updateTrackUINonRange(n))}_updateTrackUIRange(n){let a=n.getSibling();if(!a||!this._cachedWidth)return;let m=Math.abs(a.translateX-n.translateX)/this._cachedWidth;n._isLeftThumb&&this._cachedWidth?this._setTrackActiveStyles({left:"auto",right:`${this._cachedWidth-a.translateX}px`,transformOrigin:"right",transform:`scaleX(${m})`}):this._setTrackActiveStyles({left:`${a.translateX}px`,right:"auto",transformOrigin:"left",transform:`scaleX(${m})`})}_updateTrackUINonRange(n){this._isRtl?this._setTrackActiveStyles({left:"auto",right:"0px",transformOrigin:"right",transform:`scaleX(${1-n.fillPercentage})`}):this._setTrackActiveStyles({left:"0px",right:"auto",transformOrigin:"left",transform:`scaleX(${n.fillPercentage})`})}_updateTickMarkUI(){if(!this.showTickMarks||this.step===void 0||this.min===void 0||this.max===void 0)return;let n=this.step>0?this.step:1;this._isRange?this._updateTickMarkUIRange(n):this._updateTickMarkUINonRange(n),this._isRtl&&this._tickMarks.reverse()}_updateTickMarkUINonRange(n){let a=this._getValue(),m=Math.max(Math.round((a-this.min)/n),0),d=Math.max(Math.round((this.max-a)/n),0);this._isRtl?m++:d++,this._tickMarks=Array(m).fill(K.ACTIVE).concat(Array(d).fill(K.INACTIVE))}_updateTickMarkUIRange(n){let a=this._getValue(),m=this._getValue(p.START),d=Math.max(Math.round((m-this.min)/n),0),k=Math.max(Math.round((a-m)/n)+1,0),X=Math.max(Math.round((this.max-a)/n),0);this._tickMarks=Array(d).fill(K.INACTIVE).concat(Array(k).fill(K.ACTIVE),Array(X).fill(K.INACTIVE))}_getInput(n){if(n===p.END&&this._input)return this._input;if(this._inputs?.length)return n===p.START?this._inputs.first:this._inputs.last}_getThumb(n){return n===p.END?this._thumbs?.last:this._thumbs?.first}_setTransition(n){this._hasAnimation=!this._platform.IOS&&n&&!this._noopAnimations,this._elementRef.nativeElement.classList.toggle("mat-mdc-slider-with-animation",this._hasAnimation)}_isCursorOnSliderThumb(n,a){let m=a.width/2,d=a.x+m,k=a.y+m,X=n.clientX-d,ye=n.clientY-k;return Math.pow(X,2)+Math.pow(ye,2)<Math.pow(m,2)}static \u0275fac=function(a){return new(a||o)};static \u0275cmp=u({type:o,selectors:[["mat-slider"]],contentQueries:function(a,m,d){if(a&1&&(ue(d,ut,5),ue(d,oi,4)),a&2){let k;U(k=O())&&(m._input=k.first),U(k=O())&&(m._inputs=k)}},viewQuery:function(a,m){if(a&1&&(H(Jt,5),H(gt,5)),a&2){let d;U(d=O())&&(m._trackActive=d.first),U(d=O())&&(m._thumbs=d)}},hostAttrs:[1,"mat-mdc-slider","mdc-slider"],hostVars:12,hostBindings:function(a,m){a&2&&(xe("mat-"+(m.color||"primary")),Ve("mdc-slider--range",m._isRange)("mdc-slider--disabled",m.disabled)("mdc-slider--discrete",m.discrete)("mdc-slider--tick-marks",m.showTickMarks)("_mat-animation-noopable",m._noopAnimations))},inputs:{disabled:[2,"disabled","disabled",G],discrete:[2,"discrete","discrete",G],showTickMarks:[2,"showTickMarks","showTickMarks",G],min:[2,"min","min",F],color:"color",disableRipple:[2,"disableRipple","disableRipple",G],max:[2,"max","max",F],step:[2,"step","step",F],displayWith:"displayWith"},exportAs:["matSlider"],features:[me([{provide:be,useExisting:o}]),he],ngContentSelectors:ei,decls:9,vars:5,consts:[["trackActive",""],["tickMarkContainer",""],[1,"mdc-slider__track"],[1,"mdc-slider__track--inactive"],[1,"mdc-slider__track--active"],[1,"mdc-slider__track--active_fill"],[1,"mdc-slider__tick-marks"],[3,"discrete","thumbPosition","valueIndicatorText"],[3,"class","transform"]],template:function(a,m){a&1&&(Pe(),Be(0),i(1,"div",2),s(2,"div",3),i(3,"div",4),s(4,"div",5,0),t(),g(6,ni,3,1,"div",6),t(),g(7,ai,1,3,"mat-slider-visual-thumb",7),s(8,"mat-slider-visual-thumb",7)),a&2&&(r(6),W(m.showTickMarks?6:-1),r(),W(m._isRange?7:-1),r(),l("discrete",m.discrete)("thumbPosition",2)("valueIndicatorText",m.endValueIndicatorText))},dependencies:[ri],styles:['.mdc-slider__track{position:absolute;top:50%;transform:translateY(-50%);width:100%;pointer-events:none;height:var(--mdc-slider-inactive-track-height, 4px)}.mdc-slider__track--active,.mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider__track--active{overflow:hidden;border-radius:var(--mdc-slider-active-track-shape, var(--mat-sys-corner-full));height:var(--mdc-slider-active-track-height, 4px);top:calc((var(--mdc-slider-inactive-track-height, 4px) - var(--mdc-slider-active-track-height, 4px))/2)}.mdc-slider__track--active_fill{border-top-style:solid;box-sizing:border-box;height:100%;width:100%;position:relative;transform-origin:left;transition:transform 80ms ease;border-color:var(--mdc-slider-active-track-color, var(--mat-sys-primary));border-top-width:var(--mdc-slider-active-track-height, 4px)}.mdc-slider--disabled .mdc-slider__track--active_fill{border-color:var(--mdc-slider-disabled-active-track-color, var(--mat-sys-on-surface))}[dir=rtl] .mdc-slider__track--active_fill{-webkit-transform-origin:right;transform-origin:right}.mdc-slider__track--inactive{left:0;top:0;opacity:.24;background-color:var(--mdc-slider-inactive-track-color, var(--mat-sys-surface-variant));height:var(--mdc-slider-inactive-track-height, 4px);border-radius:var(--mdc-slider-inactive-track-shape, var(--mat-sys-corner-full))}.mdc-slider--disabled .mdc-slider__track--inactive{background-color:var(--mdc-slider-disabled-inactive-track-color, var(--mat-sys-on-surface));opacity:.24}.mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media(forced-colors: active){.mdc-slider__track--inactive::before{border-color:CanvasText}}.mdc-slider__value-indicator-container{bottom:44px;left:50%;pointer-events:none;position:absolute;transform:translateX(-50%);transform:var(--mat-slider-value-indicator-container-transform, translateX(-50%) rotate(-45deg))}.mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider__value-indicator{display:flex;align-items:center;border-radius:4px;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom;opacity:1;transition:transform 100ms cubic-bezier(0.4, 0, 1, 1);word-break:normal;background-color:var(--mdc-slider-label-container-color, var(--mat-sys-primary));color:var(--mdc-slider-label-label-text-color, var(--mat-sys-on-primary));width:var(--mat-slider-value-indicator-width, 28px);height:var(--mat-slider-value-indicator-height, 28px);padding:var(--mat-slider-value-indicator-padding, 0);opacity:var(--mat-slider-value-indicator-opacity, 1);border-radius:var(--mat-slider-value-indicator-border-radius, 50% 50% 50% 0)}.mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}.mdc-slider__value-indicator::before{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:6px solid;bottom:-5px;content:"";height:0;left:50%;position:absolute;transform:translateX(-50%);width:0;display:var(--mat-slider-value-indicator-caret-display, none);border-top-color:var(--mdc-slider-label-container-color, var(--mat-sys-primary))}.mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media(forced-colors: active){.mdc-slider__value-indicator::after{border-color:CanvasText}}.mdc-slider__value-indicator-text{text-align:center;width:var(--mat-slider-value-indicator-width, 28px);transform:var(--mat-slider-value-indicator-text-transform, rotate(45deg));font-family:var(--mdc-slider-label-label-text-font, var(--mat-sys-label-medium-font));font-size:var(--mdc-slider-label-label-text-size, var(--mat-sys-label-medium-size));font-weight:var(--mdc-slider-label-label-text-weight, var(--mat-sys-label-medium-weight));line-height:var(--mdc-slider-label-label-text-line-height, var(--mat-sys-label-medium-line-height));letter-spacing:var(--mdc-slider-label-label-text-tracking, var(--mat-sys-label-medium-tracking))}.mdc-slider__thumb{-webkit-user-select:none;user-select:none;display:flex;left:-24px;outline:none;position:absolute;height:48px;width:48px;pointer-events:none}.mdc-slider--discrete .mdc-slider__thumb{transition:transform 80ms ease}.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider__thumb--top{z-index:1}.mdc-slider__thumb-knob{position:absolute;box-sizing:border-box;left:50%;top:50%;transform:translate(-50%, -50%);border-style:solid;width:var(--mdc-slider-handle-width, 20px);height:var(--mdc-slider-handle-height, 20px);border-width:calc(var(--mdc-slider-handle-height, 20px)/2) calc(var(--mdc-slider-handle-width, 20px)/2);box-shadow:var(--mdc-slider-handle-elevation, var(--mat-sys-level1));background-color:var(--mdc-slider-handle-color, var(--mat-sys-primary));border-color:var(--mdc-slider-handle-color, var(--mat-sys-primary));border-radius:var(--mdc-slider-handle-shape, var(--mat-sys-corner-full))}.mdc-slider__thumb:hover .mdc-slider__thumb-knob{background-color:var(--mdc-slider-hover-handle-color, var(--mat-sys-primary));border-color:var(--mdc-slider-hover-handle-color, var(--mat-sys-primary))}.mdc-slider__thumb--focused .mdc-slider__thumb-knob{background-color:var(--mdc-slider-focus-handle-color, var(--mat-sys-primary));border-color:var(--mdc-slider-focus-handle-color, var(--mat-sys-primary))}.mdc-slider--disabled .mdc-slider__thumb-knob{background-color:var(--mdc-slider-disabled-handle-color, var(--mat-sys-on-surface));border-color:var(--mdc-slider-disabled-handle-color, var(--mat-sys-on-surface))}.mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border:solid 1px #fff;box-sizing:content-box;border-color:var(--mdc-slider-with-overlap-handle-outline-color, var(--mat-sys-on-primary));border-width:var(--mdc-slider-with-overlap-handle-outline-width, 1px)}.mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider__tick-mark--active,.mdc-slider__tick-mark--inactive{width:var(--mdc-slider-with-tick-marks-container-size, 2px);height:var(--mdc-slider-with-tick-marks-container-size, 2px);border-radius:var(--mdc-slider-with-tick-marks-container-shape, var(--mat-sys-corner-full))}.mdc-slider__tick-mark--inactive{opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity, 0.38);background-color:var(--mdc-slider-with-tick-marks-inactive-container-color, var(--mat-sys-on-surface-variant))}.mdc-slider--disabled .mdc-slider__tick-mark--inactive{opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity, 0.38);background-color:var(--mdc-slider-with-tick-marks-disabled-container-color, var(--mat-sys-on-surface))}.mdc-slider__tick-mark--active{opacity:var(--mdc-slider-with-tick-marks-active-container-opacity, 0.38);background-color:var(--mdc-slider-with-tick-marks-active-container-color, var(--mat-sys-on-primary))}.mdc-slider__input{cursor:pointer;left:2px;margin:0;height:44px;opacity:0;position:absolute;top:2px;width:44px;box-sizing:content-box}.mdc-slider__input.mat-mdc-slider-input-no-pointer-events{pointer-events:none}.mdc-slider__input.mat-slider__right-input{left:auto;right:0}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;cursor:pointer;height:48px;margin:0 8px;position:relative;touch-action:pan-y;width:auto;min-width:112px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-slider.mdc-slider--disabled{cursor:auto;opacity:.38}.mat-mdc-slider .mdc-slider__thumb,.mat-mdc-slider .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider.mdc-slider--discrete .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider .mat-ripple .mat-ripple-element{background-color:var(--mat-slider-ripple-color, var(--mat-sys-primary))}.mat-mdc-slider .mat-ripple .mat-mdc-slider-hover-ripple{background-color:var(--mat-slider-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-primary) 5%, transparent))}.mat-mdc-slider .mat-ripple .mat-mdc-slider-focus-ripple,.mat-mdc-slider .mat-ripple .mat-mdc-slider-active-ripple{background-color:var(--mat-slider-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-primary) 20%, transparent))}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}.mat-mdc-slider .mat-focus-indicator::before{border-radius:50%}.mdc-slider__thumb--focused .mat-focus-indicator::before{content:""}'],encapsulation:2,changeDetection:0})}return o})();var li={provide:Je,useExisting:Ce(()=>Se),multi:!0};var Se=(()=>{class o{_ngZone=T(ne);_elementRef=T(ae);_cdr=T(se);_slider=T(be);_platform=T(de);_listenerCleanups;get value(){return F(this._hostElement.value,0)}set value(n){n=isNaN(n)?0:n;let a=n+"";if(!this._hasSetInitialValue){this._initialValue=a;return}this._isActive||this._setValue(a)}_setValue(n){this._hostElement.value=n,this._updateThumbUIByValue(),this._slider._onValueChange(this),this._cdr.detectChanges(),this._slider._cdr.markForCheck()}valueChange=new ie;dragStart=new ie;dragEnd=new ie;get translateX(){return this._slider.min>=this._slider.max?(this._translateX=this._tickMarkOffset,this._translateX):(this._translateX===void 0&&(this._translateX=this._calcTranslateXByValue()),this._translateX)}set translateX(n){this._translateX=n}_translateX;thumbPosition=p.END;get min(){return F(this._hostElement.min,0)}set min(n){this._hostElement.min=n+"",this._cdr.detectChanges()}get max(){return F(this._hostElement.max,0)}set max(n){this._hostElement.max=n+"",this._cdr.detectChanges()}get step(){return F(this._hostElement.step,0)}set step(n){this._hostElement.step=n+"",this._cdr.detectChanges()}get disabled(){return G(this._hostElement.disabled)}set disabled(n){this._hostElement.disabled=n,this._cdr.detectChanges(),this._slider.disabled!==this.disabled&&(this._slider.disabled=this.disabled)}get percentage(){return this._slider.min>=this._slider.max?this._slider._isRtl?1:0:(this.value-this._slider.min)/(this._slider.max-this._slider.min)}get fillPercentage(){return this._slider._cachedWidth?this._translateX===0?0:this.translateX/this._slider._cachedWidth:this._slider._isRtl?1:0}_hostElement=this._elementRef.nativeElement;_valuetext=Ie("");_knobRadius=8;_tickMarkOffset=3;_isActive=!1;_isFocused=!1;_setIsFocused(n){this._isFocused=n}_hasSetInitialValue=!1;_initialValue;_formControl;_destroyed=new Q;_skipUIUpdate=!1;_onChangeFn;_onTouchedFn=()=>{};_isControlInitialized=!1;constructor(){let n=T(pe);this._ngZone.runOutsideAngular(()=>{this._listenerCleanups=[n.listen(this._hostElement,"pointerdown",this._onPointerDown.bind(this)),n.listen(this._hostElement,"pointermove",this._onPointerMove.bind(this)),n.listen(this._hostElement,"pointerup",this._onPointerUp.bind(this))]})}ngOnDestroy(){this._listenerCleanups.forEach(n=>n()),this._destroyed.next(),this._destroyed.complete(),this.dragStart.complete(),this.dragEnd.complete()}initProps(){this._updateWidthInactive(),this.disabled!==this._slider.disabled&&(this._slider.disabled=!0),this.step=this._slider.step,this.min=this._slider.min,this.max=this._slider.max,this._initValue()}initUI(){this._updateThumbUIByValue()}_initValue(){this._hasSetInitialValue=!0,this._initialValue===void 0?this.value=this._getDefaultValue():(this._hostElement.value=this._initialValue,this._updateThumbUIByValue(),this._slider._onValueChange(this),this._cdr.detectChanges())}_getDefaultValue(){return this.min}_onBlur(){this._setIsFocused(!1),this._onTouchedFn()}_onFocus(){this._slider._setTransition(!1),this._slider._updateTrackUI(this),this._setIsFocused(!0)}_onChange(){this.valueChange.emit(this.value),this._isActive&&this._updateThumbUIByValue({withAnimation:!0})}_onInput(){this._onChangeFn?.(this.value),(this._slider.step||!this._isActive)&&this._updateThumbUIByValue({withAnimation:!0}),this._slider._onValueChange(this)}_onNgControlValueChange(){(!this._isActive||!this._isFocused)&&(this._slider._onValueChange(this),this._updateThumbUIByValue()),this._slider.disabled=this._formControl.disabled}_onPointerDown(n){if(!(this.disabled||n.button!==0)){if(this._platform.IOS){let a=this._slider._isCursorOnSliderThumb(n,this._slider._getThumb(this.thumbPosition)._hostElement.getBoundingClientRect());this._isActive=a,this._updateWidthActive(),this._slider._updateDimensions();return}this._isActive=!0,this._setIsFocused(!0),this._updateWidthActive(),this._slider._updateDimensions(),this._slider.step||this._updateThumbUIByPointerEvent(n,{withAnimation:!0}),this.disabled||(this._handleValueCorrection(n),this.dragStart.emit({source:this,parent:this._slider,value:this.value}))}}_handleValueCorrection(n){this._skipUIUpdate=!0,setTimeout(()=>{this._skipUIUpdate=!1,this._fixValue(n)},0)}_fixValue(n){let a=n.clientX-this._slider._cachedLeft,m=this._slider._cachedWidth,d=this._slider.step===0?1:this._slider.step,k=Math.floor((this._slider.max-this._slider.min)/d),X=this._slider._isRtl?1-a/m:a/m,Dt=Math.round(X*k)/k*(this._slider.max-this._slider.min)+this._slider.min,Ee=Math.round(Dt/d)*d,Rt=this.value;if(Ee===Rt){this._slider._onValueChange(this),this._slider.step>0?this._updateThumbUIByValue():this._updateThumbUIByPointerEvent(n,{withAnimation:this._slider._hasAnimation});return}this.value=Ee,this.valueChange.emit(this.value),this._onChangeFn?.(this.value),this._slider._onValueChange(this),this._slider.step>0?this._updateThumbUIByValue():this._updateThumbUIByPointerEvent(n,{withAnimation:this._slider._hasAnimation})}_onPointerMove(n){!this._slider.step&&this._isActive&&this._updateThumbUIByPointerEvent(n)}_onPointerUp(){this._isActive&&(this._isActive=!1,this._platform.SAFARI&&this._setIsFocused(!1),this.dragEnd.emit({source:this,parent:this._slider,value:this.value}),setTimeout(()=>this._updateWidthInactive(),this._platform.IOS?10:0))}_clamp(n){let a=this._tickMarkOffset,m=this._slider._cachedWidth-this._tickMarkOffset;return Math.max(Math.min(n,m),a)}_calcTranslateXByValue(){return this._slider._isRtl?(1-this.percentage)*(this._slider._cachedWidth-this._tickMarkOffset*2)+this._tickMarkOffset:this.percentage*(this._slider._cachedWidth-this._tickMarkOffset*2)+this._tickMarkOffset}_calcTranslateXByPointerEvent(n){return n.clientX-this._slider._cachedLeft}_updateWidthActive(){}_updateWidthInactive(){this._hostElement.style.padding=`0 ${this._slider._inputPadding}px`,this._hostElement.style.width=`calc(100% + ${this._slider._inputPadding-this._tickMarkOffset*2}px)`,this._hostElement.style.left=`-${this._slider._rippleRadius-this._tickMarkOffset}px`}_updateThumbUIByValue(n){this.translateX=this._clamp(this._calcTranslateXByValue()),this._updateThumbUI(n)}_updateThumbUIByPointerEvent(n,a){this.translateX=this._clamp(this._calcTranslateXByPointerEvent(n)),this._updateThumbUI(a)}_updateThumbUI(n){this._slider._setTransition(!!n?.withAnimation),this._slider._onTranslateXChange(this)}writeValue(n){(this._isControlInitialized||n!==null)&&(this.value=n)}registerOnChange(n){this._onChangeFn=n,this._isControlInitialized=!0}registerOnTouched(n){this._onTouchedFn=n}setDisabledState(n){this.disabled=n}focus(){this._hostElement.focus()}blur(){this._hostElement.blur()}static \u0275fac=function(a){return new(a||o)};static \u0275dir=Me({type:o,selectors:[["input","matSliderThumb",""]],hostAttrs:["type","range",1,"mdc-slider__input"],hostVars:1,hostBindings:function(a,m){a&1&&c("change",function(){return m._onChange()})("input",function(){return m._onInput()})("blur",function(){return m._onBlur()})("focus",function(){return m._onFocus()}),a&2&&De("aria-valuetext",m._valuetext())},inputs:{value:[2,"value","value",F]},outputs:{valueChange:"valueChange",dragStart:"dragStart",dragEnd:"dragEnd"},exportAs:["matSliderThumb"],features:[me([li,{provide:ut,useExisting:o}]),he]})}return o})();var ft=(()=>{class o{static \u0275fac=function(a){return new(a||o)};static \u0275mod=Ae({type:o});static \u0275inj=ke({imports:[qe,$e]})}return o})();function si(o,h){if(o&1){let n=M();i(0,"div",29)(1,"div",30)(2,"button",31),c("click",function(){w(n);let m=E();return C(m.showLoadingBar())}),e(3," Show loading bar "),t(),i(4,"button",31),c("click",function(){w(n);let m=E();return C(m.hideLoadingBar())}),e(5," Hide loading bar "),t()()()}o&2&&(r(2),l("color","primary"),r(2),l("color","primary"))}function di(o,h){if(o&1){let n=M();i(0,"div",29)(1,"div",32)(2,"mat-slide-toggle",33),c("change",function(m){w(n);let d=E();return C(d.setAutoMode(m))}),e(3," Auto Mode "),t(),s(4,"div",34),i(5,"button",31),c("click",function(){w(n);let m=E();return C(m.makeAPICall())}),e(6," Make an API call (2000ms delay) "),t(),i(7,"div",9),e(8),t()()()}if(o&2){let n=E();r(2),l("checked",!0)("color","primary"),r(3),l("color","primary"),r(3),z(" API call status: ",n.apiCallStatus," ")}}function ci(o,h){if(o&1){let n=M();i(0,"div",29)(1,"div",35)(2,"div",36)(3,"button",31),c("click",function(){w(n);let m=E();return C(m.showLoadingBar())}),e(4," Show loading bar "),t(),i(5,"button",31),c("click",function(){w(n);let m=E();return C(m.hideLoadingBar())}),e(6," Hide loading bar "),t()(),i(7,"mat-slide-toggle",33),c("change",function(){w(n);let m=E();return C(m.toggleMode())}),e(8," Toggle determinate mode "),t(),i(9,"div"),e(10," Progress value "),i(11,"mat-slider",37)(12,"input",38),Fe("valueChange",function(m){w(n);let d=E();return Le(d.sliderValue,m)||(d.sliderValue=m),C(m)}),c("valueChange",function(){w(n);let m=E();return C(m.setProgress())}),t()()()()()}if(o&2){let n=E();r(3),l("color","primary"),r(2),l("color","primary"),r(2),l("checked",!1)("color","primary"),r(4),l("color","primary"),r(),Oe("value",n.sliderValue)}}var _t=(()=>{class o{constructor(n,a,m){this._httpClient=n,this._axiomaimComponentsComponent=a,this._axiomaimLoadingService=m,this.apiCallStatus="-",this.mode="indeterminate",this.sliderValue=0}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}showLoadingBar(){this._axiomaimLoadingService.show()}hideLoadingBar(){this._axiomaimLoadingService.hide()}setAutoMode(n){this._axiomaimLoadingService.setAutoMode(n.checked)}makeAPICall(){this.apiCallStatus="Waiting...",this._httpClient.get("https://jsonplaceholder.typicode.com/posts?_delay=2000").pipe(we(()=>{this.apiCallStatus="Finished!"})).subscribe(n=>{console.log(n)})}toggleMode(){this._axiomaimLoadingService.show(),this.mode=this.mode==="indeterminate"?"determinate":"indeterminate",this._axiomaimLoadingService.setMode(this.mode)}setProgress(){this._axiomaimLoadingService.setProgress(this.sliderValue)}static{this.\u0275fac=function(a){return new(a||o)(x(We),x(v),x(Qe))}}static{this.\u0275cmp=u({type:o,selectors:[["loading-bar"]],decls:152,vars:13,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"bg-card","mt-4","rounded","shadow"],[1,"text-secondary","border-b","px-6","py-3","font-mono"],[1,"p-6"],[1,"example-viewer"],[1,"title"],[3,"animationDuration"],["label","Preview"],["matTabContent",""],["label","HTML"],["axiomaim-highlight","",3,"lang"],["label","Typescript"],[1,"bg-gray-100","p-4"],[1,"mx-auto","flex","max-w-80","space-x-4"],["mat-flat-button","",3,"click","color"],[1,"mx-auto","flex","max-w-80","flex-col","items-center"],[3,"change","checked","color"],[1,"mb-6","w-24","border-b","pt-6"],[1,"mx-auto","flex","max-w-80","flex-col","items-center","space-y-8"],[1,"flex","items-center","space-x-4"],[3,"color"],["matSliderThumb","",3,"valueChange","value"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Components"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Loading Bar "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaim-loading-bar"),t(),e(24," is a small component to show the loading status at the top of the page. It can be configured to the "),i(25,"strong"),e(26,"Auto Mode"),t(),e(27," to show/hide automatically on each HTTP request. It can also be toggled manually using its service. "),t(),i(28,"p")(29,"strong"),e(30,"Exported as: "),t(),i(31,"code"),e(32,"axiomaimLoadingBar"),t()(),i(33,"h2"),e(34,"Module"),t(),i(35,"textarea",14),e(36,`            import { AxiomaimLoadingBarModule } from '@axiomaim/components/loading-bar';
        `),t(),i(37,"h2"),e(38,"Usage"),t(),i(39,"p"),e(40," Here's the basic usage of the "),i(41,"code"),e(42,"axiomaim-loading-bar"),t(),e(43,". We already placed the component to the layout templates for you but you can always move it! "),t(),i(44,"textarea",15),e(45,"            <"),e(46,"axiomaim-loading-bar>"),e(47,"<"),e(48,"/axiomaim-loading-bar>"),e(49,`
        `),t(),i(50,"h2"),e(51,"Properties"),t(),i(52,"div",16)(53,"table")(54,"thead")(55,"tr")(56,"th"),e(57,"Name"),t(),i(58,"th"),e(59,"Description"),t(),i(60,"th"),e(61,"Default"),t()()(),i(62,"tbody")(63,"tr")(64,"td",17)(65,"div"),e(66,"@Input()"),t(),i(67,"div"),e(68,"autoMode: boolean"),t()(),i(69,"td"),e(70,"Turn on or off the Auto Mode."),t(),i(71,"td")(72,"code"),e(73,"true"),t()()()()()(),i(74,"h2"),e(75,"Service"),t(),i(76,"p")(77,"code"),e(78,"AxiomaimLoadingService"),t(),e(79," can be injected to control the loading bar from anywhere. "),t(),i(80,"div",18)(81,"div",19),e(82," show(): void; "),t(),i(83,"div",20),e(84,"Shows the loading bar"),t()(),i(85,"div",18)(86,"div",19),e(87," hide(): void; "),t(),i(88,"div",20),e(89,"Hides the loading bar"),t()(),i(90,"div",18)(91,"div",19),e(92," setAutoMode(value: boolean): void; "),t(),i(93,"div",20),e(94," Sets the Auto Mode. In Auto mode, loading bar will show when there is an HTTP request and it will hide when all HTTP requests are completed or failed. "),t()(),i(95,"div",18)(96,"div",19),e(97," setMode(value: 'determinate' | 'indeterminate'): void; "),t(),i(98,"div",20),e(99," Sets the mode of the underlying "),i(100,"code"),e(101,"MatProgressBar"),t(),e(102," component. "),t()(),i(103,"div",18)(104,"div",19),e(105," setProgress(value: number): void; "),t(),i(106,"div",20),e(107," Sets the progress manually. Only available on "),i(108,"code"),e(109,"determinate"),t(),e(110," mode. "),t()(),i(111,"h2"),e(112,"Examples"),t(),i(113,"div",21)(114,"div",22)(115,"h6"),e(116,"Show / hide the loading bar manually"),t()(),i(117,"mat-tab-group",23)(118,"mat-tab",24),g(119,si,6,2,"ng-template",25),t(),i(120,"mat-tab",26)(121,"textarea",27),e(122,`                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="showLoadingBar()">
                            Show loading bar
                        </button>

                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="hideLoadingBar()">
                            Hide loading bar
                        </button>
                    `),t()(),i(123,"mat-tab",28)(124,"textarea",27),e(125,`                        private _axiomaimLoadingService = inject(AxiomaimLoadingService);

                        ...

                        /**
                         * Show the loading bar
                         */
                        showLoadingBar(): void
                        {
                            this._axiomaimLoadingService.show();
                        }

                        /**
                         * Hide the loading bar
                         */
                        hideLoadingBar(): void
                        {
                            this._axiomaimLoadingService.hide();
                        }
                    `),t()()()(),i(126,"div",21)(127,"div",22)(128,"h6"),e(129,"Toggle the Auto Mode"),t()(),i(130,"mat-tab-group",23)(131,"mat-tab",24),g(132,di,9,4,"ng-template",25),t(),i(133,"mat-tab",26)(134,"textarea",27),e(135),t()(),i(136,"mat-tab",28)(137,"textarea",27),e(138,`                        private _httpClient = inject(HttpClient);
                        private _axiomaimLoadingService = inject(AxiomaimLoadingService);

                        apiCallStatus: string = '-';

                        ...

                        /**
                         * Set the auto mode
                         *
                         * @param change
                         */
                        setAutoMode(change: MatSlideToggleChange): void
                        {
                            this._axiomaimLoadingService.setAutoMode(change.checked);
                        }

                        /**
                         * Make a fake API call
                         */
                        makeAPICall(): void
                        {
                            this.apiCallStatus = 'Waiting...';

                            this._httpClient.get('https://jsonplaceholder.typicode.com/posts?_delay=2000')
                                .pipe(finalize(() => { this.apiCallStatus = 'Finished!'; }))
                                .subscribe((response) => {
                                    console.log(response);
                                });
                        }
                    `),t()()()(),i(139,"div",21)(140,"div",22)(141,"h6"),e(142,"Manually set the progress"),t()(),i(143,"mat-tab-group",23)(144,"mat-tab",24),g(145,ci,13,6,"ng-template",25),t(),i(146,"mat-tab",26)(147,"textarea",27),e(148,`                        <mat-slide-toggle
                            [checked]="false"
                            [color]="'primary'"
                            (change)="toggleMode()">
                            Toggle determinate mode
                        </mat-slide-toggle>

                        <mat-slider
                            [color]="'primary'"
                            (change)="setProgress($event)">
                            Progress value
                        </mat-slider>
                    `),t()(),i(149,"mat-tab",28)(150,"textarea",27),e(151,`                        private _axiomaimLoadingService = inject(AxiomaimLoadingService);

                        mode: 'determinate' | 'indeterminate' = 'indeterminate';

                        ...

                        /**
                         * Toggle the mode
                         */
                        toggleMode(): void
                        {
                            // Show the loading bar
                            this._axiomaimLoadingService.show();

                            // Turn off the auto mode
                            this._axiomaimLoadingService.setAutoMode(false);

                            // Set the mode
                            this.mode = this.mode === 'indeterminate' ? 'determinate' : 'indeterminate';
                            this._axiomaimLoadingService.setMode(this.mode);
                        }

                        /**
                         * Set the progress
                         *
                         * @param change
                         */
                        setProgress(change: MatSliderChange): void
                        {
                            this._axiomaimLoadingService.setProgress(change.value);
                        }
                    `),t()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(98),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","ts"),r(6),l("animationDuration","0ms"),r(4),l("lang","html"),r(),z(`                        <mat-slide-toggle
                            [checked]="true"
                            [color]="'primary'"
                            (change)="setAutoMode($event)">
                            Auto Mode
                        </mat-slide-toggle>

                        <div class="w-24 pt-6 mb-6 border-b"></div>

                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="makeAPICall()">
                            Make an API call (2000ms delay)
                        </button>

                        <div class="mt-2">API call status: `,m.apiCallStatus,`</div>
                    `),r(2),l("lang","ts"),r(6),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","ts"))},dependencies:[S,b,_,L,f,y,B,V,N,P,tt,et,ft,vt,Se],encapsulation:2})}}return o})();var pi=()=>[1,2,3,4,5,6,7,8,9,10],hi=()=>[1,2,3,4,5,6,7,8,9,10,11,12];function xi(o,h){if(o&1&&(i(0,"div",32),e(1),t()),o&2){let n=h.$implicit;r(),z(" ",n," ")}}function ui(o,h){if(o&1&&(i(0,"div",31),Y(1,xi,2,1,"div",32,J),t()),o&2){let n=h.$implicit;r(),$(n.items)}}function gi(o,h){if(o&1&&Y(0,ui,3,0,"div",31,J),o&2){let n=h.$implicit;$(n)}}function vi(o,h){if(o&1&&(i(0,"div",28)(1,"div",29),s(2,"axiomaim-masonry",30),g(3,gi,2,0,"ng-template",null,0,ve),t()()),o&2){let n=j(4);r(2),l("items",ge(3,pi))("columns",4)("columnsTemplate",n)}}function fi(o,h){if(o&1&&(i(0,"div",32),e(1),t()),o&2){let n=h.$implicit;r(),z(" ",n," ")}}function _i(o,h){if(o&1&&(i(0,"div",31),Y(1,fi,2,1,"div",32,J),t()),o&2){let n=h.$implicit;r(),$(n.items)}}function bi(o,h){if(o&1&&Y(0,_i,3,0,"div",31,J),o&2){let n=h.$implicit;$(n)}}function Si(o,h){if(o&1&&(i(0,"div",28)(1,"div",29),s(2,"axiomaim-masonry",30),g(3,bi,2,0,"ng-template",null,1,ve),t()()),o&2){let n=j(4),a=E();r(2),l("items",ge(3,hi))("columns",a.columns)("columnsTemplate",n)}}var bt=(()=>{class o{constructor(n,a){this._axiomaimComponentsComponent=n,this._axiomaimMediaWatcherService=a,this.columns=4,this._unsubscribeAll=new Q}ngOnInit(){this._axiomaimMediaWatcherService.onMediaChange$.pipe(te(this._unsubscribeAll)).subscribe(({matchingAliases:n})=>{n.includes("xl")?this.columns=5:n.includes("lg")?this.columns=4:n.includes("md")?this.columns=3:n.includes("sm")?this.columns=2:this.columns=1})}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v),x(ce))}}static{this.\u0275cmp=u({type:o,selectors:[["masonry"]],decls:135,vars:8,consts:[["columnsTemplate",""],["columnsTemplate2",""],[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"whitespace-nowrap"],[1,"example-viewer"],[1,"title"],[3,"animationDuration"],["label","Preview"],["matTabContent",""],["label","HTML"],["axiomaim-highlight","",3,"lang"],["label","TypeScript"],[1,"bg-gray-100","p-4"],[1,"mx-auto","max-w-80"],[1,"-mx-2",3,"items","columns","columnsTemplate"],[1,"mx-2","flex-1","space-y-2","rounded","border","p-2"],[1,"rounded","bg-primary","p-2","text-center","text-on-primary"]],template:function(a,m){a&1&&(i(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div")(5,"a",6),e(6,"Documentation"),t()(),i(7,"div",7),s(8,"mat-icon",8),i(9,"a",9),e(10,"Axiomaim Components"),t()(),i(11,"div",7),s(12,"mat-icon",8),i(13,"span",10),e(14,"Components"),t()()(),i(15,"div",11)(16,"h2",12),e(17," Masonry "),t()()(),i(18,"button",13),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",14),t()(),i(20,"div",15)(21,"p")(22,"strong"),e(23,"axiomaim-masonry"),t(),e(24," is a basic Masonry layout component to show items in Masonry grid layout. Since it doesn't use any other third party library or complex calculations to keep everything smooth and fast; "),t(),i(25,"ul")(26,"li"),e(27,"It does NOT work with elements with different widths"),t(),i(28,"li"),e(29," It does NOT sort items based on their heights (This here is the real performance killer) "),t()(),i(30,"p"),e(31," If you don't need to mix and match different width items and don't need to sort items based on their heights, "),i(32,"strong"),e(33,"axiomaim-masonry"),t(),e(34," will do the job for you and it will do it very smoothly. "),t(),i(35,"p")(36,"strong"),e(37,"Exported as: "),t(),i(38,"code"),e(39,"axiomaimMasonry"),t()(),i(40,"h2"),e(41,"Module"),t(),i(42,"textarea",16),e(43,`            import { AxiomaimMasonry } from '@axiomaim/components/masonry';
        `),t(),i(44,"h2"),e(45,"Properties"),t(),i(46,"div",17)(47,"table")(48,"thead")(49,"tr")(50,"th"),e(51,"Name"),t(),i(52,"th"),e(53,"Description"),t(),i(54,"th"),e(55,"Default"),t()()(),i(56,"tbody")(57,"tr")(58,"td",18)(59,"div"),e(60,"@Input()"),t(),i(61,"div"),e(62,"columnsTemplate: TemplateRef"),t()(),i(63,"td"),e(64," Column template for masonry component to lay out. "),t(),i(65,"td")(66,"code",19),e(67,"undefined"),t()()(),i(68,"tr")(69,"td",18)(70,"div"),e(71,"@Input()"),t(),i(72,"div"),e(73,"columns: number"),t()(),i(74,"td"),e(75,"Number of columns to create"),t(),i(76,"td")(77,"code",19),e(78,"undefined"),t()()(),i(79,"tr")(80,"td",18)(81,"div"),e(82,"@Input()"),t(),i(83,"div"),e(84,"items: any[]"),t()(),i(85,"td"),e(86,"Items to distribute into columns"),t(),i(87,"td")(88,"code",19),e(89,"[]"),t()()()()()(),i(90,"h2"),e(91,"Methods"),t(),i(92,"p"),e(93,"This component doesn't have any public methods."),t(),i(94,"h2"),e(95,"Usage"),t(),i(96,"p")(97,"strong"),e(98,"axiomaim-masonry"),t(),e(99," doesn't provide a default template or styling to the items. You can think of it as a helper function but in a component form: "),t(),i(100,"div",20)(101,"div",21)(102,"h6"),e(103,"Example"),t()(),i(104,"mat-tab-group",22)(105,"mat-tab",23),g(106,vi,5,4,"ng-template",24),t(),i(107,"mat-tab",25)(108,"textarea",26),e(109,`                        <axiomaim-masonry
                            class="-mx-2"
                            [items]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                            [columns]="4"
                            [columnsTemplate]="columnsTemplate">
                        </axiomaim-masonry>

                        <ng-template
                            #columnsTemplate
                            let-columns>
                            <ng-container *ngFor="let column of columns">
                                <!-- Column -->
                                <div class="flex-1 mx-2 p-2 border rounded space-y-2">
                                    <ng-container *ngFor="let item of column.items">
                                        <!-- Item -->
                                        <div class="p-2 text-center rounded bg-primary text-on-primary">
                                            ITEM CONTENT
                                        </div>
                                    </ng-container>
                                </div>
                            </ng-container>
                        </ng-template>
                    `),t()()()(),i(110,"h3"),e(111,"Responsive"),t(),i(112,"p")(113,"strong"),e(114,"axiomaim-masonry"),t(),e(115," doesn't provide a way of changing the column count depending on breakpoints but this can easily be handled by combining "),i(116,"code"),e(117,"axiomaim-masonry"),t(),e(118," with "),i(119,"code"),e(120,"AxiomaimMediaWatcherService"),t(),e(121,": "),t(),i(122,"div",20)(123,"div",21)(124,"h6"),e(125,"Example"),t()(),i(126,"mat-tab-group",22)(127,"mat-tab",23),g(128,Si,5,4,"ng-template",24),t(),i(129,"mat-tab",25)(130,"textarea",26),e(131,`                        <axiomaim-masonry
                            class="-mx-2"
                            [items]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                            [columns]="columns"
                            [columnsTemplate]="columnsTemplate">
                        </axiomaim-masonry>

                        <ng-template
                            #columnsTemplate
                            let-columns>
                            <ng-container *ngFor="let column of columns">
                                <!-- Column -->
                                <div class="flex-1 mx-2 p-2 border rounded space-y-2">
                                    <ng-container *ngFor="let item of column.items">
                                        <!-- Item -->
                                        <div class="p-2 text-center rounded bg-primary text-on-primary">
                                            ITEM CONTENT
                                        </div>
                                    </ng-container>
                                </div>
                            </ng-container>
                        </ng-template>
                    `),t()(),i(132,"mat-tab",27)(133,"textarea",26),e(134,`                        columns: number = 4;

                        // Subscribe to media changes
                        this._axiomaimMediaWatcherService.onMediaChange$
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe(({matchingAliases}) => {

                                // Set the masonry columns
                                //
                                // This if block structured in a way so that only the
                                // biggest matching alias will be used to set the column
                                // count.
                                if ( matchingAliases.includes('xl') )
                                {
                                    this.columns = 5;
                                }
                                else if ( matchingAliases.includes('lg') )
                                {
                                    this.columns = 4;
                                }
                                else if ( matchingAliases.includes('md') )
                                {
                                    this.columns = 3;
                                }
                                else if ( matchingAliases.includes('sm') )
                                {
                                    this.columns = 2;
                                }
                                else
                                {
                                    this.columns = 1;
                                }
                            });
                    `),t()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(85),l("animationDuration","0ms"),r(4),l("lang","html"),r(18),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","ts"))},dependencies:[S,b,_,f,y,B,V,N,P,mt],encapsulation:2})}}return o})();function yi(o,h){if(o&1){let n=M();i(0,"button",33),c("click",function(){w(n);let m=E();return C(m.getNavItem("documentation.changelog","mainNavigation"))}),e(1," Get the Changelog item (See browser console) "),t()}o&2&&l("color","primary")}function Ei(o,h){if(o&1){let n=M();i(0,"button",33),c("click",function(){w(n);let m=E();return C(m.updateBadgeTitle("documentation.changelog","mainNavigation","9.9.99"))}),e(1," Update the 'Changelog' badge title "),t()}o&2&&l("color","primary")}function wi(o,h){if(o&1){let n=M();i(0,"button",33),c("click",function(){w(n);let m=E();return C(m.toggleDisabled("documentation.changelog","mainNavigation"))}),e(1," Toggle the disabled status of 'Changelog' item "),t()}o&2&&l("color","primary")}function Ci(o,h){if(o&1){let n=M();i(0,"axiomaim-alert",34),e(1," Reload the page to load the default navigation! "),t(),i(2,"button",35),c("click",function(){w(n);let m=E();return C(m.swapNavigationData("mainNavigation"))}),e(3," Swap the entire navigation data "),t()}o&2&&(r(2),l("color","primary"))}var St=(()=>{class o{constructor(n,a){this._axiomaimNavigationService=n,this._axiomaimComponentsComponent=a}getNavItem(n,a){let m=this._axiomaimNavigationService.getComponent(a);if(!m)return null;let d=m.navigation,k=this._axiomaimNavigationService.getItem(n,d);return console.log(k),k}updateBadgeTitle(n,a,m){let d=this._axiomaimNavigationService.getComponent(a);if(!d)return null;let k=d.navigation,X=this._axiomaimNavigationService.getItem(n,k);X.badge.title=m,d.refresh()}toggleDisabled(n,a){let m=this._axiomaimNavigationService.getComponent(a);if(!m)return null;let d=m.navigation,k=this._axiomaimNavigationService.getItem(n,d);k.disabled=!k.disabled,m.refresh()}swapNavigationData(n){let a=this._axiomaimNavigationService.getComponent(n);if(!a)return null;let m=[{id:"supported-components",title:"Supported components",subtitle:"Compatible third party components",type:"group",icon:"memory",children:[{id:"supported-components.apex-charts",title:"ApexCharts",type:"basic",icon:"insert_chart",link:"/supported-components/apex-charts"},{id:"supported-components.google-maps",title:"Google Maps",type:"basic",icon:"map",link:"/supported-components/google-maps"},{id:"supported-components.quill-editor",title:"Quill editor",type:"basic",icon:"font_download",link:"/supported-components/quill-editor"},{id:"supported-components.youtube-player",title:"Youtube player",type:"basic",icon:"play_circle_filled",link:"/supported-components/youtube-player"}]}];a.navigation=m,a.refresh()}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(Ke),x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["navigation"]],decls:613,vars:17,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],[3,"appearance","type"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","mt-2","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],["href","https://angular.io/api/router/IsActiveMatchOptions","target","_blank","rel","noreferrer"],["axiomaim-highlight","","lang","html"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"whitespace-nowrap"],[1,"mb-2"],[1,"text-xs","font-bold"],[1,"bg-card","mt-4","rounded","px-6","py-3","shadow"],[1,"example-viewer"],[1,"title"],[3,"animationDuration"],["label","Preview"],["matTabContent",""],["label","HTML"],["axiomaim-highlight","",3,"lang"],["label","Typescript"],["mat-flat-button","",3,"click","color"],["appearance","outline","type","info"],["mat-flat-button","",1,"mt-4",3,"click","color"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Components"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Navigation "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaim-navigation"),t(),e(24," is a set of components for creating navigations from data. It has two different variations; "),i(25,"strong"),e(26,"axiomaim-vertical-navigation"),t(),e(27," for creating vertical and "),i(28,"strong"),e(29,"axiomaim-horizontal-navigation"),t(),e(30," for creating horizontal navigations. "),t(),i(31,"p"),e(32," The "),i(33,"em"),e(34,"vertical"),t(),e(35," navigation comes with built-in drawer that can be programmed in various ways to show the navigation in different styles and to control the mobile behavior. "),t(),i(36,"p")(37,"strong"),e(38,"axiomaim-navigation"),t(),e(39," also provides a service which can be used to store navigation data as well as accessing navigation items with their ids from the navigation data. It's a utility service, you don't have to use it to make "),i(40,"strong"),e(41,"axiomaim-navigation"),t(),e(42," work. "),t(),i(43,"p")(44,"strong"),e(45,"Exported as: "),t(),i(46,"code"),e(47,"axiomaimVerticalNavigation"),t(),e(48," and "),i(49,"code"),e(50,"axiomaimHorizontalNavigation"),t()(),i(51,"axiomaim-alert",14),e(52," axiomaim-navigation designed to work with data and it must be supplied in certain format. If you want to create a navigation from an HTML structure, this component is not for you. "),t(),i(53,"h2"),e(54,"Module"),t(),i(55,"textarea",15),e(56,`            import { AxiomaimVerticalNavigationModule } from '@axiomaim/components/navigation';
            import { AxiomaimHorizontalNavigationModule } from '@axiomaim/components/navigation';
        `),t(),i(57,"h2"),e(58,"Navigation item"),t(),i(59,"p"),e(60," This is the interface of the "),i(61,"em"),e(62,"Navigation item"),t(),e(63,". Both "),i(64,"em"),e(65,"vertical"),t(),e(66," and "),i(67,"em"),e(68,"horizontal"),t(),e(69," navigation items use the same interface: "),t(),i(70,"textarea",15),e(71,`            export interface AxiomaimNavigationItem
            {
                id?: string;
                title?: string;
                subtitle?: string;
                type:
                    | 'aside'
                    | 'basic'
                    | 'collapsable'
                    | 'divider'
                    | 'group'
                    | 'spacer';
                hidden?: (item: AxiomaimNavigationItem) => boolean;
                active?: boolean;
                disabled?: boolean;
                tooltip?: string;
                link?: string;
                fragment?: string;
                preserveFragment?: boolean;
                queryParams?: Params | null;
                queryParamsHandling?: QueryParamsHandling | null;
                externalLink?: boolean;
                target?:
                    | '_blank'
                    | '_self'
                    | '_parent'
                    | '_top'
                    | string;
                exactMatch?: boolean;
                isActiveMatchOptions?: IsActiveMatchOptions;
                function?: (item: AxiomaimNavigationItem) => void;
                classes?: {
                    title?: string;
                    subtitle?: string;
                    icon?: string;
                    wrapper?: string;
                };
                icon?: string;
                badge?: {
                    title?: string;
                    classes?: string;
                };
                children?: AxiomaimNavigationItem[];
                meta?: any;
            }
        `),t(),i(72,"div",16)(73,"table")(74,"thead")(75,"tr")(76,"th"),e(77,"Name"),t(),i(78,"th"),e(79,"Description"),t()()(),i(80,"tbody")(81,"tr")(82,"td",17)(83,"div"),e(84,"id"),t()(),i(85,"td"),e(86," Unique id of the navigation item. It's important to supply navigation items with ids if you want to access and modify them after generating the navigation. "),t()(),i(87,"tr")(88,"td",17)(89,"div"),e(90,"title"),t()(),i(91,"td"),e(92,"Title of the navigation item."),t()(),i(93,"tr")(94,"td",17)(95,"div"),e(96,"subtitle"),t()(),i(97,"td"),e(98,"Subtitle of the navigation item."),t()(),i(99,"tr")(100,"td",17)(101,"div"),e(102,"type"),t()(),i(103,"td"),e(104,"Type of the navigation item."),t()(),i(105,"tr")(106,"td",17)(107,"div"),e(108,"hidden"),t()(),i(109,"td"),e(110," A function that returns a boolean. It gets one parameter which is the navigation item. Returning "),i(111,"code"),e(112,"true"),t(),e(113," from the function will hide the item and "),i(114,"code"),e(115,"false"),t(),e(116," will show it. "),t()(),i(117,"tr")(118,"td",17)(119,"div"),e(120,"active"),t()(),i(121,"td"),e(122," Whether to force the navigation item to be active. "),t()(),i(123,"tr")(124,"td",17)(125,"div"),e(126,"disabled"),t()(),i(127,"td"),e(128,"Whether the navigation item is disabled."),t()(),i(129,"tr")(130,"td",17)(131,"div"),e(132,"tooltip"),t()(),i(133,"td"),e(134," Tooltip to show on item hover. Empty string will remove the tooltip. "),t()(),i(135,"tr")(136,"td",17)(137,"div"),e(138,"link"),t()(),i(139,"td"),e(140," String representation of the item link. It can be either a "),i(141,"em"),e(142,"router"),t(),e(143," link or a normal, outgoing link. "),t()(),i(144,"tr")(145,"td",17)(146,"div"),e(147,"fragment"),t()(),i(148,"td"),e(149,"Sets the hash fragment for the URL."),t()(),i(150,"tr")(151,"td",17)(152,"div"),e(153,"preserveFragment"),t()(),i(154,"td"),e(155," When true, preserves the URL fragment for the next navigation. "),t()(),i(156,"tr")(157,"td",17)(158,"div"),e(159,"queryParams"),t()(),i(160,"td"),e(161,"Sets query parameters to the URL."),t()(),i(162,"tr")(163,"td",17)(164,"div"),e(165,"queryParamsHandling"),t()(),i(166,"td"),e(167," How to handle query parameters in the router link for the next navigation. "),t()(),i(168,"tr")(169,"td",17)(170,"div"),e(171,"externalLink"),t()(),i(172,"td"),e(173," Whether the supplied link should be parsed as an external link. It must be "),i(174,"strong"),e(175,"true"),t(),e(176," if you supply a normal, outgoing link in the "),i(177,"strong"),e(178,"link"),t(),e(179," property. "),t()(),i(180,"tr")(181,"td",17)(182,"div"),e(183,"target"),t()(),i(184,"td"),e(185," Sets the "),i(186,"em"),e(187,"target"),t(),e(188," attribute of the external, outgoing link. "),t()(),i(189,"tr")(190,"td",17)(191,"div"),e(192,"exactMatch"),t()(),i(193,"td"),e(194," Sets the "),i(195,"em"),e(196,"exact"),t(),e(197," parameter on the "),i(198,"em"),e(199,"[routerLinkActiveOptions]"),t(),e(200,". "),t()(),i(201,"tr")(202,"td",17)(203,"div"),e(204,"isActiveMatchOptions"),t()(),i(205,"td"),e(206," Sets the "),i(207,"em"),e(208,"isActiveMatchOptions"),t(),e(209," object on the "),i(210,"em"),e(211,"[routerLinkActiveOptions]"),t(),e(212,". If provided, "),i(213,"em"),e(214,"exactMatch"),t(),e(215," option will be ignored. "),i(216,"a",18),e(217,"https://angular.io/api/router/IsActiveMatchOptions "),t()()(),i(218,"tr")(219,"td",17)(220,"div"),e(221,"function"),t()(),i(222,"td"),e(223," A function to run on navigation item click. It gets one parameter which is the navigation item. Supplying function will "),i(224,"strong"),e(225,"NOT"),t(),e(226," override the link functionality of the navigation item, they will run in parallel. "),t()(),i(227,"tr")(228,"td",17)(229,"div"),e(230,"classes"),t()(),i(231,"td"),e(232," Custom class names for the navigation item's specific parts. Multiple class names can be added by separating them with whitespace: "),i(233,"code"),e(234,"'class1 class2 class3'"),t()()(),i(235,"tr")(236,"td",17)(237,"div"),e(238,"icon"),t()(),i(239,"td"),e(240,"Icon name for the navigation item."),t()(),i(241,"tr")(242,"td",17)(243,"div"),e(244,"badge.title"),t()(),i(245,"td"),e(246,"Title of the badge."),t()(),i(247,"tr")(248,"td",17)(249,"div"),e(250,"badge.classes"),t()(),i(251,"td"),e(252," Classes to add to the badge. This can be used to customize the look of the badge. "),t()(),i(253,"tr")(254,"td",17)(255,"div"),e(256,"children"),t()(),i(257,"td"),e(258," Array of navigation items to create child items. "),t()(),i(259,"tr")(260,"td",17)(261,"div"),e(262,"meta"),t()(),i(263,"td"),e(264," An object to hold custom data for the navigation item. It can be used for anything such as storing the access role and authorization of the navigation item. "),t()()()()(),i(265,"h2"),e(266,"Vertical navigation"),t(),i(267,"h3"),e(268,"Usage"),t(),i(269,"p"),e(270," Here's the basic usage of the "),i(271,"code"),e(272,"axiomaim-vertical-navigation"),t(),e(273,": "),t(),i(274,"textarea",19),e(275,`            <axiomaim-vertical-navigation
                [appearance]="'classic'"
                [autoCollapse]="true"
                [inner]="false"
                [mode]="isScreenSmall ? 'over' : 'side'"
                [name]="'leftNavigation'"
                [navigation]="navigationData"
                [opened]="!isScreenSmall"
                [position]="'left'"
                [transparentOverlay]="false">
            </axiomaim-vertical-navigation>
        `),t(),i(276,"h3"),e(277,"Properties"),t(),i(278,"div",20)(279,"table")(280,"thead")(281,"tr")(282,"th"),e(283,"Name"),t(),i(284,"th"),e(285,"Description"),t(),i(286,"th"),e(287,"Default"),t()()(),i(288,"tbody")(289,"tr")(290,"td",17)(291,"div"),e(292,"@Input()"),t(),i(293,"div"),e(294," appearance: AxiomaimVerticalNavigationAppearance "),t()(),i(295,"td"),e(296," Appearance of the navigation and its drawer. This is a string type and can be used to override the style of the navigation. "),t(),i(297,"td")(298,"code",21),e(299,"classic"),t()()(),i(300,"tr")(301,"td",17)(302,"div"),e(303,"@Input()"),t(),i(304,"div"),e(305,"autoCollapse: boolean"),t()(),i(306,"td"),e(307," Whether expanding an expandable navigation item should close other expanded items excluding the active menu item's parent. "),t(),i(308,"td")(309,"code",21),e(310,"true"),t()()(),i(311,"tr")(312,"td",17)(313,"div"),e(314,"@Input()"),t(),i(315,"div"),e(316,"inner: boolean"),t()(),i(317,"td"),e(318," Whether the inner mode is active. This mode allows using navigation without its drawer. Suitable for using it inside "),i(319,"strong"),e(320,"mat-sidenav"),t(),e(321," or "),i(322,"strong"),e(323,"mat-drawer"),t(),e(324,". "),t(),i(325,"td")(326,"code",21),e(327,"false"),t()()(),i(328,"tr")(329,"td",17)(330,"div"),e(331,"@Input()"),t(),i(332,"div"),e(333,"mode: AxiomaimVerticalNavigationMode"),t()(),i(334,"td")(335,"strong"),e(336,"over"),t(),e(337," mode can be used to place the drawer on top of the content and "),i(338,"strong"),e(339,"side"),t(),e(340," mode can be used to push the content and place the drawer next to it. "),t(),i(341,"td")(342,"code",21),e(343,"side"),t()()(),i(344,"tr")(345,"td",17)(346,"div",22)(347,"code",23),e(348,"REQUIRED"),t()(),i(349,"div"),e(350,"@Input()"),t(),i(351,"div"),e(352,"name: string"),t()(),i(353,"td"),e(354," Unique name of the navigation. Required for navigation and its drawer to work correctly. "),t(),i(355,"td"),e(356,"-"),t()(),i(357,"tr")(358,"td",17)(359,"div"),e(360,"@Input()"),t(),i(361,"div"),e(362,"navigation: AxiomaimNavigationItem[]"),t()(),i(363,"td"),e(364," Array of navigation items to build the navigation from. "),t(),i(365,"td"),e(366,"-"),t()(),i(367,"tr")(368,"td",17)(369,"div"),e(370,"@Input()"),t(),i(371,"div"),e(372,"opened: boolean"),t()(),i(373,"td"),e(374," Whether the navigation drawer is opened. Only works with "),i(375,"strong"),e(376,"over"),t(),e(377," mode. "),t(),i(378,"td")(379,"code",21),e(380,"false"),t()()(),i(381,"tr")(382,"td",17)(383,"div"),e(384,"@Input()"),t(),i(385,"div"),e(386,"position: AxiomaimVerticalNavigationPosition"),t()(),i(387,"td"),e(388,"Position of the drawer."),t(),i(389,"td")(390,"code",21),e(391,"left"),t()()(),i(392,"tr")(393,"td",17)(394,"div"),e(395,"@Input()"),t(),i(396,"div"),e(397,"transparentOverlay: boolean"),t()(),i(398,"td"),e(399," Whether the overlay of the drawer is transparent. Only works with "),i(400,"strong"),e(401,"over"),t(),e(402," mode. "),t(),i(403,"td")(404,"code",21),e(405,"false"),t()()(),i(406,"tr")(407,"td",17)(408,"div"),e(409,"@Output()"),t(),i(410,"div"),e(411," appearanceChanged: AxiomaimVerticalNavigationAppearance "),t()(),i(412,"td"),e(413," An event emitted after the appearance of the navigation changed. "),t(),i(414,"td"),e(415,"-"),t()(),i(416,"tr")(417,"td",17)(418,"div"),e(419,"@Output()"),t(),i(420,"div"),e(421,"modeChanged: AxiomaimVerticalNavigationMode"),t()(),i(422,"td"),e(423," An event emitted after the mode of the navigation changed. "),t(),i(424,"td"),e(425,"-"),t()(),i(426,"tr")(427,"td",17)(428,"div"),e(429,"@Output()"),t(),i(430,"div"),e(431,"openedChanged: boolean"),t()(),i(432,"td"),e(433," An event emitted after the opened status of the navigation changed. "),t(),i(434,"td"),e(435,"-"),t()(),i(436,"tr")(437,"td",17)(438,"div"),e(439,"@Output()"),t(),i(440,"div"),e(441," positionChanged: AxiomaimVerticalNavigationPosition "),t()(),i(442,"td"),e(443," An event emitted after the position of the navigation changed. "),t(),i(444,"td"),e(445,"-"),t()()()()(),i(446,"h3"),e(447,"Custom content hooks"),t(),i(448,"p"),e(449," Since the entire navigation will be created from the supplied navigation data, it's only possible to attach custom content inside the navigation drawer using custom content hooks. There are four of these hooks; "),t(),i(450,"div",24)(451,"table")(452,"thead")(453,"tr")(454,"th"),e(455,"Hook"),t(),i(456,"th"),e(457,"Description"),t()()(),i(458,"tbody")(459,"tr")(460,"td",17)(461,"div"),e(462,"axiomaimVerticalNavigationHeader"),t()(),i(463,"td"),e(464," Fixed header hook. Anything put inside this hook will not scroll with drawer content. "),t()(),i(465,"tr")(466,"td",17)(467,"div"),e(468,"axiomaimVerticalNavigationContentHeader"),t()(),i(469,"td"),e(470," Header hook. Anything put inside this hook will be scrolled with the drawer content. "),t()(),i(471,"tr")(472,"td",17)(473,"div"),e(474,"axiomaimVerticalNavigationFooter"),t()(),i(475,"td"),e(476," Fixed footer hook. Anything put inside this hook will not scroll with drawer content. "),t()(),i(477,"tr")(478,"td",17)(479,"div"),e(480,"axiomaimVerticalNavigationContentFooter"),t()(),i(481,"td"),e(482," Footer hook. Anything put inside this hook will be scrolled with the drawer content. "),t()()()()(),i(483,"textarea",19),e(484,`            <!-- Navigation -->
            <axiomaim-vertical-navigation>

                <div axiomaimVerticalNavigationHeader>
                    At the top, fixed into position.
                </div>

                <div axiomaimVerticalNavigationContentHeader>
                    At the top, scrolls with the content.
                </div>

                <div axiomaimVerticalNavigationContentFooter>
                    At the bottom, scrolls with the content.
                </div>

                <div axiomaimVerticalNavigationFooter>
                    At the bottom, fixed into position.
                </div>

            </axiomaim-vertical-navigation>
        `),t(),i(485,"h3"),e(486,"Type aliases"),t(),i(487,"textarea",15),e(488,`            export type AxiomaimVerticalNavigationAppearance =
                | 'default'
                | 'compact'
                | 'dense'
                | 'futuristic'
                | 'thin'
                | string;
        `),t(),i(489,"textarea",15),e(490,`            export type AxiomaimVerticalNavigationMode =
                | 'over'
                | 'side';
        `),t(),i(491,"textarea",15),e(492,`            export type AxiomaimVerticalNavigationPosition =
                | 'left'
                | 'right';
        `),t(),i(493,"h2"),e(494,"Horizontal navigation"),t(),i(495,"h3"),e(496,"Usage"),t(),i(497,"p"),e(498," Here's the basic usage of the "),i(499,"code"),e(500,"axiomaim-horizontal-navigation"),t(),e(501,": "),t(),i(502,"textarea",19),e(503,`            <axiomaim-horizontal-navigation
                [name]="'topNavigation'"
                [navigation]="navigationData">
            </axiomaim-horizontal-navigation>
        `),t(),i(504,"h3"),e(505,"Properties"),t(),i(506,"div",20)(507,"table")(508,"thead")(509,"tr")(510,"th"),e(511,"Name"),t(),i(512,"th"),e(513,"Description"),t(),i(514,"th"),e(515,"Default"),t()()(),i(516,"tbody")(517,"tr")(518,"td",17)(519,"div",22)(520,"code",23),e(521,"REQUIRED"),t()(),i(522,"div"),e(523,"@Input()"),t(),i(524,"div"),e(525,"name: string"),t()(),i(526,"td"),e(527," Unique name of the navigation. Required for navigation and its drawer to work correctly. "),t(),i(528,"td"),e(529,"-"),t()(),i(530,"tr")(531,"td",17)(532,"div"),e(533,"@Input()"),t(),i(534,"div"),e(535,"navigation: AxiomaimNavigationItem[]"),t()(),i(536,"td"),e(537," Array of navigation items to build the navigation from. "),t(),i(538,"td"),e(539,"-"),t()()()()(),i(540,"h2"),e(541,"Accessing navigation items"),t(),i(542,"p"),e(543," The "),i(544,"code"),e(545,"AxiomaimNavigationService"),t(),e(546," provides couple helper methods to access navigation items from the navigation data using their ids. This is especially useful if you want to change something from any item like updating its badge title, hiding or disabling it. "),t(),i(547,"div",25)(548,"div",26)(549,"h6"),e(550,"Example"),t()(),i(551,"mat-tab-group",27)(552,"mat-tab",28),g(553,yi,2,1,"ng-template",29),t(),i(554,"mat-tab",30)(555,"textarea",31),e(556,`                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="getNavItem('documentation.changelog', 'mainNavigation');">
                            Get the Changelog item (See browser console)
                        </button>
                    `),t()(),i(557,"mat-tab",32)(558,"textarea",31),e(559,`
                        /**
                         * Get navigation item
                         *
                         * @param itemId
                         * @param navigationName
                         */
                        getNavItem(itemId, navigationName): AxiomaimNavigationItem | null
                        {
                            // Get the component -> navigation data -> item
                            const navComponent = this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(navigationName);

                            // Return if the navigation component does not exist
                            if ( !navComponent )
                            {
                                return null;
                            }

                            // Get the navigation item
                            const navigation = navComponent.navigation;
                            const item = this._axiomaimNavigationService.getItem(itemId, navigation);
                            console.log(item);
                            return item;
                        }

                    `),t()()()(),i(560,"h2"),e(561,"Modifying navigation items"),t(),i(562,"p"),e(563," After accessing a navigation item, you can simply modify the object and then call the "),i(564,"code"),e(565,"refresh()"),t(),e(566," method on the "),i(567,"em"),e(568,"Navigation component"),t(),e(569," to apply the changes. "),t(),i(570,"div",25)(571,"div",26)(572,"h6"),e(573,"Change badge title"),t()(),i(574,"mat-tab-group",27)(575,"mat-tab",28),g(576,Ei,2,1,"ng-template",29),t(),i(577,"mat-tab",30)(578,"textarea",31),e(579,`                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="updateBadgeTitle('documentation.changelog', 'mainNavigation', '9.9.99');">
                            Update the 'Changelog' badge title
                        </button>
                    `),t()(),i(580,"mat-tab",32)(581,"textarea",31),e(582,`
                        /**
                         * Update badge title
                         *
                         * @param itemId
                         * @param navigationName
                         * @param title
                         */
                        updateBadgeTitle(itemId, navigationName, title): void
                        {
                            // Get the component -> navigation data -> item
                            const navComponent = this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(navigationName);

                            // Return if the navigation component does not exist
                            if ( !navComponent )
                            {
                                return null;
                            }

                            // Get the navigation item, update the badge and refresh the component
                            const navigation = navComponent.navigation;
                            const item = this._axiomaimNavigationService.getItem(itemId, navigation);
                            item.badge.title = title;
                            navComponent.refresh();
                        }

                    `),t()()()(),i(583,"div",25)(584,"div",26)(585,"h6"),e(586,"Disable/Enable navigation item"),t()(),i(587,"mat-tab-group",27)(588,"mat-tab",28),g(589,wi,2,1,"ng-template",29),t(),i(590,"mat-tab",30)(591,"textarea",31),e(592,`                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="toggleDisabled('documentation.changelog', 'mainNavigation');">
                            Toggle the disabled status of 'Changelog' item
                        </button>
                    `),t()(),i(593,"mat-tab",32)(594,"textarea",31),e(595,`
                        /**
                         * Toggle disabled status
                         *
                         * @param itemId
                         * @param navigationName
                         */
                        toggleDisabled(itemId, navigationName): void
                        {
                            // Get the component -> navigation data -> item
                            const navComponent = this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(navigationName);

                            // Return if the navigation component does not exist
                            if ( !navComponent )
                            {
                                return null;
                            }

                            // Get the navigation item, update the badge and refresh the component
                            const navigation = navComponent.navigation;
                            const item = this._axiomaimNavigationService.getItem(itemId, navigation);
                            item.disabled = !item.disabled;
                            navComponent.refresh();
                        }

                    `),t()()()(),i(596,"h2"),e(597,"Swapping entire navigation"),t(),i(598,"p"),e(599," Sometimes it's best to use more than one set of data and swap between them to provide correct navigation. An example use case would be user roles. Different roles may require access to different areas and rather than showing/hiding individual navigation items, it's best to swap the entire navigation data to show a personalized navigation for that role. "),t(),i(600,"div",25)(601,"div",26)(602,"h6"),e(603,"Swap the entire navigation data"),t()(),i(604,"mat-tab-group",27)(605,"mat-tab",28),g(606,Ci,4,1,"ng-template",29),t(),i(607,"mat-tab",30)(608,"textarea",31),e(609,`                        <button
                            mat-flat-button
                            [color]="'primary'"
                            (click)="swapNavigationData('mainNavigation');">
                            Swap the entire navigation data
                        </button>
                    `),t()(),i(610,"mat-tab",32)(611,"textarea",31),e(612,`
                        /**
                         * Swap navigation data
                         *
                         * @param navigationName
                         */
                        swapNavigationData(navigationName): void
                        {
                            // Get the component -> navigation data -> item
                            const navComponent = this._axiomaimNavigationService.getComponent<AxiomaimVerticalNavigationComponent>(navigationName);

                            // Return if the navigation component does not exist
                            if ( !navComponent )
                            {
                                return null;
                            }

                            // A navigation data to replace with
                            const newNavigation: AxiomaimNavigationItem[] = [
                                {
                                    id      : 'supported-components',
                                    title   : 'Supported components',
                                    subtitle: 'Compatible third party components',
                                    type    : 'group',
                                    icon    : 'memory',
                                    children: [
                                        {
                                            id   : 'supported-components.apex-charts',
                                            title: 'ApexCharts',
                                            type : 'basic',
                                            icon : 'insert_chart',
                                            link : '/supported-components/apex-charts'
                                        },
                                        {
                                            id   : 'supported-components.full-calendar',
                                            title: 'FullCalendar',
                                            type : 'basic',
                                            icon : 'today',
                                            link : '/supported-components/full-calendar'
                                        },
                                        {
                                            id   : 'supported-components.google-maps',
                                            title: 'Google Maps',
                                            type : 'basic',
                                            icon : 'map',
                                            link : '/supported-components/google-maps'
                                        },
                                        {
                                            id   : 'supported-components.quill-editor',
                                            title: 'Quill editor',
                                            type : 'basic',
                                            icon : 'font_download',
                                            link : '/supported-components/quill-editor'
                                        },
                                        {
                                            id   : 'supported-components.youtube-player',
                                            title: 'Youtube player',
                                            type : 'basic',
                                            icon : 'play_circle_filled',
                                            link : '/supported-components/youtube-player'
                                        }
                                    ]
                                }
                            ];

                            // Replace the navigation data
                            navComponent.navigation = newNavigation;
                            navComponent.refresh();
                        }

                    `),t()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(32),l("appearance","border")("type","info"),r(500),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","typescript"),r(16),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","typescript"),r(6),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","typescript"),r(10),l("animationDuration","0ms"),r(4),l("lang","html"),r(3),l("lang","typescript"))},dependencies:[S,b,_,L,f,q,y,B,V,N,P],encapsulation:2})}}return o})();var yt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["scroll-reset"]],decls:56,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"],["axiomaim-highlight","","lang","html",1,"mt-8"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Directives"),t()()(),i(15,"div",9)(16,"h2",10),e(17," ScrollReset "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaimScrollReset"),t(),e(24," is a helper directive to reset the given element's scroll position to the top on route changes. "),t(),i(25,"p"),e(26," This directive is especially useful in situations like having a "),i(27,"code"),e(28,"router-outlet"),t(),e(29," inside a scrollable area such as "),i(30,"code"),e(31,"mat-drawer-content"),t(),e(32,", "),i(33,"code"),e(34,"mat-sidenav-content"),t(),e(35," or a custom scrollable element. "),t(),i(36,"p")(37,"strong"),e(38,"Exported as: "),t(),i(39,"code"),e(40,"axiomaimScrollReset"),t()(),i(41,"h2"),e(42,"Module"),t(),i(43,"textarea",14),e(44,`            import { AxiomaimScrollResetModule } from '@axiomaim/directives/scroll-reset';
        `),t(),i(45,"h2"),e(46,"Usage"),t(),i(47,"p"),e(48," Here are some of the basic usages of the "),i(49,"code"),e(50,"axiomaimScrollReset"),t(),e(51,": "),t(),i(52,"textarea",15),e(53,`            <mat-drawer-content axiomaimScrollReset>
                <router-outlet></router-outlet>
            </mat-drawer-content>
        `),t(),i(54,"textarea",16),e(55,`            <div class="mail">
                <div
                    class="threads"
                    axiomaimScrollReset>
                    <router-outlet></router-outlet>
                </div>
            </div>
        `),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var Et=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["scrollbar"]],decls:166,vars:4,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["href","https://github.com/mdbootstrap/perfect-scrollbar","rel","noreferrer","target","_blank"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"],[1,"bg-card","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"whitespace-nowrap"],[1,"bg-card","mt-4","rounded","shadow"],[1,"text-secondary","border-b","px-6","py-3","font-mono"],[1,"p-6"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Directives"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Scrollbar "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaimScrollbar"),t(),e(24," is a wrapper directive for "),i(25,"a",14),e(26,"Perfect Scrollbar "),t(),e(27," plugin. "),t(),i(28,"p")(29,"strong"),e(30,"Exported as: "),t(),i(31,"code"),e(32,"axiomaimScrollbar"),t()(),i(33,"h2"),e(34,"Module"),t(),i(35,"textarea",15),e(36,`            import { AxiomaimScrollbarModule } from '@axiomaim/directives/scrollbar';
        `),t(),i(37,"h2"),e(38,"Usage"),t(),i(39,"p"),e(40,"Here's the basic usage of the "),i(41,"code"),e(42,"axiomaimScrollbar"),t(),e(43,":"),t(),i(44,"textarea",16),e(45,`            <div axiomaimScrollbar
                 [axiomaimScrollbarOptions]="{wheelPropagation: false, suppressScrollX: true}">
                A very long content to add scrollbars.
            </div>
        `),t(),i(46,"h2"),e(47,"Properties"),t(),i(48,"div",17)(49,"table")(50,"thead")(51,"tr")(52,"th"),e(53,"Name"),t(),i(54,"th"),e(55,"Description"),t(),i(56,"th"),e(57,"Default"),t()()(),i(58,"tbody")(59,"tr")(60,"td",18)(61,"div"),e(62,"@Input()"),t(),i(63,"div"),e(64,"axiomaimScrollbar: boolean"),t()(),i(65,"td"),e(66," Whether to enable or disable the custom scrollbars. "),t(),i(67,"td")(68,"code",19),e(69,"''"),t()()(),i(70,"tr")(71,"td",18)(72,"div"),e(73,"@Input()"),t(),i(74,"div"),e(75,"axiomaimScrollbarOptions: any"),t()(),i(76,"td"),e(77,"Perfect Scrollbar options"),t(),i(78,"td")(79,"code",19),e(80),t()()()()()(),i(81,"h2"),e(82,"Methods"),t(),i(83,"p"),e(84," It's possible to access the methods of this directive using a "),i(85,"em"),e(86,"@ViewChild"),t(),e(87," or "),i(88,"em"),e(89,"@ViewChildren"),t(),e(90,": "),t(),i(91,"textarea",16),e(92,`            <!-- Content #1 with custom scrollbar -->
            <div axiomaimScrollbar>
                A very long content to add scrollbars.
            </div>

            <!-- Content #2 with custom scrollbar -->
            <div axiomaimScrollbar>
                Another long content to add scrollbars.
            </div>
        `),t(),i(93,"textarea",15),e(94,`            import { AxiomaimScrollbarDirective } from '@axiomaim/directives/scrollbar/scrollbar.directive';

            @ViewChildren(AxiomaimScrollbarDirective)
            private _axiomaimScrollbarDirectives: QueryList<AxiomaimScrollbarDirective>

            ngAfterViewInit(): void
            {
                // Iterate through the directives and update all of them
                axiomaimScrollbarDirectives.forEach((axiomaimScrollbarDirective) => {
                    axiomaimScrollbarDirective.update();
                });
            }
        `),t(),i(95,"p"),e(96,"Here's the list of all available methods:"),t(),i(97,"div",20)(98,"div",21),e(99," update(): void "),t(),i(100,"div",22),e(101,"Updates the scrollbar."),t()(),i(102,"div",20)(103,"div",21),e(104," destroy(): void "),t(),i(105,"div",22),e(106,"Destroy the custom scrollbar instance."),t()(),i(107,"div",20)(108,"div",21),e(109," geometry(prefix: string = 'scroll'): ScrollbarGeometry "),t(),i(110,"div",22),e(111," Returns the geometry of the scrollable element (scrollLeft, scrollTop, scrollHeight, scrollWidth etc.) "),t()(),i(112,"div",20)(113,"div",21),e(114," position(absolute: boolean = false): ScrollbarPosition "),t(),i(115,"div",22),e(116," Returns the position of the scrollable element (scrollLeft, scrollTop) "),t()(),i(117,"div",20)(118,"div",21),e(119," scrollTo(x: number, y?: number, speed?: number): void "),t(),i(120,"div",22),e(121,"Scrolls to given position."),t()(),i(122,"div",20)(123,"div",21),e(124," scrollToX(x: number, speed?: number): void "),t(),i(125,"div",22),e(126,"Scrolls to given position on X axis."),t()(),i(127,"div",20)(128,"div",21),e(129," scrollToY(y: number, speed?: number): void "),t(),i(130,"div",22),e(131,"Scrolls to given position on Y axis."),t()(),i(132,"div",20)(133,"div",21),e(134," scrollToTop(offset: number = 0, speed?: number): void "),t(),i(135,"div",22),e(136,"Scrolls to top."),t()(),i(137,"div",20)(138,"div",21),e(139," scrollToBottom(offset: number = 0, speed?: number): void "),t(),i(140,"div",22),e(141,"Scrolls to bottom."),t()(),i(142,"div",20)(143,"div",21),e(144," scrollToLeft(offset: number = 0, speed?: number): void "),t(),i(145,"div",22),e(146,"Scrolls to left."),t()(),i(147,"div",20)(148,"div",21),e(149," scrollToRight(offset: number = 0, speed?: number): void "),t(),i(150,"div",22),e(151,"Scrolls to right."),t()(),i(152,"div",20)(153,"div",21),e(154," scrollToElement(qs: string, offset: number = 0, ignoreVisible: boolean = false, speed?: number): void "),t(),i(155,"div",22),e(156," Scrolls to found element based on the given "),i(157,"strong"),e(158,"QuerySelector"),t(),e(159,". If "),i(160,"code"),e(161,"ignoreVisible"),t(),e(162," is "),i(163,"strong"),e(164,"true"),t(),e(165," then scroll won't be triggered if the element is already inside the current viewport. "),t()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(61),le("{}"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var wt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["mock-api"]],decls:329,vars:9,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],[3,"appearance","type"],[1,"bg-card","mt-4","rounded","shadow"],[1,"text-secondary","border-b","px-6","py-3","font-mono"],[1,"p-6"],[1,"bg-card","mb-4","mt-4","rounded","shadow"],["href","https://en.wikipedia.org/wiki/List_of_HTTP_status_codes","rel","noreferrer","target","_blank"],["axiomaim-highlight","","lang","typescript"],[1,"text-secondary","bg-card","mt-6","rounded","p-6","font-mono","shadow"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Libraries"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Mock API "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"MockAPI"),t(),e(24," is a helper library developed specifically for Axiomaim to mock API endpoints and provide data to your app without having to create an actual backend application. This way, you can focus on your frontend app and once you finish with the frontend, you can create your backend application to provide real API endpoints with real data. "),t(),i(25,"p"),e(26," This not only makes you progress faster and put together your app very quickly but you will also know exactly what you will be needing from your API. "),t(),i(27,"p"),e(28," While "),i(29,"strong"),e(30,"MockAPI"),t(),e(31," is not suitable for every use case or for every project, there are some cases that using it would make your life easier. These cases are but not limited to: "),t(),i(32,"ul")(33,"li"),e(34,"If you want to focus on the frontend first"),t(),i(35,"li"),e(36," If you want to create a mockup of your idea to see if it's going to work or not "),t(),i(37,"li"),e(38," If you want to create a small side project for yourself or for your colleagues/company "),t(),i(39,"li"),e(40," If you need to present your idea to your client or to your boss without spending many hours and resources "),t()(),i(41,"axiomaim-alert",14),e(42," MockAPI is NOT a database or a backend replacement! It works on memory. As soon as you reload your app, all the changes you have made using Mock API endpoints will go away and replaced with defaults. "),t(),i(43,"h2"),e(44,"How it works?"),t(),i(45,"p")(46,"strong"),e(47,"MockAPI"),t(),e(48," module provides an "),i(49,"em"),e(50,"HttpInterceptor"),t(),e(51," which intercepts all outgoing http requests to return a mock response based on user provided callback functions. While it intercepts all requests, if the "),i(52,"strong"),e(53,"MockAPI"),t(),e(54," module cannot find a callback function for the request type and url, it will let the request to pass through. This way, you can use the "),i(55,"strong"),e(56,"MockAPI"),t(),e(57," along with your real API endpoints. "),t(),i(58,"h2"),e(59,"AxiomaimMockApiService"),t(),i(60,"p"),e(61," The "),i(62,"code"),e(63,"AxiomaimMockApiService"),t(),e(64," is the core of the "),i(65,"em"),e(66,"MockAPI"),t(),e(67," module. This singleton service is used to register API endpoints and callbacks. This is the only thing you will need to mock API endpoints. "),t(),i(68,"h3"),e(69,"Methods"),t(),i(70,"p"),e(71," All methods return an instance of "),i(72,"code"),e(73,"AxiomaimMockApiHandler"),t(),e(74,". "),t(),i(75,"div",15)(76,"div",16),e(77," .onGet(url: string, delay?: number): AxiomaimMockApiHandler "),t(),i(78,"div",17),e(79," Registers a url for "),i(80,"em"),e(81,"GET"),t(),e(82," requests. "),i(83,"em"),e(84,"Delay (milliseconds)"),t(),e(85," can be set to delay the response. "),t()(),i(86,"div",15)(87,"div",16),e(88," .onPatch(url: string, delay?: number): AxiomaimMockApiHandler "),t(),i(89,"div",17),e(90," Registers a url for "),i(91,"em"),e(92,"PATCH"),t(),e(93," requests. "),i(94,"em"),e(95,"Delay (milliseconds)"),t(),e(96," can be set to delay the response. "),t()(),i(97,"div",15)(98,"div",16),e(99," .onPost(url: string, delay?: number): AxiomaimMockApiHandler "),t(),i(100,"div",17),e(101," Registers a url for "),i(102,"em"),e(103,"POST"),t(),e(104," requests. "),i(105,"em"),e(106,"Delay (milliseconds)"),t(),e(107," can be set to delay the response. "),t()(),i(108,"div",15)(109,"div",16),e(110," .onPut(url: string, delay?: number): AxiomaimMockApiHandler "),t(),i(111,"div",17),e(112," Registers a url for "),i(113,"em"),e(114,"PUT"),t(),e(115," requests. "),i(116,"em"),e(117,"Delay (milliseconds)"),t(),e(118," can be set to delay the response. "),t()(),i(119,"div",15)(120,"div",16),e(121," .onDelete(url: string, delay?: number): AxiomaimMockApiHandler "),t(),i(122,"div",17),e(123," Registers a url for "),i(124,"em"),e(125,"DELETE"),t(),e(126," requests. "),i(127,"em"),e(128,"Delay (milliseconds)"),t(),e(129," can be set to delay the response. "),t()(),i(130,"h3"),e(131,"AxiomaimMockApiHandler"),t(),i(132,"p"),e(133," This is the return type of all methods from the service. This class instance is not directly accessible. It can only be accessed through the "),i(134,"code"),e(135,"AxiomaimMockApiService"),t(),e(136," allowing method chaining. It has 2 methods: "),t(),i(137,"div",18)(138,"div",16),e(139," .reply(callback: AxiomaimMockApiReplyCallback): void "),t(),i(140,"div",16),e(141," .replyCount(count: number): void "),t(),i(142,"div",17)(143,"p"),e(144," These methods can be used to register the callback function for the request. The "),i(145,"em"),e(146,"callback"),t(),e(147," has an access to the outgoing "),i(148,"em"),e(149,"HttpRequest"),t(),e(150," which can be used to access anything from the request such as form data and headers. "),t(),i(151,"p"),e(152," You can limit the reply by chaining the "),i(153,"code"),e(154,".replyCount"),t(),e(155,` and providing the number of times this request should be handled. After the limit has reached, the request handler will throw an error and won't let the request to pass through. It can be useful for creating one-time-use endpoints to test "Reset Password" links or testing an unreachable API endpoints and etc. `),t(),i(156,"p"),e(157," The callbacks must return either an array "),i(158,"code"),e(159,"[number, any | string]"),t(),e(160," or an observable that returns the said array. The "),i(161,"code"),e(162,"number"),t(),e(163," represents the "),i(164,"a",19),e(165,"HTTP status code "),t(),e(166," of the response while the "),i(167,"code"),e(168,"any | string"),t(),e(169," represents the actual response. "),t()()(),i(170,"h3"),e(171,"Basic usage"),t(),i(172,"textarea",20),e(173,`            this.axiomaimMockApiService
                .onPut('api/navigation')
                .reply(({request: HttpRequest<any>}) => {

                    // Get the body from the request
                    const body = request.body;

                    // Do something with your data

                    // Return a success code along with some data
                    return [200, { newNavigation }];
            })
        `),t(),i(174,"textarea",20),e(175,`            this.axiomaimMockApiService
                .onGet('api/navigation')
                .reply(() => {

                    // Do something with your data

                    // Return an observable with success code and data
                    return of(someFunctionToCall()).pipe(map((response) => {

                        // Do some stuff with the response from 'someFunctionToCall()'

                        // Return a success code along with some data
                        return [200, { newNavigation }];
                    });
            });
        `),t(),i(176,"h2"),e(177,"Step by step guide to start using AxiomaimMockApi"),t(),i(178,"p"),e(179," It's pretty easy and straightforward to setup the "),i(180,"strong"),e(181,"MockAPI"),t(),e(182," module for mocking API endpoints and their responses. Once you understand the underlying mechanic, you will be able to mock API endpoints in no time. "),t(),i(183,"axiomaim-alert",14),e(184," Please keep in mind that the following step-by-step guide assumes you are doing everything from scratch for the "),i(185,"em"),e(186,"MockAPI"),t(),e(187," like creating directories, adding files, exporting via barrels etc. Majority of these already setup in both Demo and Starter apps for you so it's a bit easier to start working with the "),i(188,"em"),e(189,"MockAPI"),t(),e(190,". "),t(),i(191,"h3"),e(192,"1. Prepare the files"),t(),i(193,"p"),e(194," Choose a location to store your mocks. By default the Demo app uses "),i(195,"code"),e(196,"src/app/mock-api/"),t(),e(197," directory. You can use the same directory or choose another one. For this guide, we will assume you are going to use the default directory. "),t(),i(198,"axiomaim-alert",14),e(199," It's important to keep all mock related files in the same directory because we will create a barrel file that exports all the mock classes and provide that to the "),i(200,"code"),e(201,"AxiomaimMockApiModule"),t(),e(202," so it can register and use them. "),t(),i(203,"p"),e(204," After choosing the location, create a sub-directory relevant to your endpoint and create 2 files in it; one for the mock class and one for the data json: "),t(),i(205,"p",21),e(206," src/app/mock-api/"),s(207,"br"),e(208," \xA0\u2514\u2500 navigation/"),s(209,"br"),e(210," \xA0\xA0\xA0\xA0\u2514\u2500 data.ts"),s(211,"br"),e(212," \xA0\xA0\xA0\xA0\u2514\u2500 api.ts "),t(),i(213,"h3"),e(214,"2. Create the class"),t(),i(215,"p"),e(216," Edit the "),i(217,"code"),e(218,"api.ts"),t(),e(219," file and inside create an injectable class. "),t(),i(220,"p"),e(221," The "),i(222,"code"),e(223,"AxiomaimMockApi"),t(),e(224," requires one public method called "),i(225,"code"),e(226,"registerHandlers()"),t(),e(227," and it must be implemented. It also needs to be called within the "),i(228,"code"),e(229,"constructor"),t(),e(230," of your mock class: "),t(),i(231,"textarea",20),e(232,`            import { Injectable } from '@angular/core';
            import { AxiomaimMockApiService } from '@axiomaim/lib/mock-api';

            @Injectable({
                providedIn: 'root'
            })
            export class NavigationMockApi
            {
                private _axiomaimMockApiService = inject(AxiomaimMockApiService);

                /**
                 * Constructor
                 */
                constructor()
                {
                    // Register Mock API handlers
                    this.registerHandlers();
                }

                /**
                * Register Mock API handlers
                */
                registerHandlers(): void
                {

                }
            }
        `),t(),i(233,"h3"),e(234,"3. Create the data"),t(),i(235,"p"),e(236," Edit the "),i(237,"code"),e(238,"data.ts"),t(),e(239," file and add your default data as an "),i(240,"strong"),e(241,"exported const"),t(),e(242," value. You can have more than one "),i(243,"code"),e(244,"const"),t(),e(245," per file, just remember to export all of them: "),t(),i(246,"textarea",20),e(247,`            // An array of navigation items for compact layout
            export const compactNavigation = [ ]

            // An array of navigation items for default layout
            export const defaultNavigation = [ ]
        `),t(),i(248,"h3"),e(249,"3. Import the data into the Mock class"),t(),i(250,"p"),e(251," Return back to "),i(252,"code"),e(253,"api.ts"),t(),e(254," file, import your data and set them as class properties so they can be accessible within the class: "),t(),i(255,"textarea",20),e(256,`            import { Injectable } from '@angular/core';
            import { AxiomaimMockApiService } from '@axiomaim/lib/mock-api';
            import { compactNavigation, defaultNavigation } from 'app/mock-api/navigation/data';

            @Injectable({
                providedIn: 'root'
            })
            export class NavigationMockApi
            {
                private _axiomaimMockApiService = inject(AxiomaimMockApiService);

                private readonly _compactNavigation: any[];
                private readonly _defaultNavigation: any[];

                /**
                 * Constructor
                 */
                constructor()
                {
                    // Set the data
                    this._compactNavigation = compactNavigation;
                    this._defaultNavigation = defaultNavigation;

                    // Register Mock API handlers
                    this.registerHandlers();
                }

                /**
                 * Register Mock API handlers
                 */
                registerHandlers(): void
                {

                }
            }
        `),t(),i(257,"h3"),e(258,"4. Register the endpoints and callbacks"),t(),i(259,"p"),e(260," Inside the "),i(261,"code"),e(262,"registerHandlers()"),t(),e(263," method, define your endpoints and callbacks to provide data: "),t(),i(264,"textarea",20),e(265,`            import { Injectable } from '@angular/core';
            import { cloneDeep } 'lodash-es';
            import { AxiomaimMockApiService, AxiomaimMockApiUtils } from '@axiomaim/lib/mock-api';
            import { compactNavigation, defaultNavigation } from 'app/mock-api/navigation/data';

            @Injectable({
                providedIn: 'root'
            })
            export class NavigationMockApi
            {
                ...

                /**
                 * Register Mock API handlers
                 */
                registerHandlers(): void
                {
                    // Navigation - GET
                    this._axiomaimMockApiService
                        .onGet('api/navigation')
                        .reply(() => {

                        // Clone the data to preserve the originals
                        const compactNavigation = cloneDeep(this._compactNavigation);
                        const defaultNavigation = cloneDeep(this._defaultNavigation);

                        // Do some stuff with your data

                        // Return
                        return [200, {
                            compact: compactNavigation,
                            default: defaultNavigation,
                        }];
                    })

                    // Navigation - PUT
                    this._axiomaimMockApiService
                        .onPut('api/navigation')
                        .reply(({request}) => {

                        // Save the new navigation item
                        const newNavigationItem = cloneDeep(request.body.navigationItem);
                        newNavigationItem.id = AxiomaimMockApiUtils.guid();
                        this._defaultNavigation.unshift(newNavigationItem);

                        // Return
                        return [200, newNavigationItem];
                    });
                }
            }
        `),t(),i(266,"h3"),e(267,"5. Create a barrel file"),t(),i(268,"p"),e(269," Navigate back to the root of your mock data directory, by default it's the "),i(270,"code"),e(271,"src/app/mock-api/"),t(),e(272," directory, and create an "),i(273,"strong"),e(274,"index.ts"),t(),e(275," file. "),t(),i(276,"p",21),e(277," src/app/mock-api/"),s(278,"br"),e(279," \xA0\u2514\u2500 auth/"),s(280,"br"),e(281," \xA0\u2514\u2500 navigation/"),s(282,"br"),e(283," \xA0\u2514\u2500 user/"),s(284,"br"),e(285," \xA0\u2514\u2500 "),i(286,"strong"),e(287,"index.ts"),t(),s(288,"br"),t(),i(289,"p"),e(290," Edit the "),i(291,"code"),e(292,"index.ts"),t(),e(293," file to create a barrel from the services. Only import the services and not the data files, create an array from them and then export that array: "),t(),i(294,"textarea",20),e(295,`            import { AuthMockApi } from 'app/mock-api/auth';
            import { NavigationMockApi } from 'app/mock-api/navigation';
            import { UserMockApi } from 'app/mock-api/user';

            export const mockApiServices = [
                AuthMockApi,
                NavigationMockApi,
                UserMockApi
            ];
        `),t(),i(296,"p"),e(297," After that, head to the "),i(298,"code"),e(299,"app.config.ts"),t(),e(300," file, provide the array of services you have exported: "),t(),i(301,"textarea",20),e(302,`            ...
            import { provideAxiomaim } from '@axiomaim';
            import { mockApiServices } from 'app/mock-api';

            provideAxiomaim({
                mockApi: {
                    services: mockApiServices,
                },
            ...
            })
        `),t(),i(303,"h3"),e(304,"6. (Optional) Set a global delay"),t(),i(305,"p"),e(306," You can also set a global delay (ms) to all of your Mock API endpoints to simulate a slow connection, a server that's under attack or failing, some kind of service interruption and etc. "),t(),i(307,"textarea",20),e(308,`            ...
            import { provideAxiomaim } from '@axiomaim';
            import { mockApiServices } from 'app/mock-api';

            provideAxiomaim({
                mockApi: {
                    delay   : 250,
                    services: mockApiServices,
                },
            ...
            })
        `),t(),i(309,"h3"),e(310,"7. Consume the mock API endpoints"),t(),i(311,"p"),e(312," Now you can consume your mock API endpoints anywhere from your app using Angular's "),i(313,"em"),e(314,"HttpClient"),t(),e(315," and the "),i(316,"strong"),e(317,"MockAPI"),t(),e(318," module will catch the requests. If there is a matching url and a request type, the "),i(319,"strong"),e(320,"MockAPI"),t(),e(321," will provide the response from the provided callback. If there isn't one, then the "),i(322,"strong"),e(323,"MockAPI"),t(),e(324," will let the request to pass through allowing you to use a real API endpoints along with the mocked ones. "),t(),i(325,"textarea",20),e(326,`            /**
             * Get navigation
             */
            getNavigation(): Observable<`),e(327,"any>"),e(328,`
            {
                return this._httpClient.get<any[]>('api/navigation').pipe(
                    tap((response: any) => {
                        this._navigation.next(response);
                    })
                );
            }
        `),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(22),l("appearance","border")("type","warning"),r(142),l("appearance","border")("type","info"),r(15),l("appearance","border")("type","info"))},dependencies:[S,b,_,f,q,y],encapsulation:2})}}return o})();var Ct=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["find-by-key"]],decls:78,vars:7,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],["axiomaim-highlight","","lang","html"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Pipes"),t()()(),i(15,"div",9)(16,"h2",10),e(17," findByKey "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"axiomaimFindByKey"),t(),e(24," is a helper pipe that finds entries from an object using given key-source set. "),t(),i(25,"h2"),e(26,"Module"),t(),i(27,"textarea",14),e(28,`            import { AxiomaimFindByKeyPipeModule } from '@axiomaim/pipe/find-by-key';
        `),t(),i(29,"h2"),e(30,"Usage"),t(),i(31,"textarea",15),e(32,`            value | axiomaimFindByKey:key:source
        `),t(),i(33,"p"),e(34," Consider this array of objects representing the "),i(35,"em"),e(36,"tags"),t(),e(37," and "),i(38,"em"),e(39,"tasks"),t(),e(40," data stored on the backend: "),t(),i(41,"textarea",14),e(42,`            const tags = [
                {
                    id   : 'tag-00',
                    title: 'Api',
                    color: 'red'
                },
                {
                    id   : 'tag-01',
                    title: 'Frontend',
                    color: 'blue'
                },
                {
                    id   : 'tag-02',
                    title: 'Bug',
                    color: 'green'
                }
            ];

            const tasks = [
                {
                    id   : 'task-00',
                    title: 'Company internal application v2.0.0',
                    tags : [
                        'tag-00',
                        'tag-01'
                    ]
                },
                {
                    id   : 'task-01',
                    title: 'Create the landing/marketing page and host it on the beta channel',
                    tags : [
                        'tag-02'
                    ]
                },
                {
                    id   : 'task-01',
                    title: 'Move dependency system to Yarn for easier package management',
                    tags : [
                        'tag-00',
                        'tag-01',
                        'tag-02'
                    ]
                }
            ]
        `),t(),i(43,"p"),e(44," Normally, you would "),i(45,"em"),e(46,"join"),t(),e(47," these two data together in the backend before sending it to the frontend so you can access tags of a task right from the task itself: "),t(),i(48,"textarea",14),e(49,`            const tasksWithTags = [
                {
                    id   : 'task-00',
                    title: 'Company internal application v2.0.0',
                    tags : [
                        {
                            id   : 'tag-00',
                            title: 'Api',
                            color: 'red'
                        },
                        {
                            id   : 'tag-01',
                            title: 'Frontend',
                            color: 'blue'
                        }
                    ]
                },
                {
                    id   : 'task-01',
                    title: 'Create the landing/marketing page and host it on the beta channel',
                    tags : [
                        {
                            id   : 'tag-02',
                            title: 'Bug',
                            color: 'green'
                        }
                    ]
                },
                {
                    id   : 'task-01',
                    title: 'Move dependency system to Yarn for easier package management',
                    tags : [
                        {
                            id   : 'tag-00',
                            title: 'Api',
                            color: 'red'
                        },
                        {
                            id   : 'tag-01',
                            title: 'Frontend',
                            color: 'blue'
                        },
                        {
                            id   : 'tag-02',
                            title: 'Bug',
                            color: 'green'
                        }
                    ]
                }
            ]
        `),t(),i(50,"p"),e(51," But, let's say you cannot "),i(52,"em"),e(53,"join"),t(),e(54," them. You have no access to the backend app or you cannot make any changes to it and you have to work with what you have. In this case, you can use the "),i(55,"code"),e(56,"axiomaimFindByKey"),t(),e(57," pipe to get the tags of a task without joining the two data using javascript: "),t(),i(58,"textarea",15),e(59),t(),i(60,"p"),e(61," The above code will iterate through the tasks, and for each task, it will also iterate the task's tags. "),t(),i(62,"p")(63,"code"),e(64,"task.tags"),t(),e(65," array normally holds the "),i(66,"em"),e(67,"ids"),t(),e(68," of the assigned tags. But using "),i(69,"code"),e(70,"axiomaimFindByKey"),t(),e(71," pipe, we can use those "),i(72,"em"),e(73,"ids"),t(),e(74," to extract the actual tag object from the "),i(75,"em"),e(76,"tags"),t(),e(77," array. "),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(40),Ue(`            <!-- Iterate through the tasks -->
            <ng-container *ngFor="let task of tasks">

                <!-- Iterate through the tags of the task but rather than returning
                     the tag id, use that id to find the actual tag object from 'tags'
                     so we can access the properties like title and color of the tag -->
                <ng-container *ngFor="let tag of (task.tags | axiomaimFindByKey:'id':tags);">
                    <div>`,"{","","{","tag.title","}","","}",`</div>
                </ng-container>

            </ng-container>
        `))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var kt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["config"]],decls:74,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Services"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Config "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"AxiomaimConfigService"),t(),e(24," is a singleton service to store and access an application wide configuration object. It can be used to store any kind of data and can be accessed from anywhere within your application. "),t(),i(25,"h2"),e(26,"Module"),t(),i(27,"textarea",14),e(28,`            import { AxiomaimConfigModule } from '@axiomaim/services/config';
        `),t(),i(29,"h2"),e(30,"Default configuration"),t(),i(31,"p"),e(32," By default, the application wide configuration is stored in "),i(33,"code"),e(34,"src/app.config.ts"),t(),e(35," file and it includes the "),i(36,"strong"),e(37,"layout style"),t(),e(38," as well as the "),i(39,"strong"),e(40,"color theme"),t(),e(41," configurations: "),t(),i(42,"textarea",14),e(43,`            provideAxiomaim({
                ...
                axiomaim   : {
                    layout : 'classy',
                    scheme : 'light',
                    screens: {
                        sm: '600px',
                        md: '960px',
                        lg: '1280px',
                        xl: '1440px',
                    },
                    theme  : 'theme-default',
                    themes : [{
                        id  : 'theme-default',
                        name: 'Default',
                    },
                    {
                        id  : 'theme-brand',
                        name: 'Brand',
                    },
                    {
                        id  : 'theme-teal',
                        name: 'Teal',
                    },
                    {
                        id  : 'theme-rose',
                        name: 'Rose',
                    },
                    {
                        id  : 'theme-purple',
                        name: 'Purple',
                    },
                    {
                        id  : 'theme-amber',
                        name: 'Amber',
                    }],
                },
            }),
        `),t(),i(44,"p"),e(45," The default configuration is supplied to the "),i(46,"strong"),e(47,"AxiomaimConfigService"),t(),e(48," automatically: "),t(),i(49,"h2"),e(50,"Methods"),t(),i(51,"p"),e(52," To set a configuration use "),i(53,"code"),e(54,"config"),t(),e(55," setter on "),i(56,"strong"),e(57,"AxiomaimConfigService"),t(),e(58,". The setter will intelligently merge the configuration by replacing only the given options if they exist while preserving others. If the supplied option does not exist on the configuration, it will be added: "),t(),i(59,"textarea",14),e(60,`            import { AxiomaimConfigService } from '@axiomaim/services/config';

            private _axiomaimConfigService = inject(AxiomaimConfigService);

            /**
             * Constructor
             */
            constructor()
            {
                this._axiomaimConfigService.config = {layout: 'classy'};
            }
        `),t(),i(61,"p"),e(62," To get the configuration use "),i(63,"code"),e(64,"config$"),t(),e(65," getter on "),i(66,"strong"),e(67,"AxiomaimConfigService"),t(),e(68," which returns an "),i(69,"code"),e(70,"Observable"),t(),e(71," of the configuration object: "),t(),i(72,"textarea",14),e(73,`            import { AxiomaimConfigService } from '@axiomaim/services/config';
            import { AppConfig } from 'app/core/config/app.config';

            private _axiomaimConfigService = inject(AxiomaimConfigService);

            config: AppConfig;

            /**
             * Constructor
             */
            constructor()
            {
                this._axiomaimConfigService.config$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((config: AppConfig) => {
                        this.config = config;
                    }
            });
        `),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var Tt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["confirmation"]],decls:180,vars:4,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","mt-2","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],[1,"bg-card","mt-4","rounded","shadow"],[1,"text-secondary","border-b","px-6","py-3","font-mono"],[1,"p-6"],["href","https://material.angular.io/components/dialog/api#MatDialogRef","target","_blank","rel","noreferrer"],["axiomaim-highlight","",3,"lang"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Services"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Confirmation "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"AxiomaimConfirmationService"),t(),e(24," is a singleton service for creating confirmation and information dialogs. Internally it uses MatDialog to create and show the dialog. "),t(),i(25,"h2"),e(26,"Module"),t(),i(27,"textarea",14),e(28,`            import { AxiomaimConfirmationModule } from '@axiomaim/services/confirmation';
        `),t(),i(29,"h2"),e(30,"Confirmation Config"),t(),i(31,"p"),e(32," Here is the interface for the "),i(33,"em"),e(34,"Confirmation configuration"),t(),e(35,": "),t(),i(36,"textarea",14),e(37,`            export interface AxiomaimConfirmationConfig
            {
                title?: string;
                message?: string;
                icon?: {
                    show?: boolean;
                    name?: string;
                    color?:
                        | 'primary'
                        | 'accent'
                        | 'warn'
                        | 'basic'
                        | 'info'
                        | 'success'
                        | 'warning'
                        | 'error';
                };
                actions?: {
                    confirm?: {
                        show?: boolean;
                        label?: string;
                        color?:
                            | 'primary'
                            | 'accent'
                            | 'warn';
                    };
                    cancel?: {
                        show?: boolean;
                        label?: string;
                    };
                };
                dismissible?: boolean;
            }
        `),t(),i(38,"div",15)(39,"table")(40,"thead")(41,"tr")(42,"th"),e(43,"Name"),t(),i(44,"th"),e(45,"Description"),t()()(),i(46,"tbody")(47,"tr")(48,"td",16)(49,"div"),e(50,"title"),t()(),i(51,"td"),e(52," Title of the confirmation dialog, HTML is allowed. "),t()(),i(53,"tr")(54,"td",16)(55,"div"),e(56,"message"),t()(),i(57,"td"),e(58," Message of the confirmation dialog, HTML is allowed. "),t()(),i(59,"tr")(60,"td",16)(61,"div"),e(62,"icon.show"),t()(),i(63,"td"),e(64,"Whether to show the icon."),t()(),i(65,"tr")(66,"td",16)(67,"div"),e(68,"icon.name"),t()(),i(69,"td"),e(70,"Name of the icon."),t()(),i(71,"tr")(72,"td",16)(73,"div"),e(74,"icon.color"),t()(),i(75,"td"),e(76,"Color of the icon."),t()(),i(77,"tr")(78,"td",16)(79,"div"),e(80,"actions.confirm.show"),t()(),i(81,"td"),e(82,"Whether to show the confirmation button."),t()(),i(83,"tr")(84,"td",16)(85,"div"),e(86,"actions.confirm.label"),t()(),i(87,"td"),e(88,"Label of the confirmation button."),t()(),i(89,"tr")(90,"td",16)(91,"div"),e(92,"actions.confirm.color"),t()(),i(93,"td"),e(94,"Color of the confirmation button."),t()(),i(95,"tr")(96,"td",16)(97,"div"),e(98,"actions.cancel.show"),t()(),i(99,"td"),e(100,"Whether to show the cancel button."),t()(),i(101,"tr")(102,"td",16)(103,"div"),e(104,"actions.confirm.label"),t()(),i(105,"td"),e(106,"Label of the cancel button."),t()(),i(107,"tr")(108,"td",16)(109,"div"),e(110,"dismissible"),t()(),i(111,"td"),e(112," Sets the dismissible status of the confirmation dialog."),s(113,"br"),e(114," If "),i(115,"code"),e(116,"false"),t(),e(117,", confirmation dialog cannot be closed by clicking on backdrop or pressing Escape key. The close button on the top right corner also won't show up. "),t()()()()(),i(118,"h2"),e(119,"Methods"),t(),i(120,"div",17)(121,"div",18),e(122," open(config: AxiomaimConfirmationConfig): MatDialogRef<AxiomaimConfirmationDialogComponent> "),t(),i(123,"div",19),e(124," Opens the confirmation dialog with the given configuration "),t()(),i(125,"h2"),e(126,"MatDialogRef"),t(),i(127,"p"),e(128," Since "),i(129,"code"),e(130,"AxiomaimConfirmationService"),t(),e(131," uses "),i(132,"em"),e(133,"MatDialog"),t(),e(134," behind the scenes, it returns a reference to the created dialog. You can use all available methods from that reference such as "),i(135,"code"),e(136,"updateSize"),t(),e(137," and "),i(138,"code"),e(139,"updatePosition"),t(),e(140," to further customize the dialog. "),t(),i(141,"p"),e(142," See "),i(143,"a",20),e(144," https://material.angular.io/components/dialog/api#MatDialogRef "),t(),e(145," for the complete list of available methods. "),t(),i(146,"p"),e(147,"Using the reference, you can also access to the user input:"),t(),i(148,"textarea",21),e(149,`            // Open the confirmation and save the reference
            const dialogRef = this._axiomaimConfirmationService.open({...});

            // Subscribe to afterClosed from the dialog reference
            dialogRef.afterClosed().subscribe((result) => {
                console.log(result);
            });
        `),t(),i(150,"div",15)(151,"table")(152,"thead")(153,"tr")(154,"th"),e(155,"Result"),t(),i(156,"th"),e(157,"Description"),t()()(),i(158,"tbody")(159,"tr")(160,"td",16)(161,"div")(162,"code"),e(163,"'confirmed'"),t()()(),i(164,"td"),e(165," This is the result if the user pressed the Confirm button. "),t()(),i(166,"tr")(167,"td",16)(168,"div")(169,"code"),e(170,"'cancelled'"),t()()(),i(171,"td"),e(172," This is the result if the user pressed the Cancel button. "),t()(),i(173,"tr")(174,"td",16)(175,"div")(176,"code"),e(177,"undefined"),t()()(),i(178,"td"),e(179," This is the result if the confirmation dismissed either using the close button, clicking on the backdrop or pressing the Escape key. "),t()()()()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"),r(129),l("lang","ts"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var It=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["media-watcher"]],decls:45,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Services"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Media Watcher "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"AxiomaimMediaWatcherService"),t(),e(24," is a singleton service to watch media changes. It automatically registers the breakpoints from TailwindCSS configuration, so you can use the service without needing to configure it first. "),t(),i(25,"h2"),e(26,"Module"),t(),i(27,"textarea",14),e(28,`            import { AxiomaimMediaWatcherModule } from '@axiomaim/services/media-watcher';
        `),t(),i(29,"h2"),e(30,"Methods"),t(),i(31,"p"),e(32," To watch changes on registered breakpoints, you can use the "),i(33,"strong"),e(34,"onMediaChange$"),t(),e(35," getter: "),t(),i(36,"textarea",14),e(37,`            import { AxiomaimMediaWatcherService } from '@axiomaim/services/config';

            private _axiomaimMediaWatcherService = inject(AxiomaimMediaWatcherService);

            /**
             * Constructor
             */
            constructor()
            {
                // Subscribe to media changes
                this._axiomaimMediaWatcherService.onMediaChange$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(({matchingAliases}) => {

                        // Check if the breakpoint is 'md' and up
                        this.isScreenSmall = matchingAliases.includes('md');
                    });
            }
        `),t(),i(38,"p"),e(39," You can also listen for custom media queries using "),i(40,"code"),e(41,"onMediaQueryChange$(query: string)"),t(),e(42," method: "),t(),i(43,"textarea",14),e(44,`            import { AxiomaimMediaWatcherService } from '@axiomaim/services/config';

            private _axiomaimMediaWatcherService = inject(AxiomaimMediaWatcherService);

            /**
             * Constructor
             */
            constructor()
            {
                // Subscribe to media changes
                this._axiomaimMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((state) => {

                        // Calculate the drawer mode
                        this.drawerMode = state.matches ? 'side' : 'over';
                    });
            }
        `),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var At=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["splash-screen"]],decls:41,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","mt-4","rounded","shadow"],[1,"text-secondary","border-b","px-6","py-3","font-mono"],[1,"p-6"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Services"),t()()(),i(15,"div",9)(16,"h2",10),e(17," Splash Screen "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p")(22,"strong"),e(23,"AxiomaimSplashScreenService"),t(),e(24," is a singleton service to control the splash screen. By default, the splash screen goes away automatically as soon as Angular loads for the first time but, you can still show or hide it using the service afterwards. "),t(),i(25,"h2"),e(26,"Module"),t(),i(27,"textarea",14),e(28,`            import { AxiomaimSplashScreenModule } from '@axiomaim/services/splash-screen';
        `),t(),i(29,"h2"),e(30,"Methods"),t(),i(31,"div",15)(32,"div",16),e(33," show(): void "),t(),i(34,"div",17),e(35,"Shows the splash screen."),t()(),i(36,"div",15)(37,"div",16),e(38," hide(): void "),t(),i(39,"div",17),e(40,"Hides the splash screen."),t()()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var Mt=(()=>{class o{constructor(n){this._axiomaimComponentsComponent=n}toggleDrawer(){this._axiomaimComponentsComponent.matDrawer.toggle()}static{this.\u0275fac=function(a){return new(a||o)(x(v))}}static{this.\u0275cmp=u({type:o,selectors:[["must-match"]],decls:82,vars:3,consts:[[1,"flex","min-w-0","flex-auto","flex-col"],[1,"bg-card","flex","flex-0","flex-col","border-b","p-6","dark:bg-transparent","sm:flex-row","sm:items-center","sm:justify-between","sm:px-10","sm:py-8"],[1,"min-w-0","flex-1"],[1,"flex","flex-wrap","items-center","font-medium"],[1,"whitespace-nowrap","text-primary-500"],[1,"ml-1","flex","items-center","whitespace-nowrap"],[1,"text-secondary","icon-size-5",3,"svgIcon"],[1,"ml-1","text-primary-500"],[1,"text-secondary","ml-1"],[1,"mt-2"],[1,"truncate","text-3xl","font-extrabold","leading-7","tracking-tight","sm:leading-10","md:text-4xl"],["mat-icon-button","",1,"order-first","-ml-3","mb-2","sm:order-last","sm:mb-0","sm:ml-0",3,"click"],[3,"svgIcon"],[1,"prose","prose-sm","max-w-3xl","flex-auto","p-6","sm:p-10"],["axiomaim-highlight","","lang","typescript"],[1,"bg-card","mb-4","rounded","px-6","py-3","shadow"],[1,"text-secondary","font-mono","text-md"],["axiomaim-highlight","","lang","html"]],template:function(a,m){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"a",4),e(6,"Documentation"),t()(),i(7,"div",5),s(8,"mat-icon",6),i(9,"a",7),e(10,"Axiomaim Components"),t()(),i(11,"div",5),s(12,"mat-icon",6),i(13,"span",8),e(14,"Validators"),t()()(),i(15,"div",9)(16,"h2",10),e(17," mustMatch "),t()()(),i(18,"button",11),c("click",function(){return m.toggleDrawer()}),s(19,"mat-icon",12),t()(),i(20,"div",13)(21,"p"),e(22," The "),i(23,"code"),e(24,"mustMatch"),t(),e(25," validator can be used to check if two different form fields has the same value. For example, a "),i(26,"strong"),e(27,"Confirm password"),t(),e(28," should have the same value with the "),i(29,"strong"),e(30,"Password"),t(),e(31," field. To validate that, the "),i(32,"code"),e(33,"mustMatch"),t(),e(34," validator can be used. "),t(),i(35,"h3"),e(36,"Usage"),t(),i(37,"textarea",14),e(38,`            AxiomaimValidators.mustMatch(controlPath, matchingControlPath)
        `),t(),i(39,"h3"),e(40,"Parameters"),t(),i(41,"div",15)(42,"table")(43,"thead")(44,"tr")(45,"th"),e(46,"Name"),t(),i(47,"th"),e(48,"Description"),t()()(),i(49,"tbody")(50,"tr")(51,"td",16)(52,"div"),e(53,"controlPath: string"),t()(),i(54,"td"),e(55," A dot-delimited string values that define the path to the control. "),t()(),i(56,"tr")(57,"td",16)(58,"div"),e(59,"matchingControlPath: string"),t()(),i(60,"td"),e(61," A dot-delimited string values that define the path to the matching control. "),t()()()()(),i(62,"p"),e(63," Because the "),i(64,"code"),e(65,"mustMatch"),t(),e(66," validator requires parameters, it must be used within the "),i(67,"code"),e(68,"validators"),t(),e(69," option of the form builder: "),t(),i(70,"textarea",14),e(71,`            import { AxiomaimValidators } from '@axiomaim/validators';

            // Create the reset password form
            this.resetPasswordForm = this._formBuilder.group(
                {
                    password       : ['', Validators.required],
                    passwordConfirm: ['', Validators.required]
                },
                {
                    validators: AxiomaimValidators.mustMatch('password', 'passwordConfirm')
                }
            );
        `),t(),i(72,"p"),e(73," To show an error message on the field, the "),i(74,"code"),e(75,"mat-error"),t(),e(76," element can be used within the "),i(77,"code"),e(78,"mat-form-field"),t(),e(79,": "),t(),i(80,"textarea",17),e(81,`            <mat-error *ngIf="resetPasswordForm.get('passwordConfirm').hasError('mustMatch')">
                Passwords must match
            </mat-error>
        `),t()()()),a&2&&(r(8),l("svgIcon","heroicons_mini:chevron-right"),r(4),l("svgIcon","heroicons_mini:chevron-right"),r(7),l("svgIcon","heroicons_outline:bars-3"))},dependencies:[S,b,_,f,y],encapsulation:2})}}return o})();var Za=[{path:"",component:v,children:[{path:"",pathMatch:"full",redirectTo:"libraries/mock-api"},{path:"libraries",children:[{path:"mock-api",component:wt}]},{path:"components",children:[{path:"",pathMatch:"full",redirectTo:"alert"},{path:"alert",component:dt},{path:"card",component:ct},{path:"drawer",component:pt},{path:"fullscreen",component:ht},{path:"highlight",component:xt},{path:"loading-bar",component:_t},{path:"masonry",component:bt},{path:"navigation",component:St}]},{path:"directives",children:[{path:"",pathMatch:"full",redirectTo:"scrollbar"},{path:"scrollbar",component:Et},{path:"scroll-reset",component:yt}]},{path:"services",children:[{path:"",pathMatch:"full",redirectTo:"config"},{path:"config",component:kt},{path:"confirmation",component:Tt},{path:"splash-screen",component:At},{path:"media-watcher",component:It}]},{path:"pipes",children:[{path:"",pathMatch:"full",redirectTo:"find-by-key"},{path:"find-by-key",component:Ct}]},{path:"validators",children:[{path:"",pathMatch:"full",redirectTo:"must-match"},{path:"must-match",component:Mt}]}]}];export{Za as default};
