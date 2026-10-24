'use strict';
const $=id=>document.getElementById(id);
const C=window.WasteCore;
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function syncMotion(){document.body.classList.toggle('paused',paused);$('motion').textContent=paused?'▶ Chạy minh họa':'Ⅱ Tạm dừng';$('motion').setAttribute('aria-pressed',String(paused));}
$('motion').onclick=()=>{paused=!paused;syncMotion();};syncMotion();
$('present').onclick=()=>{const on=document.body.classList.toggle('presenting');$('present').textContent=on?'Thu gọn ↙':'Trình chiếu ↗';$('present').setAttribute('aria-pressed',String(on));};
const frames=[
['Con người chọn ảnh và gắn nhãn để máy học.','Ảnh là đầu vào; kiểm tra phạm vi trước khi dự đoán.'],
['Thuật toán điều chỉnh tham số dựa trên sai khác với nhãn.','Mô hình đã học tạo điểm cho từng nhãn; điểm cao vẫn có thể sai.'],
['Mô hình dùng tham số đã học để dự đoán ảnh mới.','Người dùng đối chiếu vật thật, không quyết định chỉ bằng điểm.'],
['Đối chiếu nhãn thật, ghi lỗi và thử cách cải tiến.','Phản hồi giúp tìm lỗi; chỉ học lại khi có quy trình cập nhật.']
];
let step=0;
function paintSteps(){['heroSteps','systemFlow'].forEach(id=>[...$(id).children].forEach((e,i)=>e.classList.toggle('active',i===step)));$('heroCaption').textContent=frames[step][0];$('systemCaption').textContent=frames[step][1];}
paintSteps();
setInterval(()=>{if(paused||document.hidden)return;const visible=['heroSteps','systemFlow'].some(id=>{const r=$(id).getBoundingClientRect();return r.bottom>100&&r.top<innerHeight;});if(visible){step=(step+1)%4;paintSteps();}},2800);
let swapped=false;
$('swapBackground').onclick=()=>{swapped=!swapped;$('objectA').style.background=swapped?'#f2c8b7':'#c1dfbd';$('objectB').style.background=swapped?'#c1dfbd':'#f2c8b7';$('biasText').textContent=swapped?'Nhãn thật không đổi khi đổi nền. Nếu mô hình đổi dự đoán theo nền, cần thêm bằng chứng để xem nó có học dấu hiệu không phù hợp.':'Nếu giấy chỉ chụp trên nền xanh, lon chỉ trên nền hồng, máy có thể dựa vào nền.';};
$('print').onclick=()=>window.print();
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function option(value,text){const n=el('option',text);n.value=value;return n;}
function download(name,type,text){const url=URL.createObjectURL(new Blob([text],{type}));const a=el('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function script(src){return new Promise((resolve,reject)=>{const n=document.createElement('script');const timer=setTimeout(()=>{n.remove();reject(Error('Quá thời gian tải thư viện.'));},25000);n.src=src;n.onload=()=>{clearTimeout(timer);resolve();};n.onerror=()=>{clearTimeout(timer);n.remove();reject(Error('Không tải được thư viện.'));};document.head.append(n);});}
let libraries=null;
async function loadLibraries(){if(!libraries)libraries=(async()=>{if(!window.tf)await script('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js');if(!window.tmImage)await script('https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js');})().catch(e=>{libraries=null;throw e;});return libraries;}
let model=null,active=null,pending=null,busy=false,loadNo=0,labels=[],rows=[],rules=[];
function controls(){['loadModel','modelUrl','modelVersion','scope'].forEach(id=>$(id).disabled=busy);$('imageInput').disabled=busy||!model||!$('scope').value;$('recordTrial').disabled=busy||!pending;}
function invalidate(){pending=null;$('recordTrial').disabled=true;$('predictions').replaceChildren();$('preview').hidden=true;$('preview').removeAttribute('src');$('predictionEmpty').hidden=false;$('predictionSummary').textContent='Chưa có dự đoán cho ảnh mới.';$('recordStatus').textContent='Cần dự đoán thành công trước khi ghi.';$('verdict').value='';$('truth').value='';advice();}
function advice(){
 const truth=truthValue();
 let text='Chưa đủ căn cứ hướng dẫn bỏ thùng; hỏi người phụ trách.';
 if(pending&&pending.scope==='in'&&truth===pending.predicted&&$('verdict').value==='correct'&&$('rulesConfirmed').checked){
  const i=labels.indexOf(pending.predicted),rule=rules[i];
  if(rule&&rule.value.trim())text='Hướng dẫn do giáo viên cấu hình cho nhãn đã đối chiếu: '+rule.value.trim()+'. Kiểm tra thêm tình trạng vật trước khi thực hiện.';
 }
 $('disposalAdvice').textContent=text;
}
function truthValue(){const v=$('truth').value;if(!v||v==='outside')return null;const i=Number(v.slice(6));return labels[i]??null;}
function resetLabels(){
 $('truth').replaceChildren(option('','Chọn nhãn thật đã kiểm tra'),...labels.map((l,i)=>option('label:'+i,l)),option('outside','Ngoài phạm vi / chưa xác định'));
 $('ruleFields').replaceChildren();rules=[];$('rulesConfirmed').checked=false;
 labels.forEach((l,i)=>{const wrap=el('label',l,'rule-input');const input=el('input');input.id='rule-'+i;input.maxLength=200;input.placeholder='Hướng dẫn được trường xác nhận; để trống nếu chưa có';input.addEventListener('input',()=>{$('rulesConfirmed').checked=false;advice();});wrap.append(input);rules.push(input);$('ruleFields').append(wrap);});
}
$('rulesConfirmed').onchange=advice;$('truth').onchange=advice;$('verdict').onchange=advice;
$('scope').onchange=()=>{invalidate();$('imageInput').value='';controls();};
$('loadModel').onclick=async()=>{
 invalidate();
 if(model&&model.model&&model.model.dispose)model.model.dispose();
 model=null;active=null;labels=[];$('loadedLabels').textContent='';$('imageInput').value='';resetLabels();controls();
 let base;try{base=C.modelURL($('modelUrl').value);}catch{$('modelStatus').textContent='URL không hợp lệ. Dùng https://teachablemachine.withgoogle.com/models/MA_MO_HINH/';return;}
 const version=$('modelVersion').value.trim();if(!version){$('modelStatus').textContent='Điền phiên bản trước khi tải.';return;}
 busy=true;invalidate();controls();$('modelStatus').textContent='Đang tải mô hình ảnh…';
 // Clear the old model so a failed replacement can never predict with a previous model.
 if(model&&model.model&&model.model.dispose)model.model.dispose();model=null;active=null;labels=[];$('loadedLabels').textContent='';$('imageInput').value='';resetLabels();
 try{
  await loadLibraries();
  const next=await window.tmImage.load(base+'model.json',base+'metadata.json');
  const nextLabels=next.getClassLabels();
  if(!Array.isArray(nextLabels)||nextLabels.length<2||nextLabels.length>100||nextLabels.some(l=>typeof l!=='string'||!l.trim())||new Set(nextLabels).size!==nextLabels.length){if(next.model&&next.model.dispose)next.model.dispose();throw Error('Nhãn mô hình cần khác nhau, không rỗng (2–100 lớp).');}
  model=next;labels=[...nextLabels];loadNo++;
  active={modelKey:base+'|'+version+'|'+loadNo,url:base,version,loadNo,loadedAt:new Date().toISOString(),labels:[...labels]};
  resetLabels();$('loadedLabels').textContent='Nhãn thực tế: '+labels.join(' · ')+'. Nhãn khác bộ dự án vẫn được hiển thị; giáo viên phải kiểm tra phạm vi.';
  $('modelStatus').textContent='Đã tải '+version+' ('+labels.length+' lớp). Chọn phạm vi và ảnh mới.';
 }catch(e){$('modelStatus').textContent='Không tải được mô hình. Kiểm tra URL, loại Image, quyền truy cập và kết nối. '+e.message;}
 finally{busy=false;controls();}
};
$('imageInput').onchange=async()=>{
 const file=$('imageInput').files[0];invalidate();if(!file||!model){controls();return;}
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){$('modelStatus').textContent='Chọn JPG/PNG/WebP không quá 10 MB.';controls();return;}
 busy=true;controls();$('modelStatus').textContent='Đang đọc ảnh và dự đoán…';const url=URL.createObjectURL(file);
 try{
  const img=$('preview');img.src=url;await img.decode();
  if(img.naturalWidth*img.naturalHeight>25000000)throw Error('Ảnh quá lớn. Hãy giảm xuống dưới 25 triệu điểm ảnh.');
  const predictions=await model.predict(img);
  if(!predictions.length||predictions.some(p=>!labels.includes(p.className)||!Number.isFinite(p.probability)||p.probability<0||p.probability>1))throw Error('Kết quả mô hình không hợp lệ.');
  predictions.sort((a,b)=>b.probability-a.probability);
  pending={...active,scope:$('scope').value,predicted:predictions[0].className,score:predictions[0].probability,predictions:predictions.map(p=>({label:p.className,score:p.probability})),time:new Date().toISOString()};
  img.hidden=false;$('predictionEmpty').hidden=true;
  predictions.forEach(p=>{const row=el('div',undefined,'result'),bar=el('div',undefined,'bar'),fill=el('i');fill.style.width=(p.probability*100)+'%';bar.append(fill);row.append(el('span',p.className),el('b',(p.probability*100).toFixed(1)+'%'),bar);$('predictions').append(row);});
  $('predictionSummary').textContent='Dự đoán: '+pending.predicted+' — cần đối chiếu với vật thật.'+(pending.scope==='out'?' Đây là phép thử ngoài phạm vi; không đưa hướng dẫn thu gom.':'');
  $('modelStatus').textContent='Dự đoán xong bằng '+active.version+'. Ghi nhãn thật và kết luận ở phần kiểm thử.';
  $('recordStatus').textContent='Có dự đoán mới; hoàn thành phiếu rồi ghi một lần.';
  if(pending.scope==='out'){$('truth').value='outside';$('verdict').value='unknown';}
 }catch(e){invalidate();$('modelStatus').textContent='Không dự đoán được ảnh: '+e.message;}
 finally{URL.revokeObjectURL(url);busy=false;controls();advice();}
};
const setNames={dev:'Phát triển',final:'Kiểm tra cuối',practice:'Thử thao tác'};
const verdictNames={correct:'Đúng',wrong:'Sai',unknown:'Chưa xác định / ngoài phạm vi'};
$('recordTrial').onclick=()=>{
 if(!pending||busy)return;
 if(!$('truth').value){$('recordStatus').textContent='Chọn nhãn thật hoặc trạng thái ngoài phạm vi.';return;}
 const r={...pending,trial:$('trialId').value.trim(),object:$('objectId').value.trim(),set:$('testSet').value,truth:truthValue(),condition:$('condition').value.trim(),verdict:$('verdict').value,note:$('trialNote').value.trim()};
 const error=C.validateTrial(r);
 if(error){$('recordStatus').textContent=error;return;}
 if(rows.some(x=>x.modelKey===r.modelKey&&x.set===r.set&&x.trial===r.trial)){$('recordStatus').textContent='Mã ảnh đã ghi trong phiên bản và tập này. Dùng mã mới cho phép thử khác.';return;}
 rows.push(r);pending=null;controls();$('recordStatus').textContent='Đã ghi '+r.trial+'. Chọn ảnh tiếp theo để thử.';$('trialId').value='';$('trialNote').value='';renderLog(r.modelKey);advice();
};
function renderLog(preferred){
 const selected=preferred||$('summaryVersion').value;
 const models=[...new Map(rows.map(r=>[r.modelKey,r])).values()];
 $('summaryVersion').replaceChildren(...models.map(r=>option(r.modelKey,r.version+' · lần tải '+r.loadNo)));
 if(models.some(r=>r.modelKey===selected))$('summaryVersion').value=selected;
 if(!models.length)$('summaryVersion').append(option('','Chưa có lần thử'));
 $('logRows').replaceChildren();
 rows.forEach(r=>{const tr=el('tr');[r.trial+' / '+r.object,r.version+' (tải '+r.loadNo+') / '+setNames[r.set],r.truth??'Ngoài phạm vi / chưa xác định',r.predicted+' / '+(r.score*100).toFixed(1)+'%',verdictNames[r.verdict],r.condition+' · '+r.note].forEach(t=>tr.append(el('td',t)));$('logRows').append(tr);});
 $('exportCSV').disabled=!rows.length;$('clearLog').disabled=!rows.length;$('exportCard').disabled=!rows.length;renderMetrics();
}
function renderMetrics(){
 const m=C.metrics(rows,$('summaryVersion').value,$('summarySet').value);
 $('metrics').textContent=m.all?'Tập '+setNames[$('summarySet').value]+': '+m.correct+'/'+m.n+' ảnh có nhãn trong phạm vi được đoán đúng'+(m.n?' ('+(100*m.correct/m.n).toFixed(1)+'%)':'')+'. Số vật được đánh giá: '+m.objects+'. Ghi riêng '+m.excluded+' lần ngoài phạm vi/chưa xác định. Đây là thống kê các lần đã ghi, không đại diện mọi tình huống.':'Chưa có lần thử trong phiên bản và tập được chọn.';
 $('confusion').replaceChildren();if(!m.n)return;
 const table=el('table',undefined,'guide-table');table.append(el('caption','Bảng nhầm lẫn — hàng là nhãn thật, cột là dự đoán'));const head=el('thead'),hr=el('tr');['Nhãn thật / dự đoán',...m.labels,'Đúng / tổng'].forEach(t=>hr.append(el('th',t)));head.append(hr);const body=el('tbody');
 m.labels.forEach((l,i)=>{const tr=el('tr');tr.append(el('th',l));m.matrix[i].forEach(n=>tr.append(el('td',String(n))));tr.append(el('td',m.matrix[i][i]+'/'+m.matrix[i].reduce((a,b)=>a+b,0)));body.append(tr);});table.append(head,body);$('confusion').append(table);
}
$('summaryVersion').onchange=renderMetrics;$('summarySet').onchange=renderMetrics;
$('exportCSV').onclick=()=>{
 const head=['Thời điểm UTC','URL mô hình','Phiên bản','Lần tải','Mã ảnh','Mã vật','Tập','Phạm vi','Nhãn thật','Dự đoán','Điểm 0-1','Kết luận','Điều kiện','Ghi chú','Điểm tất cả nhãn'];
 download('nhat-ky-kiem-thu.csv','text/csv;charset=utf-8',C.csv([head,...rows.map(r=>[r.time,r.url,r.version,r.loadNo,r.trial,r.object,setNames[r.set],r.scope==='in'?'Trong phạm vi':'Ngoài phạm vi / chưa rõ',r.truth??'',r.predicted,r.score,verdictNames[r.verdict],r.condition,r.note,JSON.stringify(r.predictions)])]));
};
$('clearLog').onclick=()=>{if(!rows.length||!window.confirm('Xóa toàn bộ nhật ký trong phiên? Hãy tải CSV trước nếu cần lưu.'))return;rows=[];renderLog();$('recordStatus').textContent='Đã xóa nhật ký. Mô hình đang tải vẫn được giữ.';};
$('exportCard').onclick=()=>{
 const r=rows.find(x=>x.modelKey===$('summaryVersion').value);if(!r)return;
 const lines=['# Thẻ mô hình — Dự án phân loại rác lớp 12','','- Phiên bản: '+r.version,'- URL: '+r.url,'- Lần tải trong phiên: '+r.loadNo,'- Thời điểm tải UTC: '+r.loadedAt,'- Nhãn: '+r.labels.join(', '),'','## Phạm vi','Ảnh một vật sạch, rõ, riêng lẻ thuộc bộ nhãn đã duyệt. Không tự suy ra quy tắc thu gom.','','## Dữ liệu',$('cardData').value.trim()||'Chưa bổ sung mô tả.','','## Kết quả đã ghi'];
 ['dev','final','practice'].forEach(set=>{const m=C.metrics(rows,r.modelKey,set);lines.push('- '+setNames[set]+': '+m.correct+'/'+m.n+' đúng; '+m.objects+' vật; '+m.excluded+' lần ngoài phạm vi/chưa xác định.');});
 lines.push('','Các số chỉ mô tả những lần được ghi, không bảo đảm khái quát.','','## Giới hạn và người kiểm tra',$('cardLimits').value.trim()||'Chưa bổ sung.','','## Khai báo AI và đóng góp',$('cardDisclosure').value.trim()||'Chưa bổ sung.');
 download('the-mo-hinh.md','text/markdown;charset=utf-8',lines.join('\n'));
};
renderLog();controls();
