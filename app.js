const providers=[
{n:"Badger Underground Construction",c:["Stuart","Palm City","Jensen Beach","Hobe Sound","Port St. Lucie"],s:["French drains","Catch basins","Channel drains","Dry wells","Excavation"],p:["standing-water","flooding","erosion"]},
{n:"Titan Gutters and Drainage",c:["Stuart","Jensen Beach","Port St. Lucie"],s:["French drains","Surface drainage","Subsurface drainage","Downspout drainage"],p:["standing-water","flooding","erosion"]},
{n:"Alpha Zeta Landscapes",c:["Palm City","Stuart","Jensen Beach","Hobe Sound"],s:["Drainage systems","Grading","Surface collection","Erosion control"],p:["standing-water","soggy-yard","near-house","erosion"]},
{n:"AutoSprinkler Inc.",c:["Jensen Beach","Stuart","Palm City"],s:["French drains","Catch basins","Swales","Channel drains","Grading","Irrigation diagnosis"],p:["standing-water","driveway","irrigation"]},
{n:"Serafini’s Irrigation Services",c:["Stuart","Palm City","Jensen Beach","Hobe Sound"],s:["French drains","Catch basins","Dry wells","Grading","Sump systems"],p:["standing-water","flooding","soggy-yard"]},
{n:"Florida Irrigation Services",c:["Stuart","Palm City","Jensen Beach","Hobe Sound","Port St. Lucie"],s:["French drains","Drainage design","Irrigation diagnosis"],p:["standing-water","soggy-yard","irrigation"]},
{n:"Complete Irrigation Services",c:["Stuart","Palm City","Jensen Beach","Port St. Lucie"],s:["Rainwater drainage","Irrigation systems"],p:["runoff","erosion","irrigation"]},
{n:"Premier Site Work LLC.",c:["Stuart","Port St. Lucie"],s:["Corrective grading","Drainage tiles","Ditch reshaping","Excavation"],p:["grading","standing-water","near-house","erosion"]},
{n:"Selective Land Clearing",c:["Stuart","Palm City","Jensen Beach","Port St. Lucie"],s:["Culverts","Swales","Trenching","Land shaping"],p:["culvert","swale","runoff"]},
{n:"On Grade Excavating LLC",c:["Stuart","Hobe Sound","Palm City"],s:["Grading","Culverts","Swales","Drainage berms","Excavation"],p:["grading","driveway","culvert","swale"]},
{n:"A & M Construction Services",c:["Stuart","Palm City","Jensen Beach"],s:["Grading","Leveling","Excavation"],p:["grading","standing-water"]},
{n:"Freedom Tree and Land Development",c:["Stuart","Palm City","Jensen Beach","Port St. Lucie"],s:["Grading","Site preparation","Land development"],p:["grading","standing-water"]},
{n:"SFG Land Development",c:["Palm City","Stuart"],s:["Site grading","Stormwater drainage","Earthwork"],p:["grading","runoff","flooding"]},
{n:"Controlled Irrigation",c:["Jensen Beach","Stuart","Palm City"],s:["Irrigation troubleshooting","Drainage work"],p:["irrigation","soggy-yard"]},
{n:"Landscape Innovations & Land Works LLC",c:["Stuart","Palm City","Jensen Beach"],s:["Drainage systems","Landscape drainage"],p:["standing-water","soggy-yard"]},
{n:"JV Landscape Services",c:["Stuart"],s:["Swales","Culverts","Stormwater work"],p:["swale","culvert","runoff"]},
{n:"Alliance Land Development",c:["Port St. Lucie","Stuart"],s:["Corrective grading","Drainage remediation","Site work"],p:["grading","flooding","runoff"]}
];

