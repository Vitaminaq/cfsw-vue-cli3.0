import{g as t,p as o,i as e,o as n,c as a,j as s,t as i,w as r,r as c,u as A}from"./vendor.fa45f8ae.js";const l="UFTBZ-HATC6-VYESI-MSJXK-YIAQ7-IEBRU";let d=0;const w=async t=>{const{location:o,get_poi:e=0}=t,n=await(a=`https://apis.map.qq.com/ws/geocoder/v1/?location=${o}&get_poi=${e}`,new Promise((t=>{if("undefined"==typeof window)return;const o=document.createElement("script"),e=`__JsonpCallBack__${d}`;d++,window[e]=n=>{t(n),delete window[e],document.body.removeChild(o)};const n=`${a}&output=jsonp&callback=${e}&key=${l}`;o.src=n,document.body.appendChild(o)})));var a;let s=null;if(0===n.status){const{formatted_addresses:t,address_reference:o,address:e,ad_info:a,address_component:i}=n.result;s={name:t.recommend||o.landmark_l2.title||e,city:i.city||a.city}}return s};class m{constructor(){if("undefined"==typeof window)throw Error("此方法暂不支持在服务端运行");this.geolocation=new window.qq.maps.Geolocation(l,"kbb")}getLocation(){return new Promise((t=>{this.geolocation.getLocation((o=>{t(o)}),(o=>{console.log("自动定位失败",o),t(null)}),{timeout:8e3})}))}}var g=t({computed:{taxiStore(){return this.$store.taxi},startAddress(){return this.taxiStore.startAddress},driversText:({driversNum:t})=>t?t<=3?"附近车辆较少":"一分钟上车":"附近暂无车辆"},watcher:{async startAddress(t){console.log(t,"wwwwwwwwwwwwwwwwwwww"),this.startAddress}}});const p=r();o("data-v-317e9e77");const u={class:"board-mark"},h={class:"mark-text-contain"},f=s("img",{class:"point-icon",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABICAMAAACHrYYZAAAApVBMVEUAAAAAmWb///8AqoAAonQAo3oAo3gAn3X///8Ao3YAoXUAo3YAoncAoXYAoXcAonf///////8AoXf///8AoncAoXb///8AoXYAonYAoXf///8AoXYAoXYAoXYAoXX///8AoXUAonYAiGMAnXMAoHUAoXYBfl0BgF4BjmgGo3kMpXwbq4Qbq4Uwso83tZNsybGS1sTH6+HP7eXj9PDy+vj4/Pv///+YG74UAAAAInRSTlMABQYSFhkkJStQV2ZrdY2Pj5O2vMjO1Nvr8fLz9Pj8/P7+eooLYAAAAcFJREFUSMftltl6gjAQheOuqAiKoqC4wBSkVVzz/o/WENcalBm/9q7nwovM/DJJTiZh7FFlrdO1h5PJ0O52tDLLUallzeBOM6tVepFe0cegaKxXnqQX2i5kym0XsvKrfXiqflXNb4zghUaNx/ymBy/lNR/y55Cj+Q+i4UGuvLuqaiNAaFS7rmcfUOpfVrcNSLXP++tiAfe05zqgpUu/jfHAOHViCwhqCcCiAJY4LzMKMCszLWN4mWwPh22yzAhprKMOfu241O5TjXVYV/3/c74g1G90ma2MJfyqRAnabKiMbW/AVgkO2UQZO9yAgxKc0AFySeRJk5eVvHFka5DNR7Y3/QCRjyi5CdDbDLmR0VslthlX32/39AuFfmXRL0Ux81fXbu03Lnb60+GNx8nt+SPPO+b5c1EKMIr+gT8A6kYKGHVketGc8hTgU7OIyu/x4yYFNkfewxAm369OzlvtuYmof3pcQZDmB7A6TvPnYXBRT5QC4mfDjVxgwNcAoQ/ghwBrPsgFHB4LYOH7CwHE3MEB0YdQhANkSUEUhlGAK0lO+iLMpOWynoVaVvLGnayxjuM11hrSfFJI80l7DxxnkG3vb4FILZkgFnNQAAAAAElFTkSuQmCC"},null,-1);e();const C=p(((t,o,e,r,c,A)=>(n(),a("div",u,[s("div",h,i(t.startAddress.name),1),f]))));g.render=C,g.__scopeId="data-v-317e9e77";var L=t({components:{BoardPoint:g},data:()=>({geolocation:null,map:null,certerPoint:{lat:0,lng:0,name:"定位中"},timer:0}),computed:{taxiStore(){return this.$store.taxi}},async mounted(){const t=await this.getLocation();if(!t)return;const{lat:o,lng:e}=t;this.getCenterDetail();const n=new window.TMap.LatLng(o,e);this.map=new window.TMap.Map("map",{center:n,zoom:17.2}),this.map.on("center_changed",(()=>{this.onCenterChange()})),this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ZOOM),this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.SCALE),this.map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ROTATION)},methods:{onCenterChange(){this.getCenterDetail()},async getCenterDetail(){clearTimeout(this.timer),this.timer=setTimeout((async()=>{const{lat:t,lng:o}=this.map.getCenter(),e=await w({location:`${t},${o}`});if(e){const{city:n,name:a}=e;this.taxiStore.$setStartAddress({lat:t,lng:o,name:a})}}),300)},async getLocation(){this.geolocation||(this.geolocation=new m);return await this.geolocation.getLocation()},async backCurrentLocation(){const t=await this.getLocation();if(!t)return;const{lat:o,lng:e}=t,n=new window.TMap.LatLng(o,e);this.map.easeTo({center:n})}}});const v=r();o("data-v-6726bca5");const y={class:"map-container"},X=s("div",{id:"map"},null,-1);e();const O=v(((t,o,e,i,r,l)=>{const d=c("BoardPoint");return n(),a("div",y,[X,s(d),s("div",{class:"current-location",onClick:o[1]||(o[1]=A(((...o)=>t.backCurrentLocation&&t.backCurrentLocation(...o)),["stop"]))}," 回到当前位置 ")])}));L.render=O,L.__scopeId="data-v-6726bca5";export default L;
