const steerInput = document.getElementById("steer");
const sdInput = document.getElementById("steerDrive");
const tandemInput = document.getElementById("tandem");

const driveResult = document.getElementById("driveResult");
const grossResult = document.getElementById("grossResult");
const legalResults = document.getElementById("legalResults");

function calculate() {

const steer = Number(steerInput.value) || 0;
const sd = Number(sdInput.value) || 0;
const tandem = Number(tandemInput.value) || 0;

const drive = sd - steer;
const gross = steer + drive + tandem;

driveResult.textContent =
drive.toLocaleString();

grossResult.textContent =
gross.toLocaleString();

buildLegal(
steer,
drive,
tandem,
gross
);

}

function createRow(name, value, limit){

const percent =
Math.min(
(value / limit) * 100,
100
);

let colorClass = "";

if(value > limit){

colorClass = "red";

}else if(limit - value < 500){

colorClass = "yellow";

}

const diff =
limit - value;

return `
<div class="legal-row">

<div>
${name}

(${value.toLocaleString()} /
${limit.toLocaleString()})

${diff >= 0
? `✅ ${diff.toLocaleString()} lbs under`
: `❌ ${Math.abs(diff).toLocaleString()} lbs over`
}

</div>

<div class="bar">
<div
class="fill ${colorClass}"
style="width:${percent}%">
</div>
</div>

</div>
`;
}

function buildLegal(
steer,
drive,
tandem,
gross
){

legalResults.innerHTML =

createRow(
"Steer",
steer,
12000
)

+

createRow(
"Drive",
drive,
34000
)

+

createRow(
"Tandem",
tandem,
34000
)

+

createRow(
"Gross",
gross,
80000
);

}

[
steerInput,
sdInput,
tandemInput
].forEach(input=>{

input.addEventListener(
"input",
calculate
);

});

calculate();
