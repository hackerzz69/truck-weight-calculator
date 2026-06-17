const tabs =
document.querySelectorAll(".tab");

function showMode(mode){

document
.getElementById("splitMode")
.classList.add("hidden");

document
.getElementById("catMode")
.classList.add("hidden");

document
.getElementById("reverseMode")
.classList.add("hidden");

tabs.forEach(
t=>t.classList.remove("active")
);

if(mode==="split"){

document
.getElementById("splitMode")
.classList.remove("hidden");

tabs[0].classList.add("active");

}

if(mode==="cat"){

document
.getElementById("catMode")
.classList.remove("hidden");

tabs[1].classList.add("active");

}

if(mode==="reverse"){

document
.getElementById("reverseMode")
.classList.remove("hidden");

tabs[2].classList.add("active");

}

calculate();
}

function calculate(){

let steer=0;
let drive=0;
let tandem=0;
let gross=0;

if(
!document
.getElementById("splitMode")
.classList.contains("hidden")
){

steer=
Number(splitSteer.value)||0;

const sd=
Number(splitSD.value)||0;

tandem=
Number(splitTandem.value)||0;

drive=
sd-steer;

gross=
steer+drive+tandem;
}

if(
!document
.getElementById("catMode")
.classList.contains("hidden")
){

steer=
Number(catSteer.value)||0;

drive=
Number(catDrive.value)||0;

tandem=
Number(catTandem.value)||0;

gross=
steer+drive+tandem;
}

if(
!document
.getElementById("reverseMode")
.classList.contains("hidden")
){

steer=
Number(revSteer.value)||0;

const sd=
Number(revSD.value)||0;

gross=
Number(revGross.value)||0;

drive=
sd-steer;

tandem=
gross-sd;
}

driveResult.textContent=
drive.toLocaleString();

grossResult.textContent=
gross.toLocaleString();

remaining.textContent=
(80000-gross)
.toLocaleString();

legal(
steer,
drive,
tandem,
gross
);
}

function row(
name,
value,
limit
){

const pct=
Math.min(
(value/limit)*100,
100
);

let color="green";

if(value>limit){
color="red";
}
else if(limit-value<500){
color="yellow";
}

return `
<div>

${name}
 (${value.toLocaleString()} / ${limit.toLocaleString()})

<div class="bar">

<div
class="fill ${color}"
style="width:${pct}%">
</div>

</div>

</div>
`;
}

function legal(
steer,
drive,
tandem,
gross
){

legalResults.innerHTML=

row(
"Steer",
steer,
12000
)

+

row(
"Drive",
drive,
34000
)

+

row(
"Tandem",
tandem,
34000
)

+

row(
"Gross",
gross,
80000
);

}

document
.querySelectorAll("input")
.forEach(input=>{

input.addEventListener(
"input",
calculate
);

});

calculate();

let deferredPrompt;

window.addEventListener(
"beforeinstallprompt",
e=>{

e.preventDefault();

deferredPrompt=e;

installBtn.style.display=
"block";

});

installBtn.addEventListener(
"click",
async()=>{

if(!deferredPrompt)
return;

deferredPrompt.prompt();

await deferredPrompt.userChoice;

deferredPrompt=null;

});
