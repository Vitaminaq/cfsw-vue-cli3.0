const e=e=>e>9?String(e):`0${e}`,t=(t,r)=>{const g=new Date;return g.setTime(t),r.replace(/yyyy|YYYY/,String(g.getFullYear())).replace(/yy|YY/,String(g.getFullYear())).replace(/MM/,e(g.getMonth()+1)).replace(/M/g,String(g.getMonth()+1)).replace(/dd|DD/,e(g.getDate())).replace(/d|D/g,String(g.getDate())).replace(/hh|HH/,e(g.getHours())).replace(/h|H/g,String(g.getHours())).replace(/mm/,e(g.getMinutes())).replace(/m/g,String(g.getMinutes())).replace(/ss|SS/,e(g.getSeconds())).replace(/s|S/g,String(g.getSeconds()))},r=function(e){if(!e)return;const t=new Date(e),r=(new Date).getTime()-t.getTime();return r<0?void 0:r/1e3<30?"刚刚":r/1e3<60?`${(r/1e3).toFixed(0)}秒前`:r/6e4<60?`${(r/6e4).toFixed(0)}分钟前`:r/36e5<24?`${(r/36e5).toFixed(0)}小时前`:r/864e5<31?`${(r/864e5).toFixed(0)}天前`:r/2592e6<12?`${(r/2592e6).toFixed(0)}月前`:`${(r/31536e6).toFixed(0)}年前`};export{t as f,r as t};
