const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body;t.addEventListener("click",(function(){a=setInterval((()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),o(!0)})),e.addEventListener("click",(function(){clearInterval(a),n.style=!1,o(!1)}));let a=null;function o(n){t.disabled=n,e.disabled=!n}o(!1);
//# sourceMappingURL=01-color-switcher.110bef1c.js.map
