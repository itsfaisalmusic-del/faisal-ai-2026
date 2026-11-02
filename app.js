const $ = id => document.getElementById(id);
const titles = {chat:"AI Chat",photo:"Photo Studio",video:"Video Studio",voice:"Voice Assistant"};
const CHAT_KEY = "faisal_ai_chat_v2";
let chatLog = [];
function showPage(page){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll("[data-page]").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
  $(page).classList.add("active");
  $("topTitle").innerHTML = titles[page] + ' <span class="model-pill">V2.0</span>';
  closeMenu();
}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
function openMenu(){$("sidebar").classList.add("open");$("scrim").classList.add("show")}
function closeMenu(){$("sidebar").classList.remove("open");$("scrim").classList.remove("show")}
$("openSidebar").onclick=openMenu; $("closeSidebar").onclick=closeMenu; $("scrim").onclick=closeMenu;
$("attachPhoto").onclick=()=>showPage("photo");
document.querySelectorAll(".suggestions button").forEach(b=>b.onclick=()=>{$("prompt").value=b.dataset.prompt;$("prompt").focus()});

function addMessage(message, who, save=true){
  if(who==="bot"){
    const row=document.createElement("div"); row.className="message-row";
    const av=document.createElement("div"); av.className="bot-avatar"; av.textContent="✦";
    const bubble=document.createElement("div"); bubble.className="bubble bot"; bubble.textContent=message;
    row.append(av,bubble); $("messages").appendChild(row);
  } else {
    const bubble=document.createElement("div"); bubble.className="bubble user"; bubble.textContent=message;
    $("messages").appendChild(bubble);
  }
  $("messages").scrollTop=$("messages").scrollHeight;
  if(save){chatLog.push({message,who}); try{localStorage.setItem(CHAT_KEY,JSON.stringify(chatLog.slice(-60)))}catch(e){}}
}
function restoreChat(){
  try{
    const saved=JSON.parse(localStorage.getItem(CHAT_KEY)||"[]");
    if(Array.isArray(saved)&&saved.length){chatLog=saved.slice(-60);$("messages").innerHTML="";chatLog.forEach(x=>addMessage(x.message,x.who,false));}
  }catch(e){chatLog=[]}
}
function demoReply(text){
  const s=text.toLowerCase();
  if(/salam|assalam|hello|hi\b/.test(s)) return "Wa Alaikum Assalam! Main FAISAL AI demo mode mein hoon. Batao, kis kaam mein madad chahiye?";
  if(/poster|photo|image|picture|design/.test(s)) return "Professional poster ke liye: 1) clear high-quality photo select karo, 2) subject ko center ya rule-of-thirds par rakho, 3) 2 se zyada fonts na use karo, 4) title ko readable rakho, 5) PNG export karo. Photo Studio kholo aur apni images upload karo.";
  if(/video|reel|edit/.test(s)) return "Short video plan: pehle 2 seconds mein strong hook, phir 3–4 short scenes, readable captions, clean transitions aur end par clear call-to-action. Video Studio abhi preview aur selected range playback support karta hai.";
  if(/idea|suggest/.test(s)) return "Aaj ka idea: apne shehar ki 5 khoobsurat jagahon par 15-second cinematic reels banao. Har reel mein location name, 2 establishing shots aur ek short Roman Urdu voiceover rakho.";
  if(/voice|awaaz|bol/.test(s)) return "Voice Assistant tab kholo aur Start speaking dabao. Browser microphone permission maangega. Speech recognition device aur browser support par depend karti hai.";
  return "Main FAISAL AI ka V2 interface hoon. Abhi demo mode active hai, is liye main local guidance de sakta hoon. Real intelligent answers ke liye secure server-side AI endpoint connect karna hoga.";
}
async function askAI(text){
  // Optional secure backend endpoint. No API key is stored in this browser code.
  try{
    const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,history:chatLog.slice(-12)})});
    if(response.ok){const data=await response.json();if(data.reply)return data.reply;}
  }catch(e){}
  $("connectionStatus").textContent="DEMO MODE";
  return demoReply(text);
}
async function sendMessage(){
  const text=$("prompt").value.trim(); if(!text)return;
  addMessage(text,"user"); $("prompt").value=""; $("send").disabled=true;
  const typing=document.createElement("div");typing.className="message-row";typing.id="typing";
  const av=document.createElement("div");av.className="bot-avatar";av.textContent="✦";
  const b=document.createElement("div");b.className="bubble bot";b.textContent="FAISAL AI soch raha hai…";
  typing.append(av,b);$("messages").appendChild(typing);$("messages").scrollTop=$("messages").scrollHeight;
  const reply=await askAI(text);typing.remove();addMessage(reply,"bot");$("send").disabled=false;
}
$("send").onclick=sendMessage;
$("prompt").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage()}});
$("newChat").onclick=()=>{chatLog=[];try{localStorage.removeItem(CHAT_KEY)}catch(e){}$("messages").innerHTML="";addMessage("New chat shuru ho gayi! Batao, aaj kya create karna hai?","bot");showPage("chat")};
$("clearChat").onclick=()=>{if(!confirm("Chat history clear karni hai?"))return;chatLog=[];try{localStorage.removeItem(CHAT_KEY)}catch(e){}$("messages").innerHTML="";addMessage("Chat clear ho gayi. Naya sawal poochho!","bot")};
restoreChat();