const serviceLinks={
"French drains":"/wetyard/french-drain-installation/",
"Catch basins":"/wetyard/catch-basins/",
"Channel drains":"/wetyard/channel-drains/",
"Dry wells":"/wetyard/dry-wells/",
"Excavation":"/wetyard/excavation-site-drainage/",
"Surface drainage":"/wetyard/surface-drainage/",
"Subsurface drainage":"/wetyard/subsurface-drainage/",
"Downspout drainage":"/wetyard/downspout-drainage/",
"Drainage systems":"/wetyard/yard-drainage-systems/",
"Drainage design":"/wetyard/yard-drainage-systems/",
"Drainage work":"/wetyard/yard-drainage-systems/",
"Drainage remediation":"/wetyard/yard-drainage-systems/",
"Landscape drainage":"/wetyard/yard-drainage-systems/",
"Grading":"/wetyard/yard-grading-drainage/",
"Corrective grading":"/wetyard/yard-grading-drainage/",
"Site grading":"/wetyard/yard-grading-drainage/",
"Land shaping":"/wetyard/yard-grading-drainage/",
"Leveling":"/wetyard/yard-grading-drainage/",
"Surface collection":"/wetyard/surface-drainage/",
"Erosion control":"/wetyard/erosion-runoff-control/",
"Swales":"/wetyard/swales-and-culverts/",
"Culverts":"/wetyard/swales-and-culverts/",
"Ditch reshaping":"/wetyard/swales-and-culverts/",
"Irrigation diagnosis":"/wetyard/irrigation-drainage-diagnosis/",
"Irrigation troubleshooting":"/wetyard/irrigation-drainage-diagnosis/",
"Irrigation systems":"/wetyard/irrigation-drainage-diagnosis/",
"Sump systems":"/wetyard/yard-sump-systems/",
"Drainage tiles":"/wetyard/subsurface-drainage/",
"Drainage berms":"/wetyard/yard-grading-drainage/",
"Trenching":"/wetyard/excavation-site-drainage/",
"Site preparation":"/wetyard/excavation-site-drainage/",
"Land development":"/wetyard/excavation-site-drainage/",
"Earthwork":"/wetyard/excavation-site-drainage/",
"Site work":"/wetyard/excavation-site-drainage/",
"Stormwater drainage":"/wetyard/stormwater-drainage/",
"Stormwater work":"/wetyard/stormwater-drainage/",
"Rainwater drainage":"/wetyard/surface-drainage/"
};

let selected="";
document.querySelectorAll("[data-problem]").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("[data-problem]").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    selected=b.dataset.problem;
  });
});

document.querySelector("#startFinder")?.addEventListener("click",()=>{
  sessionStorage.setItem("wyProblem",selected||"standing-water");
  sessionStorage.setItem("wyZip",document.querySelector("#zip")?.value.trim()||"");
  location.href="/wetyard/find-help/";
});

function linkedTag(service){
  const href=serviceLinks[service];
  return href
    ? '<a class="tag" href="'+href+'" aria-label="Learn about '+service+'">'+service+'</a>'
    : '<span class="tag">'+service+'</span>';
}

function providerMatchesService(provider,target){
  if(!target)return true;
  const targetHref=serviceLinks[target]||"";
  return provider.s.some(s=>s===target || (targetHref && serviceLinks[s]===targetHref));
}

function render(){
  const box=document.querySelector("#providerList");
  if(!box)return;
  const city=box.dataset.city||"";
  const problem=box.dataset.problem||sessionStorage.getItem("wyProblem")||"";
  const service=box.dataset.service||"";
  let rows=providers.filter(x=>
    (!city||x.c.includes(city)) &&
    (!problem||x.p.includes(problem)) &&
    providerMatchesService(x,service)
  );
  if(!rows.length && service) rows=providers.filter(x=>providerMatchesService(x,service));
  if(!rows.length && city) rows=providers.filter(x=>x.c.includes(city));
  if(!rows.length) rows=providers;
  box.innerHTML=rows.slice(0,8).map(x=>
    '<article class="provider"><h3>'+x.n+'</h3>'+
    '<div class="service-area">Serves: '+x.c.join(", ")+'</div>'+
    '<div class="tags">'+x.s.map(linkedTag).join("")+'</div></article>'
  ).join("");
}
render();

if(document.querySelector("#leadForm")){
  document.querySelector("#leadZip").value=sessionStorage.getItem("wyZip")||"";
  document.querySelector("#leadProblem").value=sessionStorage.getItem("wyProblem")||"standing-water";
  document.querySelector("#leadForm").addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const body=[...f.entries()].map(([k,v])=>k+": "+v).join("\n");
    location.href="mailto:Scottspoolservice2014@gmail.com?subject="+
      encodeURIComponent("WetYard help request — "+(f.get("zip")||"Treasure Coast"))+
      "&body="+encodeURIComponent(body);
  });
}