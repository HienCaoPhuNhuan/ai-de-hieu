'use strict';
(function(root){
  function modelURL(raw){
    const u=new URL(raw.trim());
    if(u.origin!=='https://teachablemachine.withgoogle.com'||u.username||u.password||!/^\/models\/[\w-]+\/?$/.test(u.pathname)||u.search||u.hash)throw Error('URL mô hình không hợp lệ');
    return u.origin+u.pathname.replace(/\/$/,'')+'/';
  }
  function csvCell(value){
    let s=String(value==null?'':value);
    if(/^[\s\uFEFF]*[=+\-@]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;
    return '"'+s.replace(/"/g,'""')+'"';
  }
  function csv(rows){return '\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');}
  function metrics(rows,key,set){
    const all=rows.filter(r=>r.modelKey===key&&r.set===set);
    const scored=all.filter(r=>r.scope==='in'&&r.truth!==null);
    const labels=[...new Set(all.flatMap(r=>r.labels||[]).concat(scored.flatMap(r=>[r.truth,r.predicted])))];
    const matrix=labels.map(truth=>labels.map(pred=>scored.filter(r=>r.truth===truth&&r.predicted===pred).length));
    const correct=scored.filter(r=>r.truth===r.predicted).length;
    return {all:all.length,n:scored.length,correct,objects:new Set(scored.map(r=>r.object)).size,excluded:all.length-scored.length,labels,matrix};
  }
  function validateTrial(r){
    if(!r.trial.trim()||!r.object.trim())return 'Điền mã ảnh và mã vật.';
    if(!r.verdict)return 'Chọn kết luận đối chiếu.';
    if(r.scope==='out'&&r.truth!==null)return 'Ảnh ngoài phạm vi: chọn “Ngoài phạm vi / chưa xác định” làm nhãn thật.';
    if(r.truth===null&&r.verdict!=='unknown')return 'Chưa có nhãn thật: chọn kết luận “Chưa xác định / ngoài phạm vi”.';
    if(r.truth!==null&&r.verdict!==(r.truth===r.predicted?'correct':'wrong'))return 'Kết luận không khớp nhãn thật và dự đoán. Hãy kiểm tra lại.';
    return '';
  }
  root.WasteCore={modelURL,csvCell,csv,metrics,validateTrial};
})(typeof window==='undefined'?globalThis:window);
