/* Stage 16.18 Version 8 test (Topic 1 + Topic 2 source-aware): independent, local-first lesson speech controls. No course content changes. */
(()=>{
  'use strict';
  const synth=window.speechSynthesis;
  const lesson=document.getElementById('lessonContent');
  if(!lesson)return;
  const panel=document.createElement('section');
  panel.id='readAloudPanel';
  panel.setAttribute('aria-label','Read aloud controls');
  panel.style.cssText='max-width:860px;margin:18px 0;padding:16px;border:1px solid var(--border,#ccc);border-radius:14px;background:var(--surface,#fff);line-height:1.6';
  panel.innerHTML=`<strong>Read Aloud / 朗读功能 / Lǎngdú gōngnéng</strong>
    <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:10px">
      <label for="ttsLanguage">Language / 语言 / Yǔyán</label>
      <select id="ttsLanguage"><option value="en">English</option><option value="zh">中文 Mandarin</option><option value="both">English + 中文</option></select>
      <label for="ttsVoice">Voice / 声音 / Shēngyīn</label>
      <select id="ttsVoice" aria-label="Speech voice"><option value="auto">Automatic (offline preferred)</option></select>
      <label for="ttsSpeed">Speed / 速度 / Sùdù</label>
      <select id="ttsSpeed"><option value="0.6">0.6× Slow</option><option value="1" selected>1× Normal</option><option value="1.5">1.5× Fast</option></select>
      <button type="button" id="ttsPlay">▶ Play / 播放</button>
      <button type="button" id="ttsPause">⏸ Pause / 暂停</button>
      <button type="button" id="ttsResume">↪ Resume / 继续</button>
      <button type="button" id="ttsStop">■ Stop / 停止</button>
    </div>
    <p id="ttsStatus" role="status" aria-live="polite" style="margin:10px 0 0;font-size:.9rem">Ready / 已准备 / Yǐ zhǔnbèi</p>`;
  panel.querySelectorAll('button,select').forEach(el=>{el.style.cssText='min-height:44px;padding:8px;border:1px solid var(--border,#aaa);border-radius:8px;background:var(--surface2,#eee);color:var(--text,#222)';});
  lesson.parentNode.insertBefore(panel,lesson);
  const status=panel.querySelector('#ttsStatus');
  const setStatus=s=>{status.textContent=s;};
  if(!synth||!('SpeechSynthesisUtterance' in window)){
    panel.querySelectorAll('button').forEach(b=>b.disabled=true);
    setStatus('Speech playback is not supported by this browser. / 此浏览器不支持语音播放。');
    return;
  }
  let queue=[], index=0, token=0, active=false;
  // Topic 4 uses three consecutive spans for English, Mandarin and pinyin.
  // The pinyin span has no class or lang attribute, so Latin-script detection
  // alone is not sufficient to distinguish it from English.
  function locale(node){
    const parent=node.parentElement;
    if(!parent)return null;
    if(parent.closest('#readAloudPanel,#topic4QuizArea,details,button,script,style,.py,[class*="-py"],.t3v2-py'))return null;
    if(parent.closest('[lang^="zh"],.cn,.t3v2-zh'))return 'zh';
    const spans=parent.parentElement ? Array.from(parent.parentElement.children).filter(e=>e.tagName==='SPAN') : [];
    if(parent.tagName==='SPAN' && spans.length===3){
      const position=spans.indexOf(parent);
      if(position===0)return 'en';
      if(position===1)return 'zh';
      if(position===2)return null;
    }
    const text=node.textContent.trim();
    if(!text)return null;
    if(/[\u3400-\u9fff]/.test(text))return 'zh';
    return 'en';
  }
  // Topic 2 has mixed-language strings in its approved lecture data.
  // Read directly from that data rather than guessing the language of rendered paragraphs.
  function topic2Segments(){
    if(typeof topic2Lecture==='undefined'||!Array.isArray(topic2Lecture))return [];
    const out=[];
    const han=/[\u3400-\u9fff]/g;
    for(const block of topic2Lecture){
      if(block.type!=='paragraph'||!block.text)continue;
      const raw=String(block.text).trim();
      if(!raw)continue;
      // A few figure labels have one line per language; the same parser handles both.
      const first=raw.search(/[\u3400-\u9fff]/);
      if(first<0){
        // English-only headings are followed by a separate Chinese/pinyin paragraph.
        if(/[A-Za-z]/.test(raw))out.push({lang:'en',text:raw});
        continue;
      }
      const matches=[...raw.matchAll(han)];
      const last=matches[matches.length-1].index+matches[matches.length-1][0].length;
      const english=raw.slice(0,first).trim();
      // The Mandarin text ends at the final Han character, followed by punctuation
      // and then pinyin. Keep Chinese punctuation; never include romanized pinyin.
      const remainder=raw.slice(last);
      const punctuation=(remainder.match(/^[\s，。！？；：、,.!?;:—–…()（）“”‘’\-]*/)||[''])[0];
      const chinese=raw.slice(first,last)+punctuation.trimEnd();
      if(english&&/[A-Za-z]/.test(english))out.push({lang:'en',text:english});
      if(chinese)out.push({lang:'zh',text:chinese.trim()});
    }
    return out;
  }
  // Topic 1: approved lecture is rendered as consecutive EN / ZH / pinyin elements.
  // Do not alter the displayed material; exclude the third element from speech.
  function topic1Segments(){
    const root=lesson.querySelector('.approvedTopic1');
    if(!root)return [];
    const out=[];
    let previousWasChinese=false;
    for(const el of root.children){
      // The lecture comes before the student quiz and lecturer notes.
      if(el.matches('fieldset,.topic1Quiz,[id*="Quiz"],[class*="Quiz"],[id*="Lecturer"],[class*="Lecturer"]') || el.querySelector('input[type="radio"],fieldset'))break;
      if(!el.matches('h2,h3,p'))continue;
      if(el.querySelector('button,input,select,textarea'))continue;
      const value=el.textContent.trim().replace(/\s+/g,' ');
      if(!value)continue;
      if(/[\u3400-\u9fff]/.test(value)){
        out.push({lang:'zh',text:value});
        previousWasChinese=true;
      }else if(previousWasChinese){
        // Romanized line immediately after its Chinese translation is pinyin.
        previousWasChinese=false;
      }else{
        out.push({lang:'en',text:value});
      }
    }
    return out;
  }
  function segments(){
    // Use exact approved Topic 2 lecture entries, not quiz, captions from other topics,
    // or DOM nodes containing English, Mandarin and pinyin together.
    if(lesson.querySelector('.topic2Lecture'))return topic2Segments();
    if(lesson.querySelector('.approvedTopic1'))return topic1Segments();
    const walker=document.createTreeWalker(lesson,NodeFilter.SHOW_TEXT);
    const items=[];let n;
    while((n=walker.nextNode())){
      const lang=locale(n);if(!lang)continue;
      const raw=n.textContent.trim();
      if(!raw)continue;
      // Topic 4's comparison table stores each trilingual cell as
      // three newline-separated lines in a single text node.
      const lines=raw.split(/\r?\n/).map(t=>t.trim()).filter(Boolean);
      if(lines.length===3 && n.parentElement?.closest('td,th')){
        items.push({lang:'en',text:lines[0]});
        items.push({lang:'zh',text:lines[1]});
        continue; // Never send the third (pinyin) line to speech.
      }
      const t=raw.replace(/\s+/g,' ');
      if(!/[\p{L}\p{N}]/u.test(t))continue;
      items.push({lang,text:t});
    }
    return items;
  }
  // List installed voices for the selected language. Offline voices are preferred,
  // but the user can explicitly choose any voice exposed by the browser.
  const voiceSelect=panel.querySelector('#ttsVoice');
  function matchingVoices(lang){
    return synth.getVoices().filter(v=>v.lang.toLowerCase().startsWith(lang==='zh'?'zh':'en'));
  }
  function refreshVoices(){
    const lang=panel.querySelector('#ttsLanguage').value;
    const previous=voiceSelect.value;
    voiceSelect.replaceChildren();
    const auto=document.createElement('option');auto.value='auto';auto.textContent='Automatic (offline preferred)';voiceSelect.appendChild(auto);
    const voices=lang==='both'?[...matchingVoices('en'),...matchingVoices('zh')]:matchingVoices(lang);
    voices.forEach(v=>{
      const opt=document.createElement('option');
      opt.value=v.voiceURI;
      opt.textContent=v.name+' ('+v.lang+')'+(v.localService?' — offline':' — may need internet');
      voiceSelect.appendChild(opt);
    });
    if([...voiceSelect.options].some(o=>o.value===previous))voiceSelect.value=previous;
    else voiceSelect.value='auto';
  }
  function chosenVoice(lang){
    const voices=matchingVoices(lang);
    const selected=voiceSelect.value;
    const explicit=voices.find(v=>v.voiceURI===selected);
    return explicit||voices.find(v=>v.localService)||voices[0]||null;
  }
  refreshVoices();
  if('onvoiceschanged' in synth)synth.addEventListener('voiceschanged',refreshVoices);
  // Version 5: divide text into resumable short passages (usually sentences).
  // Cloud voices in Edge may not support speechSynthesis.resume().
  function splitForResume(item){
    const sentences=item.text.match(/[^.!?。！？；;]+[.!?。！？；;]*|[.!?。！？；;]+/g)||[item.text];
    const result=[];
    for(const sentence of sentences){
      const t=sentence.trim();
      if(!t)continue;
      // Bound unusually long sentences to short passages.
      if(t.length<=150){result.push({lang:item.lang,text:t});continue;}
      let rest=t;
      while(rest.length>150){
        let cut=rest.lastIndexOf(' ',150);
        if(cut<55)cut=150;
        result.push({lang:item.lang,text:rest.slice(0,cut).trim()});
        rest=rest.slice(cut).trim();
      }
      if(rest)result.push({lang:item.lang,text:rest});
    }
    return result;
  }
  let paused=false, fallbackPaused=false, nativePaused=false, currentIndex=-1;
  function resetPlayback(){
    token++;active=false;paused=false;fallbackPaused=false;nativePaused=false;
    queue=[];index=0;currentIndex=-1;synth.cancel();
  }
  function stop(){resetPlayback();setStatus('Stopped / 已停止 / Yǐ tíngzhǐ');}
  function needsFallback(voice,lang){
    // Preserve verified native pause/resume for local English voices (e.g. Zira).
    // Cloud voices and Mandarin voices use a cancel-and-restart passage fallback.
    return !voice.localService||lang==='zh';
  }
  function speakNext(id){
    if(id!==token||!active||paused)return;
    if(index>=queue.length){active=false;setStatus('Finished / 朗读完成 / Lǎngdú wánchéng');return;}
    currentIndex=index;
    const item=queue[index++];
    const voice=chosenVoice(item.lang);
    if(!voice){active=false;setStatus((item.lang==='zh'?'Mandarin':'English')+' voice unavailable on this device.');return;}
    const utterance=new SpeechSynthesisUtterance(item.text);
    utterance.lang=voice.lang;utterance.voice=voice;
    utterance.rate=Number(panel.querySelector('#ttsSpeed').value);
    utterance.onend=()=>speakNext(id);
    utterance.onerror=e=>{if(id===token&&active&&!paused){active=false;setStatus('Speech error: '+e.error);}};
    synth.speak(utterance);
  }
  function play(){
    resetPlayback();
    const choice=panel.querySelector('#ttsLanguage').value;
    const items=segments().filter(x=>choice==='both'||x.lang===choice);
    if(!items.length){setStatus('No readable lesson text found. / 未找到可朗读的课文。');return;}
    const needed=[...new Set(items.map(x=>x.lang))];
    const missing=needed.filter(l=>!chosenVoice(l));
    if(missing.length){setStatus('Missing voice: '+missing.map(l=>l==='zh'?'Mandarin':'English').join(', ')+'. Check installed speech voices.');return;}
    queue=items.flatMap(splitForResume);
    index=0;active=true;const id=token;
    setStatus('Reading lesson / 正在朗读课文 / Zhèngzài lǎngdú kèwén');
    speakNext(id);
  }
  function pause(){
    if(!active||paused)return;
    const item=queue[currentIndex];
    if(!item)return;
    const voice=chosenVoice(item.lang);
    paused=true;
    if(voice&&needsFallback(voice,item.lang)){
      // Invalidate callbacks from the cancelled utterance. On Resume, repeat
      // the current sentence/passage, never the whole lesson.
      fallbackPaused=true;nativePaused=false;
      index=currentIndex;
      token++;
      synth.cancel();
      setStatus('Paused / 已暂停 / Yǐ zàntíng — Resume repeats the current sentence / 继续时重读当前句子');
    }else{
      nativePaused=true;fallbackPaused=false;
      synth.pause();
      setStatus('Paused / 已暂停 / Yǐ zàntíng');
    }
  }
  function resume(){
    if(!active||!paused)return;
    paused=false;
    if(fallbackPaused){
      fallbackPaused=false;
      const id=token;
      setStatus('Reading from current sentence / 从当前句子继续 / Cóng dāngqián jùzi jìxù');
      speakNext(id);
    }else if(nativePaused){
      nativePaused=false;
      synth.resume();
      setStatus('Reading / 正在朗读 / Zhèngzài lǎngdú');
    }
  }
  panel.querySelector('#ttsPlay').addEventListener('click',play);
  panel.querySelector('#ttsPause').addEventListener('click',pause);
  panel.querySelector('#ttsResume').addEventListener('click',resume);
  panel.querySelector('#ttsStop').addEventListener('click',stop);
  panel.querySelector('#ttsLanguage').addEventListener('change',()=>{stop();refreshVoices();});
  voiceSelect.addEventListener('change',stop);
  document.addEventListener('click',e=>{if(e.target.closest('[data-view],.back')&&!e.target.closest('#readAloudPanel'))stop();},true);
  new MutationObserver(()=>{if(!lesson.parentElement?.classList.contains('active')&&active)stop();}).observe(document.getElementById('app'),{attributes:true,attributeFilter:['class'],subtree:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&active&&!paused)pause();});
})();