// Photo studio
const canvas=$("photoCanvas"),ctx=canvas.getContext("2d");let imgA=null,imgB=null;
function coverImage(img,x,y,w,h){
  const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale,sx=(img.width-sw)/2,sy=(img.height-sh)/2;
  ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
}
function draw(){
  const grad=ctx.createLinearGradient(0,0,900,600);grad.addColorStop(0,"#20183e");grad.addColorStop(1,"#101827");ctx.fillStyle=grad;ctx.fillRect(0,0,900,600);
  if(imgA)coverImage(imgA,0,0,450,600);else{ctx.fillStyle="#b7a8ff";ctx.font="28px sans-serif";ctx.textAlign="center";ctx.fillText("First photo",225,300)}
  if(imgB)coverImage(imgB,450,0,450,600);else{ctx.fillStyle="#b7a8ff";ctx.font="28px sans-serif";ctx.textAlign="center";ctx.fillText("Second photo",675,300)}
  ctx.fillStyle="#09071388";ctx.fillRect(0,510,900,90);
}
function loadImage(file,side){if(!file)return;const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{if(side==="A")imgA=im;else imgB=im;draw();URL.revokeObjectURL(u)};im.onerror=()=>URL.revokeObjectURL(u);im.src=u}
$("photoA").onchange=e=>loadImage(e.target.files[0],"A");
$("photoB").onchange=e=>loadImage(e.target.files[0],"B");
$("addText").onclick=()=>{const t=$("overlayText").value.trim();if(!t)return;draw();ctx.font="bold 48px system-ui,sans-serif";ctx.textAlign="center";ctx.lineJoin="round";ctx.lineWidth=7;ctx.strokeStyle="#090713";ctx.fillStyle="#fff";ctx.strokeText(t,450,558,840);ctx.fillText(t,450,558,840)};
$("downloadPhoto").onclick=()=>{const a=document.createElement("a");a.download="FAISAL-AI-creation.png";a.href=canvas.toDataURL("image/png");a.click()};
draw();

// Video preview and selected-range playback
let videoUrl=null;
$("videoFile").onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  if(videoUrl)URL.revokeObjectURL(videoUrl);
  videoUrl=URL.createObjectURL(f);$("videoPreview").src=videoUrl;
  $("videoPreview").onloadedmetadata=()=>{$("trimEnd").value=Math.floor($("videoPreview").duration);$("videoStatus").textContent="Video ready · "+$("videoPreview").duration.toFixed(1)+" seconds. MP4 export is not included."};
};
$("playClip").onclick=async()=>{
  const v=$("videoPreview"),start=Math.max(0,Number($("trimStart").value)||0),end=Math.min(v.duration,Number($("trimEnd").value)||v.duration);
  if(!v.src||!Number.isFinite(v.duration)){$("videoStatus").textContent="Pehle video select karo.";return}
  if(end<=start){$("videoStatus").textContent="End time, start time se bara hona chahiye.";return}
  v.currentTime=start;
  try{await v.play();$("videoStatus").textContent="Selected range playing.";const stop=()=>{if(v.currentTime>=end){v.pause();v.removeEventListener("timeupdate",stop)}};v.addEventListener("timeupdate",stop)}
  catch(e){$("videoStatus").textContent="Playback start nahi ho saka."}
};

// Voice tools
$("startVoice").onclick=()=>{
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){$("voiceText").textContent="Speech recognition is browser/device par supported nahi. Chrome Android mein try karo.";return}
  const r=new SR();r.lang="ur-PK";r.interimResults=false;r.onresult=e=>{const t=e.results[0][0].transcript;$("voiceText").textContent=t;$("prompt").value=t;showPage("chat");sendMessage()};
  r.onerror=e=>$("voiceText").textContent="Mic error: "+e.error;r.start();$("voiceText").textContent="Sun raha hoon... bolo!";
};
$("speakReply").onclick=()=>{
  if(!("speechSynthesis"in window)){$("voiceText").textContent="Speech output supported nahi.";return}
  const u=new SpeechSynthesisUtterance("Assalam o Alaikum. Main FAISAL AI hoon. Aap kaise hain?");u.lang="ur-PK";speechSynthesis.cancel();speechSynthesis.speak(u);
};
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
