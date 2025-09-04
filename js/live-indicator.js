/**
 * Unified Live Stream Indicator
 * Reads schedule from live.json and shows a LIVE badge during configured windows.
 * URL overrides (persist + localStorage): ?live=on | off | test | clear
 * Helpers: window.__liveIndicatorRefresh(), window.__liveIndicatorEval(), window.__liveIndicatorForce(val)
 */
(function() {
  const CONFIG_URL = 'live.json';            // Relative so it works under a subdirectory (e.g. GitHub Pages)
  const LS_KEY = 'liveIndicatorOverride';
  const DAY_MAP = { sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6 };
  let config = null;
  let lastStatus = null;

  function qp(name){
    const p=new URLSearchParams(window.location.search);
    return p.get(name);
  }
  function applyUrlOverride() {
    const v = qp('live');
    if(!v) return;
    if (v === 'clear') localStorage.removeItem(LS_KEY);
    else if (['on','off','test'].includes(v)) localStorage.setItem(LS_KEY, v);
  }
  function getOverride() { return localStorage.getItem(LS_KEY) || null; }

  function nowInTZ(tz){
    const d = new Date();
    const parts = new Intl.DateTimeFormat('en-US',{
      timeZone: tz,
      hour12:false,
      weekday:'long',
      hour:'2-digit',
      minute:'2-digit'
    }).formatToParts(d);
    const m={};parts.forEach(p=>{ if(p.type!=='literal') m[p.type]=p.value;});
    const wd = m.weekday.toLowerCase();
    return {
      dayNumber: DAY_MAP[wd],
      minutes: parseInt(m.hour,10)*60 + parseInt(m.minute,10),
      iso: d.toISOString()
    };
  }
  function parseHM(str){
    const [h,m]=str.split(':').map(Number);
    return h*60+m;
  }
  function isLiveSchedule(){
    if(!config || !config.schedule) return false;
    const tz = config.timezone || 'UTC';
    const now = nowInTZ(tz);
    for(const slot of config.schedule){
      if(!slot.day||!slot.start||!slot.end) continue;
      const dn = DAY_MAP[slot.day.toLowerCase()];
      if(dn === undefined || dn !== now.dayNumber) continue;
      const s = parseHM(slot.start);
      const e = parseHM(slot.end);
      if(now.minutes >= s && now.minutes <= e) return true;
    }
    return false;
  }
  function ensureEl(){
    let el = document.getElementById('liveStreamIndicator');
    if(!el){
      const headerContainer = document.querySelector('header .container') || document.body;
      el = document.createElement('a');
      el.id='liveStreamIndicator';
      el.className='live-indicator';
      el.href = (config && config.target) ? config.target : 'live.html';
      el.setAttribute('aria-label','Live Stream (Currently Live)');
      el.innerHTML='<span class="live-dot"></span><span class="live-label"></span>';
      const logo = headerContainer.querySelector('.logo');
      if(logo && logo.parentNode===headerContainer){
        headerContainer.insertBefore(el, logo.nextSibling);
      } else {
        headerContainer.appendChild(el);
      }
    }
    const labelSpan = el.querySelector('.live-label');
    if(labelSpan) labelSpan.textContent = (config && config.label) ? config.label : 'LIVE';
    return el;
  }
  function setVisible(show, overrideMode){
    if(show){
      const el=ensureEl();
      el.style.display='flex';
      if(overrideMode==='test'){
        el.dataset.override='test';
        el.style.outline='1px dashed #fff';
      } else {
        el.dataset.override='';
        el.style.outline='';
      }
    } else {
      const el=document.getElementById('liveStreamIndicator');
      if(el && el.parentNode) el.parentNode.removeChild(el);
    }
  }
  function evaluate(){
    const override = getOverride();
    let live=false, source='schedule';
    if(override==='on' || override==='test'){ live=true; source='override'; }
    else if(override==='off'){ live=false; source='override'; }
    else live = isLiveSchedule();
    return {live, source, override};
  }
  function render(){
    const st = evaluate();
    if(!lastStatus || lastStatus.live!==st.live || lastStatus.override!==st.override){
      setVisible(st.live, st.override);
    }
    lastStatus = st;
  }
  async function fetchConfig(){
    try{
      const r = await fetch(CONFIG_URL,{cache:'no-store'});
      if(!r.ok) throw new Error('HTTP '+r.status);
      config = await r.json();
    } catch(e){
      console.warn('[live-indicator] config load failed:', e);
      if(!config) config = { label:'LIVE', target:'live.html', schedule:[], timezone:'UTC', pollMinutes:5 };
    }
  }
  async function init(){
    applyUrlOverride();
    await fetchConfig();
    render();
    const iv = (config.pollMinutes && Number(config.pollMinutes)>0) ? Number(config.pollMinutes) : 5;
    setInterval(render, iv*60*1000);
  }

  window.__liveIndicatorRefresh = async ()=>{ await fetchConfig(); render(); };
  window.__liveIndicatorEval = evaluate;
  window.__liveIndicatorForce = (val)=>{
    if(val===null) localStorage.removeItem(LS_KEY);
    else localStorage.setItem(LS_KEY,val);
    render();
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
